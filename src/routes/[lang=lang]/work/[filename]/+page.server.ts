import { baseLocale, locales } from '$i18n/i18n-util';
import { importWork, importWorks } from '$lib/server/work';
import type { EntryGenerator } from './$types';

export const load = async ({ locals, params }) => {
    const work = await importWork(locals.locale, params.filename);

    return { work };
};

export const entries: EntryGenerator = async () => {
    // * We only need the filename of the work, so we don't need the locale.
    const works = await importWorks(baseLocale);

    return locales.flatMap((locale) => {
        return works.map((work) => {
            return { lang: locale, filename: work.filename };
        });
    });
};
