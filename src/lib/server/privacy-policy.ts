import fs from 'fs';
import { slugify } from '../utils/slugify';
import { extractH2, processMarkdown } from '$lib/utils/markdown/index.server';
import type { Locales } from '$i18n/i18n-types';

/** Imports the privacy policy based on the locale. */
export async function privacyPolicy(locale: Locales) {
    const file = fs.readFileSync(`./content/legal/${locale}/privacy-policy.md`, 'utf8');
    const { html } = await processMarkdown(file);

    return {
        html: addSlugifiedId(html),
        tableOfContents: extractH2(html)
    };
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
