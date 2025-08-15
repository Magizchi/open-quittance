#!/bin/bash
set -e

# Installer Node.js (version LTS)
echo "📥 Installation de Node.js..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs git

# Vérifier l'installation
echo "🔍 Version Node.js :"
node -v
echo "🔍 Version npm :"
npm -v

echo "✅ Nodejs installé."