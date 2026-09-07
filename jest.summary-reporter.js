const fs = require('fs');
const path = require('path');

const stripAnsi = (s) => String(s).replace(/\x1b\[[0-9;]*m/g, '');

/**
 * Пишет краткий отчёт в GitHub Actions job summary — он виден прямо на странице
 * запуска, без скачивания артефакта. Вне Actions (нет GITHUB_STEP_SUMMARY)
 * репортёр не делает ничего.
 */
class GithubSummaryReporter {
  constructor(globalConfig) {
    this._globalConfig = globalConfig;
  }

  onRunComplete(_testContexts, results) {
    const summaryPath = process.env.GITHUB_STEP_SUMMARY;
    if (!summaryPath) return;

    const rel = (p) => path.relative(this._globalConfig.rootDir, p);
    const suites = [...results.testResults].sort((a, b) =>
      a.testFilePath.localeCompare(b.testFilePath),
    );

    const ok = results.numFailedTests === 0 && results.numFailedTestSuites === 0;
    const out = [];

    out.push(`## ${ok ? 'Tests passed' : 'Tests failed'}`, '');
    out.push(
      `**${results.numPassedTests}** passed · ` +
        `**${results.numFailedTests}** failed · ` +
        `**${results.numPendingTests}** skipped · ` +
        `${results.numTotalTests} total in ${suites.length} suites`,
      '',
    );

    out.push('| Suite | Passed | Failed | Skipped | Time |');
    out.push('| --- | ---: | ---: | ---: | ---: |');
    for (const suite of suites) {
      const tests = suite.testResults;
      const failed = tests.filter((t) => t.status === 'failed').length;
      const skipped = tests.filter((t) => t.status === 'pending').length;
      const passed = tests.length - failed - skipped;
      const time = (suite.perfStats.end - suite.perfStats.start) / 1000;
      const mark = failed ? ':x:' : ':white_check_mark:';
      out.push(
        `| ${mark} \`${rel(suite.testFilePath)}\` ` +
          `| ${passed} | ${failed} | ${skipped} | ${time.toFixed(2)}s |`,
      );
    }
    out.push('');

    // failureMessage — уже отформатированный Jest'ом текст с code frame и без
    // внутренних фреймов jest-circus, ровно то, что печатается в терминале.
    const failed = suites.filter((s) => s.failureMessage);

    if (failed.length > 0) {
      out.push('### Failures', '');
      for (const suite of failed) {
        const titles = suite.testResults
          .filter((t) => t.status === 'failed')
          .map((t) => [...t.ancestorTitles, t.title].join(' › '));
        const summary = titles.length > 0 ? titles.join(', ') : 'suite failed to run';
        out.push(
          `<details open><summary><code>${rel(suite.testFilePath)}</code> — ${summary}</summary>`,
          '',
          '```',
          stripAnsi(suite.failureMessage)
            .split(`${this._globalConfig.rootDir}/`)
            .join('')
            .trimEnd(),
          '```',
          '',
          '</details>',
          '',
        );
      }
    }

    fs.appendFileSync(summaryPath, `${out.join('\n')}\n`, 'utf8');
  }
}

module.exports = GithubSummaryReporter;
