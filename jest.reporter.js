const { DefaultReporter } = require('@jest/reporters');

/**
 * Порядок вывода у штатного репортёра — это порядок завершения файлов,
 * то есть гонка между воркерами. Здесь результаты копятся до конца прогона
 * и печатаются разом, отсортированные по пути файла. Параллельность при этом
 * сохраняется: она влияет только на то, когда тест закончился, а не на вывод.
 */
class OrderedReporter extends DefaultReporter {
  constructor(globalConfig, options = {}) {
    super(globalConfig);
    this._options = options;
    this._results = [];
  }

  onTestResult(test, testResult, aggregatedResults) {
    // Прогресс-индикатор и счётчики обновляем сразу, печать откладываем.
    this.testFinished(test.context.config, testResult, aggregatedResults);
    this._results.push({ config: test.context.config, testResult });
  }

  onRunComplete(testContexts, aggregatedResults) {
    this._results
      .sort((a, b) =>
        a.testResult.testFilePath.localeCompare(b.testResult.testFilePath),
      )
      .forEach(({ config, testResult }) => {
        if (testResult.skipped) return;
        const path = testResult.testFilePath;
        this.printTestFileHeader(path, config, testResult);
        this.printTestFileFailureMessage(path, config, testResult);
      });

    this._results = [];
    return super.onRunComplete(testContexts, aggregatedResults);
  }
}

module.exports = OrderedReporter;
