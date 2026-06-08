# Session: 2026-06-08

## Последний коммит
`a3ac05b` — Switch Booksy booking links to Boost short link, fix schema profiles

## Что сделали за сессию

### Booksy Boost — новая ссылка записи
Включён Boost в Booksy. Все CTA записи переведены на boost-ссылку `https://osteojump.booksy.com/h`:
- Заменён профиль `262212_osteojump_zdrowie_3_warszawa` (главная, /prices ×7, /consultation, /appointment, /osteopathy и все 9 статей)
- Заменена deep-ссылка `cdl.booksy.com/hwJaWJhtmNb` (фикс-бар `js/main.js`, контакты, трекинг `js/analytics.js`)
- `/reviews`: битая ссылка на отзывы (профиль `185614 … #ba_s=seo`) заменена на тот же boost-URL — запись и отзывы ведут на одну страницу
- Старые ссылки сохранены в `docs/DECISIONS.md` для отката
- Классификатор `click_booking` в `analytics.js` продолжает работать (новый домен содержит `booksy.com`)

### JSON-LD на главной (SEO)
- `sameAs` — исправлен битый Instagram `osteojump` (нигде больше не используется) на реальные профили из футера: `hannabykavaosteopata` (PL), `bykova_anna_osteopat` (RU), + Facebook, YouTube, Telegram. Booksy-профиль `262212` оставлен как канонический (не boost-редирект).
- Добавлен `contactPoint`: телефон (`customer service`) и WhatsApp (`customer support`, `wa.me/48571397199`) с языками PL/RU/UK/EN/DE.

## Открытые задачи
- См. `TODO.md`

## Незакоммичено (работа из прошлой сессии, не трогал)
- `locales/*.json` — удаление ключа `for_who.more`
- `TODO.md` — новые задачи (/appointment, /osteopathy, онлайн-консультация)
- `website-ideas/` — система учёта идей (backlog/proposed/in-progress/rejected)
- Новые картинки: `education-full.png`, награды Firma Godna Zaufania

## Следующие шаги
- Проверить в PostHog, что после смены ссылки события `click_booking` идут на новый домен и Boost-атрибуция работает
- Решить судьбу незакоммиченных изменений выше (доделать/закоммитить отдельно)
- Из TODO: переписать `/appointment/` (самый кликаемый элемент главной), затем `/osteopathy/`; добавить GA4
