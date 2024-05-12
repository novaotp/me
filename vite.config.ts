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
        exclude: ['@tabler/icons-svelte']
    }
});
