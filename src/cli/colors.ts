/**
 * Color codes sourced from https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color.
 */

/** Reset color code. */
export const reset = '\x1b[0m';
/** Bright color code. */
export const bright = '\x1b[1m';
/** Dim color code. */
export const dim = '\x1b[2m';
/** Underscore color code. */
export const underscore = '\x1b[4m';
/** Blink color code. */
export const blink = '\x1b[5m';
/** Reverse color code. */
export const reverse = '\x1b[7m';
/** Hidden color code. */
export const hidden = '\x1b[8m';
/** Black (foreground) color code. */
export const fgBlack = '\x1b[30m';
/** Red (foreground) color code. */
export const fgRed = '\x1b[31m';
/** Green (foreground) color code. */
export const fgGreen = '\x1b[32m';
/** Yellow (foreground) color code. */
export const fgYellow = '\x1b[33m';
/** Blue (foreground) color code. */
export const fgBlue = '\x1b[34m';
/** Magenta (foreground) color code. */
export const fgMagenta = '\x1b[35m';
/** Cyan (foreground) color code. */
export const fgCyan = '\x1b[36m';
/** White (foreground) color code. */
export const fgWhite = '\x1b[37m';
/** Gray (foreground) color code. */
export const fgGray = '\x1b[90m';
/** Black (background) color code. */
export const bgBlack = '\x1b[40m';
/** Red (background) color code. */
export const bgRed = '\x1b[41m';
/** Green (background) color code. */
export const bgGreen = '\x1b[42m';
/** Yellow (background) color code. */
export const bgYellow = '\x1b[43m';
/** Blue (background) color code. */
export const bgBlue = '\x1b[44m';
/** Magenta (background) color code. */
export const bgMagenta = '\x1b[45m';
/** Cyan (background) color code. */
export const bgCyan = '\x1b[46m';
/** White (background) color code. */
export const bgWhite = '\x1b[47m';
/** Gray (background) color code. */
export const bgGray = '\x1b[100m';

/**
 * An array of all exposed color codes.
 * This includes codes such as reset, etc.
 */
export const colorList: string[] = [
    reset,
    bright,
    dim,
    underscore,
    blink,
    reverse,
    hidden,
    fgBlack,
    fgRed,
    fgGreen,
    fgYellow,
    fgBlue,
    fgMagenta,
    fgCyan,
    fgWhite,
    fgGray,
    bgBlack,
    bgRed,
    bgGreen,
    bgYellow,
    bgBlue,
    bgMagenta,
    bgCyan,
    bgWhite,
    bgGray,
];

/**
 * Color text.
 * @param color The color code to use.
 * @param text The text to color.
 * @returns The colored text.
 */
export function colorText(color: string, text: string): string {
    return `${color}${text.replaceAll('\n', `${reset}\n${color}`)}${reset}`;
}

/**
 * Removes all color codes from text.
 * Includes color codes such as reset.
 * @param text The text to remove the colors from.
 * @returns The colorless text.
 */
export function removeColor(text: string): string {
    let result = text;
    for (const color of colorList) {
        result = result.replaceAll(color, '');
    }
    return result;
}
