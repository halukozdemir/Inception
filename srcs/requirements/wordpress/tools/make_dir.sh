#!/bin/bash
DATA_DIR="/home/halozdem/data"

if [ ! -d "$DATA_DIR" ]; then
        mkdir -p $DATA_DIR/mariadb
        mkdir -p $DATA_DIR/wordpress
fi
