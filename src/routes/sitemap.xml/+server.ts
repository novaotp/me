import { allCategories, importArticles } from "$lib/server/article";
import { baseLocale } from "$i18n/i18n-util";

export async function GET({ url }) {
    const paths = [
        "/",
        "/work",
        "contact",
        "/privacy-policy",
        "/blog",
        (await allCategories()).map(category => `/blog/${category}`),
        // The locale itself doesn't matter.
        (await importArticles(baseLocale)).map(article => `/blog/${article.metadata.category}/${article.filename}`)
    ].flat();

    return new Response(
        `
            <?xml version="1.0" encoding="UTF-8" ?>
            <urlset
                xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="https://www.w3.org/1999/xhtml"
                xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
                xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
                xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
                xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
            >
                ${paths.map(path => {
                    return `
                        <url>
                            <loc>${url.hostname}${path}</loc>
                        </url>
                    `
                })}
            </urlset>
        `.trim(),
        { headers: { 'Content-Type': 'application/xml' } }
    );
}
