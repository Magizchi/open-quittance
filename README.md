# OpenQuittance

Le projet OpenQuittance vise à simplifier la gestion des quittances de loyer grâce à une plateforme open source. Il utilise SvelteKit, un framework JavaScript moderne pour construire des applications web, et Drizzle

À travers une interface intuitive, les utilisateurs peuvent effectuer des opérations CRUD (Create, Read, Update, Delete) pour gérer les informations relatives aux utilisateurs, aux propriétés et aux locataires. La fonctionnalité principale permet la création de quittances directement depuis la page d'accueil, offrant ainsi une expérience fluide et efficace

De plus, le projet offre un système d'affichage des quittances ainsi qu'un historique détaillé pour chaque locataire, facilitant ainsi le suivi des paiements et la gestion des archives. En combinant la facilité d'utilisation de SvelteKit avec la puissance de Drizzle pour la gestion des données, OpenQuittance offre une solution complète et moderne pour la gestion des quittances de loyer.

## Installation

### Préambule

Télécharger le code

```bash
    git clone https://github.com/Magizchi/openQuittance.git
```

Créer un fichier `.env` à la racine:

```bash
    #listen Port
    PORT='{your port}'
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

 Pas de production pour le moment, c'est en cours d'installation

### Développement

1- Lancer `Docker`, avec DevContainer de VS Code

1.1 - Si vous n'avez pas DevContainer avec VS CODE, faut debugger le docker-compose

2- Lancer la migration qui va créer un dossier drizzle avec les fichiers migrations

```bash
    npm run migration
```

3- Lancer le projet

```bash
    npm run dev -- --host
```

4- Dans le localhost:8080 (le phpmyadmin) ajouter dans user, un compte

5- Vous pouvez acceder à l'application

## Annexe

### create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

### Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

### Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

#### Puppeteer

    https://keestalkstech.com/2022/08/jupyter-notebooks-vscode-dev-container-with-puppeteer-support/
#### Add chromium
    https://stackoverflow.com/questions/58997430/how-to-install-chromium-in-docker-based-on-ubuntu-19-10-and-20-04