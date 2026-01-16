# User Documentation (USER_DOC.md)

## Overview
This stack provides a complete, dockerized web infrastructure centered around WordPress. It includes a web server (NGINX), a database (MariaDB), and several administration and utility tools.

## Services Provided
1.  **WordPress:** The main content management system.
2.  **NGINX:** Secure web server (HTTPS) acting as the gateway.
3.  **MariaDB:** Database server for WordPress.
4.  **Redis:** Object cache to improve WordPress performance.
5.  **FTP Server:** Allows file transfer to the WordPress volume.
6.  **Adminer:** Web-based database management tool.
7.  **Portainer:** Web-based container management interface.
8.  **Static Website:** A simple HTML showcase site.

## Starting and Stopping the Project

### Start
To build and start the entire infrastructure:
```bash
make
```
*Wait a few moments for the database to initialize and WordPress to configure itself.*

### Stop
To stop the containers:
```bash
make down
```

### Clean
To stop and remove all data (volumes, images, networks):
```bash
make fclean
```

## Accessing Services

| Service                    | URL / Access                                  | Description                |
|----------------------------|-----------------------------------------------|----------------------------|
| **Website (WordPress)**    | `https://halozdem.42.fr`                      | Main website (HTTPS only). |
| **Admin Panel**            | `https://halozdem.42.fr/wp-admin`             | WordPress Dashboard.       |
| **Adminer**                | `https://halozdem.42.fr/adminer`              | Database management.       |
| **Static Site**            | `http://halozdem.42.fr:8080`                  | Custom static content.     |
| **Portainer**              | `http://halozdem.42.fr:9000`                  | Docker management UI.      |
| **FTP**                    | `ftp://halozdem.42.fr` (Port 21)              | File access.               |

*Note: Accept the self-signed SSL certificate warning in your browser.*

## Credentials
Credentials and passwords are managed securely. They are not hardcoded but stored in files within the `srcs/secrets/` directory.

- **Database Root Password:** `srcs/secrets/db_root_password.txt`
- **Database User Password:** `srcs/secrets/db_password.txt`
- **WordPress Admin Password:** `srcs/secrets/wp_admin_password.txt`
- **FTP User Password:** `srcs/secrets/ftp_password.txt`

## Checking Service Status
To verify that all services are running correctly:

1.  List active containers:
    ```bash
    docker compose -f srcs/docker-compose.yml ps
    ```
    *All containers (nginx, mariadb, wordpress, etc.) should have status `Up`.*

2.  Check logs for a specific service (e.g., nginx):
    ```bash
    docker logs nginx
    ```
