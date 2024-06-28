# ГИС на практику

Для установки зависимостей:

```bash
npm install
```

Чтобы запуститься в режиме разработки

```bash
npm run start
```

Чтобы собрать проект для деплоя в продакшн

```bash
npm run build
```

# Архитектура

-   react.js
-   typescript
-   effector - стор (меньше мешанины чем в других сторах, вкатиться легко)
-   react-query - запросы в бэк, ну или простой fetch
-   react-leaflet - библиотека с картой из прошлогоднего проекта от Акимова
-   feature-slice-design – структура файлов

# feature-slice design

Немного запутанная штука, но удобная для разделения бизнес логики

Ссылки для интересующихся

-   Зачем https://habr.com/ru/companies/piter/articles/744824/
-   Как делить на слои https://feature-sliced.design/ru/docs/get-started/cheatsheet

<img src="https://raw.githubusercontent.com/sarmong/documentation/master/website/static/img/visual_schema.jpg" alt="схема feature-slice design" width="300"/>

<img src="https://habrastorage.org/r/w1560/webt/ve/ey/w8/veeyw8lxdr-8dyiyf7d2a4ixzok.jpeg" alt="схема feature-slice design" width="300"/>

<img src="https://feature-sliced.design/ru/assets/images/choosing-a-layer-ru-b9d9bdfa29418ef5443937d8d2dc479e.jpg" alt="как делить на слои" />

В слоях есть сегменты:

-   ui/: здесь лежат компоненты
-   lib/: здесь лежат тайпинги, стор effector-а, утилитки
-   api/: здесь лежат запросы к бэку (которые использует эффектор в lib/)

На сегменты можно не разделять, если файликов не много

Если запутался - ничего страшного, пиши там, где считаешь нужным

**Главное добавлять к каждому компоненту публичное api – простой index.ts, который экспортирует все, что нужно для других компонентов.** Например ./src/entities/map/index.ts или ./src/shared/lib/time/index.ts

# Чистый код

-   На проекте есть `prettier`, в VSCode он устанавливается через расширение, позволяет сочетанием клавиш почистить код
-   На проекте есть scss и методология BEM, модульный css кажется не поддерживается, хотя хотелось бы)
-   Используются функциональные компоненты с typescript:

```tsx
interface SomeProps {
    prop1: string;
    prop2: number;
    prop3: {
        prop4: string;
        prop5: number;
    };
}

const Component = ({ prop1, prop2, prop3 }: SomeProps) => {
    // ...
    return 'html';
};
```
