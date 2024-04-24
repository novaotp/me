import type { EntryGenerator } from "./$types";
import { convertMarkdown, importMarkdowns } from "$lib/server/markdown";
import { building } from "$app/environment";

export async function load({ params }) {
    const blog = convertMarkdown(building ? `./${params.title}` : `./src/lib/blog-posts/${params.title}.md`)

    return { blog };
}

export const entries: EntryGenerator = () => {
    const markdowns = importMarkdowns("./src/lib/blog-posts/");

    console.log(markdowns)

	return (["en", "fr"] as const).map(lang => {
        return markdowns.map(markdown => {
            return { lang: lang, title: convertMarkdown(markdown.path).path }
        })
    }).flat(1);
};
