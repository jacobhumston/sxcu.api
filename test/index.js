/* eslint-disable */
const { files, subdomains, collections, text, links, utility } = require('../');

const converted = utility.convertSxcuFile('test/example-3.sxcu');
files.uploadFile('test/test.png', converted.options, converted.domain).then(function (response) {
    console.log(response.url);
});
