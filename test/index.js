const sxcu = require("../");
const secrets = require("./secrets.json");

async function test() {
    sxcu.files
        .uploadFile("./test/test.png", { token: secrets["upload-token"], openGraphProperties: { title: "hi lol" } }, "lol.reeee.ee")
        .then(function (uploadedFile) {
            console.log(uploadedFile);
        })
        .catch(function (error) {
            console.log(error.code, error.error);
        });
}

test();
