# OsteoJump

Сайт остеопата Bykava Hanna. Статический сайт на HTML/CSS/JS с мультиязычной поддержкой.

---

## Documentation Map

### Start Here

| Документ | Назначение | Когда читать |
|----------|-----------|-------------|
| CLAUDE.md | Правила проекта, CSS, quick reference | **Всегда** (читается автоматически) |
| docs/TECHNICAL.md | Техстек, структура файлов, dev setup | Перед первой задачей |

### Разработка

| Задача | Что читать |
|--------|-----------|
| Стили / CSS | CSS rules ниже в этом файле |
| Добавление/изменение страниц | docs/TECHNICAL.md |
| Переводы / `/translate` | docs/TRANSLATE.md |
| Скриншоты / `/screenshot` | docs/SCREENSHOT.md |
| Деплой | docs/DEPLOYMENT.md |

### Контент и стратегия

| Задача | Что читать |
|--------|-----------|
| Написание текстов | docs/strategist/writing-style.md |
| Информация о враче | docs/strategist/doctor-profile.md |
| Анализ страниц | docs/strategist/pages/ |
| Целевая аудитория | docs/ABOUT.md |
| Бэклог идей | TODO.md |

---

## General Rules

### MCP серверы

**Всегда используй MCP серверы, агентов и скилы**, если они настроены в проекте. Не делай вручную то, что можно сделать через доступные инструменты (HugeIcons для иконок, Context7 для документации, `/screenshot` для скриншотов, `/translate` для переводов и т.д.).

- **Context7** — Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
- **HugeIcons** — При поиске иконок для сайта используй MCP сервер `hugeicons` (нужна новая иконка, замена существующей, поиск по ключевому слову).

---

## Project Quick Reference

### Страницы

| Путь | Название |
|------|----------|
| `/` | Главная |
| `/about` | Обо мне |
| `/prices` | Цены |
| `/reviews` | Отзывы |
| `/faq` | Вопросы |
| `/education` | Образование |
| `/location` | Как добраться |

### Структура проекта

```
/locales/          - Переводы (JSON: en, ru, pl, uk, de)
/css/              - Стили
/js/               - Скрипты
/images/           - Изображения
```

### Команды

```bash
make server        # Запустить локальный сервер (порт 8000)
make stop          # Остановить сервер
make thumbnails    # Сгенерировать превью для дипломов
```

### Подарочные сертификаты

- Платформа: https://cert.osteojump.pl/
- Упоминается: секция на странице `/prices`, ответ в FAQ `/faq#gift-certificate`
- Ключи переводов: `prices.gift_certificate.*`, `faq.gift_certificate_answer`, `faq.gift_certificate_link`

---

## Правила работы со стилями CSS

### Принцип DRY (Don't Repeat Yourself)

**ВСЕГДА переиспользуй общие стили** вместо создания дублирующихся классов для разных страниц/секций.

### Общие классы в style.css

Используй эти классы для секций с изображением + текстом:

```css
/* Базовый layout */
.section-layout                 /* grid контейнер */
.section-layout--img-left       /* картинка слева, текст справа */
.section-layout--img-right      /* текст слева, картинка справа */
.section-content                /* текстовый блок (центрирован) */
```

### Пример использования в HTML

```html
<section class="about-motivation">
    <div class="container">
        <h2 class="section-title">Заголовок</h2>
        <div class="section-layout section-layout--img-left">
            <div class="photo-wrapper">
                <img src="..." class="photo-img">
            </div>
            <div class="section-content">
                <p>Текст...</p>
            </div>
        </div>
    </div>
</section>
```

### Чек-лист при добавлении новых секций

1. **Проверь** — есть ли уже похожий layout в style.css?
2. **Используй** общие классы `.section-layout`, `.section-content`
3. **Не создавай** новые классы типа `.page-name-layout`, `.page-name-content`
4. **Специфичные стили** (цвета, отступы секции) — в файле страницы
5. **Layout и выравнивание** — в style.css

### Что хранить где

| style.css (общее) | page.css (специфичное) |
|-------------------|------------------------|
| `.section-layout` | `.about-hero` (padding, background) |
| `.section-content` | `.motivation-text p` (font-size) |
| `.section-title` | `.journey-collage` (специфичный коллаж) |
| Респонсив для layout | Респонсив для специфичных элементов |

### Чередование фонов секций

Секции на каждой странице **чередуют фон** для визуального ритма:

- `var(--bg-color)` (#ffffff) — белый фон
- `var(--section-bg)` (#f9fafb) — светло-серый фон

**Правило:** каждая следующая секция использует противоположный фон. Hero-секция может использовать `var(--gradient-hero)`.

**Примеры (главная, обо мне, отзывы):**
```
Hero        → var(--gradient-hero)
Section 1   → var(--bg-color)
Section 2   → var(--section-bg)
Section 3   → var(--bg-color)
Section 4   → var(--section-bg)
...
```

**Не используй** яркие/насыщенные градиенты (типа `var(--gradient-cta)`) для фона целой секции — они слишком давящие.

### Отладка стилей

Для проверки применения стилей временно добавляй `background: red;` к общему классу в style.css — если стиль переиспользуется правильно, все элементы станут красными.
