FROM debian:bookworm

RUN apt update && apt install -y vsftpd

RUN mkdir -p /var/run/vsftpd/empty

COPY conf/vsftpd.conf /etc/vsftpd.conf
COPY tools/ftp.sh /usr/local/bin/ftp.sh
RUN chmod +x /usr/local/bin/ftp.sh

EXPOSE 21 21100-21110

ENTRYPOINT ["/usr/local/bin/ftp.sh"]
