import { base } from '$app/paths';

/**
 * Replaces the locale of the given url with a new one.
 * @param url The url to modify.
 * @param locale The new target locale for the url.
 * @param full If the url should be returned starting with {@link base | base}.
 * @returns The new url with the locale changed to the given locale.
 * @example
 * const newUrl = replaceLocaleInUrl("https://mywebsite.com/en/blog/article-1", "de");
 * console.log(newUrl); // /de/blog/article-1
 */
export const replaceLocaleInUrl = (url: URL, locale: string, full = false): string => {
    // "", locale, the rest
    const [, , ...rest] = getPathnameWithoutBase(url).split('/');
    const newPathname = `${[locale, ...rest].join('/')}`;

    if (!full) {
        return `/${newPathname}${url.search}`;
    }

    const newUrl = new URL(url.toString());
    newUrl.pathname = base + newPathname;
    return newUrl.toString();
};

// ----------------------------------------------------------------------------

const REGEX_START_WITH_BASE = new RegExp(`^${base}`);

/** Removes the `base` from the given url. */
export function getPathnameWithoutBase(url: URL) {
    return url.pathname.replace(REGEX_START_WITH_BASE, '');
}
