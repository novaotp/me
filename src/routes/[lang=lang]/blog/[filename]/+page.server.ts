import type { EntryGenerator } from "./$types";
import { convertMarkdown, importMarkdowns } from "$lib/server/markdown";

export async function load({ params }) {
    const article = convertMarkdown(`./src/lib/articles/${params.filename}.md`);
    const otherArticles = importMarkdowns("./src/lib/articles/").filter(a => a.filename !== params.filename);

    return { article, otherArticles };
}

export const entries: EntryGenerator = () => {
    const markdowns = importMarkdowns("./src/lib/articles/");

	return (["en", "fr"] as const).map(lang => {
        return markdowns.map(markdown => {
            return { lang: lang, filename: markdown.filename }
        })
    }).flat(1);
};
