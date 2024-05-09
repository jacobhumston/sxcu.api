const fs = require('fs');
const hljs = require('highlight.js');

const md = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value.replaceAll('\n', '<br>');
            } catch (_) {
                // eslint-disable-line no-empty
            }
        }
        return '';
    },
});

console.log(`Creating directories...`);
fs.mkdirSync('docs/guides/');
fs.mkdirSync('docs/assets/');

console.log(`Writing and copying files...`);
fs.copyFileSync('web/index.html', 'docs/index.html');
fs.copyFileSync(`web/styles.css`, `docs/styles.css`);
fs.copyFileSync(`web/favicon.ico`, `docs/favicon.ico`);
fs.copyFileSync(`web/CNAME`, `docs/CNAME`);
fs.copyFileSync(`web/.nojekyll`, `docs/.nojekyll`);

console.log(`Generating guide list...`);
const guideList = [];
const rawGuideList = [];
for (const file of fs.readdirSync('web/guides/').sort()) {
    if (file.endsWith('.md')) {
        const content = fs.readFileSync(`web/guides/${file}`, 'utf-8');
        const title = content.split('\n')[0].replace('# ', '');
        guideList.push(`<a href="${file.replace('.md', '.html')}" class="side-nav-bar-link">${title}</a>`);
        rawGuideList.push({
            href: file.replace('.md', '.html'),
            title: title,
        });
    }
}

for (const file of fs.readdirSync('web/guides/').sort()) {
    if (file.endsWith('.md')) {
        console.log(`Parsing... ${file}`);
        const content = fs
            .readFileSync(`web/guides/${file}`, 'utf-8')
            .replace('{{GUIDES-LIST}}', rawGuideList.map((guide) => `- [${guide.title}](${guide.href})`).join('\n'));
        const templateContent = fs.readFileSync('web/other/template.html', 'utf-8');
        const html = md.render(content);
        fs.writeFileSync(
            `docs/guides/${file.replace('.md', '.html')}`,
            templateContent
                .replace('<content />', html)
                .replace('<nav-links />', guideList.join('<hr>'))
                .replaceAll('</h1>', '</h1><hr>')
                .replaceAll('</h2>', '</h2><hr>')
        );
    } else {
        console.log(`Copying... ${file}`);
        fs.copyFileSync(`web/guides/${file}`, `docs/guides/${file}`);
    }
}

for (const file of fs.readdirSync('web/assets/')) {
    fs.copyFileSync(`web/assets/${file}`, `docs/assets/${file}`);
    console.log(`Copying... ${file}`);
}

console.log('[gen-web.js] Web content has been compiled!');
