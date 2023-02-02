/* eslint-disable */
const { files, subdomains, collections, text, links, utility } = require('../');
const secrets = require('./secrets.json');

async function test() {
    while (true) {
        await files
            .uploadFile('test/a-test-min.png')
            .then(function (data) {
                console.log('Success!', data.url);
            })
            .catch(function (err) {
                console.log('Error!', utility.resolveError(err));
            });
        await utility.getRateLimitPromise('all');
    }
}

test();
