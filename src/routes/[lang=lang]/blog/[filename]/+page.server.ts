import type { EntryGenerator } from './$types';
import { convertMarkdown, importMarkdowns } from '$lib/server/markdown';
import { slugify } from '$/lib/utils/slugify';

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

export async function load({ params }) {
    const article = await convertMarkdown(`./src/lib/articles/${params.filename}.md`);
    const latest = (await importMarkdowns('./src/lib/articles/'))
        .filter((a) => a.filename !== params.filename)
        .sort((a, b) => b.attributes.creationDate.getTime() - a.attributes.creationDate.getTime())
        .slice(0, 3);

    const summary = article.html
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

    article.html = addSlugifiedId(article.html);
    article.html = addTargetBlank(article.html);

    console.log(article.html)

    return { article, latest, summary };
}

export const entries: EntryGenerator = async () => {
    const markdowns = await importMarkdowns('./src/lib/articles/');

    return (['en', 'fr'] as const)
        .map((lang) => {
            return markdowns.map((markdown) => {
                return { lang: lang, filename: markdown.filename };
            });
        })
        .flat();
};
