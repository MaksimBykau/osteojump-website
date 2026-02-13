# OsteoJump

Сайт остеопата Bykava Hanna. Статический сайт на HTML/CSS/JS с мультиязычной поддержкой.

---

## Before You Start

**ОБЯЗАТЕЛЬНО прочитай нужные доки перед началом работы:**

- Написание/редактирование текстов → прочитай `docs/strategist/writing-style.md` и `docs/strategist/doctor-profile.md`
- Новая страница или секция → прочитай `docs/TECHNICAL.md` (включая Page Map), **после — обнови Page Map**
- Работа с переводами → прочитай `docs/TRANSLATE.md`
- Работа со стилями/вёрсткой → CSS rules ниже в этом файле
- Деплой → прочитай `docs/DEPLOYMENT.md`
- Анализ конкретной страницы → смотри `docs/strategist/pages/`
- Целевая аудитория → прочитай `docs/ABOUT.md`

## Skills (slash commands)

При вызове skill'а — **СНАЧАЛА прочитай файл с инструкциями**, затем следуй им:

| Skill | Инструкции |
|-------|-----------|
| `/translate` | `docs/TRANSLATE.md` |
| `/screenshot` | `docs/SCREENSHOT.md` |

## Task Tracking

- Обсуждаем новую идею/задачу для сайта → **запиши в `TODO.md`** с датой `(YYYY-MM)`
- Задача выполнена → **перенеси из `TODO.md` в `TODO-done.md`** с датой `(YYYY-MM-DD)`
- Приняли важное решение (выбор подхода, отказ от варианта) → **допиши в `docs/DECISIONS.md`**
- Формат TODO: `- [ ] Описание задачи (YYYY-MM)`, подробности — на следующей строке с отступом
- Категории в TODO.md: `## Контент`, `## Дизайн`, `## Фичи`, `## Техническое`

## General Rules

**Всегда используй MCP серверы, агентов и скилы**, если они настроены в проекте. Не делай вручную то, что можно сделать через доступные инструменты.

- **Context7** — Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
- **HugeIcons** — При поиске иконок используй MCP сервер `hugeicons` (поиск, замена, добавление иконок).
- **Субагенты** — для `/translate check`, простого поиска и исследования кода используй `model: haiku` (дешевле в 10-15x).

---

## Quick Reference

### Страницы и файлы

Полный маппинг страниц → HTML, CSS, ключи переводов: **см. Page Map в `docs/TECHNICAL.md`**

### Команды

```bash
make server        # Запустить локальный сервер (порт 8000)
make stop          # Остановить сервер
make thumbnails    # Сгенерировать превью для дипломов
make css-vars      # Список всех CSS переменных (вместо чтения style.css)
make locale-keys   # Структура ключей переводов (вместо чтения JSON)
```

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

### Новая секция — чек-лист

1. Проверь — есть ли уже похожий layout в style.css?
2. Используй общие классы `.section-layout`, `.section-content`
3. Layout и респонсив → в `style.css`. Специфичные стили (цвета, отступы, font-size) → в `{page}.css`

### Чередование фонов секций

Секции чередуют фон: `var(--bg-color)` (#fff) → `var(--section-bg)` (#f9fafb) → `var(--bg-color)` → ...

Hero-секция может использовать `var(--gradient-hero)`. **НЕ используй** яркие градиенты (типа `var(--gradient-cta)`) для фона целой секции.
