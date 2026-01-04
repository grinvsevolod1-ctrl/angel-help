# Руководство по деплою Angel Help

## Содержание
1. [Vercel (Рекомендуется)](#вариант-1-vercel)
2. [Docker](#вариант-2-docker)
3. [VPS с Nginx](#вариант-3-vps-с-nginx)
4. [Переменные окружения](#переменные-окружения)
5. [Мониторинг](#мониторинг)

---

## Вариант 1: Vercel

Самый простой способ развернуть приложение.

### Шаги:

1. Создайте аккаунт на [vercel.com](https://vercel.com)
2. Импортируйте репозиторий из GitHub
3. Добавьте переменные окружения в настройках проекта
4. Нажмите Deploy

### Настройка Vercel Blob:

1. Перейдите в Storage в панели Vercel
2. Создайте новый Blob store
3. Скопируйте `BLOB_READ_WRITE_TOKEN` в переменные окружения

---

## Вариант 2: Docker

### Требования:
- Docker 20.10+
- Docker Compose 2.0+
- 2GB RAM минимум
- 10GB свободного места

### Быстрый старт:

\`\`\`bash
# Клонируйте репозиторий
git clone https://github.com/your-org/angel-help.git
cd angel-help

# Создайте файл окружения
cp .env.example .env
nano .env  # Отредактируйте переменные

# Запустите контейнеры
docker-compose up -d

# Инициализируйте базу данных
docker-compose exec app npm run db:init

# Проверьте статус
docker-compose ps
\`\`\`

### Структура сервисов:

| Сервис | Порт | Описание |
|--------|------|----------|
| app | 3000 | Next.js приложение |
| postgres | 5432 | База данных PostgreSQL |

### Команды управления:

\`\`\`bash
# Просмотр логов
docker-compose logs -f app

# Перезапуск приложения
docker-compose restart app

# Обновление до новой версии
git pull
docker-compose build
docker-compose up -d

# Остановка всех сервисов
docker-compose down

# Полная очистка (включая данные!)
docker-compose down -v
\`\`\`

### Резервное копирование:

\`\`\`bash
# Через админ-панель
# Перейдите в /admin/backup и нажмите "Создать резервную копию"

# Через API
curl -o backup.json https://your-site.com/api/backup

# PostgreSQL напрямую
docker-compose exec postgres pg_dump -U angel_help angel_help_db > backup.sql
\`\`\`

---

## Вариант 3: VPS с Nginx

### Установка на Ubuntu 22.04:

\`\`\`bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Установка PM2
sudo npm install -g pm2

# Клонирование проекта
cd /var/www
git clone https://github.com/your-org/angel-help.git
cd angel-help

# Установка зависимостей
npm ci

# Создание .env файла
cp .env.example .env
nano .env

# Сборка
npm run build

# Запуск через PM2
pm2 start npm --name "angel-help" -- start
pm2 save
pm2 startup
\`\`\`

### Конфигурация Nginx:

\`\`\`nginx
server {
    listen 80;
    server_name angel-help.org www.angel-help.org;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name angel-help.org www.angel-help.org;

    ssl_certificate /etc/letsencrypt/live/angel-help.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/angel-help.org/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

### SSL сертификат:

\`\`\`bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d angel-help.org -d www.angel-help.org
\`\`\`

---

## Переменные окружения

| Переменная | Обязательная | Описание |
|------------|--------------|----------|
| `DATABASE_URL` | Docker | URL PostgreSQL |
| `BLOB_READ_WRITE_TOKEN` | Да | Токен Vercel Blob |
| `YOOKASSA_SHOP_ID` | Да | ID магазина ЮKassa |
| `YOOKASSA_SECRET_KEY` | Да | Секретный ключ ЮKassa |
| `NEXT_PUBLIC_BASE_URL` | Рекомендуется | URL сайта |
| `SESSION_SECRET` | Рекомендуется | Секрет для сессий |

---

## Мониторинг

### Health check:

\`\`\`bash
curl https://your-site.com/api/health
\`\`\`

Ожидаемый ответ:
\`\`\`json
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
\`\`\`

### Логи:

\`\`\`bash
# Docker
docker-compose logs -f app

# PM2
pm2 logs angel-help

# Vercel
vercel logs
\`\`\`

---

## Поддержка

При возникновении проблем:
1. Проверьте логи приложения
2. Убедитесь, что все переменные окружения заданы
3. Проверьте подключение к базе данных
4. Обратитесь в поддержку: support@angel-help.org
