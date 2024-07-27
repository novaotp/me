import type { Locales } from "$i18n/i18n-types";
import { getPathnameWithoutBase, replaceLocaleInUrl } from ".";

describe("Checks that utils for manipulating the locale work correctly", () => {
    it("Removes the base of the url correctly", () => {
        const url = "https://www.sajidur.dev/en/blog/article-1";
        const expected = "/en/blog/article-1";

        expect(getPathnameWithoutBase(new URL(url))).toStrictEqual(expected);
    });

    describe("Checks the different cases for changing the locale of an url", () => {
        it("Changes the locale whilst keeping the url intact", () => {
            const locale: Locales = "fr";

            const url = "https://www.sajidur.dev/en/blog/article-1";
            const expected = `https://www.sajidur.dev/${locale}/blog/article-1`;
    
            expect(replaceLocaleInUrl(new URL(url), locale, true)).toStrictEqual(expected);
        });

        it("Changes the locale whilst removing the base", () => {
            const locale: Locales = "fr";

            const url = "https://www.sajidur.dev/en/blog/article-1";
            const expected = `/${locale}/blog/article-1`;
    
            expect(replaceLocaleInUrl(new URL(url), locale, false)).toStrictEqual(expected);
        });
    });
});
