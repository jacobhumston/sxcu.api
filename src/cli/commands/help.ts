import commandFileList from '../commandFileList.js';
import { Command } from '../createCommand.js';
import createCommand from '../createCommand.js';
import { logger } from '../logger.js';

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
                logger.error(
                    `Command '${options[0].value}' was not found. Please use "sxcu help" for a list of available commands.`
                );
            } else {
                logger.info(`Viewing the information of "${foundCommand.name}".`);
                if (options[1].value === true) {
                    logger.table([{ Name: foundCommand.name, Description: foundCommand.description }]);
                    logger.blank();
                    logger.info(
                        '- The syntax for a command option is "--<option> <value>".\n- Options that are not required can be omitted entirely.'
                    );
                    if (foundCommand.options.length > 0) {
                        logger.table(
                            foundCommand.options.map((option) => ({
                                Name: option.name,
                                Description: option.description,
                                Required: option.required,
                            }))
                        );
                    } else {
                        logger.info('This command does not have any options.');
                    }
                } else {
                    logger.blank();
                    logger.info(`$ ${foundCommand.name} - ${foundCommand.description}`);
                    logger.info(
                        '- Options: <required> [optional] (Options that are not required can be omitted entirely.)'
                    );
                    logger.blank();
                    if (foundCommand.options.length > 0) {
                        for (const option of foundCommand.options) {
                            logger.info(
                                `--${option.name} ${option.required ? '<value>' : '[value]'} - ${option.description}`
                            );
                        }
                    } else {
                        logger.info('This command does not have any options.');
                    }
                }
            }
        } else {
            logger.info(
                'Viewing the list of available commands.\n- To view more information about a command, including available options, run: sxcu help --command [command]\n- If you would like a table view, you can run: sxcu help --table true'
            );
            logger.blank();
            if (options[1].value === true) {
                logger.table(commands.map((cmd) => ({ Name: cmd.name, Description: cmd.description })));
            } else {
                for (const command of commands) {
                    logger.info(`$ ${command.name} - ${command.description}`);
                }
            }
        }
    }
);
