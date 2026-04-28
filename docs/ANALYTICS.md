# Analytics

Трекинг реализован через PostHog в `js/analytics.js`. Инжектируется на все страницы через `build.js` (шаг 20).

## Архитектура

Один delegated click listener (capture phase) на `document`. Классифицирует клики по href-паттернам (ссылки) и id/class (кнопки).

**Свойства каждого события:**
- `page` — slug страницы (`"home"`, `"prices"`, `"osteopathy-for-newborns"`)
- `lang` — язык интерфейса (`pl`, `en`, `ru`, `uk`, `de`)
- `location` — расположение на странице (см. ниже)

**Определение `location`** (приоритет сверху вниз):
1. Ближайший предок с `data-track-location="..."` → значение атрибута
2. Внутри `.fixed-action-bar` → `"fixed_bar"`
3. Внутри `.footer` → `"footer"`
4. Внутри `.header` → `"header"`
5. Иначе → `"content"`

## Таблица событий

| Событие | Триггер | Доп. свойства |
|---|---|---|
| `click_booking` | href содержит `booksy.com`; кнопка `#actionBook` | `href` |
| `click_whatsapp` | href содержит `wa.me` / `api.whatsapp.com` | `phone` |
| `click_phone` | href начинается с `tel:` | `phone` |
| `click_telegram` | href содержит `t.me` | `handle` |
| `click_email` | href начинается с `mailto:` | `email` |
| `click_social` | instagram.com, facebook.com, youtube.com, youtu.be, orlymedycyny.pl | `platform`, `handle` |
| `click_maps` | href содержит `maps.app.goo.gl` / `maps.google` | — |
| `click_nav` | `<a>` внутри `.nav-menu` или `.footer-nav` | `destination` |
| `click_lang` | кнопка `.lang-select-option[data-lang]` | `from_lang`, `to_lang` |
| `click_faq` | кнопка `.faq-question` | `question_id` |
| `click_fixed_bar` | `#actionContacts`, `#actionDirections` | `action` |

## Значения data-track-location по страницам

| Страница | Секции и значения |
|---|---|
| `/` (главная) | `hero` |
| `/prices/` | `services_section`, `family_section`, `consultation_section`, `certificates_section` |
| `/contacts/` | `contacts_section`, `social_section`, `cta_section` |
| `/appointment/` | `hero`, `cta_section` |
| `/consultation/` | `hero`, `cta_section` |
| `/about/` | `hero`, `cta_section` |
| `/osteopathy/` | `hero`, `cta_section` |
| Статьи (9 страниц) | `hero`, `cta_section` |
| `/reviews/` | `cta_section` |
| `/faq/` | `faq_section` |
| `/location/` | `map_section` |

## Правила при изменении сайта

### Новая страница
1. Добавить страницу в `PAGES` в `build.js` — analytics.js подтянется автоматически
2. Добавить `data-track-location` на секции с кликабельными элементами
3. Новые типы конверсий (новый мессенджер, новая платформа бронирования) → добавить в `classifyLink()` в `js/analytics.js`

### Новая кнопка или ссылка
- Если это конверсия (booking, contact, social) — убедиться, что href попадает под существующий паттерн в `classifyLink()`
- Если кнопка без `<a>` (как `#actionBook`) — добавить в `classifyButton()` в `js/analytics.js`
- Если кнопка находится в новой секции страницы — добавить `data-track-location` на секцию

### Изменение структуры header/footer/fixed-bar
- Эти компоненты трекаются автоматически по CSS-классам (`.header`, `.footer`, `.fixed-action-bar`)
- При переименовании классов — обновить `getLocation()` в `js/analytics.js`

### Новый тип кликабельного элемента (новый домен, новый мессенджер)
Добавить паттерн в `classifyLink()` в `js/analytics.js`:
```javascript
if (href.indexOf('новый-домен.com') !== -1) {
  return { event: 'click_новое_событие', props: { ... } };
}
```

## UTM-редиректы

Для отслеживания трафика из внешних источников используются редирект-страницы:

| URL | Назначение | UTM |
|---|---|---|
| `/yt/` | YouTube канал (QR в видео, ссылка в описании) | `utm_source=youtube&utm_medium=video` |

Шаблон для новых источников: скопировать `/yt/index.html`, изменить UTM параметры, добавить папку в массив `['yt', ...]` в `copyAssets()` в `build.js`.

PostHog подхватывает UTM-параметры автоматически — они доступны в фильтрах как свойства сессии.
