#!/bin/bash
if [ ! -d "$HOME/data" ]; then
        mkdir -p $HOME/data/mariadb
        mkdir -p $HOME/data/wordpress
fi
