import type { Locales } from "$/i18n/i18n-types";
import { base } from "$app/paths";
import { constructUrl } from ".";

describe("Constructs URLs correctly", () => {
    const locale: Locales = "en";

    it("Constructs a normal URL correctly", () => {
        const path = "blog/test";
        const expected = `${base}/${locale}/${path}`;

        expect(constructUrl(locale, path)).toStrictEqual(expected);
    });

    it("Constructs a URL correctly despite starting with a slash", () => {
        const path = "/blog/test";
        const expected = `${base}/${locale}/${path.substring(1)}`;

        expect(constructUrl(locale, path)).toStrictEqual(expected);
    });
});
