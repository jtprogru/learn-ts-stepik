const Sequencer = require('@jest/test-sequencer').default;

// Штатный сортировщик Jest раскладывает файлы по времени прошлого прогона
// (из perf-cache), поэтому на быстрых тестах порядок скачет от запуска к запуску.
// Здесь порядок фиксированный — алфавитный по пути файла.
class AlphabeticalSequencer extends Sequencer {
  sort(tests) {
    return [...tests].sort((a, b) => a.path.localeCompare(b.path));
  }
}

module.exports = AlphabeticalSequencer;
