import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [sveltekit()],
    optimizeDeps: {
        exclude: [
            '@tabler/icons-svelte',
            'typesafe-i18n',
            'typesafe-i18n/detectors',
            'typesafe-i18n/utils',
            '@vercel/speed-insights/sveltekit',
            '@vercel/analytics',
            'typesafe-i18n/svelte',
            'tailwind-merge',
            'clsx',
            'dequal',
            'nanoid/non-secure',
            '@internationalized/date',
            '@floating-ui/dom',
            'focus-trap',
            'bits-ui'
        ]
    },
    server: {
        host: '127.0.0.1'
    }
});
