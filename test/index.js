/* eslint-disable */
const { files, subdomains, collections, text, links, utility } = require('../');
const secrets = require('./secrets.json');

async function test() {
    links
        .createLink('https://example.com', 'shx.gg')
        .then(function (data) {
            console.log(data);
            setTimeout(function () {
                links
                    .deleteLink(data.id, data.deletionToken)
                    .then(function (message) {
                        console.log(message);
                    })
                    .catch(function (e) {
                        console.log(utility.resolveError(e));
                    });
            }, 15 * 1000);
        })
        .catch(function (e) {
            console.log(utility.resolveError(e));
        });
}

test();
