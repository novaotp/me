import type { EntryGenerator } from './$types';
import { convertMarkdown, importMarkdowns } from '$lib/server/markdown';
import { slugify } from '$/lib/utils/slugify';

export async function load({ params }) {
    const article = convertMarkdown(`./src/lib/articles/${params.filename}.md`);
    const latest = importMarkdowns('./src/lib/articles/')
        .filter((a) => a.filename !== params.filename)
        .sort((a, b) => b.attributes.creationDate.getTime() - a.attributes.creationDate.getTime())
        .slice(0, 3);

    // Get all the h2 as slugs
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

    // Adds a slug to every h2
    const html = article.html.split('\n').map((line) => {
        if (!line.startsWith('<h2>') || !line.endsWith('</h2>')) {
            return line;
        }

        let openTag = line.slice(0, 4);
        let content = line.slice(4, line.length - 5);
        let closeTag = line.slice(line.length - 5);

        openTag = `<h2 id="${summary.find((h2) => h2.original === content)?.slug ?? ''}">`;

        return `${openTag}${content}${closeTag}`;
    });

    article.html = html.join('\n');

    return { article, latest, summary };
}

export const entries: EntryGenerator = () => {
    const markdowns = importMarkdowns('./src/lib/articles/');

    return (['en', 'fr'] as const)
        .map((lang) => {
            return markdowns.map((markdown) => {
                return { lang: lang, filename: markdown.filename };
            });
        })
        .flat(1);
};
