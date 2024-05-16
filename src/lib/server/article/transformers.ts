import { slugify } from "$/lib/utils/slugify";

type HTMLTransformer = (html: string) => string;

/**
 * Transforms the HTML with more features.
 *
 * **INTERNAL, ONLY EXPORTED FOR TESTING.**
 */
export function transform(html: string): string {
    return apply(html, addSlugifiedId, addTargetBlank, surroundCodeBlocks);
}

/** Applies the given transformers to the HTML. */
const apply = (html: string, ...transformers: HTMLTransformer[]) => {
    for (const transformer of transformers) {
        html = transformer(html)
    }

    return html;
}

/**
 * Surrounds the code blocks for additional metadata.
 * @param html The HTML in which to surround the code blocks
 * @returns The modified HTML.
 */
const surroundCodeBlocks: HTMLTransformer = (html) => {
    return html.replace(/<figure([^>]*?)>(.*?)<\/figure>/gis, (match, attributes, content) => {
        return `
        <div class="custom-code-block">
            <div class="custom-data"></div>
            <figure ${attributes}>${content}</figure>
        </div>`;
    });
}

/**
 * Adds a slugified id to the h2 heading, so you can navigate to it.
 * @param html The HTML in which to modify the h2 heading.
 * @returns The modified HTML.
 */
const addSlugifiedId: HTMLTransformer = (html) => {
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
const addTargetBlank: HTMLTransformer = (html) => {
    return html.replace(/<a([^>]+)>/g, (match) => {
        const hasTargetBlank = match.includes('target="_blank"');
        return hasTargetBlank ? match : match.replace(/>/, ' target="_blank">');
    });
}
