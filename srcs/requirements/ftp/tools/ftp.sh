#!/bin/bash
set -e

FTP_PASSWORD=$(cat /run/secrets/ftp_password)

if ! id "$FTP_USER" &>/dev/null; then
    useradd -m -d /var/www/wordpress -s /bin/bash "$FTP_USER"
    echo "$FTP_USER:$FTP_PASSWORD" | chpasswd
    echo "FTP user $FTP_USER created"
fi

usermod -aG www-data "$FTP_USER"
echo "Added $FTP_USER to www-data group"

echo "Starting vsftpd..."
exec /usr/sbin/vsftpd /etc/vsftpd.conf
