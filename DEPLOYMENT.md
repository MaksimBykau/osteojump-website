# Инструкция по деплою и настройке домена

Это руководство поможет вам настроить автоматический деплой сайта на GitHub Pages и подключить кастомный домен `osteojump.pl`.

## Шаг 1: Создание GitHub репозитория

1. Перейдите на [GitHub](https://github.com) и войдите в свой аккаунт
2. Нажмите кнопку "New" или "+" в правом верхнем углу
3. Заполните форму:
   - **Repository name**: `osteojump` (или любое другое имя)
   - **Description**: "Static landing page with i18n support"
   - **Visibility**: Public (для бесплатного GitHub Pages) или Private (требует GitHub Pro)
   - **НЕ** добавляйте README, .gitignore или лицензию (они уже есть в проекте)
4. Нажмите "Create repository"

## Шаг 2: Подключение локального репозитория к GitHub

Выполните следующие команды в терминале (замените `your-username` на ваш GitHub username):

```bash
cd /Users/maxbykov/Documents/projects/web/osteojump

# Добавьте удаленный репозиторий
git remote add origin https://github.com/your-username/osteojump.git

# Запушьте код в GitHub
git push -u origin main
```

Если вы используете SSH:

```bash
git remote add origin git@github.com:your-username/osteojump.git
git push -u origin main
```

## Шаг 3: Настройка GitHub Pages

1. Перейдите в настройки репозитория: `Settings` → `Pages`
2. В разделе **Source** выберите:
   - **Source**: `GitHub Actions`
3. Сохраните изменения

## Шаг 4: Настройка кастомного домена

1. В том же разделе `Settings` → `Pages` найдите поле **Custom domain**
2. Введите ваш домен: `osteojump.pl`
3. Нажмите `Save`
4. GitHub автоматически создаст файл `CNAME` в корне репозитория

## Шаг 5: Настройка DNS

Вам нужно настроить DNS записи у вашего регистратора домена. Есть два варианта:

### Вариант A: Использование поддомена (www.osteojump.pl)

1. Войдите в панель управления вашего регистратора домена
2. Найдите раздел DNS настроек
3. Добавьте CNAME запись:
   - **Тип**: CNAME
   - **Имя**: `www`
   - **Значение**: `your-username.github.io` (замените на ваш GitHub username)
   - **TTL**: 3600 (или значение по умолчанию)

### Вариант B: Использование apex домена (osteojump.pl)

Для apex домена (без www) GitHub Pages требует A записи вместо CNAME.

1. Добавьте следующие A записи:
   - **Тип**: A
   - **Имя**: `@` (или оставьте пустым)
   - **Значение**: `185.199.108.153`
   - **TTL**: 3600

   Повторите для всех IP адресов GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

2. (Опционально) Добавьте CNAME для www поддомена:
   - **Тип**: CNAME
   - **Имя**: `www`
   - **Значение**: `your-username.github.io`

### Проверка DNS настроек

После настройки DNS вы можете проверить записи с помощью команды:

```bash
# Для CNAME записи
dig www.osteojump.pl CNAME

# Для A записей
dig osteojump.pl A
```

## Шаг 6: Включение HTTPS

1. После того как DNS записи применятся (обычно несколько минут, максимум 48 часов)
2. Вернитесь в `Settings` → `Pages`
3. Убедитесь, что опция **Enforce HTTPS** включена
4. GitHub автоматически создаст SSL сертификат через Let's Encrypt

## Шаг 7: Проверка деплоя

1. После первого push в ветку `main` перейдите на вкладку `Actions` в вашем репозитории
2. Вы должны увидеть запущенный workflow "Deploy to GitHub Pages"
3. Дождитесь завершения (обычно 1-2 минуты)
4. После успешного деплоя сайт будет доступен по адресу:
   - `https://your-username.github.io/osteojump` (до настройки DNS)
   - `https://osteojump.pl` (после настройки DNS)

## Автоматический деплой

После настройки каждый коммит в ветку `main` будет автоматически запускать деплой:

```bash
# Внесите изменения в код
git add .
git commit -m "Update content"
git push origin main
```

Workflow автоматически:
1. Проверит код
2. Задеплоит на GitHub Pages
3. Обновит сайт на домене

## Устранение проблем

### DNS не работает

- Убедитесь, что прошло достаточно времени (до 48 часов)
- Проверьте правильность DNS записей с помощью `dig` или онлайн инструментов
- Убедитесь, что домен правильно указан в настройках GitHub Pages

### GitHub Actions не запускается

- Проверьте, что workflow файл находится в `.github/workflows/deploy.yml`
- Убедитесь, что коммит был сделан в ветку `main`
- Проверьте вкладку `Actions` на наличие ошибок

### HTTPS не работает

- Убедитесь, что DNS записи применены
- Проверьте, что домен указан в настройках GitHub Pages
- Подождите несколько минут для создания SSL сертификата

## Дополнительные ресурсы

- [GitHub Pages документация](https://docs.github.com/en/pages)
- [Настройка кастомного домена](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Actions документация](https://docs.github.com/en/actions)






