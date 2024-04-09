#! /usr/bin/env node

/*
 * Copyright (c) 2024 Jacob Humston. All rights reserved.
 *
 * This software is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * https://github.com/jacobhumston/sxcu.api
 */

import { UserAgent } from 'sxcu.api';
import { Command, ParsedOption } from './createCommand.js';
import { exit } from 'node:process';
import commandFileList from './commandFileList.js';
import { logger } from './logger.js';

UserAgent.set('sxcu.api/$v-cli (+$https://github.com/jacobhumston/sxcu.api)');

const commandString: string = process.argv.slice(2).join(' ');
const commands: { [key: string]: Command } = {};

for (const file of commandFileList) {
    const command: Command = (await import(`./commands/${file}`)).default;
    commands[command.name] = command;
}

const commandsToExecute: string[] = commandString.split(' + ');

if (commandsToExecute[0] === '') {
    logger.info('Please use "sxcu help" for a list of commands.');
    exit(0);
}

for (const commandString of commandsToExecute) {
    const spacedString: string[] = commandString.split(' ');
    const commandName: string = spacedString.shift() ?? '';
    const commandArgs: ParsedOption[] = [];
    const command: Command = commands[commandName];
    const errors: string[] = [];

    if (command === undefined) {
        logger.error(`Command "${commandName}" not found! Please use "sxcu help" for a list of commands.`);
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
            logger.error(
                `${errors.length} error(s) occurred when parsing the command. \n${errors.map((value, index) => `[${index + 1}]: ${value}`).join('\n')}`
            );
        } else {
            await command.execute(commandArgs).catch(function (error) {
                logger.error(`Command failed with an error: ${error}`);
            });
        }
    }
}
