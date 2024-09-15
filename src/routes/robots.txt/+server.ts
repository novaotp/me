import { base } from '$app/paths';

export function GET() {
    return new Response(
        `
            User-agent: *
            Disallow: 

            Sitemap: ${base}/sitemap.xml
        `
            .trim()
            .split('\n')
            .map((line) => line.trim())
            .join('\n'),
        { headers: { 'Content-Type': 'text/plain' } }
    );
}
