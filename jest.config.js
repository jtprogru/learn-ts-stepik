module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "./reports/junit", outputName: "results.xml" }],
    ["jest-html-reporter", {
      "pageTitle": "Test Report",
      "outputPath": "./reports/html/report.html"
    }]
  ]
};
