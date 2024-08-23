---
shortTitle: Communication en temps réel avec Express
title: Implémentation de la communication en temps réel avec Express et SocketIO
description: Créons une application de messagerie, en utilisant SocketIO + Express pour le backend et n'importe quel frontend.
creationDate: 2024-05-08
banner: /article-images/real-time-communication.webp
bannerAlt: Image pour Communication en temps réel avec Express
category: guide
---

## Une introduction au CTR

La communication en temps réel, ou CTR en abrégé, décrit les communications en
direct avec peu ou pas de latence. Elle est utilisée dans les systèmes de
messagerie, l'envoi de notifications et bien plus encore. Aujourd'hui, nous
allons explorer comment configurer notre propre serveur Express pour créer une
application de messagerie simple entre deux utilisateurs différents.

## Mise en place du frontend

Puisque cet article se concentre sur le backend, je n'entrerai pas dans les
détails sur la mise en place du frontend ou comment le structurer. J'utiliserai
SvelteKit mais l'implémentation ne différera guère pour les intégrations avec
d'autres frameworks tels que NextJS ou NuxtJS, ou même en vanilla JS.

## Création de l'application Express

D'abord, initialisons le fichier `package.json`.

```bash title="Terminal"
npm init -y
```

Ensuite, modifions/ajoutons ce qui suit dans le fichier `package.json`.

```json {5-9} showLineNumbers title="package.json"
{
    "name": "server",
    "version": "1.0.0",
    "description": "",
    "main": "src/app.ts",
    "type": "module",
    "scripts": {
        "start": "nodemon --exec \"node --import ./ts-loader.js\" --experimental-specifier-resolution=node src/app.ts"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}
```

Puis, installons les dépendances nécessaires pour notre serveur.

```bash title="Terminal"
npm install cors dotenv express socket.io
npm install --save-dev @types/node @types/express ts-node typescript nodemon
```

Cela installera les modules `cors` pour gérer les requêtes émanant d'une
origine autre que celle du serveur, `dotenv` pour charger les variables
d'environnement dans notre serveur, `express` pour l'application elle-même et
`socket.io` pour permettre la communication en temps réel.

Nous ajoutons également les types nécessaires pour notre application.

Créons un fichier `tsconfig.json` manuellement ou avec `npx tsc --init` et
modifions son contenu avec ce qui suit. N'hésite pas à ajuster quoi que ce
soit.

```json showLineNumbers title="tsconfig.json"
{
    "compilerOptions": {
        "target": "es2016",
        "module": "ES6",
        "moduleResolution": "Bundler",
        "allowImportingTsExtensions": true,
        "allowJs": false,
        "noEmit": true,
        "verbatimModuleSyntax": true,
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        "useUnknownInCatchVariables": false,
        "skipLibCheck": true
    },
    "include": ["./src/**/*.ts"],
    "exclude": ["./node_modules/**"]
}
```

Maintenant, ajoutons une fichier `ts-loader.js` à la racine de l'application
express. Cela nous permettra de ne pas recontrer de problèmes avec esm et ts.

```js showLineNumbers title="ts-loader.js"
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));
```

Ajoute un fichier `.env` et remplis-le avec les ports que t'utiliseras.

```env showLineNumbers title=".env"
FRONTEND_URL=localhost:5174
SERVER_PORT=4000
```

Ensuite, définissons notre fichier principal `src/app.ts`.

```ts showLineNumbers title="app.ts"
import express from "express";
import dotenv from 'dotenv';
import cors from "cors";

// Chargement des variables d'environnement dans notre application.
dotenv.config();

// Création de l'application express.
const app = express();

// Autoriser toute requête provenant de notre frontend.
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

// Une simple route pour tester notre application.
app.get("/", (req, res) => {
    res.status(200).send("Hello from Express !")
});

// Écoute de notre application sur le port défini.
app.listen(process.env.SERVER_PORT, () => {
    console.log(`[Server] Running on port ${process.env.SERVER_PORT}`);
});
```

Enfin, démarre l'application et accéde à l'URL du serveur. Tu seras accueilli
par Express.

```bash title="Terminal"
npm start
```

## Implémentation de SocketIO

Maintenant, ajoutons SocketIO dans notre serveur et dans notre frontend.

### Dans Express

Adaptons notre application Express avec ce qui suit.

```ts {4-5,12-15,22-35} showLineNumbers title="app.ts"
import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// Chargement des variables d'environnement dans notre application.
dotenv.config();

// Création de l'application express.
const app = express();
// Création d'un serveur http avec l'application Express.
const server = createServer(app);
// Création d'un serveur IO.
const io = new Server(server);

// Autoriser toute requête provenant de notre frontend.
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

// Se déclenche lorsqu'une nouvelle connexion avec le serveur a été créée.
io.on("connection", (socket) => {
    console.log("New user connected.")

    // Se déclenche lorsqu'une connexion a été coupée du serveur, par ex. un rechargement de page.
    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });
});

// Écoute de notre application sur le port défini.
server.listen(process.env.SERVER_PORT, () => {
    console.log(`[Server] Running on port ${process.env.SERVER_PORT}`);
});
```

Dans le script ci-dessus, nous ajoutons un serveur HTTP, sur lequel nous
écouterons à la place de l'application Express et SocketIO pour écouter les
connexions et déconnexions.

### Dans notre frontend

Commençons par installer le module client pour `socket.io`.

```bash title="Terminal"
npm install socket.io-client
```

Ensuite, créons un fichier `socket.ts` à partir duquel nous importerons notre
socket.

```ts showLineNumbers title="socket.ts"
import { Socket, io } from "socket.io-client";

/** Le client socket. */
export let socket: Socket | null = null;

/** Initialise la connexion socket si elle n'est pas déjà définie. */
export async function initSocket() {
    if (socket !== null) return;

    // Adapter l'URL au besoin
    const _socket = io('http://localhost:4000', {
        transports: ['websocket'],
        upgrade: false
    });

    _socket.on('connection', () => {
        console.log('Connected');
    });

    socket = _socket;
}
```

Maintenant, importons la fonction `initSocket` dans la page et appelons-la
après que l'application soit montée sur le navigateur. Adapte-le à ton
frontend.

```svelte showLineNumbers title="+page.svelte"
<script lang="ts">
    import { initSocket } from "$lib/socket";
    import { onMount } from "svelte";

    onMount(async () => {
        await initSocket();
    });
</script>

<p>Our chat app</p>
```

Tu devrais maintenant voir les logs dans l'application Express lorsque tu
recharges la page.

## Envoi de messages

Enfin, nous travaillerons sur l'envoi d'un message d'un client et sa
transmission vers d'autres utilisateurs connectés, un peu comme une discussion
de groupe (PS : si tu souhaites l'envoyer à un client spécifique, tu devras
stocker un dictionnaire des userIds/sessionIds, et diffusez le message avec la
méthode `to`, mais je n'entrerai pas dans les détails car cet article est
plutôt une introduction aux websockets).

### Dans notre serveur

À l'intérieur de la fonction `io.connection` et après l'appel
`socket.on("disconnect")`, nous ahjouterons un événement pour recevoir un
message et le diffuser à tout le monde, y compris nous-mêmes. Habituellement,
tu connecteras une base de données pour stocker les messages puisqu’ils
disparaîtront après un rechargement de page.

```ts showLineNumbers {31-34} title="app.ts"
import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// Chargement des variables d'environnement dans notre application.
dotenv.config();

// Création de l'application express.
const app = express();
// Création d'un serveur http avec l'application Express.
const server = createServer(app);
// Création d'un serveur IO.
const io = new Server(server);

// Autoriser toute requête provenant de notre frontend.
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

// Se déclenche lorsqu'une nouvelle connexion avec le serveur a été créée.
io.on("connection", (socket) => {
    console.log("New user connected.")

    // Se déclenche lorsqu'une connexion a été coupée du serveur, par ex. un rechargement de page.
    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });

    // Reçoit un message et le diffuse à tous le monde, y compris l'expéditeur.
    socket.on("message", (message: string) => {
        io.emit("message", { sender: socket.id, message });
    });
});
```

### Dans notre frontend

Mettons à jour notre page pour envoyer des messages, les recevoir et les
afficher.

```svelte showLineNumbers {5-6,11-14,17-21,25-30} title="+page.svelte"
<script lang="ts">
    import { initSocket, socket } from "$lib/socket";
    import { onMount } from "svelte";

    let message: string = "";
    let messages: { sender: string, message: string }[] = [];

    onMount(async () => {
        await initSocket();

        // Quelqu'un (ou nous) a envoyé un message. Ajoutons-le aux messages.
        socket?.on("message", (message) => {
            messages = [...messages, message];
        });
    });

    async function sendMessage() {
        // Envoie un message à l'événement message.
        socket?.emit("message", message);
        message = "";
    }
</script>

<p>Our chat app</p>
<input bind:value={message} />
<button on:click={sendMessage}>Send</button>
<p>Messages</p>
{#each messages as message}
    <div>Sender : {message.sender} | Message : {message.message}</div>
{/each}
```

Tu peux le tester en ouvrant deux onglets/navigateurs distincts et en envoyant
un message. L'autre sera également mis à jour !

## Conclusion

Nous avons désormais notre propre serveur websocket opérationnel et prêt à
construire le prochain réseau social ! Je plaisante.. De toute façon, on peut
faire beaucoup de choses avec SocketIO. Consulte leur
[documentation officielle](https://socket.io/docs/v4/) pour savoir plus.

En attendant, au revoir ! 👋
