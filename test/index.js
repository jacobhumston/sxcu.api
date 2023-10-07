import * as sxcu from '../build/index.js';

sxcu.UserAgent.useDefault();

const data = await sxcu.createLink('https://google.com');
console.log(data);
