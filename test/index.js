const sxcu = require("../");
const secrets = require("./secrets.json");

async function test() { 
    sxcu.subdomains.checkSubdomain("premium-zero-stock").then(function(exists) {
        console.log(exists)
    }) .catch(function (e) {
        console.log(sxcu.utility.resolveError(e));
    });
}

test();
