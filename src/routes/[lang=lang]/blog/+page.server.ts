import { importMarkdowns } from "$lib/server/markdown";
import type { EntryGenerator } from "./$types";

export async function load() {
    let articles = importMarkdowns("./src/lib/articles/");

    return { articles };
}

export const entries: EntryGenerator = () => {
	return [{ lang: "fr" }, { lang: "en" }];
};
