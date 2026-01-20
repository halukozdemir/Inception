FROM debian:bookworm

RUN apt update && apt install -y mariadb-server

COPY conf/mariadb.conf /etc/mysql/conf.d/mariadb.conf
RUN chmod 644 /etc/mysql/conf.d/mariadb.conf

RUN sed -i 's/bind-address.*=.*127.0.0.1/bind-address = 0.0.0.0/' /etc/mysql/mariadb.conf.d/50-server.cnf

COPY tools/mariadb.sh /usr/local/bin/mariadb.sh
RUN chmod +x /usr/local/bin/mariadb.sh

RUN mkdir -p /var/run/mysqld && \
    chown -R mysql:mysql /var/run/mysqld && \
    chmod 755 /var/run/mysqld

RUN mkdir -p /var/log/mysql && \
    chown -R mysql:mysql /var/log/mysql && \
    chmod 755 /var/log/mysql

EXPOSE 3306

ENTRYPOINT ["/usr/local/bin/mariadb.sh"]
