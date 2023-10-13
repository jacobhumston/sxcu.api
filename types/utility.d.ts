import { Snowflake } from './types';
/**
 * Extracts the token or id from a url or path.
 * @param url Url to extract the token from.
 * @returns The token.
 */
export declare function extractToken(url: string): string;
/** All possible strings of a snowflake object type.  */
export declare enum SnowflakeObjectType {
    /** This snowflake is an uploaded file. */
    'Uploaded File' = 1,
    /** This snowflake is a redirect link. */
    'Redirect Link' = 2,
    'Collection' = 3,
    /** This snowflake is a paste. */
    'Paste' = 4,
    /** This snowflake is a subdomain/domain. */
    'Subdomain/Domain' = 5,
    /** This snowflake is a self-destructing file. */
    'Self-Destructing File' = 6,
}
/** All possible strings of a snowflake object flag.  */
export declare enum SnowflakeObjectFlag {
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
export declare function parseSnowflake(snowflake: Snowflake): ParsedSnowflake;
//# sourceMappingURL=utility.d.ts.map
