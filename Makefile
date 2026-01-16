name = inception

include srcs/.env
export DATA_PATH


all:
	@printf "Launch configuration ${name}...\n"
	@bash srcs/requirements/wordpress/tools/make_dir.sh
	@docker compose -f ./srcs/docker-compose.yml --env-file srcs/.env up -d --build

build:
	@printf "Building configuration ${name}...\n"
	@bash srcs/requirements/wordpress/tools/make_dir.sh
	@docker compose -f ./srcs/docker-compose.yml --env-file srcs/.env build

down:
	@printf "Stopping configuration ${name}...\n"
	@docker compose -f ./srcs/docker-compose.yml --env-file srcs/.env down

re: down
	@printf "Rebuild configuration ${name}...\n"
	@docker compose -f ./srcs/docker-compose.yml --env-file srcs/.env up -d --build

clean: down
	@printf "Cleaning configuration ${name}...\n"
	@docker system prune -a

fclean: down
	@printf "Total clean of all configurations ${name}...\n"
	@docker system prune --all --force --volumes
	@docker network prune --force
	@docker volume prune --force
	@docker volume rm -f srcs_portainer_data 2>/dev/null || true
	@sudo rm -rf $(DATA_PATH)/wordpress
	@sudo rm -rf $(DATA_PATH)/mariadb
	@mkdir -p $(DATA_PATH)/wordpress
	@mkdir -p $(DATA_PATH)/mariadb

.PHONY: all build down re clean fclean