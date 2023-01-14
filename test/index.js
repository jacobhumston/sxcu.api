const sxcu = require("../");

async function test() {
    const fileMetaData = await sxcu.Files.getFileMeta("5C8TQuxQd");
    console.log(`File URL: ${fileMetaData.url}`);
}

test();