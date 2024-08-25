import { locales } from '$i18n/i18n-util';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
    return locales.map((locale) => {
        return { lang: locale };
    });
};
