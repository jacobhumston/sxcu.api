/* eslint-disable */
const { files, subdomains, collections, text, links, utility } = require('../');
const secrets = require('./secrets.json');

async function test() {
    const queue = new utility.queue();
    queue
        .push(() => {
            console.log('This function is being executed.');
        })
        .then(() => {
            console.log('The function in the queue has finished execution.');
            queue.stop();
        });
}

test();
