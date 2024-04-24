import { convertToArticlePreview, importMarkdowns } from "$lib/server/markdown";

export async function load() {
    let files = importMarkdowns("src/lib/blog-posts/");
    let articles = files.map(file => convertToArticlePreview(file));

    return { articles };
}
