# Техническая документация OsteoJump

## Технологии

- HTML5
- CSS3 (Grid, Flexbox, Media Queries)
- Vanilla JavaScript
- GitHub Pages для хостинга
- GitHub Actions для CI/CD
- PostHog аналитика (EU Cloud, cookieless)

## Структура проекта

```
osteojump/
├── index.html              # Главная страница (источник для SSG)
├── {page}/index.html       # Подстраницы (about, prices, faq, ...)
├── css/
│   ├── style.css           # Общие стили (layout, nav, footer, responsive)
│   └── {page}.css          # Стили конкретной страницы
├── js/
│   ├── i18n.js             # Логика переключения языков (локальная разработка)
│   ├── i18n-static.js      # Облегчённый i18n для SSG-страниц
│   └── main.js             # Основная логика
├── locales/                # Переводы (en, ru, pl, uk, de)
├── scripts/
│   ├── build.js            # SSG build-скрипт (Node.js + cheerio)
│   ├── meta.js             # Мета-описания для всех страниц × языков
│   └── package.json        # Зависимости (cheerio)
├── dist/                   # Сгенерированный сайт (gitignored)
└── .github/workflows/      # CI/CD (билд + деплой из dist/)
```

Полный маппинг страниц на файлы — см. **Page Map** ниже.

## Static Site Generation (SSG)

Build-скрипт генерирует 80 статических HTML (16 страниц × 5 языков):

```
/                    → Польский (дефолт, без префикса)
/about, /prices...   → Польский
/en/                 → English
/en/about, /en/prices...
/ru/, /uk/, /de/     → Аналогично
```

```bash
make build           # Генерирует dist/ (80 HTML + ассеты + sitemap)
make serve-dist      # Тестовый сервер на порту 8001
```

Что делает build.js для каждой страницы × языка:
- Заполняет `[data-i18n]` / `[data-i18n-html]` текстом из JSON
- Устанавливает `<html lang>`, `<title>`, meta description, og:tags
- Генерирует hreflang и canonical теги
- Перезаписывает внутренние ссылки (`/about` → `/en/about`)
- Нормализует относительные пути (`../css/` → `/css/`)
- Заменяет `i18n.js` → `i18n-static.js`
- Удаляет inline "Quick language detection" скрипт
- Добавляет `data-static-href` для навигации переключателя языков
- Инжектит PostHog аналитику (cookieless, GDPR-compliant)

## Локальная разработка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/osteojump.git
cd osteojump
```

2. Запустите локальный сервер:
```bash
# Рекомендуемый способ - с поддержкой clean URLs
make server

# Или напрямую через Python скрипт
python3 server.py

# Или простой HTTP сервер (без поддержки clean URLs)
make server-simple
# или
python3 -m http.server 8000
```

3. Откройте в браузере: `http://localhost:8000`

### Дополнительные команды

```bash
# Показать все доступные команды
make help

# Создать превьюшки для дипломов (оптимизация изображений)
make thumbnails

# Удалить созданные превьюшки
make clean
```

## Добавление нового языка

1. Создайте новый JSON файл в папке `locales/` (например, `fr.json`)
2. Скопируйте структуру из существующего файла и переведите содержимое
3. Добавьте кнопку переключения языка в `index.html`:
```html
<button class="lang-btn" data-lang="fr">FR</button>
```
4. Добавьте код языка в массив `supportedLangs` в `js/i18n.js`

## Page Map

При создании/изменении страницы — **обнови эту таблицу**.

| Страница | HTML | CSS | Ключи переводов |
|----------|------|-----|-----------------|
| `/` | `index.html` | `css/style.css` | `hero.*`, `features.*`, `landing.*`, `doctor.*` |
| `/about` | `about/index.html` | `css/about.css` | `about_page.*` |
| `/prices` | `prices/index.html` | `css/prices.css` | `prices.*` |
| `/reviews` | `reviews/index.html` | `css/reviews.css` | `reviews.*` |
| `/faq` | `faq/index.html` | `css/faq.css` | `faq.*` |
| `/education` | `education/index.html` | `css/education.css` | `education.*` |
| `/location` | `location/index.html` | `css/location.css` | `location.*` |
| `/contacts` | `contacts/index.html` | `css/contacts.css` | `contacts_page.*` |
| `/osteopathy` | `osteopathy/index.html` | `css/osteopathy.css` | `osteopathy_page.*` |
| `/consultation` | `consultation/index.html` | `css/consultation.css` | `consultation_page.*` |
| `/appointment` | `appointment/index.html` | `css/appointment.css` | `appointment_page.*` |
| `/osteopatia-terapia-manualna` | `osteopatia-terapia-manualna/index.html` | `css/article.css` | `article_osteo_manual.*` |
| `/osteopatia-masaz-leczniczy` | `osteopatia-masaz-leczniczy/index.html` | `css/article.css` | `article_osteo_massage.*` |
| `/osteopatia-fizjoterapia` | `osteopatia-fizjoterapia/index.html` | `css/article.css` | `article_osteo_physio.*` |
| `/osteopatia-chiropraktyka` | `osteopatia-chiropraktyka/index.html` | `css/article.css` | `article_osteo_chiro.*` |
| `/osteopatia-bol-szczeki-stawu-skroniowo-zuchwowego` | `osteopatia-bol-szczeki-stawu-skroniowo-zuchwowego/index.html` | `css/article.css` | `article_osteo_tmj.*` |

Общие ключи (все страницы): `nav.*`, `footer.*`, `action_bar.*`, `contacts.*`, `map.*`

Общие стили (все страницы): `css/style.css` (3793 строк) — layout, nav, footer, responsive

## Подарочные сертификаты

- Платформа: https://cert.osteojump.pl/
- Упоминается: секция на странице `/prices`, ответ в FAQ `/faq#gift-certificate`
- Ключи переводов: `prices.gift_certificate.*`, `faq.gift_certificate_answer`, `faq.gift_certificate_link`

## Деплой

Подробные инструкции по настройке деплоя и подключению кастомного домена см. в [DEPLOYMENT.md](DEPLOYMENT.md).
