/** Command option. */
export type Option = {
    /** Name of the option. */
    name: string;
    /** Description of the option. */
    description: string;
    /** If this option is required. */
    required: boolean;
    /**
     * Function to validate the option.
     * Can be undefined if the option requires no value.
     */
    result?: (value: string) => any;
};

export type Command = {
    name: string;
    description: string;
    options: Option[];
    execute: (command: Command) => void;
};

/**
 * Create a command object.
 * @param name Name of the command.
 * @param description Description of the command.
 * @param options Command options.
 * @param execute Function to execute when the command is called.
 */
export default function createCommand(
    name: string,
    description: string,
    options: Option[],
    execute: (command: Command) => void
): Command {
    return {
        name,
        description,
        options,
        execute,
    };
}
