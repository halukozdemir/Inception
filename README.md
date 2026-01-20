*This project has been created as part of the 42 curriculum by halozdem.*

# Inception

## Description
Inception is a System Administration project that aims to broaden the knowledge of system administration by using **Docker**. This project involves setting up a complete web infrastructure using **Docker Compose**. The goal is to virtualize several services in separate containers: NGINX, functionalities of WordPress + php-fpm, MariaDB, and various bonus services like Redis, FTP, and a static website.

The project emphasizes best practices such as building custom Docker images (no pre-built images with infinite services), managing volumes for data persistence, establishing a private docker network, and handling secrets securely.

### Virtual Machines vs Docker
- **Virtual Machines (VMs):** Emulate an entire computer system, including the hardware. Each VM runs a full OS (Guest OS) on top of a Hypervisor. This is resource-heavy as each instance needs its own CPU, RAM, and storage for the OS kernel.
- **Docker (Containers):** Virtualize the Operating System. Containers share the host machine's OS kernel and only package the application and its dependencies. This makes them significantly more lightweight, faster to start, and efficient in resource usage compared to VMs.

### Secrets vs Environment Variables
- **Environment Variables:** Useful for configuration settings (like file paths, domain names). However, they are often visible in process lists (`ps`) or inspection commands (`docker inspect`), making them insecure for sensitive data.
- **Secrets:** Docker Secrets are designed to manage sensitive data (passwords, keys). They are stored securely and mounted as files into the container (usually in `/run/secrets/`), ensuring they are not exposed in environment variables or version control (if managed correctly). In this project, passwords are read from files at runtime.

### Docker Network vs Host Network
- **Host Network:** The container shares the host's networking namespace. It doesn't get its own IP address; port 80 on the container maps directly to port 80 on the host. This offers better performance but less isolation and can cause port conflicts.
- **Docker Network (Bridge):** Default for containers. Containers are connected to a private virtual network (like `srcs_inception`). They can communicate with each other using service names (DNS) but are isolated from the host network. Specific ports must be explicitly published (`ports` mapping) to be accessible from outside. This project uses a custom bridge network for isolation and security.

### Docker Volumes vs Bind Mounts
- **Docker Volumes:** Managed by Docker (stored in `/var/lib/docker/volumes/`). They are the preferred mechanism for persisting data generate by and used by Docker containers. They are easier to back up and manage via Docker CLI.
- **Bind Mounts:** A file or directory on the *host machine* is mounted into a container. The file or directory is referenced by its absolute path on the host. In this project, we use bind mounts (via `driver_opts` type `none` with `o: bind` in Docker Compose or direct mapping) to map local directories (`~/data/...`) to container directories, allowing direct access to persistent data from the host filesystem.

## Instructions

### Prerequisites
- Docker Engine
- Docker Compose
- Make
- A copy of this repository
- A valid `.env` file and `secrets/` directory (see DEV_DOC.md for setup)

### Installation & Execution
1. Clone the repository:
   ```bash
   git clone <repository-url> Inception
   cd Inception
   ```

2. Build and launch the project:
   ```bash
   make
   ```
   This command will build the Docker images and start the containers in the background.

3. Stop the project:
   ```bash
   make down
   ```

4. Clean up (Stop and remove containers, networks, images, and volumes):
   ```bash
   make fclean
   ```



## Resources & AI Usage

### References
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [NGINX Documentation](https://nginx.org/en/docs/)
- [WordPress CLI Documentation](https://make.wordpress.org/cli/handbook/)

### AI Usage
AI assistance (specifically Google Gemini / Antigravity) was utilized in this project for the following tasks:
- **Troubleshooting:** Diagnosing configuration errors, such as NGINX 400 Bad Request errors due to protocol mismatches and permission issues with Redis Object Cache.
- **Concept Explanation:** Breaking down complex concepts like "PID 1", Docker network drivers, and the difference between `ENTRYPOINT` and `CMD` for defense preparation.
- **Script Optimization:** Assisting in writing robust bash scripts (`mariadb.sh`, `wordpress.sh`) that correctly handle service dependencies (e.g., waiting for the database to be ready) and permission management.
- **Verification:** acting as a mock evaluator to verify compliance with the project subject (checking TLS versions, volume paths, and HTTP status codes).
