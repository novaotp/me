import fs from 'fs';
import { glob } from 'glob';
import { dev } from '$app/environment';
import { transform } from './transformers';
import { baseLocale } from '$i18n/i18n-util';
import { extractH2, getReadTimeEstimate, processMarkdown } from '$lib/utils/markdown/index.server';

export type ArticleMetadata = {
    shortTitle?: string;
    title: string;
    description: string;
    creationDate: Date;
    banner: string;
    bannerAlt: string;
    category: string;
    /** The time it takes to read the article in minutes. */
    readTime: number;
};

export type Article = {
    /** The full path of the article file. */
    path: string;
    /** The name of the file containing the article. */
    filename: string;
    /** The article's metadata. */
    metadata: ArticleMetadata;
    /** The HTML content of the article. */
    html: string;
    /** The article's `h2` headings to build the summary with. */
    summaryHeadings: string[];
};

/** Relative to the root of the project. */
export const CONTENT_DIR = './content/articles';

/**
 * Imports all the articles for the given locale.
 * @param locale The locale to use to fetch articles. If not set, will return all articles.
 * @returns An array of articles.
 */
export async function importArticles(locale?: string): Promise<Article[]> {
    let paths: string[];
    if (!locale) {
        paths = await glob(`${CONTENT_DIR}/*.md`);
    } else {
        paths = await glob(`${CONTENT_DIR}/${locale}/*.md`);
    }

    const asyncArticles = paths.map(async (path) => await convertMarkdown(path));
    return await Promise.all(asyncArticles);
}

/**
 * Retrieves all the existing categories.
 * @description The categories are sorted alphabetically and are unique.
 */
export async function allCategories() {
    // * The locale doesn't matter.
    // * There's simply no need to have articles in both locale.
    const articles = await importArticles(baseLocale);

    const duplicateCategories = articles.reduce((acc, curr) => [...acc, curr.metadata.category], [] as string[]);
    const uniqueCategories = Array.from(new Set(duplicateCategories)).sort((a, b) => a.localeCompare(b));

    return uniqueCategories;
}

/**
 * Returns an amount of the latest articles, not matching the current one.
 * @param path The path to the articles folder.
 * @param currentFilename The currently viewed filename, as to not have it when viewing its own page.
 * @param count The number of articles to get.
 * @returns An amount of the latest articles.
 */
export async function latestArticles(
    locale: string,
    currentFilename: string = '',
    count: number = 4
): Promise<Article[]> {
    const articles = await importArticles(locale);
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
    const { attributes, html } = await processMarkdown<ArticleMetadata>(file);

    return {
        path: path,
        filename: path
            .split(dev ? '\\' : '/')
            .at(-1)!
            .split('.')
            .at(0)!,
        metadata: {
            ...attributes,
            readTime: getReadTimeEstimate(html)
        },
        html: transform(html),
        summaryHeadings: extractH2(html)
    };
}
