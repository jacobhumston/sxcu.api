import commandFileList from '../commandFileList.js';
import { Command } from '../createCommand.js';
import createCommand from '../createCommand.js';

export default createCommand(
    'help',
    'Get the list of commands and how to use them.',
    [
        {
            name: 'command',
            description: 'The command to get more information of.',
            required: false,
        },
        {
            name: 'table',
            description: 'Display the list of a commands as a table.',
            required: false,
            result: function (value) {
                if (value !== 'false' && value !== 'true') {
                    throw "Expected 'false' or 'true'.";
                }
                return value === 'false' ? false : true;
            },
        },
    ],
    async function (options) {
        const commands: Command[] = [];

        for (const file of commandFileList) {
            const command: Command = (await import(`./${file}`)).default;
            commands.push(command);
        }

        if (options[0].value !== null) {
            const foundCommand = commands.find((cmd) => cmd.name === options[0].value);
            if (foundCommand === undefined) {
                console.log(
                    `Command '${options[0].value}' was not found. Please use "sxcu help" for a list of available commands.`
                );
            } else {
                console.log('');
                console.log(
                    `Viewing the information of "${foundCommand.name}".\n- The syntax for a command option is "--<option> <value>".`
                );
                if (options[1].value === true) {
                    console.log('- Options that are not required can be omitted entirely.');
                    console.log('');
                    console.table({ Name: foundCommand.name, Description: foundCommand.description });
                    console.table(
                        foundCommand.options.map((option) => ({
                            Name: option.name,
                            Description: option.description,
                            Required: option.required,
                        }))
                    );
                } else {
                    console.log('');
                    console.log(`$ ${foundCommand.name} - ${foundCommand.description}`);
                    console.log(
                        '- Options: <required> [optional] (Options that are not required can be omitted entirely.)'
                    );
                    console.log('');
                    const tab = '    ';
                    for (const option of foundCommand.options) {
                        console.log(
                            `${tab}--${option.name} ${option.required ? '<value>' : '[value]'} - ${option.description}`
                        );
                    }
                }
            }
        } else {
            console.log('');
            console.log(
                'Viewing the list of available commands.\n- To view more information about a command, including available options, run: sxcu help --command [command]\n- If you would like a table view, you can run: sxcu help --table true'
            );
            console.log('');
            if (options[1].value === true) {
                console.table(commands.map((cmd) => ({ Name: cmd.name, Description: cmd.description })));
            } else {
                for (const command of commands) {
                    console.log(`$ ${command.name} - ${command.description}`);
                }
            }
        }
    }
);
