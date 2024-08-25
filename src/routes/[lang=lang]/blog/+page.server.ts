import { locales } from '$i18n/i18n-util';
import { allCategories, importArticles } from '$lib/server/article';
import type { EntryGenerator } from './$types';

export async function load({ locals: { locale } }) {
    const articles = await importArticles(locale);
    const sortedArticles = articles.sort((a, b) => b.metadata.creationDate.getTime() - a.metadata.creationDate.getTime());

    return { articles: sortedArticles, categories: await allCategories() };
}

export const entries: EntryGenerator = () => {
    return locales.map((locale) => {
        return { lang: locale };
    });
};
