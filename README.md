# AQVEX Products Demo

Простий демо-проєкт на **React + TypeScript + Vite** з **Redux Toolkit**, **React Router** та **Tailwind CSS**.

- Головна сторінка робить один запит до API [`/api/v1/products`](https://ip-194-99-21-145-139178.vps.hosted-by-mvps.net/api/v1/products) і логуює відповідь у консоль.
- Друга сторінка — порожня картка товару.

## Скрипти

- `npm install` — встановити залежності
- `npm run dev` — запуск dev-сервера
- `npm run build` — production-збірка
- `npm run preview` — попередній перегляд збірки
- `npm run deploy` — зібрати і задеплоїти в GitHub Pages (потрібен налаштований remote і гілка `gh-pages`)

## Налаштування GitHub Pages

1. У файлі `vite.config.ts` за потреби заміни `base: './'` на `base: '/your-repo-name/'` (якщо це не root-репозиторій).
2. Зроби `git init`, додай remote на GitHub.
3. Виконай `npm run deploy` — скрипт збере проєкт і заллє в гілку `gh-pages`.

