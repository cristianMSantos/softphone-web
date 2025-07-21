#!/bin/bash

# Inicie o serviço MySQL
service mariadb start

# Aguarde o MariaDB inicializar completamente
until mysqladmin ping -h localhost --silent; do
  echo '⏳ Aguardando o MariaDB iniciar...'
  sleep 1
done

# Crie o banco de dados e o usuário se ainda não existirem
if ! mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e 'USE asterisk;' 2>/dev/null; then
  echo "Criando banco de dados e usuário..."
  mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS asterisk;"
  mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "CREATE USER IF NOT EXISTS 'asterisk'@'%' IDENTIFIED BY 'asterisk';"
  mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "GRANT ALL PRIVILEGES ON asterisk.* TO 'asterisk'@'%';"
  mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "FLUSH PRIVILEGES;"
fi

# Se o dump existir, importe ele
if [ -f /dump/init.sql ]; then
  echo "📥 Importando dump SQL..."
  mysql -u asterisk -pasterisk asterisk < /dump/init.sql
else
  echo "⚠️  Dump SQL não encontrado em /dump/init.sql — pulando importação."
fi

# Inicie o Asterisk
echo "🚀 Iniciando Asterisk..."
asterisk -f -U asterisk
