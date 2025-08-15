#!/bin/bash
set -e

# Installation de MariaDB
echo "🛢️ Installation de MariaDB..."
sudo apt install -y mariadb-server mariadb-client

# Démarrage et activation du service MariaDB
echo "🚀 Démarrage de MariaDB..."
sudo service mariadb start

set timeout 10

# Sécuriser l'installation de MariaDB
echo "🔐 Lancement de mysql_secure_installation (manuel recommandé)"
sudo mysql_secure_installation <<EOF
r
n
n
y
y
y
y
EOF


# expect "Enter current password for root (enter for none):"
# send "\r"

# expect "Switch to unix_socket authentication"
# send "n\r"

# expect "Change the root password?"
# send "n\r"

# expect "Remove anonymous users?"
# send "y\r"

# expect "Disallow root login remotely?"
# send "y\r"

# expect "Remove test database and access to it?"
# send "y\r"

# expect "Reload privilege tables now?"
# send "y\r"


echo "✅ MariaDB installé et configuré."