import { locales } from '$i18n/i18n-util';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
    const paths = ['', 'work', 'contact'].flat();

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
                ${locales.map((locale) => {
                    return paths.map((path) => {
                        return `
                            <url>
                                <loc>${url.protocol}//${url.hostname}/${locale}/${path}</loc>
                            </url>
                        `;
                    });
                })}
            </urlset>
        `.trim(),
        { headers: { 'Content-Type': 'application/xml' } }
    );
};
