// Файловые отчёты (junit + html) нужны только в CI — там их забирает
// upload-artifact. Локально они лишь пишут в ./reports и шумят в консоль.
// Получить их локально: `make test-report` (или CI=1 npm test).
const wantsFileReports = !!process.env.CI;

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // Детерминированный порядок запуска файлов.
  testSequencer: './jest.sequencer.js',

  // Учебные модули пишут в console.log на верхнем уровне и внутри функций —
  // в отчёте это только шум. Показать их: npx jest --silent=false
  silent: true,

  reporters: [
    // Замена штатного 'default': тот же формат, но вывод отсортирован по пути.
    './jest.reporter.js',
    // Итоговая сводка (Test Suites / Tests / Time) — штатный репортёр Jest.
    'summary',
    ...(wantsFileReports
      ? [
          ['jest-junit', { outputDirectory: './reports/junit', outputName: 'results.xml' }],
          ['jest-html-reporter', {
            pageTitle: 'Test Report',
            outputPath: './reports/html/report.html',
          }],
        ]
      : []),
  ],
};
