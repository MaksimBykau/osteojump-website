# Session: 2026-02-28

## Последний коммит
(ещё не закоммичено)

## Что сделали за сессию
- Реализована мультиязычная статическая генерация (SSG)
  - `scripts/build.js` — генерирует 55 HTML (11 страниц × 5 языков) в `dist/`
  - `scripts/meta.js` — мета-описания для всех страниц × языков
  - `js/i18n-static.js` — облегчённый i18n для статических страниц
  - Каждый язык имеет свой URL: `/` (PL), `/en/`, `/ru/`, `/uk/`, `/de/`
  - Sitemap с hreflang для всех 55 URL
  - Корректные canonical, hreflang, og:locale теги
- Обновлён `deploy.yml` — Node.js setup + build перед деплоем из `dist/`
- Обновлён `Makefile` — добавлены `make build`, `make serve-dist`, `make stop-dist`
- Обновлён `.gitignore` — добавлены `dist/`, `scripts/node_modules/`
- Исправлен `main.js` — определение активной страницы для путей с языковым префиксом
- Обновлена документация: TECHNICAL.md, DECISIONS.md

## Открытые задачи
- См. `TODO.md`

## Следующие шаги
- Закоммитить и задеплоить
- Проверить в Google Search Console
