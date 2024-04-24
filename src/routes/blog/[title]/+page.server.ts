import type { EntryGenerator } from "./$types";
import { convertMarkdown, importMarkdowns } from "$lib/server/markdown";

export async function load({ params }) {
    const blog = convertMarkdown(`src/lib/blog-posts/${params.title}.md`)

    return { blog };
}

export const entries: EntryGenerator = () => {
    const markdowns = importMarkdowns("/src/lib/blog-posts");

	return markdowns.map(markdown => { return { title: markdown.path } });
};
