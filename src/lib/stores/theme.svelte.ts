import { browser } from "$app/environment";

/**
 * Returns the system's preference.
 * 
 * **INTERNAL, ONLY EXPORTED FOR TESTING.**
 */
export const getSystemPreference = (): Theme => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
}

export type Theme = "light" | "dark";

/** The current theme. */
let theme = $state<Theme>(browser ? (localStorage.theme ?? getSystemPreference()) : "light");

export const getTheme = () => theme;

/**
 * Initializes the theme of the website based on their preferences.
 * 
 * If they don't have a registered preference in `localStorage`, the system preference is set as is.
 * 
 * Use this before accessing the `theme` store.
 */
export const initTheme = (): void => {
    if (!('theme' in localStorage)) {
        localStorage.theme = getSystemPreference();
        theme = localStorage.theme;
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
export const switchTheme = (newTheme: "light" | "dark"): void => {
    localStorage.theme = newTheme;
    theme = newTheme;
    initTheme();
}
