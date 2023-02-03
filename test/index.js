/* eslint-disable */
const { files, subdomains, collections, text, links, utility } = require('../');
const secrets = require('./secrets.json');

async function test() {}

test();

function convertSnowflake(snowflake) {
    const buffer = Buffer.from(snowflake);
    return parseInt(buffer.toString(), 10)
}

console.log(convertSnowflake('539SYFuIC'));
