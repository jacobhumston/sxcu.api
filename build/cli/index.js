#! /usr/bin/env node
import { UserAgent } from 'sxcu.api';
import { dirname } from 'node:path';
import { exit } from 'node:process';
import { readdirSync } from 'node:fs';
UserAgent.useDefault();
const commandString = process.argv.slice(2).join(' ');
const commands = {};
const dir = dirname(import.meta.url.replace('file:///', ''));
for (const file of readdirSync(`${dir}/commands`)) {
    const command = (await import(`./commands/${file}`)).default;
    commands[command.name] = command;
}
const commandsToExecute = commandString.split(' + ');
if (commandsToExecute[0] === '') {
    console.log('Command not found! Please use "sxcu help" for a list of commands.');
    exit(0);
}
for (const commandString of commandsToExecute) {
    const commandName = commandString.split(' ')[0];
    const command = commands[commandName];
    if (command === undefined) {
        console.log(`Command "${commandName}" not found! Please use "sxcu help" for a list of commands.`);
        exit(0);
    }
    await command.execute(command);
}
