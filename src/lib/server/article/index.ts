import fs from 'fs';
import { globSync } from 'glob';
import frontmatter from 'front-matter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import htmlify from 'rehype-stringify';
import { dev } from '$app/environment';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import { stripTrailingSlash } from '$/lib/utils/strip-trailing-slash';
import { slugify } from '$/lib/utils/slugify';

export interface ArticleMetadata {
    shortTitle?: string;
    title: string;
    description: string;
    creationDate: Date;
    banner: string;
    bannerAlt?: string;
}

export interface Article {
    /** The full path of the article file. */
    path: string;
    /** The name of the file containing the article. */
    filename: string;
    /** The article's metadata. */
    metadata: ArticleMetadata;
    /** The HTML content of the article. */
    html: string;
    /** The article's summary. */
    summary: Summary;
}

/**
 * Imports all the articles in the given path.
 * @param path The path to the folder containing the articles.
 * @returns An array of articles.
 */
export async function importArticles(path: string): Promise<Article[]> {
    const fileNames = globSync(`${stripTrailingSlash(path)}/*.md`);
    const asyncArticles = fileNames.map(async (path) => await convertMarkdown(path));
    return await Promise.all(asyncArticles);
}

/**
 * Returns an amount of the latest articles, not matching the current one.
 * @param path The path to the articles folder.
 * @param currentFilename The currently viewed filename, as to not have it when viewing its own page.
 * @param count The number of articles to get.
 * @returns An amount of the latest articles.
 */
export async function latestArticles(path: string, currentFilename: string, count: number = 3): Promise<Article[]> {
    const articles = await importArticles(path);
    return articles
            .filter((a) => a.filename !== currentFilename)
            .sort((a, b) => b.metadata.creationDate.getTime() - a.metadata.creationDate.getTime())
            .slice(0, count)
}

/**
 * Convert a markdown file to an object with attributes and html.
 * @param path The path to the markdown file.
 * @returns The markdown data for the given file path.
 */
export async function convertMarkdown(path: string): Promise<Article> {
    const file = fs.readFileSync(path, 'utf8');
    const { attributes, body } = frontmatter<ArticleMetadata>(file);

    const html = (
        await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(htmlify)
            .use(rehypePrettyCode, { theme: 'one-dark-pro' })
            .use(rehypeStringify)
            .process(body)
    ).value.toString();

    return {
        path: path,
        filename: path
            .split(dev ? '\\' : '/')
            .at(-1)!
            .split('.')
            .at(0)!,
        metadata: attributes,
        html: transform(html),
        summary: generateSummary(html)
    };
}

/**
 * Transforms the HTML with more features.
 *
 * **INTERNAL, ONLY EXPORTED FOR TESTING.**
 */
export function transform(html: string): string {
    return addTargetBlank(addSlugifiedId(html));
}

/**
 * Adds a slugified id to the h2 heading, so you can navigate to it.
 * @param html The HTML in which to modify the h2 heading.
 * @returns The modified HTML.
 */
export function addSlugifiedId(html: string): string {
    return html.replace(/<h2([^>]*?)>(.*?)<\/h2>/gis, (match, attributes, content) => {
        const id = slugify(content.trim());
        return `<h2 id="${id}"${attributes}>${content}</h2>`;
    });
}

/**
 * Adds `target="_blank"` to all the anchor tags of the given HTML.
 * @param html The HTML in which to modify the anchor tags.
 * @returns The modified HTML.
 */
export function addTargetBlank(html: string): string {
    return html.replace(/<a([^>]+)>/g, (match) => {
        const hasTargetBlank = match.includes('target="_blank"');
        return hasTargetBlank ? match : match.replace(/>/, ' target="_blank">');
    });
}

export type Summary = { heading: string; slug: string }[];

/**
 * Generates a summary using the h2 headings.
 * @param html The HTML from which to generate the summary.
 * @returns A summary containing the headings and their slug equivalent.
 */
export function generateSummary(html: string): Summary {
    const summary: Summary = [];
    const regex = /<h2([^>]*?)>(.*?)<\/h2>/gis;
    let match;

    while ((match = regex.exec(html)) !== null) {
        // Capture groups: [0] full match, [1] attributes, [2] content
        const heading = match[2].trim(); // Extract and trim content
        const slug = slugify(heading);
        summary.push({ heading, slug });
    }

    return summary;
}
