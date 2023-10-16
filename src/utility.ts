import { Snowflake } from './types';
import { convertBase } from './modules/convert-base.js';

/**
 * Extracts the token or id from a url or path.
 * @param url Url to extract the token from.
 * @returns The token.
 */
export function extractToken(url: string): string {
    return url.split('/').pop() ?? '';
}

/** All possible strings of a snowflake object type.  */
export enum SnowflakeObjectType {
    /** This snowflake is an uploaded file. */
    'Uploaded File' = 1,
    /** This snowflake is a redirect link. */
    'Redirect Link' = 2,
    /* This snowflake is a collection. */
    'Collection' = 3,
    /** This snowflake is a paste. */
    'Paste' = 4,
    /** This snowflake is a subdomain/domain. */
    'Subdomain/Domain' = 5,
    /** This snowflake is a self-destructing file. */
    'Self-Destructing File' = 6,
}

/** All possible strings of a snowflake object flag.  */
export enum SnowflakeObjectFlag {
    /** The PNG file format. */
    'PNG' = 1,
    /** The JPEG file format. */
    'JPEG' = 2,
    /** The GIF file format. */
    'GIF' = 3,
    /** The ICO file format. */
    'ICO' = 4,
    /** The BMP file format. */
    'BMP' = 5,
    /** The TIFF file format. */
    'TIFF' = 6,
    /** The WEBM file format. */
    'WEBM' = 7,
    /** The WEBP file format. */
    'WEBP' = 8,
}

/** The data extracted from a snowflake. */
export type ParsedSnowflake = {
    /** When this snowflake was created. */
    created: Date;
    /**
     * The object type of this snowflake.
     * This can be null if the snowflake does not have a type.
     */
    type: keyof typeof SnowflakeObjectType | null;
    /**
     * The object flag of this snowflake.
     * This can be null if the snowflake was not an uploaded file.
     */
    flag: keyof typeof SnowflakeObjectFlag | null;
    /** The snowflake in string form. */
    id: Snowflake;
    /** The raw data of this snowflake. */
    raw: {
        /** The epoch timestamp of when this snowflake was created. */
        timestamp: number;
        /** The numbered version of this snowflake's object type. */
        objectType: number;
        /** The numbered version of this snowflake's object flag. */
        objectFlag: number;
        /** The numbered version of this snowflake's object type. */
        sequence: number;
    };
};

/** Am array of snowflake types. */
const snowflakeTypes: (keyof typeof SnowflakeObjectType | null)[] = [
    null,
    'Uploaded File',
    'Redirect Link',
    'Collection',
    'Paste',
    'Subdomain/Domain',
    'Self-Destructing File',
];

/** An array of snowflake flags. */
const snowflakeFlags: (keyof typeof SnowflakeObjectFlag | null)[] = [
    null,
    'PNG',
    'JPEG',
    'GIF',
    'ICO',
    'BMP',
    'TIFF',
    'WEBM',
    'WEBP',
];

/**
 * Get the data associated with a snowflake.
 * This will attempt to parse the snowflake if it is a number. However, its unlikely that it will return accurate results.
 * @param snowflake The snowflake to parse.
 * @returns The snowflake's data.
 */
export function parseSnowflake(snowflake: Snowflake): ParsedSnowflake {
    if (typeof snowflake === 'number') snowflake = convertBase(snowflake.toString(), 10, 63);

    const binaryString = convertBase(snowflake, 63, 10),
        binary = BigInt(binaryString);

    const data = {
        timestamp: Number((binary >> 22n) + 1326466131n),
        objectType: Number((binary >> 18n) & 15n),
        objectFlag: Number((binary >> 14n) & 15n),
        sequence: Number(binary & 16383n),
    };

    return {
        created: new Date(data.timestamp * 1000),
        type: snowflakeTypes[data.objectType],
        flag: snowflakeFlags[data.objectFlag],
        id: snowflake,
        raw: data,
    };
}
