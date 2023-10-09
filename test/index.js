import { readdirSync } from 'fs';
import { UserAgent } from '../build/index.js';

UserAgent.useDefault();

let success = 0;
let failed = 0;

console.log('Starting tests...');

let startTime = new Date().getTime();

console.log('----------------------------------------');

for (const file of readdirSync('test/tests/')) {
    const test = await import(`./tests/${file}`);
    let successful = true;
    if (!test.active) {
        console.log(`[SKIPPED]: Test '${file}' was skipped. (Not active.)`);
        continue;
    }
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
