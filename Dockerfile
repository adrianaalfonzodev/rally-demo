# Imagen base oficial de PHP con extensiones necesarias
FROM php:8.4-fpm

# Instala dependencias del sistema y extensiones de PHP
RUN apt-get update && \
    apt-get install -y libpng-dev libonig-dev libxml2-dev zip unzip git curl && \
    docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Instala Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Instala Node.js v22.12 y npm
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs

# Establece el directorio de trabajo
WORKDIR /var/www

# Copia los archivos del proyecto
COPY . .

# Instala dependencias de PHP y Node
RUN composer install --no-interaction --prefer-dist --optimize-autoloader && \
    npm install && npm run build

# Da permisos a la carpeta de almacenamiento y caché
RUN chown -R www-data:www-data storage bootstrap/cache

# Expone el puerto 8000
EXPOSE 8000

# Comando por defecto para iniciar Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
