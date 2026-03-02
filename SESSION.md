# Session: 2026-03-02

## Последний коммит
`33c51c8` — Fix work1-4 image orientation: bake EXIF rotation into pixels

## Что сделали за сессию

### Фикс мобильного фото
- Баг: после добавления width/height (CLS) фото растягивалось на весь экран
- Формула: `calc((100dvh - var(--header-height)) * 0.75)` вместо хардкода
- `height: auto` — фикс для HTML presentational hint vs CSS aspect-ratio
- `max-width: min(350px, 100%)` — симметричные отступы на узких экранах
- Проверено: iPhone SE (375px), 600px, desktop (1440px)

### PostHog аналитика — фикс
- Баг: 0 events в дашборде несмотря на визиты продакшена
- Причина 1: `cookieless_mode: 'always'` → consent bug (GitHub #2841), `has_opted_out_capturing()` = true
- Причина 2: Chrome DevTools MCP ставит `navigator.webdriver = true` → PostHog `_is_bot()` блокирует все события
- Фикс: заменил `cookieless_mode: 'always'` на `persistence: 'memory'` в build.js
- Результат: PostHog работает — 4 visitors, 4 page views

### Фикс ориентации фото work1-4
- Баг: картинки рабочего процесса на appointment отображались боком
- Причина: EXIF orientation=6 (rotate 90° CW) в JPG, WebP конвертация убирала EXIF
- Фикс: `sips -r 90` (поворот пикселей) + `jpegtran -copy none` (убрать EXIF)
- HTML width/height: 1600×1200 → 1200×1600

### Backlinks
- Booksy: описание обновлено с SEO-ключевыми словами
- ZnanyLekarz: запланирован на июнь 2026 (после диплома WOMA)

## Открытые задачи
- См. `TODO.md`

## Следующие шаги
- FAQ секция "Osteopatia a inne metody" (план готов: gentle-dreaming-pie.md)
- Контент главной: объединить "5 причин" + "Почему ко мне", добавить цитаты отзывов
- Мониторить PostHog dashboard (данные уже приходят)
