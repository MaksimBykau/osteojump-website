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
- [x] 65 статических HTML (13 страниц × 5 языков)
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

### 2026-02-28: Alt-теги и width/height картинок
- [x] Описательные alt-теги на всех контентных картинках (PL язык для SEO)
- [x] width/height атрибуты на всех контентных картинках (предотвращает CLS)
- [x] Страницы: index, about, prices, reviews, education, location, appointment, consultation
- [x] Декоративные иконки (footer, action bar) оставлены с alt="" (корректно по a11y)

### 2026-02-28: Оптимизация скорости загрузки
- [x] Ресайз крупных картинок до max 1600px (hero, work1-4, mother2/5, location steps)
- [x] WebP конвертация: 82 файла, 36MB → 11MB (прямая замена src, не `<picture>`)
- [x] Lazy loading: about (5), education (8), appointment (7) — картинки ниже fold
- [x] HugeIcons CSS async: preload/onload на index и prices
- [x] CI/CD: webp tools + convert step в deploy.yml

## TODO

### Высокий приоритет
- [x] **Google Business Profile** — настроен: Osteopath (primary) + Child health care centre, Women's health clinic, Alternative medicine practitioner, Massage therapist. Описание оптимизировано под локальные запросы и специализации
- [ ] **Аналитика** — подключить (для отслеживания трафика из поиска)

### Средний приоритет (контент)

#### FAQ: Остеопатия и другие методы (секция #2 на /faq)

Стратегия: перехватить трафик по смежным запросам — люди ищут массаж/мануалку/физио → попадают на FAQ → узнают про остеопатию. Каждый вопрос — отдельная статья-сравнение.

- [x] **Q1: Osteopatia vs terapia manualna** — `/osteopatia-terapia-manualna` + FAQ entry (2026-03-01)
  - Запрос: `terapia manualna warszawa` (500/мес), `rehabilitacja manualna`, `terapia osteopatyczna`
  - Отдельная страница-статья с полным SEO: title, meta, hreflang, 5 языков. Короткий FAQ entry с ссылкой на статью.

- [x] **Q2: Osteopatia vs masaż leczniczy** — `/osteopatia-masaz-leczniczy` + FAQ entry (2026-03-01)
  - Запрос: `masaż leczniczy warszawa` (500/мес), `masaż kręgosłupa warszawa`, `masaż klasyczny warszawa`
  - Отдельная страница-статья: массаж — мышцы, остеопатия — причина напряжения. USP: Hanna — сертифицированная массажистка, знает оба метода.

- [ ] **Q3: Osteopatia vs fizjoterapia**
  - Запрос: `fizjoterapia` (500/мес), `rehabilitacja manualna`, `kinezyterapia`
  - Суть: физиотерапия — широкая дисциплина (упражнения, электротерапия). Остеопатия — только руками, целостный подход. Хорошо дополняют друг друга.

- [ ] **Q4: Osteopata vs chiropraktyk (kręgarz)**
  - Запрос: `chiropraktyk warszawa`, `kręgarz warszawa`
  - Суть: хиропрактика — быстрые манипуляции ("хруст"). Остеопатия — мягкие техники без резких движений. Безопасно для детей и беременных.

- [ ] **Q5: Osteopatia a ból szczęki (TMJ)**
  - Запрос: `fizjoterapia szczękowa` (500/мес), `staw skroniowo-żuchwowy`, `ból szczęki`
  - Суть: TMJ связан с черепом, шейным отделом и краниосакральной системой. Hanna имеет краниосакральное обучение.

#### Другое

- [ ] **Обратные ссылки** — каталоги (ZnanyLekarz, Google Maps, Booksy)

### Низкий приоритет

- [ ] **Responsive images** — srcset для разных размеров экранов

## Инструменты проверки

- Google Search Console: проверка индексации, запросы
- Google Rich Results Test: валидация Schema.org
- PageSpeed Insights: скорость и Core Web Vitals
- Google Maps: карточка бизнеса
