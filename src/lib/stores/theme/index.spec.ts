import { getSystemPreference, switchTheme, type Theme } from "./index.svelte";

describe("Checks that the theme is initialized and changed correctly", () => {
    it("Checks that there is no theme in localStorage by default", () => {
        expect(localStorage.getItem("theme")).toBeNull();
    });

    it("Initializes the theme in localStorage correctly", () => {
        const theme: Theme = "light";
        localStorage.setItem("theme", theme);

        expect(localStorage.getItem("theme")).toStrictEqual(theme);
    });

    it("Switches the theme to the other one correctly", () => {
        const initialTheme: Theme = "light";
        const newTheme: Theme = "dark";

        localStorage.setItem("theme", initialTheme);

        switchTheme(newTheme);

        expect(localStorage.getItem("theme")).toStrictEqual(newTheme);
    });

    it("Retrieves the system's preference correctly", () => {
        const systemTheme = getSystemPreference();

        expect(["light", "dark"].includes(systemTheme)).toBeTruthy();
    });
});
