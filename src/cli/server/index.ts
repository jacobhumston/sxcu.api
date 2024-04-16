import { ParsedOption } from '../createCommand.js';
import { logger } from '../logger.js';
import { logo } from './text-logo.js';

export async function main(options: ParsedOption[]) {
    console.clear();
    const port = options[0].value;
    logger.raw(logo);
    logger.success(`Running on port ${port}...`);
    logger.info(`Currently a WIP, does not currently work.`);
}
