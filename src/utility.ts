import { Snowflake } from './types';

/**
 * Extracts the token or id from a url or path.
 * @param url Url to extract the token from.
 * @returns The token.
 */
export function extractToken(url: string): string {
    return url.split('/').pop() ?? '';
}

/**
 * Convert a number from one base to another.
 * SOURCE: https://stackoverflow.com/questions/1337419/
 * @param value The value to convert.
 * @param from_base The base to convert from.
 * @param to_base The base to convert to.
 * @returns The converted value.
 */
export function convertBase(value: string, from_base: number, to_base: number) {
    var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
    var from_range = range.slice(0, from_base);
    var to_range = range.slice(0, to_base);

    var dec_value = value
        .split('')
        .reverse()
        .reduce(function (carry, digit, index) {
            if (from_range.indexOf(digit) === -1)
                throw new Error('Invalid digit `' + digit + '` for base ' + from_base + '.');
            return (carry += from_range.indexOf(digit) * Math.pow(from_base, index));
        }, 0);

    var new_value = '';
    while (dec_value > 0) {
        new_value = to_range[dec_value % to_base] + new_value;
        dec_value = (dec_value - (dec_value % to_base)) / to_base;
    }
    return new_value || '0';
}

export function parseSnowflake(snowflake: Snowflake): any {
    const binary = Number(convertBase(snowflake, 63, 2));
    return {
      timestamp: (binary >> 22) + 1326466131,
      objectType: (binary >> 18 & 15),
      objectFlag: (binary >> 14 & 15),
      sequence: binary & 16383
    }
}
