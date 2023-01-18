const sxcu = require("../");
const secrets = require("./secrets.json");

async function test() {
    sxcu.files
        .uploadFile(__dirname + "/a-test.png")
        .then(function (data) {
            console.log("url", data.url);
            setTimeout(function () {
                sxcu.files
                    .deleteFile(data.id, data.deletionToken)
                    .then(function (message) {
                        console.log("message", message);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }, 1000 * 5);
        })
        .catch(function (err) {
            console.log(err);
        });
}

test();
