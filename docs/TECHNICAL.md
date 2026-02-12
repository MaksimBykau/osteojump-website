# Техническая документация OsteoJump

## Технологии

- HTML5
- CSS3 (Grid, Flexbox, Media Queries)
- Vanilla JavaScript
- GitHub Pages для хостинга
- GitHub Actions для CI/CD

## Структура проекта

```
osteojump/
├── index.html          # Главная страница
├── css/
│   └── style.css      # Стили с адаптивной версткой
├── js/
│   ├── i18n.js        # Логика переключения языков
│   └── main.js        # Основная логика приложения
├── locales/           # JSON файлы с переводами
│   ├── ru.json
│   ├── en.json
│   ├── de.json
│   ├── pl.json
│   └── uk.json
└── .github/
    └── workflows/
        └── deploy.yml # GitHub Actions workflow
```

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

Общие ключи (все страницы): `nav.*`, `footer.*`, `action_bar.*`, `contacts.*`, `map.*`

Общие стили (все страницы): `css/style.css` (3793 строк) — layout, nav, footer, responsive

## Подарочные сертификаты

- Платформа: https://cert.osteojump.pl/
- Упоминается: секция на странице `/prices`, ответ в FAQ `/faq#gift-certificate`
- Ключи переводов: `prices.gift_certificate.*`, `faq.gift_certificate_answer`, `faq.gift_certificate_link`

## Деплой

Подробные инструкции по настройке деплоя и подключению кастомного домена см. в [DEPLOYMENT.md](DEPLOYMENT.md).
