import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import { base } from '$app/paths';
import { getPathnameWithoutBase } from '$lib/utils';
import { detectLocale, i18n, isLocale } from './i18n/i18n-util';
import { loadAllLocales } from './i18n/i18n-util.sync';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import type { Locales } from './i18n/i18n-types';

loadAllLocales();
const L = i18n();

const redirectMap = {
    'blog/hello-world': 'blog/personal/hello-world',
    'blog/multilingual-app-with-typesafe-i18n': 'blog/guide/multilingual-app-with-typesafe-i18n',
    'blog/real-time-communication-with-express': 'blog/guide/real-time-communication-with-express'
} as const;

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

    const redirectKey = Object.keys(redirectMap).find((oldPath) =>
        event.url.pathname.endsWith(oldPath)
    ) as keyof typeof redirectMap;
    if (redirectKey) {
        throw redirect(301, `${base}/${locale}/${redirectMap[redirectKey]}`);
    }

    // replace html lang attribute with correct language
    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%lang%', locale)
    });
};

/**
 * Detect the preferred language the user has configured in his browser.
 * @returns The preferred locale.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
 */
function getPreferredLocale({ request }: RequestEvent) {
    const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

    return detectLocale(acceptLanguageDetector);
}
