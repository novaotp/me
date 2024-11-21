import { locales } from '$i18n/i18n-util';
import { allCategories, importArticles } from '$lib/server/article';
import type { EntryGenerator } from './$types';

export async function load({ locals: { locale }, params }) {
    const articles = await importArticles(locale);
    const sortedArticles = articles
        .filter((article) => article.metadata.category === params.category)
        .sort((a, b) => b.metadata.creationDate.getTime() - a.metadata.creationDate.getTime());

    return { articles: sortedArticles, categories: await allCategories() };
}

export const entries: EntryGenerator = async () => {
    const categories = await allCategories();

    return locales.flatMap((locale) => {
        return categories.map((category) => {
            return { lang: locale, category };
        });
    });
};
