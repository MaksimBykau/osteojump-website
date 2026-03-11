# Session: 2026-03-11

## Последний коммит
`57c8a05` — Fix SEO: translate keywords per language, document SEO technical rules

## Что сделали за сессию

### SEO — исправление дублирования языковых версий
Google не индексировал EN/RU/UK/DE страницы (статус "Crawled, not indexed") из-за трёх проблем дублирования:

1. **Canonical без trailing slash** → redirect loop
   - Исправлено: canonical, hreflang, og:url, sitemap — все URL со trailing slash
   - Внутренние ссылки в навигации тоже приведены к trailing slash

2. **Polish alt тексты на всех языках**
   - Исправлено: `data-i18n-alt` атрибут на img, переводы в locale JSON (`img` секция)
   - build.js уже обрабатывал `data-i18n-alt` в шаге 2b

3. **Polish keywords на всех языках**
   - Исправлено: `keywordsDefaults` в meta.js (5 языков), применяется в build.js (шаг 4)

4. **Задокументированы технические правила** в `docs/SEO.md`

## Открытые задачи
- См. `TODO.md`

## Следующие шаги
- Подождать переиндексацию Google (1-4 недели) и проверить GSC
- ZnanyLekarz — зарегистрироваться после диплома (июнь 2026)
