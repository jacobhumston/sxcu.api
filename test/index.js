/* eslint-disable */
const { files, subdomains, collections, text, links, utility } = require('../');
const secrets = require('./secrets.json');

async function test() {
    const queue = new utility.queue();
    const images = ['test!!', 'test!!', 'test!!'];
    images.forEach(function (image, index) {
        const progress = ((index + 1) / images.length) * 100;
        queue
            .push(function () {
                console.log('UPLOADING...');
                return text.createPaste(`test/${image}`);
            }, 'createPaste')
            .then(function (data) {
                if (data.error) {
                    console.log(Math.round(progress) + '%', 'ERROR!', data.error);
                } else {
                    console.log(Math.round(progress) + '%', 'UPLOADED!', data.url);
                }
                if (progress === 100) {
                    console.log('DONE!');
                    queue.stop();
                }
            });
    });
}

test();
