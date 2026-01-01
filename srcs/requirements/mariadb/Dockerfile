FROM debian:bullseye

RUN apt-get update && apt-get install -y mariadb-server

COPY conf/my.cnf /etc/mysql/conf.d/my.cnf
RUN chmod 644 /etc/mysql/conf.d/my.cnf

COPY tools/mariadb.sh /usr/local/bin/mariadb.sh
RUN chmod +x /usr/local/bin/mariadb.sh

RUN mkdir -p /var/run/mysqld && \
    chown -R mysql:mysql /var/run/mysqld && \
    chmod 777 /var/run/mysqld

EXPOSE 3306

ENTRYPOINT ["/usr/local/bin/mariadb.sh"]
