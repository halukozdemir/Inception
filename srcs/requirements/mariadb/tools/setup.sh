#!/bin/bash

MYSQL_ROOT_PASSWORD=$(cat /run/secrets/mysql_root_password)
MYSQL_USER_PASSWORD=$(cat /run/secrets/mysql_user_password)

mysqld_safe --user=mysql --datadir=/var/lib/mysql &

sleep 10

mysql -u root -p${MYSQL_ROOT_PASSWORD} << EOF
CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};
CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_USER_PASSWORD}';
GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'%';
FLUSH PRIVILEGES;
EOF

exec mysqld --user=mysql --datadir=/var/lib/mysql
