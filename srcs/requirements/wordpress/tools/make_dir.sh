#!/bin/bash

source srcs/.env

if [ ! -d "$DATA_PATH" ]; then
        mkdir -p $DATA_PATH/mariadb
        mkdir -p $DATA_PATH/wordpress
fi
