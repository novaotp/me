import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            runtime: 'nodejs20.x'
        }),
        alias: {
            $components: './src/lib/components',
            $stores: './src/lib/stores',
            $i18n: './src/i18n'
        }
    }
};
