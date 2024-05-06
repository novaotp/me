---
shortTitle: Multi-lingual support in SvelteKit
title: Adding multi-lingual support in SvelteKit, using typesafe-i18n
description: In this post, we'll cover how to set up typesafe-i18n in a SvelteKit app to support multiple languages.
creationDate: 2024-04-27
banner: /article-images/multilingual.jpg
bannerAlt: Multi-lingual support image
---

## Create the SvelteKit project

First, let's create the SvelteKit project.

```bash
npm create svelte@latest <app-name>
```

For the template, choose `Skeleton Project`. Then, for type-checking, I'll go
with Typescript (but you can choose what you prefer). And finally, for
additional options, I won't add anything since we won't need them for this
project. Feel free to add anything you'll need.

Enter inside the directory and install the dependencies.

```bash
cd <app-name> && npm install
```

## Adding typesafe-i18n

Add `typesafe-i18n` with this command. This will generate a
`.typesafe-i18n.json` file in the root of the project and a new script will
been added in `packaged.json`, named `typesafe-i18n`.

```bash
npx typesafe-i18n --setup-auto
```

Let's add a base locale inside our `.typesafe-i18n.json` file. I'll go with
`en` but feel free to choose another one.

```json
"baseLocale": "en"
```

In the `svelte.config.js` file, let's add a new alias. We will use it to access
the `i18n` folder from wherever we want without worrying about relative paths.

```js
alias: {
    $i18n: './src/i18n';
}
```

Lastly, run the following scripts in two different terminals.

This will create a folder named `i18n` inside the `src` folder if it doesn't
already exist. It will contains the translations for our app. It contains our
base locale and `de`. You can delete it or change it to another locale. I will
change it to `fr`. Feel free to explore inside.

```bash
npm run typesafe-i18n
```

And run the vite dev server to view our website in the browser.

```bash
npm run dev
```

## Adding some translations

Let's add some translations. Inside your base locale's folder inside `i18n`,
add a key for the translation and the value of the translation. Then, do the
same with your other locales. Here are mines.

```ts
// en/index.ts
const en = {
    hello: 'Hi ! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n'
} satisfies BaseTranslation;

export default en;

// fr/index.ts
const fr = {
    hello: 'Salut ! Merci de laisser une étoile si vous aimez ce projet: https://github.com/ivanhofer/typesafe-i18n'
} satisfies Translation;

export default fr;
```

## Using our translations inside the app

Let's add a `utils.ts` file in the `src` folder with the following content.

```ts
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

Let's uncomment the `Locals` interface inside `app.d.ts` and add the following.

```ts
interface Locals {
    locale: Locales;
    LL: TranslationFunctions;
}
```

Let's handle invalid locales by creating a new file `lang.ts` inside
`src/params/lang.ts`.

```ts
import type { ParamMatcher } from '@sveltejs/kit';
import { isLocale } from '../i18n/i18n-util';

// only accept valid languages as a segment in the URL
export const match: ParamMatcher = (param) => {
    return isLocale(param);
};
```

And add this inside `hooks.server.ts` (create it if needed). This will handle
preferred locale, invalid locales (by redirecting to the preferred locale) and
adding the locale and translation functions inside the request.

```ts
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
    // read language slug
    const [, lang] = getPathnameWithoutBase(event.url).split('/');

    // redirect to base locale if no locale slug was found
    if (!lang) {
        const locale = getPreferredLocale(event);

        throw redirect(307, `${base}/${locale}`);
    }

    // if slug is not a locale, use base locale (e.g. api endpoints)
    const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event);
    const LL = L[locale];

    // bind locale and translation functions to current request
    event.locals.locale = locale;
    event.locals.LL = LL;

    // replace html lang attribute with correct language
    return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
};

const getPreferredLocale = ({ request }: RequestEvent) => {
    // detect the preferred language the user has configured in his browser
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
    const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

    return detectLocale(acceptLanguageDetector);
};
```

Now, let's set up a root `+layout.server.ts` file, in which we will return the
locale, retrieved from `locals`.

```ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals: { locale } }) => {
    return { locale };
};
```

Then, let's load the translations inside our `+layout.ts` file. This will allow
us to access the translations in every route.

```ts
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data: { locale } }) => {
    // load dictionary into memory
    await loadLocaleAsync(locale);

    return { locale };
};
```

Finally, inside your root `+layout.svelte` file, set the locale. Note that this
mut be happen before accessing any translations.

```svelte
<script lang="ts">
    import { setLocale } from '$i18n/i18n-svelte';
    import type { LayoutServerData } from './$types';

    export let data: LayoutServerData;

    setLocale(data.locale);
</script>

<slot />
```

Now, create a folder `[lang=lang]` inside `routes` and move in our main page.
Let's remove the default content and show some custom text. `LL` is a readable
store that contains our translations.

```svelte
<script lang="ts">
    import LL, { locale } from '$i18n/i18n-svelte';
</script>

<h1>{$LL.hello()}</h1>
```

In the browser, the text will appear correctly, and changing the locale
manually will translate it correctly. However, it's not very practical to
change locales directly in the url. Let's implement a navbar to change it.

## Changing locales

First, let's add some translations for the languages.

```ts
// en/index.ts
const en = {
    hello: 'Hi ! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
    navigation: {
        frenchLocale: 'French',
        englishLocale: 'English'
    }
} satisfies BaseTranslation;

// fr/index.ts
const fr = {
    hello: 'Salut ! Merci de laisser une étoile si vous aimez ce projet: https://github.com/ivanhofer/typesafe-i18n',
    navigation: {
        frenchLocale: 'Français',
        englishLocale: 'Anglais'
    }
} satisfies Translation;
```

Now, let's adapt our root `+layout.svelte` file to add a navbar.

```svelte
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

You should now be able to change locales easily.

## Conclusion

Voila, now you can simply add translations inside the corresponding files and
use them inside any `+page.svelte` file. Just make sure to add them inside the
`[lang=lang]` folder to access them in the browser.

Bye for now 👋
