import { base } from '$app/paths';
import type { Locales } from '$i18n/i18n-types';

/**
 * Constructs a cross-locale url from the given params.
 * @param locale The current locale.
 * @param relativeHref The relative href.
 * @returns The contructed url.
 */
export function constructUrl(locale: Locales, relativeHref: string): string {
    if (relativeHref.startsWith('/')) {
        relativeHref = relativeHref.substring(1);
    }

    return `${base}/${locale}/${relativeHref}`;
};
