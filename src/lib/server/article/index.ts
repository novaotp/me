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
import { stripTrailingSlash } from '$lib/utils/strip-trailing-slash';
import { slugify } from '$lib/utils/slugify';
import { transform } from './transformers';

export interface ArticleMetadata {
    shortTitle?: string;
    title: string;
    description: string;
    creationDate: Date;
    banner: string;
    bannerAlt: string;
    category: string;
    /** The time it takes to read the article in minutes. */
    readTime: number;
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

/** The number of words an adult can read in a minute. */
const WORDS_PER_MIN = 200;

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
        .slice(0, count);
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
            .use(rehypePrettyCode, {
                theme: {
                    light: 'catppuccin-latte',
                    dark: 'one-dark-pro'
                }
            })
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
        metadata: {
            ...attributes,
            readTime: Math.ceil(countWords(html) / WORDS_PER_MIN)
        },
        html: transform(html),
        summary: generateSummary(html)
    };
}

export type Summary = { heading: string; slug: string }[];

/**
 * Generates a summary using the h2 headings.
 * @param html The HTML from which to generate the summary.
 * @returns A summary containing the headings and their slug equivalent.
 */
function generateSummary(html: string): Summary {
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

/** Counts the number of words in an HTML string. */
function countWords(html: string): number {
    const textContent = html.replace(/<[^>]*>/g, ' ');
    const words = textContent.trim().split(/\s+/);

    return words.filter(word => word.length > 0).length;
}
