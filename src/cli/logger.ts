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
        //const characters: string[] = ['│', '╭', '╮', '╯', '╰', '├', '┼', '─', '┤', '┴', '┬'];
        const columns: { [key: string]: { index: number; value: string }[] } = {};
        const sortedColumns: { [key: string]: { index: number; value: string }[] } = {};

        let objectIndex = -1;
        for (const object of objects) {
            objectIndex++;
            for (const [key, value] of Object.entries(object)) {
                if (!columns[key]) columns[key] = [];
                columns[key].push({ index: objectIndex, value: value.toString() });
            }
        }
        for (const key of Object.keys(columns)) {
            sortedColumns[key] = columns[key].sort((a, b) => b.value.length - a.value.length);
        }

        

        console.log(columns);
        return;
    },
};
