import { Snowflake } from './types';
/**
 * Extracts the token or id from a url or path.
 * @param url Url to extract the token from.
 * @returns The token.
 */
export declare function extractToken(url: string): string;
/**
 * Convert a number from one base to another.
 * SOURCE: https://stackoverflow.com/questions/1337419/
 * @param value The value to convert.
 * @param from_base The base to convert from.
 * @param to_base The base to convert to.
 * @returns The converted value.
 */
export declare function convertBase(value: string, from_base: number, to_base: number): string;
export declare function parseSnowflake(snowflake: Snowflake): any;
//# sourceMappingURL=utility.d.ts.map