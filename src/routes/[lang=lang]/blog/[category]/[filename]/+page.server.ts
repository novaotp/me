import type { EntryGenerator } from './$types';
import { CONTENT_DIR, convertMarkdown, importArticles, getLatestArticles } from '$lib/server/article';
import { baseLocale, locales } from '$i18n/i18n-util';

export async function load({ params, locals: { locale } }) {
    const article = await convertMarkdown(`${CONTENT_DIR}/${locale}/${params.filename}.md`);
    const latest = await getLatestArticles(locale, params.filename, 2);

    return { article, latest };
}

export const entries: EntryGenerator = async () => {
    // * We only need the filename of the article, so we don't need the locale.
    const articles = await importArticles(baseLocale);

    return locales.flatMap((locale) => {
        return articles.map((article) => {
            return { lang: locale, category: article.metadata.category, filename: article.filename };
        });
    });
};
