#!/bin/bash
set -e

echo "📦 Installation de PM2 globalement..."
sudo npm install -g pm2

echo "🔧 Configuration pour redémarrage automatique au boot..."
pm2 startup systemd -u $USER --hp $HOME | bash

echo "✅ PM2 installé et configuré."