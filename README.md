## BPsim.MAS Web. Клиентская часть приложения

**BPsim.MAS Web** - это система для решения задач динамического моделирования бизнес-процессов, эффективного управления ресурсами и оценки их показателей.

## Описание функционала
Приложение позволяет:
* создавать модели в рамках одной предметной области с общими ресурсами;
* добавлять и удалять узлы модели;
* создавать ресурсы (информационные, материальные, трудовые, финансовые, энергетические);
* устанавливать текущее, минимальное и максимальное значение ресурса;
* настраивать время выполнения операций в рамках одного узла;
* настраивать изменения ресурсов на текущем этапе (узле);
* проводить имитационный эксперимент для выбранной модели процесса;
* визуализировать результаты эксперимента в виде диаграмм;
* экспортировать результаты эксперимента в форматах .xlsx и .csv.

## Структура проекта <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="20">

```
.
├── bpsim-web
├   ├── load-tests/ - файлы нагрузочных тестов
├   ├── public/ - каталог, в котором лежат файлы, изменяемые и перемещаемые бандлером
├   └── src/ - корневая папка с кодом
├       ├── assets/
├       ├  ├── icons/ - иконки svg
├       ├── enums/ - переиспользуемые enum
├       ├── navigation/ - навигация
├       ├── screens/ - страницы
├       ├── services/ - сервисы для работы с запросами
├       ├── shared/ - переиспользуемые компоненты и функции
├       ├  ├──components/ - компоненты
├       ├  ├── hooks/ - кастомные хуки
├       ├── store/ - хранилище состояния
├       ├── styles/ - глобальные стили
├       ├── types/ - глобальные типы
├       ├── App.tsx
├       ├── index.css
├       ├── vite-env.d.ts
├       └── main.tsx
├── eslint.config.js - конфигурация линтера
├── index.html
├── tsconfig.app.json - настройки компиляции проекта 
├── tsconfig.json - конфигурация проекта
├── vite.config.ts - конфигурация Vite
├── package.json - список зависимостей проекта
└── README.md
```
