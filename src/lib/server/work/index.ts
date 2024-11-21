import fs from 'fs/promises';
import { glob } from 'glob';
import { dev } from '$app/environment';
import { extractH2, getReadTimeEstimate, processMarkdown } from '$lib/utils/markdown/index.server';
import type { Locales } from '$i18n/i18n-types';

export type WorkMetadata = {
    title: string;
    description: string;
    publishedAt: Date;
    readTime: number;
};

export type Work = {
    /** The full path of the article file. */
    path: string;
    /** The name of the file containing the article. */
    filename: string;
    /** The article's metadata. */
    metadata: WorkMetadata;
    /** The HTML content of the article. */
    html: string;
    /** The article's `h2` headings to build the summary with. */
    tableOfContents: string[];
};

const WORK_DIR = './content/works';

export async function importWorks(locale: Locales): Promise<Work[]> {
    const paths: string[] = await glob(`${WORK_DIR}/${locale}/*.md`);

    const futureWorks = paths.map((path) => {
        const [filename] = path
            .split(dev ? '\\' : '/')
            .at(-1)!
            .split('.');

        return importWork(locale, filename);
    });
    return Promise.all(futureWorks);
}

/**
 * Convert a markdown file to an object with attributes and html.
 * @param locale The locale of the article to import.
 * @param filename The filename (without extension) of the article to import.
 * @returns The markdown data for the given file path.
 */
export async function importWork(locale: Locales, filename: string): Promise<Work> {
    const path = `${WORK_DIR}/${locale}/${filename}.md`;
    const file = await fs.readFile(path, 'utf8');
    const { attributes, html } = await processMarkdown<WorkMetadata>(file);

    return {
        path,
        filename,
        html,
        tableOfContents: extractH2(html),
        metadata: {
            ...attributes,
            readTime: getReadTimeEstimate(html)
        }
    };
}
