#! /usr/bin/env node
import { UserAgent } from 'sxcu.api';
import { Command } from './createCommand.js';
//import { dirname } from 'node:path';
import { exit } from 'node:process';
//import { readdirSync } from 'node:fs';

UserAgent.useDefault();

const commandString: string = process.argv.slice(2).join(' ');
const commands: { [key: string]: Command } = {};

//const dir: string = dirname(import.meta.url.replace('file:///', ''));

for (const file of ['help.js', 'userAgent.js']) {
    const command: Command = (await import(`./commands/${file}`)).default;
    commands[command.name] = command;
}

const commandsToExecute: string[] = commandString.split(' + ');

if (commandsToExecute[0] === '') {
    console.log('Command not found! Please use "sxcu help" for a list of commands.');
    exit(0);
}

for (const commandString of commandsToExecute) {
    const commandName: string = commandString.split(' ')[0];
    const command: Command = commands[commandName];

    if (command === undefined) {
        console.log(`Command "${commandName}" not found! Please use "sxcu help" for a list of commands.`);
    } else {
        await command.execute(command);
    }
}
