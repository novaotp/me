import type { EntryGenerator } from "./$types";
import { convertMarkdown, importMarkdowns } from "$lib/server/markdown";

export async function load({ params }) {
    const article = convertMarkdown(`./src/lib/articles/${params.filename}.md`)

    return { article };
}

export const entries: EntryGenerator = () => {
    const markdowns = importMarkdowns("./src/lib/articles/");

	return (["en", "fr"] as const).map(lang => {
        return markdowns.map(markdown => {
            return { lang: lang, filename: markdown.filename }
        })
    }).flat(1);
};
