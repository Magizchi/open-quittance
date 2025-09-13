#!/bin/bash
set -e

echo "🔧 Lancement de l'installation complète..."

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Mettre à jour les paquets
echo "📦 Mise à jour du système..."
sudo apt update && sudo apt upgrade -y

sleep 5
clear
bash "$DIR/install_node.sh"
sleep 5
clear
bash "$DIR/install_mariadb.sh"
sleep 5
clear
bash "$DIR/install_pm2.sh"
sleep 5
clear
bash "$DIR/add_user_bdd.sh"
sleep 5
clear
bash "$DIR/migrate_bdd.sh"
sleep 5
clear

node insert_admin_user.js

echo "✅ Installation terminée avec succès."