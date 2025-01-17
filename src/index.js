const fs = require('fs');
const path = require('path');
const marked = require('marked');
const ejs = require('ejs');

const inputDir = path.join(__dirname, 'pages');
const templatePath = path.join(__dirname, 'templates/layout.ejs');
const outputDir = path.join(__dirname, '../output');

const readPages = (dir) => {
    return fs.readdirSync(dir).map(file => {
        const filePath = path.join(dir, file);
        return {
            name: path.basename(file, path.extname(file)),
            content: fs.readFileSync(filePath, 'utf-8'),
        };
    });
};

const markdownToHtml = (markdown) => marked.parse(markdown);

const renderPage = (template, data) => {
    return ejs.render(template, data, { escape: (html) => html });
};

const generateOutput = (outputPath, content) => {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, content);
    console.log(`Generated: ${outputPath}`);
};

const generateSite = () => {
   
    const template = fs.readFileSync(templatePath, 'utf-8');

    const pages = readPages(inputDir);

    pages.forEach(page => {
        const htmlContent = markdownToHtml(page.content);
        const fullPage = renderPage(template, { content: htmlContent, title: page.name });
        const outputPath = path.join(outputDir, `${page.name}.html`);
        generateOutput(outputPath, fullPage);
    });

    console.log('Site generated successfully!');
};


generateSite();

module.exports = {
    markdownToHtml
};
