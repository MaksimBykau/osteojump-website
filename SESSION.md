# Session: 2026-03-01

## Последний коммит
`3708d0a` — Add PostHog analytics (cookieless, GDPR-compliant)

## Что сделали за сессию

### SEO-статьи Q2-Q5
- 4 статьи-сравнения для перехвата смежного трафика (Q1 был сделан ранее)
- Q2: Osteopatia vs masaż leczniczy (`312f4ac`)
- Q3: Osteopatia vs fizjoterapia (`248b90b`)
- Q4: Osteopata vs chiropraktyk (`2ad3ccc`) — добавлена осторожная критика хиропрактики
- Q5: Osteopatia a ból szczęki / TMJ (`ba022b0`) — добавлена асимметрия лица
- Каждая: отдельная страница + FAQ entry + 5 языков
- Сайт: 11 → 16 страниц, 55 → 80 HTML

### PostHog аналитика
- EU Cloud, cookieless_mode: 'always' (без cookie-баннера)
- Инжекция через build.js (шаг 18) — только в продакшене
- Autocapture (клики, формы), pageview/pageleave, scroll depth

## Открытые задачи
- См. `TODO.md`

## Следующие шаги
- Проверить PostHog dashboard после деплоя (приходят ли данные)
- Обратные ссылки — регистрация на ZnanyLekarz, Booksy (после аналитики)
- Контент главной: объединить "5 причин" + "Почему ко мне", добавить цитаты отзывов
