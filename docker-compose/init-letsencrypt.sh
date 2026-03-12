#!/usr/bin/env bash
set -euo pipefail

# --- НАСТРОЙКИ ---
email="${CERTBOT_EMAIL:-rourory@yandex.com}"
rsa_key_size=4096
data_path="./certbot"
nginx_path="./nginx"
# домены (первый домен в списке будет именем директории с сертификатом)
domains_1=(sktransfer.by www.sktransfer.by)
domains_2=(sktransfer.ru www.sktransfer.ru)
# -----------------

if ! command -v docker >/dev/null 2>&1 || ! docker compose version >/dev/null 2>&1; then
  echo "Error: docker and docker compose must be installed and accessible." >&2
  exit 1
fi

echo "### Подготовка директорий..."
mkdir -p "$nginx_path"
mkdir -p "$data_path/conf" "$data_path/www"

echo "### Скачивание параметров TLS (если ещё не скачаны)..."
if [ ! -f "$data_path/conf/options-ssl-nginx.conf" ]; then
  curl -sSf https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf -o "$data_path/conf/options-ssl-nginx.conf"
fi
if [ ! -f "$data_path/conf/ssl-dhparams.pem" ]; then
  curl -sSf https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem -o "$data_path/conf/ssl-dhparams.pem"
fi

# Резервные копии старых сертификатов (если есть) — НЕ удаляем без причины
if [ -d "$data_path/conf/live" ]; then
  echo "### Резервная копия текущих certs -> $data_path/backup_$(date +%s)"
  mkdir -p "$data_path/backup_$(date +%s)"
  cp -r "$data_path/conf/live" "$data_path/backup_$(date +%s)/live" || true
fi

# ----------------------------------------------------------------
# ШАГ 1: Временная HTTP-конфигурация nginx (только для /.well-known)
# ----------------------------------------------------------------
echo "### Создание временной конфигурации Nginx (HTTP only)..."
cat > "$nginx_path/default.conf" <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name _;

    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Можно вернуть 404 для остальных URL, или редиректить как нужно:
    location / {
        return 404;
    }
}
EOF

echo "### Поднимаем nginx (только nginx должен быть запущен для проверки challenge)..."
# Поднимем nginx (и зависимости, но мы ожидаем что остальные могут не запускаться)
docker compose up -d nginx

echo "### Ждём пока nginx начнёт отвечать на порт 80..."
# ждём доступности порта 80 на localhost
max_retries=30
i=0
while :; do
  if curl -sS http://localhost >/dev/null 2>&1; then
    echo "nginx отвечает на localhost:80"
    break
  fi
  i=$((i+1))
  if [ "$i" -ge "$max_retries" ]; then
    echo "Timeout: nginx не отвечает на порт 80. Проверь docker compose logs nginx." >&2
    docker compose logs --tail 200 nginx || true
    exit 1
  fi
  sleep 2
done

# ----------------------------------------------------------------
# ШАГ 2: функция запроса сертификата через certbot (webroot)
# ----------------------------------------------------------------
request_cert() {
  local -n doms=$1    # передаём имя массива
  local domain_args=""
  for d in "${doms[@]}"; do
    domain_args="$domain_args -d $d"
  done

  if [ -z "$email" ]; then
    email_arg="--register-unsafely-without-email"
  else
    email_arg="-m $email"
  fi

  echo "### Запрашиваем сертификаты для: ${doms[*]} ..."
  docker compose run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
      $email_arg \
      $domain_args \
      --rsa-key-size $rsa_key_size \
      --agree-tos \
      --non-interactive" certbot
}

# Запрашиваем сертификаты (если DNS указывает на этот сервер!)
request_cert domains_1
request_cert domains_2

# ----------------------------------------------------------------
# ШАГ 3: Создаём боевую конфигурацию nginx (HTTP + HTTPS) и перезапускаем nginx
# ----------------------------------------------------------------
echo "### Создание боевой конфигурации Nginx (с SSL)..."

d1=${domains_1[0]}
d2=${domains_2[0]}

cat > "$nginx_path/default.conf" <<EOF
# --- Upstreams ---
upstream nextjs_upstream {
    server nextjs-app:3000;
}
upstream pgadmin_upstream {
    server pgadmin:80;
}

# --- HTTP (redirect to HTTPS) ---
server {
    listen 80;
    listen [::]:80;
    server_name ${domains_1[*]};
    server_tokens off;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://\$host\$request_uri; }
}

server {
    listen 80;
    listen [::]:80;
    server_name ${domains_2[*]};
    server_tokens off;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://\$host\$request_uri; }
}

# --- HTTPS: ${d1} ---
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name ${domains_1[*]};
    server_tokens off;

    ssl_certificate /etc/letsencrypt/live/${d1}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${d1}/privkey.pem;
    
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://nextjs_upstream;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /db/ {
        proxy_pass http://pgadmin_upstream/;
        proxy_set_header X-Script-Name /db;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_redirect off;
    }
}

# --- HTTPS: ${d2} ---
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name ${domains_2[*]};
    server_tokens off;

    ssl_certificate /etc/letsencrypt/live/${d2}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${d2}/privkey.pem;
    
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://nextjs_upstream;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

echo "### Перезапускаем nginx (применяем SSL конфиг)..."
# Если nginx уже запущен в контейнере — reload; на всякий случай делаем restart
docker compose restart nginx
sleep 2
docker compose exec nginx nginx -s reload || true

echo "### Готово!"
echo "1. https://${d1}"
echo "2. https://${d2}"