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
     *
     * This function should throw an error if it fails
     * or return the parsed value if it succeeds.
     */
    result?: (value: string) => any;
    /**
     * Default value for this option.
     * This is only used if no value is provided.
     */
    default?: any;
};

/** Parsed command option. */
export type ParsedOption = {
    /** Name of the option. */
    name: string;
    /** Description of the option. */
    description: string;
    /** If this option is required. */
    required: boolean;
    /** Provided value of this option. */
    value: any;
};

/** Represents a command. */
export type Command = {
    /** Name of the command. */
    name: string;
    /** Description of the command. */
    description: string;
    /** Options of the command. */
    options: Option[];
    /** Execute function for the command. */
    execute: (options: ParsedOption[]) => Promise<void>;
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
    execute: (options: ParsedOption[]) => Promise<void>
): Command {
    return {
        name,
        description,
        options,
        execute,
    };
}
