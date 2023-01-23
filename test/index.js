const sxcu = require("../");
const secrets = require("./secrets.json");

async function test() {
    sxcu.collections
        .createCollection("super cool collection", "im really cool tbh", false, true)
        .then(function (data) {
            console.log(data);
            sxcu.collections
                .getCollectionMeta(data.collectionId)
                .then(function (data) {
                    console.log(data);
                })
                .catch(function (e) {
                    console.log(sxcu.utility.resolveError(e));
                });
        })
        .catch(function (e) {
            console.log(sxcu.utility.resolveError(e));
        });
}

test();
