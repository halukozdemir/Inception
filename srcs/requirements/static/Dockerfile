FROM debian:bookworm

RUN apt update && apt install -y nginx

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY website /var/www/static

RUN chown -R www-data:www-data /var/www/static

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
