FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libpq-dev \
    git \
    unzip \
    && docker-php-ext-install pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

RUN composer global config --no-plugins allow-plugins.symfony/flex true

RUN composer global require symfony/flex

RUN COMPOSER_ALLOW_SUPERUSER=1 composer require symfony/debug-bundle --dev



RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --optimize-autoloader

# Permisos
RUN chown -R www-data:www-data /var/www/html

# Exponer el puerto
EXPOSE 8000

CMD ["php-fpm"]
