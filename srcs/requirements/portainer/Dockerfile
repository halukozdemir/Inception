FROM debian:bookworm

RUN apt update && apt install -y \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN curl -L https://github.com/portainer/portainer/releases/download/2.11.1/portainer-2.11.1-linux-amd64.tar.gz \
    -o /tmp/portainer.tar.gz && \
    tar -xzf /tmp/portainer.tar.gz -C /opt && \
    rm /tmp/portainer.tar.gz

EXPOSE 9000

CMD ["/opt/portainer/portainer", "--bind", ":9000"]
