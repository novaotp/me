import type { EntryGenerator } from './$types';
import { convertMarkdown, importArticles, latestArticles } from '$lib/server/article';
import { locales } from '$i18n/i18n-util';

export async function load({ params, locals: { locale } }) {
    const article = await convertMarkdown(`./src/articles/${locale}/${params.filename}.md`);
    const latest = await latestArticles(`./src/articles/${locale}/`, article.filename, 4);

    return { article, latest, summary: article.summary };
}

export const entries: EntryGenerator = async () => {
    /** Generates article paths for each locale. */
    function generateArticlePaths(): Promise<{ lang: string, filename: string }[]>[] {
        return locales.map(async (locale) => {
                            const markdowns = await importArticles(`./src/articles/${locale}/`)

                            return markdowns.map((markdown) => {
                                return { lang: locale, filename: markdown.filename };
                            });
                        });
    }

    const asyncArticlePaths = generateArticlePaths();
    const articlePaths = await Promise.all(asyncArticlePaths);

    return articlePaths.flat();
};
