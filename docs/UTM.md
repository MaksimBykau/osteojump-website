# UTM-метки

Руководство по UTM-параметрам для osteojump.pl — что за что отвечает, какие метки используем, как смотреть статистику в PostHog.

---

## Что такое UTM-параметры

UTM-параметры добавляются в конец URL и позволяют PostHog понять, откуда пришёл посетитель. Они не влияют на сайт — только на аналитику.

```
https://osteojump.pl/?utm_source=instagram&utm_medium=social&utm_content=main
```

PostHog подхватывает их автоматически и сохраняет как свойства сессии.

---

## Пять параметров и их смысл

| Параметр | Отвечает за | Примеры |
|---|---|---|
| `utm_source` | **Откуда** пришёл трафик (платформа) | `google`, `instagram`, `booksy` |
| `utm_medium` | **Как** пришёл (тип канала) | `cpc`, `social`, `referral`, `video` |
| `utm_campaign` | **Кампания** (название) | `osteopathy_pregnancy`, `brand` |
| `utm_content` | **Конкретный элемент** (баннер, профиль, объявление) | `main_profile`, `stories_ad` |
| `utm_term` | **Ключевое слово** (обычно для платного поиска) | `osteopata_warszawa` |

**Обязательные**: `utm_source` + `utm_medium`. Остальные — по необходимости.

---

## Стандарты utm_medium

| Значение | Когда использовать |
|---|---|
| `cpc` | Платная реклама с оплатой за клик (Google Ads) |
| `social` | Органические соцсети (Instagram, Telegram) |
| `referral` | Ссылка с другого сайта (Booksy, Google Maps) |
| `video` | Видео-платформы (YouTube) |
| `email` | Рассылки |

---

## Наши UTM-метки

### Платная реклама

**Google Ads** — устанавливается через "Суффикс конечного URL" в настройках аккаунта:
```
utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}
```

`{campaignid}`, `{adgroupid}`, `{keyword}` — это **ValueTrack-параметры**, Google подставляет их автоматически. В UTM попадёт числовой ID кампании/группы — соответствие ID → название смотри в интерфейсе Google Ads.

**Важно:** параметров `{campaignname}` и `{adgroupname}` в ValueTrack **не существует** — Google поддерживает только ID. Если использовать несуществующий параметр, в UTM попадёт литералом `{campaignname}` и аналитика поломается.

Полный список ValueTrack-параметров: [support.google.com/google-ads/answer/2375447](https://support.google.com/google-ads/answer/2375447).

---

### Профили и справочники

**Booksy** (ссылка на сайт в профиле):
```
https://osteojump.pl/?utm_source=booksy&utm_medium=referral
```

**Google Business Profile** (ссылка на сайт в карточке организации, отображается в Google Maps и поиске):
```
https://osteojump.pl/?utm_source=google_profile&utm_medium=referral
```

---

### Соцсети

**Instagram** — несколько профилей разделяем через `utm_content` (по языку аудитории или handle):
```
https://osteojump.pl/?utm_source=instagram&utm_medium=social&utm_content=hannabykavaosteopata
https://osteojump.pl/?utm_source=instagram&utm_medium=social&utm_content=bykova_anna_osteopat
https://osteojump.pl/?utm_source=instagram&utm_medium=social&utm_content=osteojump
```

**Facebook** — два профиля (польский и русский), различаем через `utm_content` по языку:
```
https://osteojump.pl/?utm_source=facebook&utm_medium=social&utm_content=pl
https://osteojump.pl/?utm_source=facebook&utm_medium=social&utm_content=ru
```

**Telegram**:
```
https://osteojump.pl/?utm_source=telegram&utm_medium=social
```

---

### Редиректы (UTM через страницы сайта)

Некоторые источники используют редирект-страницы — тогда UTM прописан в коде страницы, а не в ссылке вручную. Ссылку можно менять без правки профиля.

| URL | Назначение | UTM |
|---|---|---|
| `/yt/` | YouTube (QR, описание видео) | `utm_source=youtube&utm_medium=video` |

Шаблон новой редирект-страницы: скопировать `/yt/index.html`, изменить UTM, добавить папку в `copyAssets()` в `build.js`.

---

## Типичные проблемы

### UTM не приходят в PostHog

**Причины:**
- Посетитель уже был на сайте — PostHog берёт UTM только из первого визита в сессии
- UTM в URL написан с заглавной буквы (`UTM_source`) — должен быть строчным
- Редирект на сайте обрезал параметры — проверь в браузере, остаются ли UTM после перехода

**Проверка:** открой ссылку с UTM в режиме инкогнито → зайди в PostHog → Activity → найди свою сессию.

---

### Данные за прошлые периоды без UTM

Если UTM только что настроили, исторические данные будут без меток (все null). Это нормально — метки работают только с момента настройки. Через 1–2 недели будет достаточно данных.

---

### В UTM приходит литерал `{campaignname}` (а не значение)

Значит, использован несуществующий ValueTrack-параметр. У Google Ads нет `{campaignname}` и `{adgroupname}` — только числовые ID `{campaignid}` и `{adgroupid}`. Замени в суффиксе URL в настройках аккаунта.

---

### Как разделить несколько профилей одной платформы

Используй `utm_content`:
```
utm_source=instagram&utm_medium=social&utm_content=main
utm_source=instagram&utm_medium=social&utm_content=stories
```

---

### Разные посадочные страницы

UTM можно добавить к любой странице, не только к главной:
```
https://osteojump.pl/osteopathy-pregnancy/?utm_source=google&utm_medium=cpc
https://osteojump.pl/prices/?utm_source=instagram&utm_medium=social
```

---

## Как смотреть статистику в PostHog

### Трафик по источникам

HogQL-запрос — топ источников за 30 дней:

```sql
SELECT
  properties.utm_source AS source,
  properties.utm_medium AS medium,
  count() AS sessions
FROM events
WHERE event = '$pageview'
  AND timestamp >= now() - interval 30 day
GROUP BY source, medium
ORDER BY sessions DESC
```

### Трафик конкретной страницы по источникам

```sql
SELECT
  properties.utm_source AS source,
  properties.utm_medium AS medium,
  properties.utm_campaign AS campaign,
  count() AS views
FROM events
WHERE event = '$pageview'
  AND properties.$current_url LIKE '%/osteopathy-pregnancy/%'
  AND timestamp >= now() - interval 30 day
GROUP BY source, medium, campaign
ORDER BY views DESC
```

### Конверсии по источникам

```sql
SELECT
  properties.utm_source AS source,
  properties.utm_medium AS medium,
  count() AS bookings
FROM events
WHERE event = 'click_booking'
  AND timestamp >= now() - interval 30 day
GROUP BY source, medium
ORDER BY bookings DESC
```

### Воронка: реклама → страница → бронирование

В PostHog: **Insights → + New insight → Funnel**

Шаги:
1. `$pageview` с фильтром `utm_source = google` — посадочная страница
2. `$pageview` с фильтром `$current_url contains /prices/` — страница цен (опционально)
3. `click_booking` — клик на бронирование

Это покажет, какой процент пришедших с рекламы доходит до бронирования.

### Тренд по источникам (через UI)

**Insights → Trends:**
- Событие: `$pageview`
- Breakdown: `UTM Source` (свойство `utm_source`)
- Период: последние 30 дней

Покажет график посещений в разбивке по источникам.

---

## Имена UTM-свойств в PostHog (важно!)

В posthog-js 1.374+ UTM-параметры хранятся **БЕЗ префикса `$`**:

| Поле в HogQL/SQL | Что это |
|---|---|
| `properties.utm_source` | Источник текущего события (pageview) |
| `properties.utm_medium` | Канал |
| `properties.utm_campaign` | Кампания |
| `properties.utm_content` | Контент / объявление / профиль |
| `properties.utm_term` | Ключевое слово |
| `properties.$session_entry_utm_source` | Источник **первого** pageview в сессии (с префиксом `$`) |
| `properties.$session_entry_utm_medium` | Канал первой страницы сессии |
| `properties.$session_entry_utm_campaign` | Кампания первой страницы сессии |

**Не используй `properties.$utm_source`** — в новой версии posthog-js этого поля нет, вернёт пусто.

Для атрибуции по источнику первого визита — используй `$session_entry_utm_*`.
