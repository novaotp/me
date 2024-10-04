import defaultThemes from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

export default {
    darkMode: 'selector',
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        screens: {
            xsm: '480px',
            ...defaultThemes.screens
        }
    },
    plugins: []
} satisfies Config;
