import { colorText, fgBlue, fgGreen, fgRed, fgYellow } from './colors.js';

/** Logging type. */
export type LoggerType = 'Info' | 'Warn' | 'Success' | 'Error';

/** Logger methods. */
export const logger = {
    /**
     * Log something to the console.
     * @param type The type of log.
     * @param message The message to log.
     */
    log: function (type: LoggerType, ...message: string[]): void {
        const colors = {
            Info: fgBlue,
            Warn: fgYellow,
            Success: fgGreen,
            Error: fgRed,
        };
        console.log(colorText(colors[type], `[${type}]:`), ...message);
        return;
    },
    /**
     * Log an info message to the console.
     * @param message The message to log.
     */
    info: (...message: string[]) => logger.log('Info', ...message),
    /**
     * Log a warning message to the console.
     * @param message The message to log.
     */
    warn: (...message: string[]) => logger.log('Warn', ...message),
    /**
     * Log a success message to the console.
     * @param message The message to log.
     */
    success: (...message: string[]) => logger.log('Success', ...message),
    /**
     * Log an info message to the console.
     * @param message The message to log.
     */
    error: (...message: string[]) => logger.log('Error', ...message),
    /**
     * Log a blank newline to the console.
     */
    blank: () => console.log(''),
    /**
     * Log a raw message to the console.
     */
    raw: console.log,
    /**
     * Log an object as a table to the console.
     * @param objects The objects to create the table with.
     */
    table: function (objects: { [key: string]: string | number | boolean }[]): void {
        // Create and sort the columns.
        const columns: { [key: string]: { value: string }[] } = {};

        let objectIndex = -1;
        for (const object of objects) {
            objectIndex++;
            for (const [key, value] of Object.entries(object)) {
                if (!columns[key]) columns[key] = [];
                columns[key].push({ value: value.toString() });
            }
        }

        for (const key of Object.keys(columns)) {
            const sorted = [...columns[key]].sort((a, b) => b.value.length - a.value.length);
            const length = key.length > sorted[0].value.length ? key.length : sorted[0].value.length;
            columns[key].forEach((object, index) => {
                columns[key][index].value = `${object.value}${' '.repeat(length - object.value.length)}`;
            });
            columns[`${key}${' '.repeat(length - key.length)}`] = columns[key];
            delete columns[key];
        }

        // Create the rows of text to be outputted.
        // Character Map ........ 0    1    2    3    4    5    6     7    8     9    10
        const chars: string[] = ['─', '│', '├', '┼', '┤', '┴', '┬', '╭', '╮', '╯', '╰'];
        const lines: string[] = [];

        {
            // Header section.
            let top = chars[7];
            let middle = chars[1];
            let bottom = chars[2];

            const keys = Object.keys(columns);
            keys.forEach(function (value, index) {
                top = `${top}${chars[0].repeat(value.length + 2)}`;
                middle = `${middle} ${value} `;
                bottom = `${bottom}${chars[0].repeat(value.length + 2)}`;
                if (keys[index + 1]) {
                    top = `${top}${chars[6]}`;
                    middle = `${middle}${chars[1]}`;
                    bottom = `${bottom}${chars[3]}`;
                }
            });

            top = `${top}${chars[8]}`;
            middle = `${middle}${chars[1]}`;
            bottom = `${bottom}${chars[4]}`;

            lines.push(top, middle, bottom);
        }

        // Bottom line.
        lines.push(`${chars[10]}${chars[0].repeat(lines[0].length - 2)}${chars[9]}`);

        console.log(lines.join('\n'));
        return;
    },
};
