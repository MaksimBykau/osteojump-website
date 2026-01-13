# QA Report - About Page

**Дата:** 2026-01-13
**Оценка:** 7/10

## Критические проблемы

| # | Проблема | Файл | Строка |
|---|----------|------|--------|
| 1 | **Overflow на 320px** — grid `minmax(320px, 1fr)` + padding контейнера = горизонтальный скролл | css/about.css | 87 |
| 2 | **mother4.JPG** — заглавные буквы в расширении, не загрузится на Linux | about/index.html | 161 |
| 3 | **Нет max-width** для container — на широких экранах текст растянется | css/about.css | — |
| 4 | **Fixed bar перекрывает CTA** — нет отступа снизу для компенсации | about/index.html | 320-337 |

## Средние проблемы

- Нет `loading="lazy"` для изображений ниже fold
- Пустые `alt=""` у коллажей (accessibility)
- Нет `aria-labels` для секций
- Slider кнопки могут закрывать важные части фото
- Hero min-height 50vh может быть слишком мала на landscape mobile

## Рекомендации по исправлению

### Высокий приоритет

1. Исправить grid для specialization-cards:
```css
grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
```

2. Добавить max-width для container на широких экранах

3. Исправить расширение файла mother4.JPG → mother4.jpg

4. Добавить loading="lazy" для изображений

5. Добавить компенсацию для fixed action bar:
```css
.about-cta {
    padding-bottom: calc(var(--spacing-xl) + 70px);
}
```

### Средний приоритет

6. Добавить aria-labels для секций
7. Улучшить responsive для hero на мобильных
8. Сделать кнопки слайдера менее навязчивыми

## Статус

- [ ] Overflow на 320px
- [ ] mother4.JPG расширение
- [ ] max-width container
- [ ] Fixed bar перекрывает CTA
- [ ] loading="lazy"
- [ ] aria-labels
