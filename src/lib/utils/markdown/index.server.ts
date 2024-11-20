import { unified } from 'unified';
import frontmatter from 'front-matter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import htmlify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

/** The number of words an adult can read in a minute. */
const WORDS_PER_MIN = 200;

/**
 * Processes a markdown file content.
 * @param content The content of the markdown file to process.
 * @returns The attributes and the HTML of the markdown file.
 */
export const processMarkdown = async <T extends Record<string, unknown>>(content: string) => {
    const { attributes, body } = frontmatter<T>(content);

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

    return { attributes, html };
};

/**
 * Extracts the `h2` headings of the HTML string.
 * @param html The HTML from which to extract the heading.
 * @returns An array of the headings that are `h2`.
 */
export const extractH2 = (html: string): string[] => {
    return Array.from(html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gis), (match) => match[1].trim());
};

/** Gets the estimated read time of the HTML string. */
export const getReadTimeEstimate = (html: string) => {
    return Math.ceil(countWords(html) / WORDS_PER_MIN);
};

/** Counts the number of words in an HTML string. */
const countWords = (html: string): number => {
    const textContent = html.replace(/<[^>]*>/g, ' ');
    const words = textContent.trim().split(/\s+/);

    return words.filter((word) => word.length > 0).length;
};
