# SEO — OsteoJump

Стратегия поисковой оптимизации и чеклист. Обновляй при каждом изменении.

## Целевые запросы (Категория A — "специалист + город")

| Язык | Основные запросы |
|------|-----------------|
| PL | osteopata Warszawa, osteopata Ursus, osteopata dla dzieci Warszawa, osteopata ciąża |
| EN | osteopath Warsaw, pediatric osteopath Warsaw, osteopath pregnancy Warsaw |
| RU | остеопат Варшава, детский остеопат Варшава, остеопат для беременных Варшава |
| UK | остеопат Варшава, дитячий остеопат Варшава |
| DE | Osteopath Warschau, Osteopathin Warschau |

## Смежные запросы (Категория B — на будущее)

Запросы, которые можно перехватить контентом:
- masaż Warszawa → секция "остеопатия vs массаж"
- fizjoterapia Warszawa → секция "остеопатия vs физиотерапия"
- kręgarz / chiropraktyk Warszawa → мягкая альтернатива
- ból pleców / szyi / głowy → проблемы, с которыми помогает остеопатия
- kolki u niemowlaka → остеопатия при коликах

## Сделано

### 2026-02-28: SSG + мультиязычность
- [x] 55 статических HTML (11 страниц × 5 языков)
- [x] Каждый язык имеет свой URL: `/` (PL), `/en/`, `/ru/`, `/uk/`, `/de/`
- [x] hreflang теги для всех языковых версий + x-default
- [x] canonical теги
- [x] Sitemap.xml с 55 URL и xhtml:link hreflang
- [x] robots.txt с ссылкой на sitemap
- [x] Sitemap отправлен в Google Search Console (55 URL приняты)

### 2026-02-28: Мета-теги и Schema.org
- [x] Мета-теги оптимизированы под запросы категории A (specialist + city + trust signals)
- [x] Schema.org MedicalBusiness на главной: aggregateRating (5.0, 150+), areaServed, offers с ценами
- [x] FAQPage schema на /faq — ~30 вопросов/ответов, генерируется на языке страницы
- [x] Кастомная 404.html с навигацией
- [x] Исправлено дублирование H1 (логотип h1 → span на всех страницах)

## TODO

### Высокий приоритет

- [ ] **Alt-теги картинок** — 84 картинки, многие с `alt=""`. Добавить описательные alt на всех страницах
- [ ] **width/height картинок** — предотвращает CLS (Cumulative Layout Shift)
- [ ] **Google Business Profile** — убедиться что ссылка на сайт osteojump.pl, категория "Osteopata"

### Средний приоритет

- [ ] **WebP конвертация** — 84 JPG/PNG (36MB). Конвертировать в WebP с `<picture>` fallback
- [ ] **HugeIcons CSS async** — грузится render-blocking, перевести на async загрузку
- [ ] **Lazy loading** — расширить `loading="lazy"` на все картинки ниже fold
- [ ] **Аналитика** — подключить (для отслеживания трафика из поиска)

### Низкий приоритет (контент)

- [ ] **Контент под смежные запросы** (Категория B) — секции на странице /osteopathy или отдельные страницы
- [ ] **Responsive images** — srcset для разных размеров экранов
- [ ] **Обратные ссылки** — каталоги (ZnanyLekarz, Google Maps, Booksy)

## Инструменты проверки

- Google Search Console: проверка индексации, запросы
- Google Rich Results Test: валидация Schema.org
- PageSpeed Insights: скорость и Core Web Vitals
- Google Maps: карточка бизнеса
