import fs from 'fs';
import frontmatter from 'front-matter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import htmlify from 'rehype-stringify';;
import rehypeStringify from 'rehype-stringify';
import type { Locales } from '$i18n/i18n-types';
import { slugify } from '../utils/slugify';

/** Imports the privacy policy based on the locale. */
export async function privacyPolicy(locale: Locales) {
    const file = fs.readFileSync(`./content/legal/${locale}/privacy-policy.md`, 'utf8');
    const { body } = frontmatter(file);

    const html = (
        await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(htmlify)
            .use(rehypeStringify)
            .process(body)
    ).value.toString();

    return {
        html: addSlugifiedId(html),
        summary: generateHeadingsWithSlugs(html)
    }
}

/**
 * Adds a slugified id to the h2 heading, so you can navigate to it.
 * @param html The HTML in which to modify the h2 heading.
 * @returns The modified HTML.
 */
function addSlugifiedId(html: string): string {
    return html.replace(/<h([2-3])([^>]*?)>(.*?)<\/h([2-3])>/gis, (match, level, attributes, content) => {
        const id = slugify(content.trim());
        return `<h${level} id="${id}"${attributes}>${content}</h${level}>`;
    });
}

function generateHeadingsWithSlugs(htmlString: string): { heading: string; level: number; slug: string }[] {
    const headingsList: { heading: string; level: number; slug: string }[] = [];
    const regex = /<h([2-3])([^>]*?)>(.*?)<\/h([2-3])>/gis; // Matches h2-h4 tags with attributes and content
    let match;
  
    while ((match = regex.exec(htmlString)) !== null) {
      const level = parseInt(match[1]); // Extract heading level
      const content = match[3].trim(); // Extract and trim content
      const slug = slugify(content); // Generate slug from content
  
      headingsList.push({ heading: content, level, slug });
    }
  
    return headingsList;
}
  
