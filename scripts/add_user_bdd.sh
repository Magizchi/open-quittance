#!/bin/bash
set -e

read -p "👤 Nom du nouvel utilisateur :" userName
read -p "🔑 Mot de passe pour ce nouvel utilisateur :" urpassword
read -p "🗄️ Nom de la base de données existante :" db

sudo mariadb <<EOF
CREATE USER '$userName'@'localhost' IDENTIFIED BY '$urpassword';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,ALTER ON *.* TO '$userName'@'localhost' IDENTIFIED BY '$urpassword';;
EOF

sudo mariadb <<EOF 
CREATE DATABASE IF NOT EXISTS openquittance;
EOF

# Chemin vers le .env distant
ENV_FILE="$(realpath "$(dirname "$0")/../.env")"

# Fonction pour modifier ou ajouter une variable dans .env
set_env_var() {
  local key="$1"
  local value="$2"
  local file="$ENV_FILE"

  # Créer le fichier .env s’il n’existe pas
  [ -f "$file" ] || touch "$file"

  if grep -q "^${key}=" "$file"; then
    sed -i "s|^${key}=.*|${key}=${value}|" "$file"
  else
    echo "${key}=${value}" >> "$file"
  fi
}

DB_URL="mariadb://${userName}:${urpassword}@localhost:3306/${db}"

# Mise à jour du fichier .env
set_env_var "DB_URL" "$DB_URL"


