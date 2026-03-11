# Session Log

Архив прошлых сессий. Новые записи — сверху.

---

## Session: 2026-03-11 — SEO: исправление дублирования языковых версий

**Коммиты:**
- `15dce77` — Fix SEO: add trailing slash to all canonical, hreflang, og:url, sitemap URLs
- `88cb675` — Fix SEO: add trailing slashes to all internal page links
- `3bf1a3e` — Fix SEO: add translated image alt texts for all languages
- `57c8a05` — Fix SEO: translate keywords per language, document SEO technical rules

**Проблемы:**
- Google считал EN/RU/UK/DE версии дублями PL → не индексировал
- Три причины дублирования: broken canonical (без trailing slash), польские alt тексты на всех языках, польские keywords на всех языках

**Исправления:**
- Canonical и hreflang URL — добавлен trailing slash везде (build.js, sitemap, nav)
- Alt тексты — `data-i18n-alt` атрибут на img, ключи в locale JSON (секция `img`)
- Keywords — `keywordsDefaults` в meta.js, применяются в build.js (шаг 4)
- Задокументировано в `docs/SEO.md` (раздел "Технические правила")

---

## Session: 2026-03-05 — Страница «Блог»

**Коммит:** `d65ee6c` — Add blog page: hub for all 9 articles with nav integration

- Создана `/blog` — единая точка входа ко всем 9 статьям (2 секции: сравнения + материнство)
- Карточки переиспользуют существующие i18n ключи `article_osteo_*.hero_title/hero_subtitle`
- Новые i18n ключи: `nav.blog`, `blog.*`, `faq.blog_link` — все 5 языков
- «Блог» добавлен в nav всех 21 страницы (header + footer)
- Ссылка «Больше статей» добавлена в конец FAQ
- 105 страниц + 45 redirects = 150 итого

---

## Session: 2026-03-05 (2)

### FAQ — 3 новых вопроса (беременность)
- `pregnancy_frequency` — сколько сеансов, рекомендации по триместрам
- `pregnancy_safety` — безопасность для малыша, противопоказания
- `birth_types` — остеопатия не выбирает за вас тип родов
- Все 5 языков, soft-links → `/osteopathy-pregnancy`
- Контент-план #5 закрыт — все 5 пунктов ГОТОВО

---

## Session: 2026-03-05
**Коммит:** `555791d` — Add 3 FAQ questions: pregnancy frequency, safety, birth types

**FAQ — беременность и роды (3 новых вопроса):**
- `pregnancy_frequency` — частота сеансов по триместрам, индивидуальный подход
- `pregnancy_safety` — безопасность для малыша, мягкие техники, противопоказания
- `birth_types` — остеопатия и выбор типа родов, от первого лица (опыт акушерки)
- Все 5 языков (ru, pl, en, uk, de), soft-links → `/osteopathy-pregnancy`
- Контент-план "Беременность, роды, дети" — все 5 пунктов ГОТОВО

---

## Session: 2026-03-02
**Коммиты:**
- `e779215` — Fix mobile hero photo: programmatic sizing and centering

**Мобильное фото:**
- Баг: после добавления width/height атрибутов (CLS) фото на мобильном было 2415px высотой
- Корень: HTML `height="533"` переопределял CSS `aspect-ratio: 3/4` как presentational hint
- Формула: `calc((100dvh - var(--header-height)) * 0.75)` — 75% viewport минус header
- `height: auto` — переопределяет HTML hint, aspect-ratio работает корректно
- `max-width: min(350px, 100%)` — фото не выходит за контейнер, симметричные отступы
- HTML width/height изменены на 400×533 (3:4) вместо реальных размеров файлов

**Backlinks:**
- Booksy: обновлено описание с SEO-ключевыми словами
- ZnanyLekarz: запланирован на июнь 2026 (после диплома WOMA)
- Документация обновлена: SEO.md, DECISIONS.md, TODO.md

---

## Session: 2026-03-01
**Коммиты:**
- `312f4ac` — Add article: Osteopatia vs masaż leczniczy (SEO Q2)
- `248b90b` — Add article: Osteopatia vs fizjoterapia (SEO Q3)
- `2ad3ccc` — Add article: Osteopata vs chiropraktyk (SEO Q4)
- `ba022b0` — Add article: Osteopatia a ból szczęki / TMJ (SEO Q5)
- `3708d0a` — Add PostHog analytics (cookieless, GDPR-compliant)
- `901a885` — Update docs: session log, TODO, decisions, technical
- `c533999` — Update TODO and SEO docs: Booksy done, ZnanyLekarz planned for June

**SEO-статьи (Q2-Q5):**
- 4 статьи-сравнения для перехвата смежного трафика
- Каждая: отдельная страница + FAQ entry со ссылкой
- URL: `/osteopatia-{topic}`, i18n ключи: `article_osteo_{name}.*`
- Переводы: 4 параллельных sonnet-агента (EN/RU/UK/DE)
- Сайт вырос: 11 → 16 страниц, 55 → 80 HTML (16×5 языков)

**PostHog аналитика:**
- EU Cloud, cookieless_mode: 'always' (без cookie-баннера)
- Инжекция через build.js (шаг 18) — только в продакшене
- Autocapture (клики, формы), pageview/pageleave, scroll depth

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
