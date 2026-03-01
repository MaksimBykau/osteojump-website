# Session Log

Архив прошлых сессий. Новые записи — сверху.

---

## Session: 2026-02-28
**Коммит:** `87393c5` — Optimize page speed: resize images, WebP, lazy loading, async CSS
- Ресайз крупных картинок до max 1600px (hero, work1-4, mother2/5, location steps)
- WebP конвертация: `scripts/convert-webp.js` + rewrite в `build.js` (36MB → 11MB WebP)
- Lazy loading: about (5 img), education (8 img), appointment (7 img)
- HugeIcons CSS async (preload/onload) на index и prices
- Новые make-команды: `make optimize-images`, `make webp`
- CI/CD: добавлен webp install + convert в deploy.yml

---

## Session: 2026-02-27 (early)
**Коммит:** `e8d1e17` — Fix WhatsApp number and contacts page "Подробнее" link
- Исправлен номер WhatsApp на всех 11 страницах: +48572404770 → +48571397199
- Кнопка "Подробнее" на странице контактов теперь ведёт на /location вместо Google Maps

---

## Session: 2025-02-12
**Коммит:** `fbcf506` — Add session handoff: SESSION.md + SESSION-log.md archive
- Полная реструктуризация документации проекта (6 коммитов)
- CLAUDE.md: 491 → 92 строки с workflow triggers
- Новые файлы: SCREENSHOT.md, TRANSLATE.md, DECISIONS.md, TODO-done.md, SESSION.md

---

## 2025-02-12 (fbcf506)

- Реструктурировали CLAUDE.md: 491 → 92 строки (82% reduction)
- Вынесли /screenshot и /translate в `docs/SCREENSHOT.md` и `docs/TRANSLATE.md`
- Создали Page Map в TECHNICAL.md (маппинг страниц → HTML, CSS, ключи)
- Создали `docs/DECISIONS.md` (лог решений), `TODO-done.md` (архив задач)
- Добавили `make css-vars` и `make locale-keys` в Makefile
- Дедуплицировали список страниц (одна точка правды — Page Map)
- Добавили Session handoff (SESSION.md + SESSION-log.md)
