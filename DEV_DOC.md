# Developer Documentation (DEV_DOC.md)

## Environment Setup from Scratch

To set up the development environment, ensure you have **Docker** and **Docker Compose** installed.

### 1. Configuration Files
The project relies on an `.env` file located in `srcs/.env` to define environment variables like domain name, paths, and user details.
**Required Variables:**
- `DOMAIN_NAME` (e.g., halozdem.42.fr)
- `DATA_PATH` (e.g., /home/halozdem/data)
- `SQL_DATABASE`, `SQL_USER`, `SQL_HOST`
- `WP_ADMIN_USER`, `WP_ADMIN_EMAIL`, etc.

### 2. Secrets
Sensitive data must be placed in `srcs/secrets/`. The following files are required (create them if missing):
- `db_password.txt`
- `db_root_password.txt`
- `wp_admin_password.txt`
- `wp_user_password.txt`
- `ftp_password.txt`

*These files should contain single-line plain text passwords.*

### 3. Host Modification
Ensure your domain points to localhost. Edit `/etc/hosts`:
```
127.0.0.1   halozdem.42.fr
```

## Build and Launch

The project uses a `Makefile` to simplify Docker Compose commands.

- **Build and Run:**
  ```bash
  make
  ```
  This runs `docker compose up -d --build`. It builds images from `srcs/requirements/*/Dockerfile` and starts containers defined in `srcs/docker-compose.yml`.

- **Rebuild specific service:**
  ```bash
  docker compose -f srcs/docker-compose.yml up -d --build <service_name>
  ```

## Managing Containers and Volumes

### Container Management
- **View logs:** `docker compose -f srcs/docker-compose.yml logs -f`
- **Enter a container:** `docker exec -it <container_name> /bin/bash`
- **Restart a container:** `docker restart <container_name>`

### Volume Management
Data persistence is handled via Docker Volumes mapped to host directories.
- **Inspect a volume:**
  ```bash
  docker volume inspect srcs_wordpress_vol
  ```
- **Prune unused volumes:** `docker volume prune` (Caution: data loss)

## Data Persistence & Storage location
Project data is strictly stored on the host machine as defined by `DATA_PATH` in the `.env` file.

- **Database Data:** Stored in `${DATA_PATH}/mariadb` (e.g., `/home/halozdem/data/mariadb`). Mapped to `/var/lib/mysql` inside the MariaDB container.
- **WordPress Files:** Stored in `${DATA_PATH}/wordpress` (e.g., `/home/halozdem/data/wordpress`). Mapped to `/var/www/wordpress` inside the WordPress container.

This configuration ensures that valid data persists even if containers are destroyed (`docker compose down`), as long as the host directories are not deleted (which `make fclean` does).
