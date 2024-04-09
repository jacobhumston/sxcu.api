import { colorText, fgBlue, fgGreen, fgRed, fgYellow } from './colors.js';

/** Logging type. */
export type LoggerType = 'Info' | 'Warn' | 'Success' | 'Error';

/**
 * Log something to the console.
 * @param type The type of log.
 * @param message The message to log.
 */
export function log(type: LoggerType, ...message: string[]): void {
    const colors = {
        Info: fgBlue,
        Warn: fgYellow,
        Success: fgGreen,
        Error: fgRed,
    };
    console.log(colorText(colors[type], `[${type}]:`), ...message);
    return;
}

/** Logger methods. */
export const logger = {
    /**
     * Log an info message to the console.
     * @param message The message to log.
     */
    info: (...message: string[]) => log('Info', ...message),
    /**
     * Log a warning message to the console.
     * @param message The message to log.
     */
    warn: (...message: string[]) => log('Warn', ...message),
    /**
     * Log a success message to the console.
     * @param message The message to log.
     */
    success: (...message: string[]) => log('Success', ...message),
    /**
     * Log an info message to the console.
     * @param message The message to log.
     */
    error: (...message: string[]) => log('Error', ...message),
    /**
     * Log a blank newline to the console.
     */
    blank: () => console.log(''),
    /**
     * Log a raw message to the console.
     */
    raw: console.log,
};
