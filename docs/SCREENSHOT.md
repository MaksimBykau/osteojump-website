# /screenshot - Screenshot Agent (Субагент)

Субагент для создания скриншотов сайта. Запускается через Task tool в фоновом режиме.

### Почему субагент?

- **Не занимает контекст** - скриншоты возвращают много данных
- **Работает в фоне** - можно продолжать работу
- **Параллельность** - для больших аудитов (35+ скриншотов)

### Как запускать

При вызове `/screenshot` используй **Task tool**:

```
Task(
  subagent_type="general-purpose",
  run_in_background=true,  // для audit
  prompt="<промпт с параметрами из секции ниже>"
)
```

### Промпт для субагента

Передавай субагенту этот промпт, подставляя параметры:

#### Размеры экранов

Breakpoints в CSS:
- `575px` - малые мобильные устройства
- `767px` - граница mobile/tablet
- `1200px` - max-width контейнера

| ID | Устройство | Ширина | Высота | Описание |
|----|------------|--------|--------|----------|
| `mobile-min` | Mobile | 320 | 568 | Минимальный (iPhone SE) |
| `tablet-min` | Tablet | 768 | 1024 | Минимальный (iPad portrait) |
| `desktop-narrow` | Desktop | 1024 | 768 | Узкий (небольшой ноутбук) |
| `desktop-medium` | Desktop | 1280 | 800 | Средний (стандартный ноутбук) |
| `desktop-wide` | Desktop | 1920 | 1080 | Широкий (Full HD монитор) |

**Критические точки для проверки:**
- `320px` - минимальная ширина, всё должно помещаться
- `768px` - переключение на tablet layout
- `1024px` - узкий desktop, контент не должен быть сжатым
- `1200px` - контейнер достигает max-width
- `1920px` - широкий экран, контент центрирован

#### Страницы сайта

Полный список страниц с файлами: **см. Page Map в `docs/TECHNICAL.md`**

#### Языки

Переключение языка через URL параметр или localStorage:
- `?lang=en` - английский
- `?lang=ru` - русский
- `?lang=pl` - польский
- `?lang=uk` - украинский
- `?lang=de` - немецкий

### Структура папок для скриншотов

Скриншоты сохраняются с версионированием для сравнения:

```
.screenshots/
  YYYY-MM-DD_NNN/           # дата + номер сессии
    home-mobile-min.png
    home-tablet-min.png
    home-desktop-narrow.png
    home-desktop-medium.png
    home-desktop-wide.png
    about-mobile-min.png
    ...
  2024-01-13_001/           # первая сессия 13 января
  2024-01-13_002/           # вторая сессия 13 января
  2024-01-14_001/           # первая сессия 14 января
```

**Правила именования:**
- Папка: `YYYY-MM-DD_NNN` где NNN - порядковый номер сессии за день (001, 002, ...)
- Файл: `<page>-<device-id>.png` (например `home-mobile-min.png`, `about-desktop-wide.png`)
- Для страницы `/` использовать имя `home`
- Для вложенных страниц убирать слэш: `/about` → `about`

**Перед созданием скриншотов:**
1. Проверь последнюю папку в `.screenshots/`
2. Определи следующий номер сессии для текущей даты
3. Создай новую папку: `mkdir -p .screenshots/YYYY-MM-DD_NNN`

**После создания скриншотов:**
Playwright MCP сохраняет в `.playwright-mcp/`. Скопируй в версионированную папку:
```bash
cp .playwright-mcp/home-*.png .screenshots/YYYY-MM-DD_NNN/
```

### Команды и шаблоны промптов

#### /screenshot <page> [device-id] — одна страница

```
/screenshot /about mobile-min
```

**Запуск:** `Task(subagent_type="general-purpose", prompt=<промпт ниже>)`

**Промпт:**
```
Сделай скриншот страницы {PAGE} на размере {DEVICE_ID}.

Размер: {WIDTH}x{HEIGHT}
URL: http://localhost:8000{PAGE}
Имя файла: {PAGE_NAME}-{DEVICE_ID}.png

Шаги:
1. browser_navigate на URL
2. browser_resize на {WIDTH}x{HEIGHT}
3. browser_wait_for time=1
4. browser_take_screenshot с именем файла

Верни путь к скриншоту.
```

---

#### /screenshot <page> all — все размеры

```
/screenshot /about all
```

**Запуск:** `Task(subagent_type="general-purpose", prompt=<промпт ниже>)`

**Промпт:**
```
Сделай скриншоты страницы {PAGE} на всех размерах.

URL: http://localhost:8000{PAGE}
Имя файла: {PAGE_NAME}

Размеры:
| ID | Ширина | Высота |
| mobile-min | 320 | 568 |
| tablet-min | 768 | 1024 |
| desktop-narrow | 1024 | 768 |
| desktop-medium | 1280 | 800 |
| desktop-wide | 1920 | 1080 |

Для каждого размера:
1. browser_resize
2. browser_wait_for time=1
3. browser_take_screenshot как {PAGE_NAME}-{SIZE_ID}.png

Верни список созданных файлов.
```

---

#### /screenshot audit — полный аудит (в фоне)

```
/screenshot audit
```

**Запуск:** `Task(subagent_type="general-purpose", run_in_background=true, prompt=<промпт ниже>)`

**Промпт:**
```
Сделай полный аудит скриншотов для сайта OsteoJump.

Страницы (7 штук):
- / → home
- /about → about
- /prices → prices
- /reviews → reviews
- /faq → faq
- /education → education
- /location → location

Размеры (5 штук):
| ID | Ширина | Высота |
| mobile-min | 320 | 568 |
| tablet-min | 768 | 1024 |
| desktop-narrow | 1024 | 768 |
| desktop-medium | 1280 | 800 |
| desktop-wide | 1920 | 1080 |

Для каждой страницы, для каждого размера:
1. browser_navigate на http://localhost:8000{путь}
2. browser_resize
3. browser_wait_for time=1
4. browser_take_screenshot как {page}-{size}.png

В конце выведи:
- Сколько скриншотов создано
- Список файлов
- Были ли проблемы
```

---

#### /screenshot <page> --full — полная страница

**Промпт (добавить к любому):**
```
Используй fullPage: true в browser_take_screenshot
```

### Примеры использования

```
/screenshot /
→ Скриншот главной страницы (desktop-medium, 1280×800)

/screenshot /location mobile-min
→ Минимальный мобильный скриншот (320×568) страницы "Как добраться"

/screenshot /about all
→ 5 скриншотов страницы "Обо мне" на всех размерах

/screenshot / mobile-min all-langs
→ 5 мобильных скриншотов главной на всех языках

/screenshot audit
→ Полный аудит: 7 страниц × 5 размеров = 35 скриншотов

/screenshot /education desktop-wide --full
→ Полная страница "Образование" на широком экране (1920×1080)
```

### Чек-лист проверки responsive

При запуске `/screenshot <page> all` проверяй:

**mobile-min (320px):**
- [ ] Весь текст читаем, не обрезан
- [ ] Кнопки достаточного размера для нажатия
- [ ] Нет горизонтальной прокрутки
- [ ] Меню скрыто в hamburger

**tablet-min (768px):**
- [ ] Layout переключился на tablet
- [ ] Изображения масштабируются корректно
- [ ] Отступы адекватные

**desktop-narrow (1024px):**
- [ ] Контент не сжат
- [ ] Навигация полностью видна
- [ ] Карточки/колонки правильно расположены

**desktop-medium (1280px):**
- [ ] Стандартный вид, без проблем

**desktop-wide (1920px):**
- [ ] Контент центрирован (max-width: 1200px)
- [ ] Нет растянутых элементов
- [ ] Фон заполняет пространство
