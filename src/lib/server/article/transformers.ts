import { slugify } from '$lib/utils/slugify';

type HTMLTransformer = (html: string) => string;

const ICONS_MAP: Record<string, string> = {
    bash: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-terminal-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9l3 3l-3 3" /><path d="M13 15l3 0" /><path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /></svg>',
    json: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-json"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 16v-8l3 8v-8" /><path d="M15 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z" /><path d="M1 8h3v6.5a1.5 1.5 0 0 1 -3 0v-.5" /><path d="M7 15a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1" /></svg>',
    svelte: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-svelte"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8l-5 3l.821 -.495c1.86 -1.15 4.412 -.49 5.574 1.352a3.91 3.91 0 0 1 -1.264 5.42l-5.053 3.126c-1.86 1.151 -4.312 .591 -5.474 -1.251a3.91 3.91 0 0 1 1.263 -5.42l.26 -.16" /><path d="M8 17l5 -3l-.822 .496c-1.86 1.151 -4.411 .491 -5.574 -1.351a3.91 3.91 0 0 1 1.264 -5.42l5.054 -3.127c1.86 -1.15 4.311 -.59 5.474 1.252a3.91 3.91 0 0 1 -1.264 5.42l-.26 .16" /></svg>',
    ts: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-typescript"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 17.5c.32 .32 .754 .5 1.207 .5h.543c.69 0 1.25 -.56 1.25 -1.25v-.25a1.5 1.5 0 0 0 -1.5 -1.5a1.5 1.5 0 0 1 -1.5 -1.5v-.25c0 -.69 .56 -1.25 1.25 -1.25h.543c.453 0 .887 .18 1.207 .5" /><path d="M9 12h4" /><path d="M11 12v6" /><path d="M21 19v-14a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2z" /></svg>',
    js: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-javascript"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" /><path d="M7.5 8h3v8l-2 -1" /><path d="M16.5 8h-2.5a.5 .5 0 0 0 -.5 .5v3a.5 .5 0 0 0 .5 .5h1.423a.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5" /></svg>',
    env: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>'
};

const ICON_COPY = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>';
const ICON_TEXT_FILE = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-txt"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 8h4" /><path d="M5 8v8" /><path d="M17 8h4" /><path d="M19 8v8" /><path d="M10 8l4 8" /><path d="M10 16l4 -8" /></svg>';

/**
 * Transforms the HTML with more features.
 *
 * **INTERNAL, ONLY EXPORTED FOR TESTING.**
 */
export function transform(html: string): string {
    return apply(html, addSlugifiedId, surchargeAnchorTags, surroundCodeBlocks);
}

/** Applies the given transformers to the HTML. */
const apply = (html: string, ...transformers: HTMLTransformer[]) => {
    for (const transformer of transformers) {
        html = transformer(html);
    }

    return html;
};

/**
 * Surrounds the code blocks for additional metadata.
 * @param html The HTML in which to surround the code blocks
 * @returns The modified HTML.
 */
const surroundCodeBlocks: HTMLTransformer = (html) => {
    const removeHtmlTags: HTMLTransformer = (htmlString: string): string => {
        return htmlString.replace(/<[^>]*>/g, '');
    }
    const replaceEntityWithSymbol: HTMLTransformer = (htmlString: string): string => {
        return htmlString.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
    }

    return html.replace(/<figure([^>]*?)>(.*?)<\/figure>/gis, (match: string, attributes: string, content: string) => {
        const figCaption = content.match(/<figcaption([^>]*?)>(.*?)<\/figcaption>/is)!;

        const language = figCaption.at(1)!.match(/data-language="(.*?)"/is)!.at(0)!.split("=").at(1)!.replaceAll(/"+/g, "")!;
        const icon = ICONS_MAP[language] ?? ICON_TEXT_FILE;

        const title = figCaption.at(2);

        content = content.replace(/<figcaption([^>]*?)>(.*?)<\/figcaption>/gis, "");
        const contentToCopy = apply(content, removeHtmlTags, replaceEntityWithSymbol).replaceAll(/"+/gis, '&quot;');

        return `
        <div class="custom-code-block relative w-full overflow-hidden flex flex-col">
            <div class="custom-data relative w-full h-[60px] px-5 flex justify-between items-center bg-slate-200 dark:bg-zinc-900 rounded-t-lg">
                <div class="relative flex gap-5 h-full justify-between items-center">
                    ${icon}
                    <span class="text-sm">${title}</span>
                </div>
                <button
                    data-content="${contentToCopy}"
                    class="codeblock-copy-button relative h-10 aspect-square rounded hover:bg-slate-300 dark:hover:bg-zinc-800 flex justify-center items-center duration-150"
                >
                    ${ICON_COPY}
                </button>
            </div>
            <figure ${attributes}>${content}</figure>
        </div>`;
    });
};

/**
 * Adds a slugified id to the h2 and h3 headings, so you can navigate to them.
 * @param html The HTML in which to modify the h2 and h3 headings.
 * @returns The modified HTML.
 */
const addSlugifiedId: HTMLTransformer = (html) => {
    html = html.replace(/<h2([^>]*?)>(.*?)<\/h2>/gis, (match, attributes, content) => {
        const id = slugify(content.trim());
        return `<h2 id="${id}"${attributes}>${content}</h2>`;
    });

    return html.replace(/<h3([^>]*?)>(.*?)<\/h3>/gis, (match, attributes, content) => {
        const id = slugify(content.trim());
        return `<h3 id="${id}"${attributes}>${content}</h3>`;
    });
};

/**
 * Surcharges the external anchors tags by adding `target="_blank"` and an icon.
 * @param html The HTML in which to surcharge the anchor tags.
 * @returns The modified HTML.
 */
const surchargeAnchorTags: HTMLTransformer = (html) => {
    return html.replace(/<a([^>]+)>(.*?)<\/a>/g, (match, attributes: string, content: string) => {
        let href = attributes
            .match(/href="(.*?)"/g)
            ?.at(0)
            ?.split('=')
            .at(-1);
        href = href?.substring(1, href.length - 1);

        if (href && href.startsWith('https')) {
            return `
            <a href="${href}"${attributes} target="_blank" class="relative inline-flex gap-2">
                <span>${content}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-external-link"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
                    <path d="M11 13l9 -9" />
                    <path d="M15 4h5v5" />
                </svg>
            </a>`;
        } else {
            return `<a ${attributes}>${content}</a>`;
        }
    });
};
