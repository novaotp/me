import defaultThemes from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			xsm: '480px',
			...defaultThemes.screens
		}
	},
	plugins: []
};
