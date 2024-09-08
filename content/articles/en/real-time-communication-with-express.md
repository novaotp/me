---
shortTitle: Real-Time Communication with Express
title: Implementing Real-Time Communication with Express
description: Let's create a chat app, using SocketIO and Express for our backend with any frontend.
creationDate: 2024-05-08
banner: /article-images/real-time-communication.webp
bannerAlt: Real-Time Communication Image
category: guides
---

## An introduction to RTC

Real-time communication, or RTC for short, describes live communications with
little to no latency. It's used for messaging, notifications and much more.
Today, we'll explore how to set up our own server for a basic chat app between
two different users.

## Setting up the frontend

Since this article is focused around the backend, I won't go into details about
creating the frontend or how to structure it. I'll be using SvelteKit but it
won't differ a lot for integrations with other frameworks such as NextJS or
NuxtJS, or even in vanilla JS.

## Creating our express app

First, initialize the `package.json` file.

```bash title="Terminal"
npm init -y
```

Next, modify/add the following inside the `package.json` file.

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

Let's install the necessary dependencies.

```bash title="Terminal"
npm install cors dotenv express socket.io
npm install --save-dev @types/node @types/express ts-node typescript nodemon
```

This will install `cors` for handling Cross-Origin requests to our server,
`dotenv` to load environment variables inside our app, `express` for writing
the app itself and `socket.io` for enabling real-time communication.

It will also add the necessary types for our app.

Create a `tsconfig.json` file manually or with `npx tsc --init` and modify its
content with the following. Feel free to adjust anything.

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

Now, add `ts-loader.js` file in the root of the express app. This will allow
us to not encounter issues with esm and ts.

```js showLineNumbers title="ts-loader.js"
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));
```

Add a `.env` file and fill it with the port you'll use.

```env showLineNumbers title=".env"
FRONTEND_URL=localhost:5174
SERVER_PORT=4000
```

Then, let's define our main `src/app.ts` file.

```ts showLineNumbers title="app.ts"
import express from "express";
import dotenv from 'dotenv';
import cors from "cors";

// Load the env variables inside our app.
dotenv.config();

// Create the express app.
const app = express();

// Authorize any requests coming from our frontend url.
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

// A basic endpoint to test our app.
app.get("/", (req, res) => {
    res.status(200).send("Hello from Express !")
});

// Listen to our app at our defined port.
app.listen(process.env.SERVER_PORT, () => {
    console.log(`[Server] Running on port ${process.env.SERVER_PORT}`);
});
```

Finally, start the app and go to the server's url. You'll be greeted by Express.

```bash title="Terminal"
npm start
```

## Implementing SocketIO

Now, let's add SocketIO inside our server and our frontend.

### Inside Express

Adapt our express app with the following.

```ts {4-5,12-15,22-35} showLineNumbers title="app.ts"
import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// Load the env variables inside our app.
dotenv.config();

// Create the express app.
const app = express();
// Create an http server from the express app.
const server = createServer(app);
// Create an io server.
const io = new Server(server);

// Authorize any requests coming from our frontend url.
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

// Fires when a new connection with the server has been created.
io.on("connection", (socket) => {
    console.log("New user connected.")

    // Fires when a connection has been severed from the server, e.g. a page reload.
    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });
});

// Listen to our app at our defined port.
server.listen(process.env.SERVER_PORT, () => {
    console.log(`[Server] Running on port ${process.env.SERVER_PORT}`);
});
```

We're adding an HTTP server, on which we'll listen instead of the express app
and SocketIO to listen for incoming connections and disconnections.

### Inside our frontend

First, install the client for `socket.io`.

```bash title="Terminal"
npm install socket.io-client
```

Next, create a `socket.ts` file from which we'll import our socket.

```ts showLineNumbers title="socket.ts"
import { Socket, io } from "socket.io-client";

/** The socket client. */
export let socket: Socket | null = null;

/** Initializes the socket connection if it isn't already set. */
export async function initSocket() {
    if (socket !== null) return;

    // Adapt the url if needed.
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

Now, import the `initSocket` function inside the page and call it after it
mounts. Adapt it to your frontend.

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

You should now see logs in the express app when you reload the page.

## Sending messages

Finally, we'll work on sending a message from a client and transmit it to the
other connected users, kind of like a group chat (PS: if you want to send it
to a specific client, you'll need to store a map of userIds/sessionIds, and
broadcast it with the `to` method, however I won't go into details since it's
more of an introduction to websockets).

### Inside our server

Inside the `io.connection` function and after the `socket.on("disconnect")`
call, we'll have a socket event to receive a message and broadcast it to
everyone else including ourselves. Usually, you'd hook up a database to store
the messages since they will disappear after a page reload.

```ts showLineNumbers {31-34} title="app.ts"
import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// Load the env variables inside our app.
dotenv.config();

// Create the express app.
const app = express();
// Create an http server from the express app.
const server = createServer(app);
// Create an io server.
const io = new Server(server);

// Authorize any requests coming from our frontend url.
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

// Fires when a new connection with the server has been created.
io.on("connection", (socket) => {
    console.log("New user connected.")

    // Fires when a connection has been severed from the server, e.g. a page reload.
    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });

    // Receives a message and broadcasts it to everyone else, including the sender.
    socket.on("message", (message: string) => {
        io.emit("message", { sender: socket.id, message });
    });
});

// Listen to our app at our defined port.
server.listen(process.env.SERVER_PORT, () => {
    console.log(`[Server] Running on port ${process.env.SERVER_PORT}`);
});
```

### Inside our frontend

Let's update our page to send messages, receive and display them.

```svelte showLineNumbers {5-6,11-14,17-21,25-30} title="+page.svelte"
<script lang="ts">
    import { initSocket, socket } from "$lib/socket";
    import { onMount } from "svelte";

    let message: string = "";
    let messages: { sender: string, message: string }[] = [];

    onMount(async () => {
        await initSocket();

        // Someone (or us) has sent a message. We'll add it to the messages.
        socket?.on("message", (message) => {
            messages = [...messages, message];
        });
    });

    async function sendMessage() {
        // Send a message to the message event.
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

You can test it by opening two separate tabs/browsers and sending a message.
The other one will also update !

## Conclusion

We now have our own websocket server fired up and ready to build the next
social media ! I'm just kidding.. In any case, you can do a lot of things with
SocketIO. Check their [official documentation](https://socket.io/docs/v4/) to
know more.

Until then, bye ! 👋
