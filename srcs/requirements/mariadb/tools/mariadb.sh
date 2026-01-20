#!/bin/bash
set -e

SQL_PASSWORD_FILE="/run/secrets/db_password"
SQL_ROOT_PASSWORD_FILE="/run/secrets/db_root_password"
INIT_MARKER="/var/lib/mysql/.initialized"

if [ -f "$SQL_PASSWORD_FILE" ]; then
    SQL_PASSWORD=$(cat "$SQL_PASSWORD_FILE")
else
    echo "Error: $SQL_PASSWORD_FILE not found"
    exit 1
fi

if [ -f "$SQL_ROOT_PASSWORD_FILE" ]; then
    SQL_ROOT_PASSWORD=$(cat "$SQL_ROOT_PASSWORD_FILE")
else
    echo "Error: $SQL_ROOT_PASSWORD_FILE not found"
    exit 1
fi

if [ ! -f "$INIT_MARKER" ]; then
    echo "Initializing database..."
    
    mysqld_safe &
    
    while ! mysqladmin ping --silent; do
        sleep 1
    done
    
    mysql -u root << EOF
ALTER USER 'root'@'localhost' IDENTIFIED BY '$SQL_ROOT_PASSWORD';
CREATE DATABASE IF NOT EXISTS $SQL_DATABASE;
CREATE USER IF NOT EXISTS '$SQL_USER'@'%' IDENTIFIED BY '$SQL_PASSWORD';
GRANT ALL PRIVILEGES ON $SQL_DATABASE.* TO '$SQL_USER'@'%';
FLUSH PRIVILEGES;
EOF

    touch "$INIT_MARKER"
    echo "Database $SQL_DATABASE created successfully"
    
    mysqladmin -u root -p"$SQL_ROOT_PASSWORD" shutdown
    sleep 2
fi

exec mysqld_safe
