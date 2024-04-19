import { colorText, fgBlue, fgGray, fgGreen, fgRed, fgWhite, fgYellow } from './colors.js';

/** Logging type. */
export type LoggerType = 'Info' | 'Warning' | 'Success' | 'Error';

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
            Warning: fgYellow,
            Success: fgGreen,
            Error: fgRed,
        };
        message.forEach((value, index) => {
            message[index] = value.replaceAll('\n', colorText(colors[type], `\n[${type}]: `));
        });
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
    warn: (...message: string[]) => logger.log('Warning', ...message),
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
    blank: () => console.log(colorText(fgGray, '[]:')),
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

        for (const object of objects) {
            for (const [key, value] of Object.entries(object)) {
                if (!columns[key]) columns[key] = [];
                columns[key].push({ value: value.toString() });
            }
        }

        const headerSpaces: { [key: string]: number } = {};
        for (const key of Object.keys(columns)) {
            const sorted = [...columns[key]].sort((a, b) => b.value.length - a.value.length);
            const length = key.length > sorted[0].value.length ? key.length : sorted[0].value.length;
            columns[key].forEach((object, index) => {
                columns[key][index].value = `${object.value}${' '.repeat(length - object.value.length)}`;
            });
            headerSpaces[key] = length - key.length;
        }

        // Create the rows of text to be outputted.
        // Character Map ........ 0    1    2    3    4    5    6    7    8    9   10
        const chars: string[] = ['─', '│', '├', '┼', '┤', '┴', '┬', '╭', '╮', '╯', '╰'];
        const lines: string[] = [];

        {
            // Header section.
            let top = chars[7];
            let middle = chars[1];
            let bottom = chars[2];

            const keys = Object.keys(columns);
            keys.forEach(function (value, index) {
                top = `${top}${chars[0].repeat(headerSpaces[value] + value.length + 2)}`;
                middle = `${middle} ${colorText(fgBlue, value)}${' '.repeat(headerSpaces[value])} `;
                bottom = `${bottom}${chars[0].repeat(headerSpaces[value] + value.length + 2)}`;
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

        // Data rows.
        {
            const keys = Object.keys(columns);
            const rows: string[] = [];
            keys.forEach(function (key) {
                columns[key].forEach(function (object, index) {
                    if (!rows[index]) rows[index] = chars[1];
                    let color: string = fgWhite;
                    const spacelessString = object.value.replaceAll(' ', '');
                    if (spacelessString === 'false' || spacelessString === 'true') color = fgYellow;
                    if (!isNaN(parseFloat(spacelessString))) color = fgYellow;
                    rows[index] = `${rows[index]} ${colorText(color, object.value)} ${chars[1]}`;
                });
            });
            lines.push(...rows);
        }

        // Bottom line.
        lines.push(
            lines[0].replaceAll(chars[7], chars[10]).replaceAll(chars[8], chars[9]).replaceAll(chars[6], chars[5])
        );

        console.log(`${colorText(fgGray, '[]: ')}${lines.join(`\n${colorText(fgGray, '[]: ')}`)}`);
        return;
    },
    /**
     * Clear the console.
     */
    clear: console.clear,
};
