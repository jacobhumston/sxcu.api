import { readdirSync } from 'fs';

let success = 0;
let failed = 0;

console.log('Starting tests...');

let startTime = new Date().getTime();

console.log('----------------------------------------');

for (const file of readdirSync('test/tests/')) {
    const test = await import(`./tests/${file}`);
    let successful = true;
    await test.execute().catch((error) => {
        console.log(`[FAILED]: Test '${file}' failed: ${error}`);
        successful = false;
    });
    if (successful) {
        console.log(`[SUCCESS]: Test '${file}' succeeded!`);
        success++;
    } else {
        failed++;
    }
}

console.log(`[RESULT]: success: ${success} / failed: ${failed}`);

console.log('----------------------------------------');

console.log(`Finished in ${new Date().getTime() - startTime}ms.`);
