FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libpq-dev \
    git \
    unzip \
    && docker-php-ext-install pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --optimize-autoloader


RUN chown -R www-data:www-data /var/www/html

# exposing the port, we will access this in localhost:8000
EXPOSE 9000

CMD ["php-fpm"]
