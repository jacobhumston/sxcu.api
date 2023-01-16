const sxcu = require("../");
const secrets = require("./secrets.json");

async function test() {
    const response = await sxcu.files.uploadFile("./test/test-image.png").catch(function (err) {
        console.log(err);
    });
    console.log("response:", response);
}

test();
