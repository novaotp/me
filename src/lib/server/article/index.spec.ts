import path from 'path';
import { addSlugifiedId, addTargetBlank, convertMarkdown, generateSummary, importArticles, type ArticleMetadata, type Summary } from '.';

describe('Importing and modifying articles', () => {
    function date() {
        const date = new Date('2024-04-24T00:00:00');
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() - userTimezoneOffset);
    }

    it('Imports a single article correctly', async () => {
        const dummyFilePath = path.join(__dirname, './dummy-file.md');

        const expectedFilename = 'dummy-file';
        const expectedAttributes: ArticleMetadata = {
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
        expect(result.metadata).toStrictEqual(expectedAttributes);
        expect(result.html).toStrictEqual(expectedHtml);
    });

    it('Imports a directory of articles correctly', async () => {
        const expectedFilename1 = 'dummy-file';
        const expectedAttributes1: ArticleMetadata = {
            shortTitle: 'Dummy',
            title: 'Dummy File',
            description: 'A dummy file for testing',
            creationDate: date(),
            banner: '/article-images/blog.jpeg',
            bannerAlt: 'Illustration for dummy file'
        };
        const expectedHtml1 = '<p>Dummy file</p>';

        const expectedFilename2 = 'dummy-file-2';
        const expectedAttributes2: ArticleMetadata = {
            shortTitle: 'Dummy n°2',
            title: 'Dummy File n°2',
            description: 'The dummy file n°2 for testing',
            creationDate: date(),
            banner: '/article-images/blog.jpeg',
            bannerAlt: 'Illustration for dummy file n°2'
        };
        const expectedHtml2 = '<p>Dummy file n°2</p>';

        const result = await importArticles(__dirname);

        expect(result.at(0)!.filename).toStrictEqual(expectedFilename1);
        expect(result.at(0)!.metadata).toStrictEqual(expectedAttributes1);
        expect(result.at(0)!.html).toStrictEqual(expectedHtml1);

        expect(result.at(1)!.filename).toStrictEqual(expectedFilename2);
        expect(result.at(1)!.metadata).toStrictEqual(expectedAttributes2);
        expect(result.at(1)!.html).toStrictEqual(expectedHtml2);
    });

    describe('Checks that modifying the HTML works correctly', () => {
        describe('Checks that all h2 headings have a slug', () => {
            it('should add a slugified id to a single h2 tag', () => {
                const html = `<h2>This is a heading</h2>`;
                const expectedHtml = `<h2 id="this-is-a-heading">This is a heading</h2>`;

                const modifiedHtml = addSlugifiedId(html);
                expect(modifiedHtml).toEqual(expectedHtml);
            });

            it('should add slugified ids to multiple h2 tags', () => {
                const html = `<h2>This is a heading</h2> and <h2>Another Heading</h2>`;
                const expectedHtml = `<h2 id="this-is-a-heading">This is a heading</h2> and <h2 id="another-heading">Another Heading</h2>`;

                const modifiedHtml = addSlugifiedId(html);
                expect(modifiedHtml).toEqual(expectedHtml);
            });

            it('should handle h2 tags with attributes', () => {
                const html = `<h2 class="special">This is a heading</h2>`;
                const expectedHtml = `<h2 id="this-is-a-heading" class="special">This is a heading</h2>`;

                const modifiedHtml = addSlugifiedId(html);
                expect(modifiedHtml).toEqual(expectedHtml);
            });

            it('should handle empty h2 content', () => {
                const html = `<h2></h2>`;
                const expectedHtml = `<h2 id=""></h2>`;

                const modifiedHtml = addSlugifiedId(html);
                expect(modifiedHtml).toEqual(expectedHtml);
            });
        });

        describe('Checks that all anchors tags have a target="_blank" attribute', () => {
            it('should add target="_blank" to a single anchor tag', () => {
                const html = `<a href="google.com">Google</a>`;
                const expectedHtml = `<a href="google.com" target="_blank">Google</a>`;

                const modifiedHtml = addTargetBlank(html);
                expect(modifiedHtml).toEqual(expectedHtml);
            });

            it('should add target="_blank" to multiple anchor tags', () => {
                const html = `<a href="google.com">Google</a> and <a href="youtube.com">YouTube</a>`;
                const expectedHtml = `<a href="google.com" target="_blank">Google</a> and <a href="youtube.com" target="_blank">YouTube</a>`;

                const modifiedHtml = addTargetBlank(html);
                expect(modifiedHtml).toEqual(expectedHtml);
            });

            it('should handle anchor tags with attributes', () => {
                const html = `<a href="google.com" class="external">Google</a>`;
                const expectedHtml = `<a href="google.com" class="external" target="_blank">Google</a>`;

                const modifiedHtml = addTargetBlank(html);
                expect(modifiedHtml).toEqual(expectedHtml);
            });

            it('should not modify anchor tags with existing target="_blank"', () => {
                const html = `<a href="google.com" target="_blank">Google</a>`;
                const expectedHtml = `<a href="google.com" target="_blank">Google</a>`;

                const modifiedHtml = addTargetBlank(html);
                expect(modifiedHtml).toEqual(expectedHtml);
            });
        });

        describe('generateSummary', () => {
            it('should generate a summary from a single h2 tag', () => {
                const html = `<h2>This is a heading</h2>`;
                const expectedSummary: Summary = [{ heading: 'This is a heading', slug: 'this-is-a-heading' }];

                const summary = generateSummary(html);
                expect(summary).toEqual(expectedSummary);
            });

            it('should generate a summary from multiple h2 tags', () => {
                const html = `<h2>This is a heading</h2> and <h2>Another Heading</h2>`;
                const expectedSummary: Summary = [
                    { heading: 'This is a heading', slug: 'this-is-a-heading' },
                    { heading: 'Another Heading', slug: 'another-heading' }
                ];

                const summary = generateSummary(html);
                expect(summary).toEqual(expectedSummary);
            });

            it('should handle empty h2 content', () => {
                const html = `<h2></h2>`;
                const expectedSummary: Summary = [{ heading: '', slug: '' }];

                const summary = generateSummary(html);
                expect(summary).toEqual(expectedSummary);
            });

            it('should handle h2 tags with attributes', () => {
                const html = `<h2 class="special">This is a heading</h2>`;
                const expectedSummary: Summary = [{ heading: 'This is a heading', slug: 'this-is-a-heading' }];

                const summary = generateSummary(html);
                expect(summary).toEqual(expectedSummary);
            });
        });
    });
});
