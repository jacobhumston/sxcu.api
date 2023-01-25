/* eslint-disable */
const { files, subdomains, collections, text, links, utility } = require('../');
const secrets = require('./secrets.json');

async function test() {
    text.createPaste('hello!! :D')
        .then(function (data) {
            console.log(data);
            setTimeout(function () {
                text.deletePaste(data.id, data.deletionToken)
                    .then(function (msg) {
                        console.log(msg);
                    })
                    .catch(function (e) {
                        console.log(utility.resolveError(e));
                    });
            }, 5 * 1000);
        })
        .catch(function (e) {
            console.log(utility.resolveError(e));
        });
}

test();
