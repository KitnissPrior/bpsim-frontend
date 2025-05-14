## Клиентская часть приложения BPsim.MAS Web, которое представляет собой онлайн-платформу для решения задач динамического моделирования бизнес-процессов.

## Структура проекта <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="20">

```
.
└── bpsim-web
    ├── public/ - Каталог, в котором лежат файлы, изменяемые и перемещаемые бандлером
    └── src/ - Корневая папка с кодом
        ├── assets/
        ├  ├── icons/ - иконки svg
        ├── enums/ - переиспользуемые enum
        ├── navigation/ - навигация
        ├── screens/ - страницы
        ├── services/ - сервисы для работы с запросами
        ├── shared/ - Переиспользуемые компоненты и функции
        ├  ├──components/ - компоненты
        ├  ├── hooks/ - кастомные хуки
        ├── store/ - хранилище состояния
        ├── styles/ - глобальные стили
        ├── types/ - глобальные типы
        ├── App.tsx
        ├── index.css
        ├── vite-env.d.ts
        └── main.tsx
```