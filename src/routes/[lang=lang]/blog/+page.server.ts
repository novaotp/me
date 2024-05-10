import { importMarkdowns } from '$lib/server/markdown';
import type { EntryGenerator } from './$types';

export async function load({ locals: { locale } }) {
    const articles = await importMarkdowns(`./src/articles/${locale}/`);

    return { articles };
}

export const entries: EntryGenerator = () => {
    return [{ lang: 'fr' }, { lang: 'en' }];
};
