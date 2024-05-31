import { importArticles } from '$/lib/server/article';
import type { EntryGenerator } from './$types';

export async function load({ locals: { locale } }) {
    const articles = await importArticles(`./src/articles/${locale}/`);
    const sortedArticles = articles.sort((a, b) => b.metadata.creationDate.getTime() - a.metadata.creationDate.getTime());

    const tagsWithCount: Record<string, number> = {};

    sortedArticles.forEach(article => {
        article.metadata.tags.forEach(tag => {
            if (Object.keys(tagsWithCount).includes(tag)) {
                tagsWithCount[tag]++;
            } else {
                tagsWithCount[tag] = 1;
            }
        })
    });

    return { articles: sortedArticles, tagsWithCount: Object.entries(tagsWithCount) };
}

export const entries: EntryGenerator = () => {
    return [{ lang: 'fr' }, { lang: 'en' }];
};
