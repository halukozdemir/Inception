#!/bin/bash
if [ ! -d "/home/login/data" ]; then
        mkdir -p /home/login/data/mariadb
        mkdir -p /home/login/data/wordpress
fi
