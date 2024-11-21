import fs from 'fs';
import { glob } from 'glob';
import { dev } from '$app/environment';
import { extractH2, getReadTimeEstimate, processMarkdown } from '$lib/utils/markdown/index.server';

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

export async function importWorks(locale: string): Promise<Work[]> {
    const paths: string[] = await glob(`${WORK_DIR}/${locale}/*.md`);

    return await Promise.all(paths.map(importWork));
}

/**
 * Convert a markdown file to an object with attributes and html.
 * @param path The path to the markdown file.
 * @returns The markdown data for the given file path.
 */
export async function importWork(path: string): Promise<Work> {
    const file = fs.readFileSync(path, 'utf8');
    const { attributes, html } = await processMarkdown<WorkMetadata>(file);

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
        html: html,
        tableOfContents: extractH2(html)
    };
}
