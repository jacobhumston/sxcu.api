/**
 * Create a command object.
 * @param name Name of the command.
 * @param description Description of the command.
 * @param options Command options.
 * @param execute Function to execute when the command is called.
 */
export default function createCommand(name, description, options, execute) {
    return {
        name,
        description,
        options,
        execute,
    };
}
