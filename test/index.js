import { categorizeImports, createPaste } from '../build/index.js';
const sxcu = categorizeImports();

sxcu.userAgent.useDefault();

createPaste('helooooo').then((res) => {
    console.log(res);
    setTimeout(() => {
        res.delete().then((res) => {
            console.log(res);
        });
    }, 4000);
});
