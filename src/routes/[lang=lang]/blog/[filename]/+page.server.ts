import type { EntryGenerator } from './$types';
import { convertMarkdown, importMarkdowns } from '$lib/server/markdown';
import { slugify } from '$/lib/utils/slugify';
import { locales } from '$/i18n/i18n-util';

/** Adds a slug id to the h2, so you can navigate to it. */
function addSlugifiedId(html: string): string {
    return html.replace(/<h2([^>]*?)>(.*?)<\/h2>/gis, (match, attributes, content) => {
        const id = slugify(content.trim());
        return `<h2 id="${id}" ${attributes}>${content}</h2>`;
    });
}

/** Adds target="_blank" to all anchor tags. */
function addTargetBlank(html: string): string {
    return html.replaceAll(/<a([^>]+)>/g, (match) => {
        return match.replace(/>/, ' target="_blank">');
    });
}

/** Generates a summary using the h2 headers. */
function generateSummary(html: string): { original: string, slug: string }[] {
    return html
            .split('\n')
            .filter((line) => line.startsWith('<h2>') && line.endsWith('</h2>'))
            .map((h2) => h2.replaceAll('<h2>', ''))
            .map((h2) => h2.replaceAll('</h2>', ''))
            .map((h2) => {
                return {
                    original: h2,
                    slug: slugify(h2)
                };
            });
}

export async function load({ params, locals: { locale } }) {
    const article = await convertMarkdown(`./src/articles/${locale}/${params.filename}.md`);
    const latest = (await importMarkdowns(`./src/articles/${locale}/`))
        .filter((a) => a.filename !== params.filename)
        .sort((a, b) => b.attributes.creationDate.getTime() - a.attributes.creationDate.getTime())
        .slice(0, 3);

    const summary = generateSummary(article.html);

    article.html = addSlugifiedId(article.html);
    article.html = addTargetBlank(article.html);

    return { article, latest, summary };
}

export const entries: EntryGenerator = async () => {
    /** Generates article paths for each locale. */
    function generateArticlePaths(): Promise<{ lang: string, filename: string }[]>[] {
        return locales.map(async (locale) => {
                            const markdowns = await importMarkdowns(`./src/articles/${locale}`)

                            return markdowns.map((markdown) => {
                                return { lang: locale, filename: markdown.filename };
                            });
                        });
    }

    const asyncArticlePaths = generateArticlePaths();
    const articlePaths = await Promise.all(asyncArticlePaths);

    return articlePaths.flat();
};
