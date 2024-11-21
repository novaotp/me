import { importWorks } from '$lib/server/work';
import type { EntryGenerator } from './$types';

export const load = async ({ locals }) => {
    const works = await importWorks(locals.locale);

    return { works };
};

export const entries: EntryGenerator = () => {
    return [{ lang: 'fr' }, { lang: 'en' }];
};
