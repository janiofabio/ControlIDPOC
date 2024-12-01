FROM mcr.microsoft.com/devcontainers/javascript-node:0-18

# Instalar ferramentas adicionais se necessário
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends postgresql-client
