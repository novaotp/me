import { writable } from "svelte/store";

export type Theme = "light" | "dark";

/** The current theme. */
export const theme = writable<Theme>(localStorage.theme);

/**
 * Returns the system's preference.
 * 
 * **INTERNAL, ONLY EXPORTED FOR TESTING.**
 */
export function getSystemPreference(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
}

/**
 * Initializes the theme of the website based on their preferences.
 * 
 * If they don't have a registered preference in `localStorage`, the system preference is set as is.
 * 
 * Use this before accessing the `theme` store.
 */
export function initTheme(): void {
    if (!('theme' in localStorage)) {
        localStorage.theme = getSystemPreference();
        theme.set(localStorage.theme);
    }

    if (localStorage.theme === "dark") {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

/**
 * Switches the theme to the given one.
 * @param newTheme The new theme to set
 */
export function switchTheme(newTheme: "light" | "dark"): void {
    localStorage.theme = newTheme;
    theme.set(newTheme);
    initTheme();
}
