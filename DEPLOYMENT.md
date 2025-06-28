# 🚀 Инструкции по деплою на GitHub Pages

## Шаг 1: Создание репозитория на GitHub

1. Перейдите на [GitHub](https://github.com)
2. Нажмите кнопку **"New repository"** или **"+"** → **"New repository"**
3. Заполните форму:
   - **Repository name**: `portfolio` (или любое другое название)
   - **Description**: `Frontend Developer Portfolio`
   - **Visibility**: Public (для бесплатного GitHub Pages)
   - **Initialize this repository with**: НЕ ставьте галочки
4. Нажмите **"Create repository"**

## Шаг 2: Настройка GitHub Pages

1. В созданном репозитории перейдите в **Settings** (вкладка)
2. В левом меню найдите **Pages**
3. В разделе **Source** выберите:
   - **Deploy from a branch**
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Нажмите **Save**

## Шаг 3: Настройка GitHub Actions

1. В том же репозитории перейдите в **Settings**
2. В левом меню найдите **Actions** → **General**
3. В разделе **Workflow permissions** выберите:
   - **Read and write permissions**
4. Нажмите **Save**

## Шаг 4: Подключение локального репозитория

Выполните следующие команды в терминале:

```bash
# Добавьте удаленный репозиторий (замените USERNAME и REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Переименуйте основную ветку в main (если нужно)
git branch -M main

# Запушьте код
git push -u origin main
```

## Шаг 5: Проверка деплоя

1. Перейдите в **Actions** вкладку вашего репозитория
2. Дождитесь завершения workflow "Deploy to GitHub Pages"
3. Перейдите в **Settings** → **Pages**
4. Скопируйте URL вашего сайта (обычно `https://USERNAME.github.io/REPO_NAME`)

## 🔧 Возможные проблемы

### Ошибка "Permission denied"
- Убедитесь, что у вас есть права на запись в репозиторий
- Проверьте настройки Actions permissions

### Сайт не обновляется
- Проверьте, что workflow завершился успешно
- Подождите 5-10 минут (GitHub Pages может обновляться с задержкой)

### Ошибки сборки
- Проверьте логи в Actions
- Убедитесь, что все зависимости установлены
- Проверьте, что скрипт `build` работает локально

## 📝 Полезные команды

```bash
# Проверка статуса
git status

# Проверка удаленного репозитория
git remote -v

# Принудительный пуш (если нужно)
git push -f origin main

# Проверка веток
git branch -a
```

## 🎯 Результат

После успешного деплоя у вас будет:
- ✅ Автоматический деплой при каждом push в main
- ✅ Красивый URL вида `https://USERNAME.github.io/REPO_NAME`
- ✅ Рабочий сайт-портфолио с интерактивными диаграммами
- ✅ Адаптивный дизайн для всех устройств

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте логи в GitHub Actions
2. Убедитесь, что все настройки выполнены правильно
3. Проверьте, что репозиторий публичный
4. Подождите 10-15 минут после первого деплоя 