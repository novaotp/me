import adapter from 'svelte-adapter-static-digitalocean';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
            pages: 'build',
            assets: 'build',
            precompress: false
        }),
		alias: {
			$stores: './src/lib/stores',
			$i18n: './src/i18n'
		}
	}
};

export default config;
