import { readdirSync } from 'fs';
import { UserAgent } from 'sxcu.api';
import colors from '@colors/colors/safe.js';
import fs from 'node:fs';
import util from 'node:util';

UserAgent.useDefault();

let success = 0;
let failed = 0;
let skipped = 0;

const logFile = fs.createWriteStream('test/output.txt', { flags: 'w' });
const logStdout = process.stdout;
console.log = function (data) {
    logFile.write(colors.stripColors(util.format(data)) + '\n');
    logStdout.write(util.format(data) + '\n');
};

console.clear();

console.log('----------------------------------------');
console.log(`\n${colors.blue('[STARTING] : Starting tests...')}`);

let startTime = new Date().getTime();

for (const file of readdirSync('test/tests/')) {
    const test = await import(`./tests/${file}`);
    let successful = true;
    if (!test.active) {
        console.log(`${colors.yellow(`[SKIPPED]  : Test '${file}' was skipped. (Not active.)`)}`);
        skipped++;
        continue;
    }
    await test.execute().catch((error) => {
        console.log(`${colors.red(`[FAILED]   : Test '${file}' failed: ${error}`)}`);
        successful = false;
    });
    if (successful) {
        console.log(`${colors.green(`[SUCCESS]  : Test '${file}' succeeded!`)}`);
        success++;
    } else {
        failed++;
    }
}

console.log(`${colors.blue(`[RESULT]   : Success: ${success} / Failed: ${failed} / Skipped: ${skipped}`)}`);
console.log(`${colors.blue(`[TIME]     : Finished in ${colors.yellow(new Date().getTime() - startTime + 'ms')}`)}`);
console.log('\n----------------------------------------');
