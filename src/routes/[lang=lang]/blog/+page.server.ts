import { importArticles } from '$/lib/server/article';
import type { EntryGenerator } from './$types';

export async function load({ locals: { locale } }) {
    const articles = await importArticles(`./src/articles/${locale}/`);
    const sortedArticles = articles.sort((a, b) => b.metadata.creationDate.getTime() - a.metadata.creationDate.getTime());

    const duplicateCategories = sortedArticles.reduce((acc, curr) => [...acc, curr.metadata.category], [] as string[]);
    const uniqueCategories = Array.from(new Set(duplicateCategories));

    return { articles: sortedArticles, categories: uniqueCategories };
}

export const entries: EntryGenerator = () => {
    return [{ lang: 'fr' }, { lang: 'en' }];
};
