# Session: 2026-05-19

## Последний коммит
`6866bd3` — Update UTM docs after Google Ads + PostHog audit

## Что сделали за сессию

### UTM-разметка для всех источников трафика
- Google Ads: суффикс на уровне аккаунта через ValueTrack-параметры (числовые ID кампаний/групп — `{campaignid}`/`{adgroupid}`, а не `{campaignname}` которого не существует)
- Booksy: `?utm_source=booksy&utm_medium=referral`
- Google Business Profile: `?utm_source=google_profile&utm_medium=referral`
- Facebook (2 профиля): `?utm_source=facebook&utm_medium=social&utm_content=pl/ru`
- Instagram: уже было настроено, добавил handle-based `utm_content`

### Выключен AI Max в Google Ads
Был основным источником проблем: расширял Search-кампании на мусорные display-площадки (`gbapkfree.com`, `gpspain.com`), приводил bot-трафик с `gad_source=5`, ломал tracking template. Отключён в кампаниях `23732985811` (Беременность) и `23739543823`.

### PostHog: разобрались с UTM-свойствами
В posthog-js 1.374+ UTM хранятся **без префикса `$`**: `properties.utm_source`, `properties.utm_medium`, и т.д. Сессионные первой страницы — с префиксом: `$session_entry_utm_source`. Не баг, изменение схемы SDK. Обновил `docs/UTM.md` с таблицей правильных имён.

## Открытые задачи
- См. `TODO.md`

## Следующие шаги
- Через 1-3 дня перепроверить, что после выключения AI Max исчезли мусорные referrer'ы (`gbapkfree.com`, `gpspain.com`) и `gad_source=5`
- Через 2-3 недели — проверить, не вернётся ли `utm_source=ig` (за последние 7 дней не встречался)
- Подумать про добавление GA4 (давно висит в TODO)
