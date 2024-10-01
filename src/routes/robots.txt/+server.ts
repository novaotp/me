import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ url }) => {
    const content = ['User-agent: *', 'Disallow: ', `Sitemap: ${url.protocol}//${url.hostname}/sitemap.xml`].join('\n');

    return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
};
