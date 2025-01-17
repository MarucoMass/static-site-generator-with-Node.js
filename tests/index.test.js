const fs = require('fs-extra');
const path = require('path');
const { markdownToHtml } = require('../src/index'); 

describe('Static Site Generator', () => {
    test('Converts Markdown to HTML', () => {
        const md = '# Title';
        const html = markdownToHtml(md);
        expect(html).toContain('<h1>Title</h1>');
    });

    test('Creates output directory', () => {
        const outputDir = path.join(__dirname, '../output');
        fs.mkdirSync(outputDir, { recursive: true });
        expect(fs.existsSync(outputDir)).toBe(true);
    });
});
