import fs from 'fs';
import { globSync } from "glob";
import frontmatter from "front-matter";
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import html from 'rehype-stringify';
import { dev } from '$app/environment';

export interface MarkdownAttributes {
    title: string,
    description: string,
    creationDate: Date,
    banner: string
}

export interface MarkdownData {
    path: string,
    filename: string,
    attributes: MarkdownAttributes,
    html: any
}

/**
 * Imports all the markdown files in the specified path and converts them to html.
 * @param path The path to the folder containing the markdown files.
 */
export function importMarkdowns(path: string): MarkdownData[] {
    let fileNames = globSync(`${path}*.md`);
    return fileNames.map((path) => convertMarkdown(path));
}

/**W
 * Convert a markdown file to an object with attributes and html.
 * @param path The path to the markdown file.
 */
export function convertMarkdown(path: string): MarkdownData {
    let file = fs.readFileSync(path, 'utf8');
    let { attributes, body } = frontmatter<MarkdownAttributes>(file);

    let result = unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(html)
                .processSync(body)
                .value;

    return { path: path, filename: path.split(dev ? "\\": "/").at(-1)!.split(".").at(0)!, attributes, html: result.toString() };
}
