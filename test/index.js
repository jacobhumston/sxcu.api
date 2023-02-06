/* eslint-disable */
const { files, subdomains, collections, text, links, utility } = require('../');
const secrets = require('./secrets.json');

async function test() {}

test();

function convertSnowflake(snowflake) {
    function encode(string) {
        var number = "0x";
        var length = string.length;
        for (var i = 0; i < length; i++)
            number += string.charCodeAt(i).toString(10);
        return number;
    }
    
    console.log(encode(snowflake))
}

console.log(convertSnowflake('539SYFuIC'));
