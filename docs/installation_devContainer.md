# Développement avec DevContainer

### Prérequis

- **VSCode** : Assurez-vous d'avoir [VSCode](https://code.visualstudio.com/)
  installé.
- **Extension DevContainers** : Installez l'extension
  [DevContainers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
  dans VSCode.
- **Docker** : Veillez à ce que Docker soit installé et en cours d'exécution sur
  votre machine.

### Configuration des DevContainers

1. **Lancement de Docker**  
   Démarrez Docker sur votre machine.
2. **Création des containers**  
   Suivez les
   [instructions officielles](https://code.visualstudio.com/docs/devcontainers/create-dev-container#_use-docker-compose)
   pour créer les containers avec `docker-compose`.

### Ajout des fichiers `.env`

1. **Générer un token JWT**  
   Utilisez cet outil
   [Generate-random](https://generate-random.org/api-token-generator?count=1&length=256&type=mixed-numbers-symbols&prefix=)
   pour générer un token aléatoire.

2. **Créer le fichier `.env`**  
   Ajoutez un fichier `.env` à la racine du projet avec la configuration
   suivante :

```bash
## Configuration de la base de données
DB_HOST=db
DB_PORT=3306
DB_PASSWORD=password
DB_USER=root
DB_DATABASE=pdfman
## JWT
JWT_SECRET_TOKEN='{votre token JWT ici}'
```

Remplacez `'{votre token JWT ici}'` par le token généré à l'étape précédente.

### Installation des dépendances

Installez les packages nécessaires en exécutant la commande suivante :

```bash
npm install
```

### Migration de la base de données

Exécutez la migration pour créer un dossier `migrations` et initialiser la base
de données :

```bash
npm run migrations
```

### Configuration de l'utilisateur par défaut

1. **Connexion à la base de données**  
   Connectez-vous à la base de données `pdfman` pour créer l'utilisateur
   administrateur. Vous avez deux options :

   - Via la ligne de commande MySQL :

   ```bash
   mysql -uroot -ppassword pdfman
   ```

   - Ou via **phpMyAdmin** en accédant à l'URL suivante :

   ```bash
   http://localhost:8080
   ```

   **Identifiants phpMyAdmin** :

   - Utilisateur : `root`
   - Mot de passe : `password`

2. **Création de l'utilisateur par défaut**  
   Exécutez la requête SQL suivante pour ajouter un utilisateur administrateur :

   ```sql
   INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `loginToken`)
   VALUES (1, '', '', 'admin@gmail.com', '$2b$10$.vAQ4ipd3dh1da3gjZ/w7e9Y23mEOz2rqMzPOC3SfJkCfAIkY/Qpy', NULL);
   ```

### Accès à l'application

Une fois le projet démarré, vous pouvez accéder à l'application à l'adresse
suivante :

```bash
http://localhost:5173
```

**Identifiants de connexion :**

- **Email** : `admin@gmail.com`
- **Mot de passe** : `password`
