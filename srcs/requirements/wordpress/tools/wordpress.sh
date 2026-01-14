#!/bin/bash
set -e

SQL_PASSWORD=$(cat /run/secrets/db_password)
WP_ADMIN_PASSWORD=$(cat /run/secrets/wp_admin_password)
WP_USER_PASSWORD=$(cat /run/secrets/wp_user_password)

cd /var/www/wordpress

# Wait for MariaDB to be ready
echo "Waiting for MariaDB..."
while ! mysqladmin ping -h"$SQL_HOST" --silent; do
    sleep 1
done
echo "MariaDB is ready!"

if [ ! -f wp-config.php ]; then
    echo "Wordpress is not installed. Installing..."
    
    # Download WordPress only if not already present
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
    
    echo "Wordpress installed successfully"
fi

exec /usr/sbin/php-fpm7.4 -F
