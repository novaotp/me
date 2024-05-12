import fs from 'fs';
import { globSync } from 'glob';
import frontmatter from 'front-matter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import html from 'rehype-stringify';
import { dev } from '$app/environment';
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { stripTrailingSlash } from '$/lib/utils/strip-trailing-slash';

export interface MarkdownAttributes {
    shortTitle?: string;
    title: string;
    description: string;
    creationDate: Date;
    banner: string;
    bannerAlt?: string;
}

export interface MarkdownData {
    path: string;
    filename: string;
    attributes: MarkdownAttributes;
    html: string;
}

/**
 * Imports all the markdown files in the specified path and converts them to html.
 * @param path The path to the folder containing the markdown files.
 * @returns An array of markdown data.
 */
export async function importMarkdowns(path: string): Promise<MarkdownData[]> {
    const fileNames = globSync(`${stripTrailingSlash(path)}/*.md`);
    const asyncMarkdownData = fileNames.map(async (path) => await convertMarkdown(path));
    return await Promise.all(asyncMarkdownData);
}

/**
 * Convert a markdown file to an object with attributes and html.
 * @param path The path to the markdown file.
 * @returns The markdown data for the given file path.
 */
export async function convertMarkdown(path: string): Promise<MarkdownData> {
    const file = fs.readFileSync(path, 'utf8');
    const { attributes, body } = frontmatter<MarkdownAttributes>(file);

    const result = (await unified()
                    .use(remarkParse)
                    .use(remarkRehype)
                    .use(html)
                    .use(rehypePrettyCode, { theme: "one-dark-pro" })
                    .use(rehypeStringify)
                    .process(body))
                    .value;

    return {
        path: path,
        filename: path
            .split(dev ? '\\' : '/')
            .at(-1)!
            .split('.')
            .at(0)!,
        attributes,
        html: result.toString()
    };
}
