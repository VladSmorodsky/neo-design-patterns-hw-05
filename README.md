# Directory Analyzer

Утиліта для аналізу структури директорій з генерацією звітів у різних форматах (JSON, CSV, XML).

### Використані патерни проектування

- **Facade Pattern** (`AnalyzerFacade`) - спрощує взаємодію з підсистемою аналізу директорій
- **Adapter Pattern** (`JsonReportAdapter`, `CsvReportAdapter`, `XmlReportAdapter`) - адаптує різні формати звітів до єдиного інтерфейсу
- **Registry Pattern** (`ReportTypeRegistry`) - управляє реєстрацією та отриманням адаптерів звітів

## Структура проекту

```
neo-design-patterns-hw-05/
├── main.ts                    # Точка входу програми
├── AnalyzerFacade.ts          # Facade для аналізу директорій
├── DirectoryAnalyzer.ts       # Основна логіка аналізу директорій
├── ReportManager.ts           # Менеджер для генерації звітів
├── ReportTypeRegistry.ts      # Реєстр типів звітів
├── ReportFormat.ts            # Типи та валідація форматів звітів
├── ReportAdapter.ts           # Базовий інтерфейс адаптера
├── DirectoryReport.ts         # Інтерфейс звіту про директорію
├── JsonReportAdapter.ts       # Адаптер для JSON формату
├── CsvReportAdapter.ts        # Адаптер для CSV формату
├── XmlReportAdapter.ts        # Адаптер для XML формату
├── dir/                       # Тестова директорія для аналізу
│   ├── dir1/
│   ├── dir2/
│   └── dir3/
├── reports/                   # Згенеровані звіти
├── package.json               # Налаштування та залежності проекту
└── tsconfig.json              # Конфігурація TypeScript

```

## Встановлення

1. Клонуйте репозиторій або перейдіть до директорії проекту:
```bash
cd neo-design-patterns-hw-05
```

2. Встановіть залежності:
```bash
npm install
```

## Запуск

### Базовий запуск

```bash
npm start [шлях_до_директорії] [формат_звіту]
```

### Параметри

- `шлях_до_директорії` (необов'язково) - шлях до директорії для аналізу. За замовчуванням: поточна директорія (`.`)
- `формат_звіту` (необов'язково) - формат вихідного звіту: `json`, `csv` або `xml`. За замовчуванням: `json`

### Приклади використання

1. Аналіз поточної директорії у форматі JSON (за замовчуванням):
```bash
npm start
```

2. Аналіз конкретної директорії у форматі JSON:
```bash
npm start ./dir
```

3. Аналіз директорії у форматі CSV:
```bash
npm start ./dir csv
```

4. Аналіз директорії у форматі XML:
```bash
npm start ./dir xml
```

5. Аналіз поточної директорії у форматі XML:
```bash
npm start . xml
```
