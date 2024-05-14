import { importArticles } from '$/lib/server/article';
import type { EntryGenerator } from './$types';

export async function load({ locals: { locale } }) {
    const articles = await importArticles(`./src/articles/${locale}/`);

    return { articles };
}

export const entries: EntryGenerator = () => {
    return [{ lang: 'fr' }, { lang: 'en' }];
};
