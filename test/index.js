/* eslint-disable */
const { files, subdomains, collections, text, links, utility } = require('../');
const secrets = require('./secrets.json');

async function test() {
    const queue = new utility.queue();
    queue
        .push(() => {
            console.log('This method is executing.');
        })
        .then(() => {
            console.log('This method is finished executing.');
        });
}

test();
