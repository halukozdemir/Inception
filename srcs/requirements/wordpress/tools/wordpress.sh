#!/bin/bash
set -e

SQL_PASSWORD=$(cat /run/secrets/db_password)
WP_ADMIN_PASSWORD=$(cat /run/secrets/wp_admin_password)
WP_USER_PASSWORD=$(cat /run/secrets/wp_user_password)

cd /var/www/wordpress

echo "Waiting for MariaDB..."
while ! mysqladmin ping -h"$SQL_HOST" -u"$SQL_USER" -p"$SQL_PASSWORD" --silent; do
    sleep 1
done
echo "MariaDB is ready!"

if [ ! -f wp-config.php ]; then
    echo "Wordpress is not installed. Installing..."
    
    if [ ! -f wp-load.php ]; then
        wp core download --allow-root
    fi
    
    wp config create \
        --dbname=$SQL_DATABASE \
        --dbuser=$SQL_USER \
        --dbpass=$SQL_PASSWORD \
        --dbhost=$SQL_HOST \
        --allow-root

    wp core install \
        --url=$DOMAIN_NAME \
        --title="$SITE_TITLE" \
        --admin_user=$WP_ADMIN_USER \
        --admin_password=$WP_ADMIN_PASSWORD \
        --admin_email=$WP_ADMIN_EMAIL \
        --allow-root

    wp user create \
        $WP_USER \
        $WP_USER_EMAIL \
        --user_pass=$WP_USER_PASSWORD \
        --role=editor \
        --allow-root

    # Redis cache configuration
    wp config set WP_REDIS_HOST redis --allow-root
    wp config set WP_REDIS_PORT 6379 --allow-root
    wp config set WP_CACHE true --raw --allow-root

    # Install and activate Redis Object Cache plugin
    wp plugin install redis-cache --activate --allow-root
    wp redis enable --allow-root
    
    echo "Wordpress installed successfully"
fi

exec /usr/sbin/php-fpm8.2 -F
