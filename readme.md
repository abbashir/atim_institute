
# KAYi Marketplace Platform

## About KAYi

**KAYi** is a comprehensive location-based marketplace platform that enables users to buy and sell products within their geographic proximity. The platform provides secure peer-to-peer commerce with integrated payment processing, real-time negotiations, and multi-language support.

### Core Features
- 🗺️ **Location-Based Commerce**: Discover nearby sellers and products within configurable radius
- 👥 **Dual User Roles**: Seamless switching between buyer and seller modes
- 💬 **Real-Time Negotiations**: Built-in price negotiation system
- 💳 **Secure Payments**: Stripe integration with digital wallet
- 🌐 **Multi-Language Support**: English, Bengali, Japanese
- 📱 **Mobile Ready**: iOS/Android apps with push notifications
- ⭐ **Review System**: Comprehensive rating and feedback system

## Technology Stack

- **Backend**: Laravel 11.x (PHP 8.2+)
- **Database**: PostgreSQL 16
- **Authentication**: Laravel Sanctum
- **Payments**: Stripe with webhook validation
- **Storage**: AWS S3
- **Notifications**: Firebase Cloud Messaging (FCM)
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx
- **Queue**: Redis/Database
- **Image Processing**: GD + Imagick (WebP, JPEG, PNG support)
- **Video Processing**: FFmpeg/FFprobe
- **Process Management**: Supervisor

## Quick Start with Docker

### Prerequisites
- Docker Desktop installed and running
- Git installed

### 1. Clone & Setup
```bash
# Clone the repository
git clone https://drmonline.backlog.jp/git/KAYI/kayi_web.git

# Checkout development branch
git checkout develop

# Navigate to project directory
cd kayi_web
```

### 2. Docker Installation
```bash
# Run the installation script (sets up Docker environment)
sh install.sh
```

### 3. Start Development Environment
```bash
# Start all services (PostgreSQL, Redis, PHP, Nginx)
docker compose up -d

# Verify all containers are running
docker compose ps
```

### 4. Access the Application
- **Backend API**: http://localhost/
- **Database**: PostgreSQL on port 5432
- **Redis**: Available on port 6379

### 5. Stop Services
```bash
# Stop all containers
docker compose stop

# Stop and remove containers
docker compose down
```

## Manual Development Setup

### Requirements
- PHP 8.2+
- Composer
- PostgreSQL 16
- Redis (optional)
- Node.js 18+

### PHP Extensions (Auto-installed via Docker)
```
# Core Laravel Extensions
- BCMath, Ctype, cURL, DOM, Fileinfo, JSON
- Mbstring, OpenSSL, PCRE, PDO, Tokenizer, XML

# Database Extensions
- pgsql (PostgreSQL)
- pdo_pgsql (PostgreSQL PDO driver)

# Image Processing Extensions
- GD (with WebP, JPEG, PNG, FreeType support)
- Imagick (ImageMagick)

# Additional Extensions
- Zip (archive handling)
- Redis (caching and queues)
```

### Installation Steps
```bash
# Install PHP dependencies
composer install

# Copy environment configuration
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Install frontend dependencies
npm install

# Build assets
npm run dev
```

## Project Structure

```
KAYi/
├── 00.Document/          # API documentation (Swagger/OpenAPI)
├── docker/              # Docker configuration files
│   ├── backend/         # PHP-FPM & Laravel setup
│   ├── db/              # PostgreSQL configuration
│   ├── nginx/           # Web server configuration
│   └── php/             # PHP configuration
├── source/              # Laravel application
│   ├── app/             # Application logic
│   ├── config/          # Configuration files
│   ├── database/        # Migrations, seeders
│   ├── resources/       # Views, assets, translations
│   └── routes/          # API and web routes
├── docker-compose.yml   # Docker orchestration
├── install.sh          # Setup script
├── start_dev_server.sh  # Development server script
└── start_prod_server.sh # Production server script
```

## API Documentation

The comprehensive API documentation is available in Swagger format:
- **Location**: `00.Document/Api/swagger_app.yaml`
- **Base URL**: `/api/v1`

### Authentication Headers
```http
X-Client-Key: base64:S0FZaUFwaURPTC1raXNvcm5pcnVAZ21haWw=
Authorization: Bearer {api_token}
X-Language-Key: en
```

## Development Workflow

### Working with Docker
```bash
# View logs
docker compose logs -f

# Access Laravel container
docker compose exec backend bash

# Run Artisan commands
docker compose exec backend php artisan migrate

# Run tests
docker compose exec backend php artisan test
```

### Database Management
```bash
# Run migrations
docker compose exec backend php artisan migrate

# Seed database
docker compose exec backend php artisan db:seed

# Reset database
docker compose exec backend php artisan migrate:fresh --seed
```

### Queue Management
```bash
# Start queue worker
docker compose exec backend php artisan queue:work

# Clear failed jobs
docker compose exec backend php artisan queue:clear
```

## Environment Configuration

Key environment variables to configure in `.env`:

```env
# Application
APP_NAME="KAYi Marketplace"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

# Database
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=kayi_marketplace
DB_USERNAME=kayi_user
DB_PASSWORD=kayi_password

# Stripe Payment
STRIPE_KEY=pk_test_your_stripe_key
STRIPE_SECRET=sk_test_your_stripe_secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=kayi-storage

# Firebase FCM
FCM_SERVER_KEY=your_fcm_server_key
```

## Testing

```bash
# Run all tests
docker compose exec backend php artisan test

# Run specific test suite
docker compose exec backend php artisan test --testsuite=Feature

# Run with coverage
docker compose exec backend php artisan test --coverage
```

## Deployment

### Production Setup
1. Set environment to production in `.env`
2. Configure proper database credentials
3. Set up SSL certificates
4. Configure Redis for caching and queues
5. Set up supervisor for queue workers
6. Configure cron jobs for scheduled tasks

### Using Docker in Production
```bash
# Build production images
docker compose -f docker-compose.prod.yml build

# Start production services
docker compose -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Common Issues

**Docker containers not starting:**
```bash
# Check Docker Desktop is running
# Verify no port conflicts (80, 5432, 6379)
docker compose down
docker compose up -d
```

**Permission issues:**
```bash
# Fix storage permissions
docker compose exec backend chmod -R 755 storage bootstrap/cache
```

**Database connection issues:**
```bash
# Verify database container is running
docker compose ps
# Check database credentials in .env
```

## Contributing

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Follow PSR-12 coding standards
4. Write tests for new functionality
5. Update API documentation if needed
6. Commit changes (`git commit -m 'Add new feature'`)
7. Push to branch (`git push origin feature/new-feature`)
8. Create a Pull Request

### Code Quality
- Use Laravel Pint for code formatting
- Follow repository pattern for data access
- Write comprehensive tests
- Document API changes in Swagger

## Support

For technical support and questions:
- **Issues**: Create an issue in the project repository
- **Documentation**: Check `00.Document/Api/` for API specs
- **Email**: Contact the development team

## License

This project is proprietary software developed by Dreamonline. All rights reserved.

---

**Developed by Dreamonline** | **Built with Laravel & Docker**
