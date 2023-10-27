import createCommand from '../createCommand.js';
import { readdirSync } from 'node:fs';
import { dirname } from 'node:path';
export default createCommand(
    'help',
    'Get the list of commands and how to use them.',
    [
        {
            name: 'command',
            description: 'The command to get help for.',
            required: false,
        },
    ],
    async function () {
        const dir = dirname(import.meta.url.replace('file:///', ''));
        const commands = [];
        for (const file of readdirSync(`${dir}/`)) {
            const command = (await import(`./${file}`)).default;
            commands.push(command);
        }
        for (const command of Object.values(commands)) {
            console.log(`\n${command.name} - ${command.description}`);
            for (const option of command.options) {
                console.log(`\t--${option.name} - ${option.description}`);
            }
        }
    }
);
