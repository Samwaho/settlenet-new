#!/bin/sh

# Exit on error
set -e

# 1. Create necessary directories for certbot
mkdir -p certbot/www certbot/conf

# 2. Start nginx first without SSL configuration
# Create a temporary nginx config that only handles HTTP
cat > nginx/default.conf.temp << EOF
server {
    listen 80;
    server_name settlenet.co.ke www.settlenet.co.ke;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'Settlenet is being set up!';
        add_header Content-Type text/plain;
    }
}
EOF

# Use the temporary config
cp nginx/default.conf.temp nginx/default.conf

# Start nginx only
docker-compose up -d nginx

# Wait for nginx to be ready
echo "Waiting for Nginx to be ready..."
sleep 10

# 3. Run certbot for initial certificate issuance
docker-compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot \
  --email wahomesamuel2003@gmail.com --agree-tos --no-eff-email \
  -d settlenet.co.ke -d www.settlenet.co.ke

# 4. Restore the original nginx config with SSL
cat > nginx/default.conf << EOF
server {
    listen 80;
    server_name settlenet.co.ke www.settlenet.co.ke;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name settlenet.co.ke www.settlenet.co.ke;

    ssl_certificate /etc/letsencrypt/live/settlenet.co.ke/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/settlenet.co.ke/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Reload nginx to pick up new certificates
docker-compose exec nginx nginx -s reload || true

# 5. Start all services (including the app)
docker-compose up -d

echo "Setup complete! Your app should be running with SSL at https://settlenet.co.ke" 
