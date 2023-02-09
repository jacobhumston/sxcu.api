/* eslint-disable */
const { files, subdomains, collections, text, links, utility, queue } = require('../');
const secrets = require('./secrets.json');

async function test() {
    const q = new queue();
    const images = ['test.png', 'test.png', 'test.png', 'test.png', 'test.png', 'test.png'];
    images.forEach(function (image, index) {
        q.upload(async function () {
            console.log('running...', index);
            return await files.uploadFile(`test/${image}`, { selfDestruct: true }, 'shx.gg');
        }, 'uploadFile').then(function (d) {
            console.log(d);
        });
    });
}

test();
