import { stripTrailingSlash } from ".";

describe("Checks if the slashes are stripped correctly", () => {
    it("Removed the trailing slash since there is one", () => {
        const path = "/blog/test/";
        const expected = "/blog/test";

        expect(stripTrailingSlash(path)).toStrictEqual(expected);
    });

    it("Does nothing since there is no trailing slash", () => {
        const path = "/blog/test";
        const expected = "/blog/test";

        expect(stripTrailingSlash(path)).toStrictEqual(expected);
    });
});
