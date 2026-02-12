# OsteoJump

Сайт остеопата Bykava Hanna. Статический сайт на HTML/CSS/JS с мультиязычной поддержкой.

---

## Before You Start

**ОБЯЗАТЕЛЬНО прочитай нужные доки перед началом работы:**

- Написание/редактирование текстов → прочитай `docs/strategist/writing-style.md` и `docs/strategist/doctor-profile.md`
- Новая страница или секция → прочитай `docs/TECHNICAL.md`
- Работа с переводами → прочитай `docs/TRANSLATE.md`
- Работа со стилями/вёрсткой → CSS rules ниже в этом файле
- Деплой → прочитай `docs/DEPLOYMENT.md`

## Skills (slash commands)

При вызове skill'а — **СНАЧАЛА прочитай файл с инструкциями**, затем следуй им:

| Skill | Инструкции |
|-------|-----------|
| `/translate` | `docs/TRANSLATE.md` |
| `/screenshot` | `docs/SCREENSHOT.md` |

## Task Tracking

- Обсуждаем новую идею/задачу для сайта → **запиши в `TODO.md`** с датой `(YYYY-MM)`
- Задача выполнена → **перенеси из `TODO.md` в `TODO-done.md`** с датой `(YYYY-MM-DD)`
- Формат: `- [ ] Описание задачи (YYYY-MM)`, подробности — на следующей строке с отступом
- Категории в TODO.md: `## Контент`, `## Дизайн`, `## Фичи`, `## Техническое`

## General Rules

**Всегда используй MCP серверы, агентов и скилы**, если они настроены в проекте. Не делай вручную то, что можно сделать через доступные инструменты.

- **Context7** — Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
- **HugeIcons** — При поиске иконок используй MCP сервер `hugeicons` (поиск, замена, добавление иконок).

---

## Quick Reference

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

---

## Documentation Map

Полный список документации проекта:

| Документ | Назначение |
|----------|-----------|
| docs/TECHNICAL.md | Техстек, структура файлов, dev setup |
| docs/TRANSLATE.md | Инструкции для `/translate` |
| docs/SCREENSHOT.md | Инструкции для `/screenshot` |
| docs/DEPLOYMENT.md | Деплой и CI/CD |
| docs/strategist/writing-style.md | Тон, стиль, правила текстов |
| docs/strategist/doctor-profile.md | Информация о враче |
| docs/strategist/pages/ | Анализ отдельных страниц |
| docs/ABOUT.md | Целевая аудитория |
| TODO.md | Открытые задачи и идеи |
| TODO-done.md | Архив выполненных задач |

---

## Правила работы со стилями CSS

### Принцип DRY

**ВСЕГДА переиспользуй общие стили.** НЕ создавай дублирующиеся классы типа `.page-name-layout`, `.page-name-content`.

### Общие классы в style.css

```css
.section-layout                 /* grid контейнер */
.section-layout--img-left       /* картинка слева, текст справа */
.section-layout--img-right      /* текст слева, картинка справа */
.section-content                /* текстовый блок (центрирован) */
```

### Где хранить стили

- **style.css** — layout (`.section-layout`, `.section-content`, `.section-title`), респонсив для layout
- **page.css** — специфичные стили секции (padding, background, font-size), респонсив для специфичных элементов

### Новая секция — чек-лист

1. Проверь — есть ли уже похожий layout в style.css?
2. Используй общие классы `.section-layout`, `.section-content`
3. Специфичные стили (цвета, отступы) — в файле страницы

### Чередование фонов секций

Секции чередуют фон: `var(--bg-color)` (#fff) → `var(--section-bg)` (#f9fafb) → `var(--bg-color)` → ...

Hero-секция может использовать `var(--gradient-hero)`. **НЕ используй** яркие градиенты (типа `var(--gradient-cta)`) для фона целой секции.
