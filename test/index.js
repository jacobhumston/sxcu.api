/* eslint-disable */
const { files, subdomains, collections, text, links, utility } = require('../');
const secrets = require('./secrets.json');

async function test() {
    const collection = await collections.createCollection('test', 'lol idk', true, false).catch((e) => {
        throw e;
    });
    console.log(collection);
    while (true) {
        await files
            .uploadFile('test/a-test-min.png', {
                collection: collection.collectionId,
                collectionToken: collection.collectionToken,
            })
            .then(function (data) {
                console.log('Success!', data.url);
            })
            .catch(function (err) {
                console.log('Error!', utility.resolveError(err));
            });
        await utility.getRateLimitPromise('uploadFile');
    }
}

test();
