import path from "path";
import { convertMarkdown, importMarkdowns, type MarkdownAttributes } from ".";

describe("Importing markdown files", () => {
    function date() {
        const date = new Date('2024-04-24T00:00:00');
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() - userTimezoneOffset);
    }

    it("Imports a single markdown file correctly", async () => {
        const dummyFilePath = path.join(__dirname, "./dummy-file.md");

        const expectedFilename = 'dummy-file';
        const expectedAttributes: MarkdownAttributes = {
            shortTitle: 'Dummy',
            title: 'Dummy File',
            description: 'A dummy file for testing',
            creationDate: date(),
            banner: '/article-images/blog.jpeg',
            bannerAlt: 'Illustration for dummy file'
        };
        const expectedHtml = '<p>Dummy file</p>';

        const result = await convertMarkdown(dummyFilePath);

        expect(result.filename).toStrictEqual(expectedFilename);
        expect(result.attributes).toStrictEqual(expectedAttributes);
        expect(result.html).toStrictEqual(expectedHtml);
    });

    it("Imports a directory of markdown files correctly", async () => {
        const expectedFilename1 = 'dummy-file';
        const expectedAttributes1: MarkdownAttributes = {
            shortTitle: 'Dummy',
            title: 'Dummy File',
            description: 'A dummy file for testing',
            creationDate: date(),
            banner: '/article-images/blog.jpeg',
            bannerAlt: 'Illustration for dummy file'
        };
        const expectedHtml1 = '<p>Dummy file</p>';

        const expectedFilename2 = 'dummy-file-2';
        const expectedAttributes2: MarkdownAttributes = {
            shortTitle: 'Dummy n°2',
            title: 'Dummy File n°2',
            description: 'The dummy file n°2 for testing',
            creationDate: date(),
            banner: '/article-images/blog.jpeg',
            bannerAlt: 'Illustration for dummy file n°2'
        };
        const expectedHtml2 = '<p>Dummy file n°2</p>';

        const result = await importMarkdowns(__dirname);

        expect(result.at(0)!.filename).toStrictEqual(expectedFilename1);
        expect(result.at(0)!.attributes).toStrictEqual(expectedAttributes1);
        expect(result.at(0)!.html).toStrictEqual(expectedHtml1);

        expect(result.at(1)!.filename).toStrictEqual(expectedFilename2);
        expect(result.at(1)!.attributes).toStrictEqual(expectedAttributes2);
        expect(result.at(1)!.html).toStrictEqual(expectedHtml2);
    });
});
