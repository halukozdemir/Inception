FROM debian:bookworm

RUN apt update && apt install -y \
    wget \
    php \
    php-fpm \
    php-mysql \
    php-redis \
    mariadb-client

RUN mkdir -p /run/php

RUN wget https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp

COPY conf/www.conf /etc/php/8.2/fpm/pool.d/www.conf

COPY tools/wordpress.sh /usr/local/bin/wordpress.sh
RUN chmod +x /usr/local/bin/wordpress.sh

WORKDIR /var/www/wordpress

EXPOSE 9000

ENTRYPOINT ["/usr/local/bin/wordpress.sh"]
