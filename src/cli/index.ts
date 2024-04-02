#! /usr/bin/env node
import { UserAgent } from 'sxcu.api';
import { Command, ParsedOption } from './createCommand.js';
//import { dirname } from 'node:path';
import { exit } from 'node:process';
//import { readdirSync } from 'node:fs';

UserAgent.set('sxcu.api/$v-cli (+$https://github.com/jacobhumston/sxcu.api)');

const commandString: string = process.argv.slice(2).join(' ');
const commands: { [key: string]: Command } = {};

//const dir: string = dirname(import.meta.url.replace('file:///', ''));

for (const file of ['help.js', 'userAgent.js', 'server.js']) {
    const command: Command = (await import(`./commands/${file}`)).default;
    commands[command.name] = command;
}

const commandsToExecute: string[] = commandString.split(' + ');

if (commandsToExecute[0] === '') {
    console.log('Command not found! Please use "sxcu help" for a list of commands.');
    exit(0);
}

for (const commandString of commandsToExecute) {
    const spacedString: string[] = commandString.split(' ');
    const commandName: string = spacedString.shift() ?? '';
    const commandArgs: ParsedOption[] = [];
    const command: Command = commands[commandName];
    const errors: string[] = [];

    if (command === undefined) {
        console.log(`Command "${commandName}" not found! Please use "sxcu help" for a list of commands.`);
    } else {
        for (const option of command.options) {
            let commandMissing = false;
            let value = null;
            const foundIndex = spacedString.findIndex((string) => string === `--${option.name}`);
            if (foundIndex !== -1) {
                const valueString = spacedString[foundIndex + 1] ?? '';
                if (valueString.startsWith('--')) {
                    commandMissing = true;
                } else {
                    if (option.result) {
                        try {
                            value = option.result(valueString);
                        } catch (error) {
                            value = null;
                            errors.push(`Failed to parse the value of '${option.name}': ${error}`);
                        }
                    } else {
                        value = valueString;
                    }
                }
            } else {
                commandMissing = true;
            }
            if (option.required === true && commandMissing === true)
                errors.push(`Option --${option.name} is missing, however it is required.`);
            commandArgs.push({
                name: option.name,
                description: option.description,
                required: option.required,
                value: value,
            });
        }
        if (errors.length > 0) {
            console.log(
                `${errors.length} error(s) occurred when parsing the command. \n${errors.map((value, index) => `[${index + 1}]: ${value}`).join('\n')}`
            );
        } else {
            await command.execute(command, commandArgs).catch(function (error) {
                console.log(`Command failed with an error: ${error}`);
            });
        }
    }
}
