FROM debian:bookworm

RUN apt update && apt install -y \
    php-fpm \
    php-mysql \
    wget \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/www/adminer && \
    wget -O /var/www/adminer/index.php https://github.com/vrana/adminer/releases/download/v4.8.1/adminer-4.8.1.php && \
    chown -R www-data:www-data /var/www/adminer

RUN sed -i 's/listen = \/run\/php\/php8.2-fpm.sock/listen = 9001/' /etc/php/8.2/fpm/pool.d/www.conf && \
    mkdir -p /run/php

EXPOSE 9001

CMD ["php-fpm8.2", "-F"]
