# Développement avec Docker

## Environnement

1. **Télécharger le code**

   Clonez le dépôt Git à l'aide de la commande suivante :

   ```bash
   git clone https://github.com/Magizchi/openQuittance.git
   ```

2. **Créer le fichier `.env`**

   À la racine du projet, créez un fichier `.env` contenant les paramètres de configuration suivants :

   ```bash
   ## Configuration de la base de données
   DB_HOST=localhost
   DB_PORT=3306
   DB_PASSWORD=password
   DB_USER=root
   DB_DATABASE=pdfman
   DB_LIMIT=5
   DB_SYNCHRO=true

   ## JWT
   JWT_SECRET_TOKEN='{votre token JWT ici}'
   ```

   Remplacez `'{votre token JWT ici}'` par un token JWT généré (par exemple, en utilisant un générateur de token comme [Generate-random](https://generate-random.org/api-token-generator?count=1&length=256&type=mixed-numbers-symbols&prefix=)).

3. **Modifier `docker-compose.yml`**

   Dans le fichier `docker-compose.yml`, effectuez les modifications suivantes :

   - **Section `node`** : Ajoutez les lignes suivantes pour activer le tty et lier les volumes.

     ```yaml
     node:
       tty: true
       volumes:
         - type: bind
           source: ./client
           target: /app
     ```

   - **Section `bd`** : Ajoutez le volume pour la base de données.

     ```yaml
     bd:
       volumes:
         - db:/var/lib/mysql
     ```

4. **Construire les containers**

   Une fois les modifications effectuées, lancez la construction des containers Docker :

   ```bash
   docker-compose up -d
   ```

## Lancer le projet

1. **Installation des dépendances**

   Installez les packages nécessaires avec la commande suivante :

   ```bash
   npm install
   ```

2. **Migration de la base de données**

   Exécutez la migration pour créer un dossier `drizzle` et initialiser la base de données :

   ```bash
   npm run migration
   ```

3. **Démarrer le projet**

   Démarrez l'application :

   ```bash
   npm run dev
   ```

## Configuration de l'utilisateur par défaut

1. **Ajouter l'utilisateur administrateur**  
   Connectez-vous à MySQL et ajoutez l'utilisateur administrateur par défaut à l'aide de la requête SQL suivante :

   ```sql
   INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `loginToken`) 
   VALUES (1, '', '', 'admin@gmail.com', '$2b$10$.vAQ4ipd3dh1da3gjZ/w7e9Y23mEOz2rqMzPOC3SfJkCfAIkY/Qpy', NULL);
   ```

## Accéder à l'application

Une fois le projet démarré, vous pouvez accéder à l'application via le lien suivant :

```bash
http://localhost:5173
```

**Identifiants de connexion :**
- **Email** : `admin@gmail.com`
- **Mot de passe** : `password`
