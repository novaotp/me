---
shortTitle: Prise en charge de plusieurs langues dans SvelteKit
title: Prise en charge de plusieurs langues dans SvelteKit, avec typesafe-i18n
description: Dans ce post, nous regarderons comment mettre en place typesafe-i18n dans une application avec SvelteKit pour couvrir plusieurs langues.
creationDate: 2024-04-27
banner: /article-images/multilingual.jpg
bannerAlt: Image pour Prise en charge de plusieurs langues dans SvelteKit
tags: ["sveltekit", "guide"]
---

## Création du projet Sveltekit

Commençons par créer le project Sveltekit.

```bash title="Terminal"
npm create svelte@latest multilingual-app
```

Pour le template, choisissez `Skeleton Project`. Puis, pour la vérification des
types, j'irai Typescript (mais tu peux choisir ce que tu préfères). Et
finalement, pour les options additionnelles, je n'ajouterai rien car on en aura
pas besoin pour ce projet. Sois libre d'en ajouter si nécessaire.

Entre dans le dossier et installe les dépendances.

```bash title="Terminal"
cd multilingual-app && npm install
```

## Ajout de typesafe-i18n

Ajoute `typesafe-i18n` avec cette commande. Cela générera un fichier
`.typesafe-i18n.json` à la racine du projet et un nouveau script sera ajouté
dans le fichier `packaged.json`, nommé `typesafe-i18n`.

```bash title="Terminal"
npx typesafe-i18n --setup-auto
```

Ajoutons une langue de base dans notre fichier `.typesafe-i18n.json`. J'irai avec
`en` mais n'hésite pas à en choisir une autre.

```json showLineNumbers {4} title=".typesafe-i18n.json"
{
    "adapter": "svelte",
    "$schema": "https://unpkg.com/typesafe-i18n@5.26.2/schema/typesafe-i18n.json",
    "baseLocale": "en"
}
```

Dans le fichier `svelte.config.js`, ajoutons un nouvel alias. Nous
l'utiliserons pour accéder au dossier `i18n` depuis n'importe où, sans nous
soucier des chemins relatifs.

```js showLineNumbers {9-11} title="svelte.config.js"
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter(),
        alias: {
            $i18n: './src/i18n'
        }
    }
};

export default config;
```

Enfin, exécute les scripts suivants dans deux terminaux différents.

Cela créera un dossier nommé `i18n` dans le dossier `src` si ce n'est pas déjà
le cas. Il contiendra les traductions de notre application. Il contient notre
paramètres de langue de base et `de`. Tu peux le supprimer ou le remplacer par
un autre paramètre de langue. Je vais le changer en `fr`. N'hésite pas à
explorer à l'intérieur du dossier.

```bash title="Terminal"
npm run typesafe-i18n
```

Et exécute le serveur de développement `vite` pour afficher notre site web dans
le navigateur.

```bash title="Terminal"
npm run dev
```

## Ajoutons des traductions

Ajoutons quelques traductions. Dans le dossier de ta langue de base à
l'intérieur de `i18n`, ajoute une clé pour la traduction et et sa valeur.
Ensuite, effectue la même chose avec tes autres langues. Voici les miennes.

```ts showLineNumbers title="i18n/en/index.ts"
// en/index.ts
const en = {
    hello: 'Hi ! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n'
} satisfies BaseTranslation;

export default en;
```

```ts showLineNumbers title="i18n/fr/index.ts"
// fr/index.ts
const fr = {
    hello: 'Salut ! Merci de laisser une étoile si vous aimez ce projet: https://github.com/ivanhofer/typesafe-i18n'
} satisfies Translation;

export default fr;
```

## Utilisons nos traductions dans l'application

Ajoutons un fichier `utils.ts` dans le dossier `src` avec le contenu suivant.

```ts showLineNumbers title="utils.ts"
import { base } from '$app/paths';

// e.g. https://mywebsite.com/en/blog/article-1 => /de/blog/article-1
export const replaceLocaleInUrl = (url: URL, locale: string, full = false): string => {
    const [, , ...rest] = getPathnameWithoutBase(url).split('/');
    const new_pathname = `/${[locale, ...rest].join('/')}`;
    if (!full) {
        return `${new_pathname}${url.search}`;
    }
    const newUrl = new URL(url.toString());
    newUrl.pathname = base + new_pathname;
    return newUrl.toString();
};

// ----------------------------------------------------------------------------

const REGEX_START_WITH_BASE = new RegExp(`^${base}`);

export const getPathnameWithoutBase = (url: URL) => url.pathname.replace(REGEX_START_WITH_BASE, '');
```

Décommentons l'interface `Locals` dans `app.d.ts` et ajoutons ce qui suit.

```ts showLineNumbers {4-7} title="app.d.ts"
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            locale: Locales;
            LL: TranslationFunctions;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
```

Gérons les langues invalides en créant un nouveau fichier `lang.ts` à
l'intérieur du dossier `src/params`.

```ts showLineNumbers title="params/lang.ts"
import type { ParamMatcher } from '@sveltejs/kit';
import { isLocale } from '../i18n/i18n-util';

// Accepte uniquement les langues valides dans l'URL.
export const match: ParamMatcher = (param) => {
    return isLocale(param);
};
```

Et ajoute ceci dans `hooks.server.ts` (crée-le si nécessaire). Cela gérera la
langue préférée, les langues invalides (en redirigeant vers la langue préférée)
et ajoutera les fonctions de langue et de traduction dans la requête.

```ts showLineNumbers title="hooks.server.ts"
import { base } from '$app/paths';
import type { Locales } from './i18n/i18n-types';
import { detectLocale, i18n, isLocale } from './i18n/i18n-util';
import { loadAllLocales } from './i18n/i18n-util.sync';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { getPathnameWithoutBase } from './utils';

loadAllLocales();
const L = i18n();

export const handle: Handle = async ({ event, resolve }) => {
    // Obtention de la langue depuis l'URL
    const [, lang] = getPathnameWithoutBase(event.url).split('/');

    // Redirection vers la langue préférée si l'URL ne contient pas de langue
    if (!lang) {
        const locale = getPreferredLocale(event);

        throw redirect(307, `${base}/${locale}`);
    }

    // Si la langue n'est pas valide, utiliser la langue préférée
    const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event);
    const LL = L[locale];

    // Ajout de la langue et des fonctions de traductions dans la requête
    event.locals.locale = locale;
    event.locals.LL = LL;

    // Remplace l'attribut lang avec la langue de l'URL
    return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
};

const getPreferredLocale = ({ request }: RequestEvent) => {
    // Obtient la langue préférée défini dans le navigateur
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
    const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

    return detectLocale(acceptLanguageDetector);
};
```

Maintenant, créons un fichier à la racine nommé `+layout.server.ts`, dans
lequel nous renverrons la langue, extrait de `locals`.

```ts showLineNumbers title="+layout.server.ts"
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals: { locale } }) => {
    return { locale };
};
```

Ensuite, chargeons les traductions dans notre fichier `+layout.ts`. Cela
nous permettra d'accéder aux traductions depuis n'importe quelle route.

```ts showLineNumbers title="+layout.ts"
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data: { locale } }) => {
    // load dictionary into memory
    await loadLocaleAsync(locale);

    return { locale };
};
```

Enfin, dans ton fichier racine `+layout.svelte`, définissez la langue. Note que
cela doit être effectué avant d'accéder à des traductions.

```svelte showLineNumbers title="+layout.svelte"
<script lang="ts">
    import { setLocale } from '$i18n/i18n-svelte';
    import type { LayoutData } from './$types';

    export let data: LayoutData;

    setLocale(data.locale);
</script>

<slot />
```

Maintenant, créons un dossier `[lang=lang]` dans `src/routes` et mettons-y
notre page principale. Supprimons le contenu par défaut et affichons du texte
personnalisé. `LL` est un store qui contient nos traductions.

```svelte showLineNumbers title="+page.svelte"
<script lang="ts">
    import LL, { locale } from '$i18n/i18n-svelte';
</script>

<h1>{$LL.hello()}</h1>
```

Dans le navigateur, le texte apparaîtra correctement et changer la langue
manuellement le traduira correctement. Cependant, ce n'est pas très pratique de
changer la langue directement dans l'URL. Implémentons une barre de navigation
pour la changer.

## Modifier la langue

D'abord, ajoutons de nouvelles traductions pour les langues.

```ts showLineNumbers {4-7} title="i18n/en/index.ts"
// en/index.ts
const en = {
    hello: 'Hi ! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
    navigation: {
        frenchLocale: 'French',
        englishLocale: 'English'
    }
} satisfies BaseTranslation;
```

```ts showLineNumbers {4-7} title="i18n/fr/index.ts"
// fr/index.ts
const fr = {
    hello: 'Salut ! Merci de laisser une étoile si vous aimez ce projet: https://github.com/ivanhofer/typesafe-i18n',
    navigation: {
        frenchLocale: 'Français',
        englishLocale: 'Anglais'
    }
} satisfies Translation;
```

Puis, adaptons notre fichier `+layout.svelte` à la racine du dossier
`src/routes` pour y ajouter notre barre de navigation.

```svelte showLineNumbers {3-38,45-49,51} title="+layout.svelte"
<script lang="ts">
    import type { LayoutData } from './$types';
    import LL, { locale, setLocale } from '$i18n/i18n-svelte';
    import type { Locales } from '$i18n/i18n-types';
    import { locales } from '$i18n/i18n-util';
    import { loadLocaleAsync } from '$i18n/i18n-util.async';
    import { replaceLocaleInUrl } from '../utils';
    import { browser } from '$app/environment';
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';

    function isLocale(locale: string): locale is Locales {
        return locales.includes(locale as Locales);
    }

    const switchLocale = async (newLocale: string | Locales, updateHistoryState = true) => {
        if (!newLocale || $locale === newLocale) return;
        if (!isLocale(newLocale)) return;

        await loadLocaleAsync(newLocale);
        setLocale(newLocale);

        if (updateHistoryState) {
            history.pushState({ locale: newLocale }, '', replaceLocaleInUrl($page.url, newLocale));
        }

        await invalidateAll();
    };

    // update `lang` attribute
    $: browser && document.querySelector('html')!.setAttribute('lang', $locale);

    // update locale when page store changes
    $: if (browser) {
        const lang = $page.params.lang as Locales;
        switchLocale(lang, false);
        history.replaceState({ ...history.state, locale: lang }, '', replaceLocaleInUrl($page.url, lang));
    }

    export let data: LayoutData;

    setLocale(data.locale);
</script>

<nav>
    <a rel="alternate" href={replaceLocaleInUrl($page.url, 'en')}>{$LL.navigation.englishLocale()}</a>
    <a rel="alternate" href={replaceLocaleInUrl($page.url, 'fr')}>{$LL.navigation.frenchLocale()}</a>
</nav>
<main>
    <slot />
</main>
```

Tu devrais désormais pouvoir changer de langue facilement. 

## Conclusion

Voilà, maintenant tu peux simplement ajouter des traductions dans les fichiers
correspondants et les utiliser dans n'importe quel fichier `+page.svelte`.
Assure-toi juste de les ajouter à l'intérieur du dossier `[lang=lang]` pour y
accéder dans le navigateur.

Au revoir pour l'instant 👋
