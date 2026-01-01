#!/bin/bash
set -e

SQL_PASSWORD_FILE="/run/secrets/db_password"
SQL_ROOT_PASSWORD_FILE="/run/secrets/db_root_password"

if [ -f "$SQL_PASSWORD_FILE" ]; then
    SQL_PASSWORD=$(cat "$SQL_PASSWORD_FILE")
else
    echo "Error: $SQL_PASSWORD_FILE not found"
fi

if [ -f "$SQL_ROOT_PASSWORD_FILE" ]; then
    SQL_ROOT_PASSWORD=$(cat "$SQL_ROOT_PASSWORD_FILE")
else
    echo "Error: $SQL_ROOT_PASSWORD_FILE not found"
fi

service mariadb start

if [ ! -d "/var/lib/mysql/$SQL_DATABASE" ]; then
    echo "Creating database $SQL_DATABASE..."
    mysql_secure_installation << _EOF_
$SQL_ROOT_PASSWORD
Y
Y
Y
Y
Y
_EOF_

    echo "Database $SQL_DATABASE created successfully"
fi

service mariadb stop
exec mysqld_safe
