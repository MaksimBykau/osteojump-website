# Session: 2026-03-05

## Последний коммит
`ea38cd9` — Rename article slugs from Polish to English for SEO consistency

## Что сделали за сессию

### Страница «Блог» — hub для всех статей
- Создана `/blog` — единая точка входа ко всем 9 статьям
- Две секции: «Сравнение методов» (4 карточки, grid-2) + «Материнство и здоровье» (5 карточек, grid-3)
- Карточки переиспользуют существующие i18n ключи (`article_osteo_*.hero_title/hero_subtitle`)
- Новые i18n ключи: `nav.blog`, `blog.*`, `faq.blog_link` — все 5 языков
- «Блог» добавлен в nav всех 21 страницы (header + footer)
- Ссылка «Больше статей в блоге» добавлена в конец FAQ
- `build.js` + `meta.js` обновлены, Page Map обновлён
- `make build` → 105 страниц + 45 redirects = 150

### Файлы затронутые
- **Новые:** `blog/index.html`, `css/blog.css`
- **Build:** `scripts/build.js`, `scripts/meta.js`
- **i18n:** `locales/{pl,en,ru,uk,de}.json`
- **Nav:** все 20 существующих шаблонов + `blog/index.html`
- **FAQ:** `faq/index.html`, `css/faq.css`
- **Docs:** `docs/TECHNICAL.md`

## Открытые задачи
- См. `TODO.md`

## Следующие шаги
- Объединить секции "5 причин" + "Почему ко мне" на главной
- Добавить цитаты отзывов на главную
