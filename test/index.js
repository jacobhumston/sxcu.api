/* eslint-disable */
const { files, subdomains, collections, text, links, utility } = require('../');
const secrets = require('./secrets.json');

async function test() {
    setInterval(function () {
        files
            .uploadFile('test/a-test-min.png')
            .then(function (d) {
                console.log('Successful...');
            })
            .catch(function (e) {
                console.log('Failed... ' + utility.resolveError(e).error);
            });
    }, 3 * 1000);
}

test();
