import { base } from '$app/paths';

export function GET() {
    return new Response(
        `
            User-agent: *
            Disallow: 

            Sitemap: ${base}/sitemap.xml
        `.trim(),
        { headers: { 'Content-Type': 'text/plain' } }
    );
}
