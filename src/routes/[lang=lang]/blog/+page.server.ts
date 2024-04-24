import { convertToArticlePreview, importMarkdowns } from "$lib/server/markdown";
import type { EntryGenerator } from "./$types";

export async function load() {
    let files = importMarkdowns("./src/lib/blog-posts/");
    let articles = files.map(file => convertToArticlePreview(file));

    return { articles };
}

export const entries: EntryGenerator = () => {
	return [{ lang: "fr" }, { lang: "en" }];
};
