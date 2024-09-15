export function GET({ url }) {
    const content = ['User-agent: *', 'Disallow: ', `Sitemap: ${url.hostname}/sitemap.xml`].join('\n');

    return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
}
