# Développement avec DevContainer

Lancer `Docker`, avec `F1` lancer le build des containers avec `docker-compose.yml`

Ajouter les ficher `.env`

```bash
    ## Database Config
    DB_HOST=db
    DB_PORT=3306
    DB_PASSWORD=password
    DB_USER=root
    DB_DATABASE=pdfman
    DB_LIMIT=5
    DB_SYNCHRO=true
    ## JWT
    JWT_SECRET_TOKEN=2y10s94DQTxK1txQ73nqiYAl4sFNJPnpjGpd0qUPN3pxaiAJg4Ucde6
```

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
    npm run dev -- --host
```

connectez vous au mysql et ajouter l'utilisateur par default

```sql
INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `loginToken`) VALUES (1, '', '', 'admin@gmail.com', '$2b$10$.vAQ4ipd3dh1da3gjZ/w7e9Y23mEOz2rqMzPOC3SfJkCfAIkY/Qpy', NULL);
```

Vous pouvez acceder à l'application

```bash
    http://localhost:5173

    email:'admin@gmail.com'
    password:'password'
```
