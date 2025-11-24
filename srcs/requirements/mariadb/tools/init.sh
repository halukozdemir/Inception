#!/bin/bash

MYSQL_ROOT_PASSWORD=$(cat /run/secrets/mysql_root_password)

mkdir -p /var/lib/mysql
mkdir -p /var/run/mysqld
mkdir -p /var/log/mysql

chown -R mysql:mysql /var/lib/mysql
chown -R mysql:mysql /var/run/mysqld
chown -R mysql:mysql /var/log/mysql

mysql_install_db --user=mysql --datadir=/var/lib/mysql

mysqld_safe --user=mysql --datadir=/var/lib/mysql &

sleep 10

mysql -u root << EOF
ALTER USER 'root'@'localhost' IDENTIFIED BY '${MYSQL_ROOT_PASSWORD}';
DELETE FROM mysql.user WHERE User='';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';
FLUSH PRIVILEGES;
EOF

mysqladmin -u root -p${MYSQL_ROOT_PASSWORD} shutdown

exec mysqld --user=mysql --datadir=/var/lib/mysql
