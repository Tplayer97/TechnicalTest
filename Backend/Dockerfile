FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

RUN mkdir -p var/cache var/log && \
    chown -R www-data:www-data var/cache var/log && \
    chmod -R 777 var/cache var/log

COPY . .
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --optimize-autoloader


RUN chown -R www-data:www-data /var/www/html


EXPOSE 80

CMD ["php-fpm"]
