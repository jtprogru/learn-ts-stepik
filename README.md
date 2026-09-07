# learn-ts-stepik

[![Build and Test](https://github.com/jtprogru/learn-ts-stepik/actions/workflows/main.yaml/badge.svg)](https://github.com/jtprogru/learn-ts-stepik/actions/workflows/main.yaml)

Всякие зарисовки по курсу [Программирование на TypeScript](https://stepik.org/course/120959/syllabus) на Stepik.

## Команды

```bash
make install      # поставить зависимости
make build        # собрать TypeScript в ./dist
make test         # прогнать тесты
make test-report  # то же плюс junit и html в ./reports
make help         # список целей
```

## Тесты

`make test` печатает результаты в фиксированном порядке — по алфавиту, по пути файла. Штатный сортировщик Jest раскладывает файлы по времени прошлого прогона из perf-cache, а параллельные воркеры печатают в порядке завершения, поэтому на быстрых тестах вывод скакал от запуска к запуску. За порядок отвечают два локальных файла:

- `jest.sequencer.js` — детерминированный порядок запуска файлов;
- `jest.reporter.js` — наследник штатного `DefaultReporter`, копит результаты и печатает их в конце отсортированными. Формат вывода джестовый, меняется только момент печати, так что параллельность сохраняется.

Сводку `Test Suites / Tests / Time` печатает встроенный репортёр `summary`. Он подключён явно, потому что Jest добавляет его сам только при наличии `default` в списке репортёров, а `default` мы заменили своим.

В конфиге стоит `silent: true`: учебные модули пишут в `console.log`, в том числе на верхнем уровне файла, и в отчёте это только шум. Показать логи при отладке — `npx jest --silent=false`.

## Отчёты

Файловые отчёты (junit XML и HTML) пишутся только под CI, локально они не создаются, чтобы не мусорить в `./reports` на каждом прогоне. Получить их вручную — `make test-report`, это `CI=1 npm run test`.

В GitHub Actions к этому добавляются ещё два репортёра:

- встроенный `github-actions` — вешает аннотации на упавшие строки, видно прямо в diff коммита;
- `jest.summary-reporter.js` — пишет в job summary таблицу по сьютам и раскрытые блоки с падениями, так что результат виден на странице запуска без скачивания артефакта.

Полный HTML-отчёт и junit XML лежат в артефакте `test-reports`, ссылка на него есть в том же job summary. Хранится 14 дней.
