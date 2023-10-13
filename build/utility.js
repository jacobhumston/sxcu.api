/**
 * Extracts the token or id from a url or path.
 * @param url Url to extract the token from.
 * @returns The token.
 */
export function extractToken(url) {
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
function convertBase(value, fromBase, toBase) {
    const range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
    const fromRange = range.slice(0, fromBase),
        toRange = range.slice(0, toBase);
    let decValue = value
        .split('')
        .reverse()
        .reduce(function (carry, digit, index) {
            if (fromRange.indexOf(digit) === -1)
                throw new Error('Invalid digit `' + digit + '` for base ' + fromBase + '.');
            return (carry += fromRange.indexOf(digit) * Math.pow(fromBase, index));
        }, 0);
    let newValue = '';
    while (decValue > 0) {
        newValue = toRange[decValue % toBase] + newValue;
        decValue = (decValue - (decValue % toBase)) / toBase;
    }
    return newValue || '0';
}
/** All possible strings of a snowflake object type.  */
export var SnowflakeObjectType;
(function (SnowflakeObjectType) {
    /** This snowflake is an uploaded file. */
    SnowflakeObjectType[(SnowflakeObjectType['Uploaded File'] = 1)] = 'Uploaded File';
    /** This snowflake is a redirect link. */
    SnowflakeObjectType[(SnowflakeObjectType['Redirect Link'] = 2)] = 'Redirect Link';
    /* This snowflake is a collection. */
    SnowflakeObjectType[(SnowflakeObjectType['Collection'] = 3)] = 'Collection';
    /** This snowflake is a paste. */
    SnowflakeObjectType[(SnowflakeObjectType['Paste'] = 4)] = 'Paste';
    /** This snowflake is a subdomain/domain. */
    SnowflakeObjectType[(SnowflakeObjectType['Subdomain/Domain'] = 5)] = 'Subdomain/Domain';
    /** This snowflake is a self-destructing file. */
    SnowflakeObjectType[(SnowflakeObjectType['Self-Destructing File'] = 6)] = 'Self-Destructing File';
})(SnowflakeObjectType || (SnowflakeObjectType = {}));
/** All possible strings of a snowflake object flag.  */
export var SnowflakeObjectFlag;
(function (SnowflakeObjectFlag) {
    /** The PNG file format. */
    SnowflakeObjectFlag[(SnowflakeObjectFlag['PNG'] = 1)] = 'PNG';
    /** The JPEG file format. */
    SnowflakeObjectFlag[(SnowflakeObjectFlag['JPEG'] = 2)] = 'JPEG';
    /** The GIF file format. */
    SnowflakeObjectFlag[(SnowflakeObjectFlag['GIF'] = 3)] = 'GIF';
    /** The ICO file format. */
    SnowflakeObjectFlag[(SnowflakeObjectFlag['ICO'] = 4)] = 'ICO';
    /** The BMP file format. */
    SnowflakeObjectFlag[(SnowflakeObjectFlag['BMP'] = 5)] = 'BMP';
    /** The TIFF file format. */
    SnowflakeObjectFlag[(SnowflakeObjectFlag['TIFF'] = 6)] = 'TIFF';
    /** The WEBM file format. */
    SnowflakeObjectFlag[(SnowflakeObjectFlag['WEBM'] = 7)] = 'WEBM';
    /** The WEBP file format. */
    SnowflakeObjectFlag[(SnowflakeObjectFlag['WEBP'] = 8)] = 'WEBP';
})(SnowflakeObjectFlag || (SnowflakeObjectFlag = {}));
/**
 * Get the data associated with a snowflake.
 * This will attempt to parse the snowflake if it is a number. However, its unlikely that it will return accurate results.
 * @param snowflake The snowflake to parse.
 * @returns The snowflake's data.
 */
export function parseSnowflake(snowflake) {
    if (typeof snowflake === 'number') snowflake = convertBase(snowflake.toString(), 10, 63);
    const binaryString = convertBase(snowflake, 63, 10),
        binary = BigInt(binaryString);
    const data = {
        timestamp: Number((binary >> 22n) + 1326466131n),
        objectType: Number((binary >> 18n) & 15n),
        objectFlag: Number((binary >> 14n) & 15n),
        sequence: Number(binary & 16383n),
    };
    const types = [
        null,
        'Uploaded File',
        'Redirect Link',
        'Collection',
        'Paste',
        'Subdomain/Domain',
        'Self-Destructing File',
    ];
    const flags = [null, 'PNG', 'JPEG', 'GIF', 'ICO', 'BMP', 'TIFF', 'WEBM', 'WEBP'];
    return {
        created: new Date(data.timestamp * 1000),
        type: types[data.objectType],
        flag: flags[data.objectFlag],
        id: snowflake,
        raw: data,
    };
}
