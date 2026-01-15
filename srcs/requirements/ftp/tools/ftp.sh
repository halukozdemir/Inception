#!/bin/bash
set -e

FTP_PASSWORD=$(cat /run/secrets/ftp_password)

# Create FTP user if not exists
if ! id "$FTP_USER" &>/dev/null; then
    useradd -m -d /var/www/wordpress -s /bin/bash "$FTP_USER"
    echo "$FTP_USER:$FTP_PASSWORD" | chpasswd
    chown -R "$FTP_USER:$FTP_USER" /var/www/wordpress
    echo "FTP user $FTP_USER created"
fi

echo "Starting vsftpd..."
exec /usr/sbin/vsftpd /etc/vsftpd.conf
