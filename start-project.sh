#!/bin/bash

# Iniciar os serviços do Docker
echo "Iniciando serviços do Docker..."
docker-compose up -d

# Esperar o PostgreSQL iniciar
echo "Aguardando o PostgreSQL iniciar..."
until pg_isready -h localhost -p 5432 -U msLabUser
do
  echo "Aguardando conexão com o PostgreSQL..."
  sleep 2
done

# Instalar dependências
echo "Instalando dependências do back-end..."
cd control-id-back && npm install

echo "Instalando dependências do front-end..."
cd ../control-id-front && npm install

# Iniciar os serviços
echo "Iniciando o back-end..."
cd ../control-id-back && NODE_ENV=development npm run develop &

echo "Iniciando o front-end..."
cd ../control-id-front && npm run dev &

# Manter o script rodando
wait
