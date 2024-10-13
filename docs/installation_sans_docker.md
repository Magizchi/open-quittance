# Développement SANS DOCKER

## Environnement

 Installer les packages suivants:

- Nodejs Version 22
- Mysql Version 9.0.1

Télécharger le code

```bash
    git clone https://github.com/Magizchi/openQuittance.git
```

Créer un fichier `.env` à la racine:

```bash
    ## Database Config
    DB_HOST=localhost
    DB_PORT=3306
    DB_PASSWORD=password
    DB_USER=user
    DB_DATABASE=pdfman
    DB_LIMIT=5
    DB_SYNCHRO=true
    ## JWT
    JWT_SECRET_TOKEN='{your token}'
```

## Lancer le projet

Installer les packages

```bash
    npm run install
```

Lancer la migration qui va créer un dossier drizzle

```bash
    npm run migration
```

Lancer le projet

```bash
    npm run dev
```

Connectez-vous à mysql et ajouter l'utilisateur par default

```sql
INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `loginToken`) VALUES (1, '', '', 'admin@gmail.com', '$2b$10$.vAQ4ipd3dh1da3gjZ/w7e9Y23mEOz2rqMzPOC3SfJkCfAIkY/Qpy', NULL);
```

Vous pouvez acceder à l'application

```bash
    http://localhost:5173

    email:'admin@gmail.com'
    password:'password'
```
