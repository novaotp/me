import type { EntryGenerator } from './$types';
import { CONTENT_DIR, convertMarkdown, importArticles, latestArticles } from '$lib/server/article';
import { baseLocale, locales } from '$i18n/i18n-util';

export async function load({ params, locals: { locale } }) {
    const article = await convertMarkdown(`${CONTENT_DIR}/${locale}/${params.filename}.md`);
    const latest = await latestArticles(locale, params.filename, 2);

    return { article, latest, summary: article.summary };
}

export const entries: EntryGenerator = async () => {
    // * The locale doesn't matter.
    // * There's simply no need to have articles in both locale.
    const articles = await importArticles(baseLocale);

    return locales
        .map((locale) => {
            return articles.map((article) => {
                return { lang: locale, category: article.metadata.category, filename: article.filename };
            });
        })
        .flat();
};
