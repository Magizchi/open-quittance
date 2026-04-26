# Développement SANS Docker

## Environnement

1. **Installer les dépendances nécessaires** :

   Assurez-vous d'installer les versions requises des logiciels suivants :

   - **Node.js** : Version 22
   - **MySQL** : Version 9.0.1

2. **Télécharger le code source** :

   Clonez le dépôt Git du projet avec la commande suivante :

   ```bash
   git clone https://github.com/Magizchi/openQuittance.git
   ```

3. **Créer le fichier `.env`** :

   À la racine du projet, créez un fichier `.env` contenant les informations de
   configuration suivantes :

   ```bash
      ## Database URL
      DB_URL={mariadb/postgres/etc}://{user}:{users password}@{server}/{database}
      ## JWT
      JWT_SECRET_TOKEN='{votre token JWT ici}'
   ```

   Remplacez `'{votre token JWT ici}'` par un token JWT généré (vous pouvez
   utiliser un outil comme
   [Generate-random](https://generate-random.org/api-token-generator?count=1&length=256&type=mixed-numbers-symbols&prefix=)).

## Lancer le projet

1. **Installation des dépendances** :

   Dans le répertoire du projet, installez les packages requis en exécutant :

   ```bash
   npm install
   ```

2. **Exécuter la migration de la base de données** :

   Cette commande crée un dossier `migrations` et effectue les migrations
   nécessaires pour la base de données :

   ```bash
   npm run migrate
   ```

## Configuration de l'utilisateur par défaut

1. **Ajouter l'utilisateur administrateur** :

   Une fois le projet en cours d'exécution, connectez-vous à MySQL et ajoutez un
   utilisateur administrateur par défaut. Vous pouvez le faire via la ligne de
   commande MySQL :

   ```bash
   mysql -uroot -ppassword pdfman
   ```

   Ensuite, exécutez cette requête SQL pour ajouter l'utilisateur :

   ```sql
   INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `loginToken`)
   VALUES (1, '', '', 'admin@gmail.com', '$2b$10$.vAQ4ipd3dh1da3gjZ/w7e9Y23mEOz2rqMzPOC3SfJkCfAIkY/Qpy', NULL);
   ```

## Accéder à l'application

1. **Démarrer le projet**

   Démarrez l'application :

   ```bash
   npm run dev
   ```

2. **Accéder à l'application** Une fois le projet démarré, accédez à
   l'application en ouvrant le lien suivant dans votre navigateur :

```bash
http://localhost:5173
```

**Identifiants de connexion** :

- **Email** : `admin@gmail.com`
- **Mot de passe** : `password`
