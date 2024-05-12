import { slugify } from ".";

describe("Slugifies text correctly", () => {
    it("Slugifies a text correctly", () => {
        const raw = "   This IS   A t  ... && esT       ";
        const expected = "this-is-a-t---est";

        expect(slugify(raw)).toStrictEqual(expected);
    });
});
