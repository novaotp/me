import adapter from "@sveltejs/adapter-node";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit({
            adapter: adapter(),
            alias: {
                $components: "./src/lib/components",
                $stores: "./src/lib/stores",
            },
            compilerOptions: {
                runes: ({ filename }) => {
                    // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                    return filename.split(/[/\\]/).includes("node_modules") ? undefined : true;
                },
            },
        }),
    ],
});
