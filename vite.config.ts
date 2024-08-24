import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
    plugins: [sveltekit(), svelteTesting()],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}'],
        globals: true,
        environment: "jsdom",
        setupFiles: ["tests/setupTests.ts"],
    },
    optimizeDeps: {
        exclude: [
            '@tabler/icons-svelte',
            'typesafe-i18n',
            'typesafe-i18n/detectors',
            'typesafe-i18n/utils',
            '@vercel/speed-insights/sveltekit',
            '@vercel/analytics',
            'typesafe-i18n/svelte'
        ]
    },
    server: {
        host: "127.0.0.1"
    }
});
