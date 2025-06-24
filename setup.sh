#!/bin/sh

# Exit on error
set -e

# 1. Create necessary directories for certbot
mkdir -p certbot/www certbot/conf

# 2. Build and start app and nginx (detached)
docker-compose up -d app nginx

echo "Waiting for Nginx to be ready..."
sleep 10

# 3. Run certbot for initial certificate issuance (replace email if needed)
docker-compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot --email your-email@example.com --agree-tos --no-eff-email -d settlenet.co.ke -d www.settlenet.co.ke

# 4. Reload nginx to pick up new certificates
docker-compose exec nginx nginx -s reload || true

# 5. Start all services (including certbot renewal)
docker-compose up -d

echo "Setup complete! Your app should be running with SSL at https://settlenet.co.ke" 