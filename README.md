# OpenQuittance

Le projet OpenQuittance vise à simplifier la gestion des quittances de loyer grâce à une plateforme open source. Il utilise SvelteKit, un framework JavaScript moderne pour construire des applications web, et Drizzle

À travers une interface intuitive, les utilisateurs peuvent effectuer des opérations CRUD (Create, Read, Update, Delete) pour gérer les informations relatives aux utilisateurs, aux propriétés et aux locataires. La fonctionnalité principale permet la création de quittances directement depuis la page d'accueil, offrant ainsi une expérience fluide et efficace

De plus, le projet offre un système d'affichage des quittances ainsi qu'un historique détaillé pour chaque locataire, facilitant ainsi le suivi des paiements et la gestion des archives. En combinant la facilité d'utilisation de SvelteKit avec la puissance de Drizzle pour la gestion des données, OpenQuittance offre une solution complète et moderne pour la gestion des quittances de loyer.

## Installation

### Préambule

Package utiliser
- Nodejs Version 22
- Mysql  Version 9.0.1

Télécharger le code

```bash
    git clone https://github.com/Magizchi/openQuittance.git
```

Créer un fichier `.env` à la racine:

```bash
    ## Database Config
    DB_HOST=db
    DB_PORT=3306
    DB_PASSWORD=password
    DB_USER=user
    DB_DATABASE=pdfman
    DB_LIMIT=5
    DB_SYNCHRO=true
    ## JWT
    JWT_SECRET_TOKEN='{your token}'
```
### Production

    bientôt...

### Développement

1- Lancer `Docker`, avec DevContainer de VS Code

2- Lancer la migration qui va créer un dossier drizzle

```bash
    npm run migration
```

3- Lancer le projet

```bash
    npm run dev -- --host
```

4- connectez vous au mysql et ajouter l'utilisateur par default

```sql
INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `loginToken`) VALUES (1, '', '', 'admin@gmail.com', '$2b$10$.vAQ4ipd3dh1da3gjZ/w7e9Y23mEOz2rqMzPOC3SfJkCfAIkY/Qpy', NULL);
```

5- Vous pouvez acceder à l'application

    http://localhost:5173
    
```bash
    email:'admin@gmail.com'
    password:'password'
```