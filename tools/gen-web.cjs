const fs = require('fs');
const md = require('markdown-it')();

fs.mkdirSync('docs/guides/');
fs.writeFileSync('docs/index.html', fs.readFileSync('web/index.html', 'utf-8'));
fs.copyFileSync(`web/styles.css`, `docs/styles.css`);

for (const file of fs.readdirSync('web/guides/')) {
    if (file.endsWith('.md')) {
        const content = fs.readFileSync(`web/guides/${file}`, 'utf-8');
        const templateContent = fs.readFileSync('web/template.html', 'utf-8');
        const html = md.render(content);
        fs.writeFileSync(`docs/guides/${file.replace('.md', '.html')}`, templateContent.replace('<content />', html));
    } else {
        fs.copyFileSync(`web/guides/${file}`, `docs/guides/${file}`);
    }
}

console.log('Web content has been compiled!');
