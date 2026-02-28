# Decision Log

Лог ключевых решений по проекту. Append-only — только дописывай новые записи.

## 2026-02

- **Static Site Generation (SSG)** — build-скрипт `scripts/build.js` (Node.js + cheerio) генерирует 55 статических HTML (11 страниц × 5 языков) в `dist/`. Причина: Google видел сайт только на английском (Googlebot `navigator.language="en"`). Теперь каждый язык имеет свой URL и индексируется отдельно.
- **URL structure** — PL (дефолт) без префикса (`/about`), остальные языки с префиксом (`/en/about`, `/ru/about`). Выбрано для сохранения существующих PL URL.
- **i18n-static.js** — облегчённый i18n для статических страниц: не загружает JSON, не заменяет текст, только навигация переключателя языков. Оригинальный i18n.js сохранён для локальной разработки.
- **Deploy из dist/** — GitHub Actions теперь запускает `node scripts/build.js` перед деплоем, деплоит из `dist/` вместо корня. Локальная разработка (`make server`) работает как раньше.

## 2025-02

- **CLAUDE.md restructured** — вынесены /screenshot и /translate в отдельные доки, добавлены workflow triggers и task tracking. Цель: уменьшить потребление токенов (491 → 124 строки).
- **TODO split** — открытые задачи в TODO.md, выполненные в TODO-done.md с датами по месяцам.

## 2025-01

- **Hero gradient** — используем `var(--gradient-hero)`, не `var(--gradient-cta)` — слишком яркий для фона секции.
- **Default language = PL** — основная аудитория в Польше.
- **Language selector order** — PL, UK, EN, DE, RU (по приоритету аудитории).
- **Homepage optimization** — сокращено с 9 до 7 секций: убраны "Сомнения" (дублировала смысл) и "FAQ" (просто ссылка).
- **Gift certificates** — платформа cert.osteojump.pl, упоминается на /prices и /faq.
