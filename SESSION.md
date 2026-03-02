# Session: 2026-03-02

## Последний коммит
`e779215` — Fix mobile hero photo: programmatic sizing and centering

## Что сделали за сессию

### Фикс мобильного фото
- Баг: после добавления width/height (CLS) фото растягивалось на весь экран
- Формула: `calc((100dvh - var(--header-height)) * 0.75)` вместо хардкода
- `height: auto` — фикс для HTML presentational hint vs CSS aspect-ratio
- `max-width: min(350px, 100%)` — симметричные отступы на узких экранах
- Проверено: iPhone SE (375px), 600px, desktop (1440px)

### Backlinks
- Booksy: описание обновлено с SEO-ключевыми словами
- ZnanyLekarz: запланирован на июнь 2026 (после диплома WOMA)

## Открытые задачи
- См. `TODO.md`

## Следующие шаги
- FAQ секция "Osteopatia a inne metody" (план готов: gentle-dreaming-pie.md)
- Контент главной: объединить "5 причин" + "Почему ко мне", добавить цитаты отзывов
- Проверить PostHog dashboard (приходят ли данные после деплоя)
