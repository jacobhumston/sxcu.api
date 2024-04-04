import { ParsedOption } from '../createCommand.js';
import { logo } from './text-logo.js';

export async function main(options: ParsedOption[]) {
    console.clear();
    const port = options[0].value;
    console.log(logo);
    console.log(`Running on port ${port}...`);
}
