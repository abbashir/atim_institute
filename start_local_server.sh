#!/bin/bash
# Start development environment for KAYi (cross-platform, full rebuild)

set -e

# Full rebuild: stop, remove, clean, and rebuild everything
echo "🛑 Stopping and removing containers, volumes, and orphans..."
docker compose down --volumes --remove-orphans

echo "🧹 Removing stopped containers..."
docker compose rm --stop --force

echo "🗑️  Removing all dangling images..."
docker rmi $(docker images -q) || true

echo "🔨 Building images with no cache..."
docker compose build --no-cache

echo "🚀 Starting containers..."
docker compose up -d

echo "🚀 Starting KAYi Laravel Application in Development Mode..."

# Start Docker containers
echo "📦 Starting Docker containers..."
docker compose -f docker-compose.yml up -d

# Always copy .env.example to .env if .env does not exist (before any artisan or composer commands)
if [ ! -f "source/.env" ]; then
	echo "🔧 Copying .env.example to .env..."
	cp source/.env.example source/.env
fi

# Always ensure composer dependencies are installed
echo "📦 Installing Composer dependencies..."
docker exec kayi_php composer install

# Initial application setup
echo "🔧 Initial application setup..."
docker exec kayi_php php artisan key:generate
if [ ! -d "./source/lang" ]; then docker exec kayi_php php artisan lang:publish; fi
docker exec kayi_php php artisan optimize

# Database and authentication setup
echo "🗄️ Setting up database and authentication..."
docker exec kayi_php php artisan migrate:fresh --seed --force

# Fix permissions (container)
echo "🔧 Fixing container permissions..."
# Set correct ownership and permissions for storage and cache inside the container
docker exec kayi_php chown -R www-data:www-data /var/www/html/kayi/storage
docker exec kayi_php chown -R www-data:www-data /var/www/html/kayi/bootstrap/cache
docker exec kayi_php chmod -R 777 /var/www/html/kayi/storage
docker exec kayi_php chmod -R 777 /var/www/html/kayi/bootstrap/cache


# (Removed host chmod/chown to avoid permission errors with Docker volumes)
echo "🔧 Skipping host-side chmod/chown for workspace to avoid Docker volume permission errors."

# Clear caches

# Wait for Redis to be ready
echo "⏳ Waiting for Redis to be ready..."
until docker exec kayi_php php -r "
try {
    \$redis = new Redis();
    \$redis->connect('redis', 6379);
    \$redis->ping();
    echo 'Redis connected successfully' . PHP_EOL;
    exit(0);
} catch (Exception \$e) {
    echo 'Redis not ready yet: ' . \$e->getMessage() . PHP_EOL;
    exit(1);
}
" 2>/dev/null; do
    echo "🔄 Redis not ready, waiting 2 seconds..."
    sleep 2
done

# Restart PHP container to ensure Supervisor and queue worker are running
echo "🔄 Restarting PHP container to ensure Supervisor and queue worker are running..."
docker compose restart php

echo "🔄 Restarting queue worker..."
docker exec kayi_php php artisan queue:restart
docker exec kayi_php php artisan storage:link

echo "🧹 Clearing application caches..."
docker exec kayi_php php artisan optimize:clear

# Test Redis connection with Laravel
echo "🔍 Testing Laravel Redis connection..."
docker exec kayi_php php artisan tinker --execute="
try {
    Cache::store('redis')->put('startup_test', 'ok', 10);
    echo 'Laravel Redis connection: SUCCESS' . PHP_EOL;
} catch (Exception \$e) {
    echo 'Laravel Redis connection failed: ' . \$e->getMessage() . PHP_EOL;
}
exit();
"

echo "🧹 Dumping Composer autoload files..."
docker exec kayi_php composer dump-autoload


echo "✅ KAYi Laravel Application setup complete!"
echo "🌐 Application available at: http://localhost"
echo "📚 API Documentation: http://localhost/testform/"
