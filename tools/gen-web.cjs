const fs = require('fs');
const hljs = require('highlight.js');

const md = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (_) {}
        }
        return '';
    },
});

console.log(`Creating directories...`);
fs.mkdirSync('docs/guides/');
fs.mkdirSync('docs/assets/');

console.log(`Writing and copying files...`);
fs.writeFileSync('docs/index.html', fs.readFileSync('web/index.html', 'utf-8'));
fs.copyFileSync(`web/styles.css`, `docs/styles.css`);

for (const file of fs.readdirSync('web/guides/')) {
    if (file.endsWith('.md')) {
        console.log(`Parsing... ${file}`);
        const content = fs.readFileSync(`web/guides/${file}`, 'utf-8');
        const templateContent = fs.readFileSync('web/other/template.html', 'utf-8');
        const html = md.render(content);
        fs.writeFileSync(`docs/guides/${file.replace('.md', '.html')}`, templateContent.replace('<content />', html));
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
