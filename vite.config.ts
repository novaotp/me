import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { svelteTesting } from '@testing-library/svelte/vite';
import mkcert from "vite-plugin-mkcert"

export default defineConfig({
    plugins: [sveltekit(), svelteTesting(), mkcert()],
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
