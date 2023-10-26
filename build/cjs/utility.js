'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.parseSnowflake = exports.SnowflakeObjectFlag = exports.SnowflakeObjectType = exports.extractToken = void 0;
const convert_base_js_1 = require('./modules/convert-base.js');
/**
 * Extracts the token or id from a url or path.
 * @param url Url to extract the token from.
 * @returns The token.
 */
function extractToken(url) {
    return url.split('/').pop() ?? '';
}
exports.extractToken = extractToken;
/** All possible strings of a snowflake object type.  */
var SnowflakeObjectType;
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
})(SnowflakeObjectType || (exports.SnowflakeObjectType = SnowflakeObjectType = {}));
/** All possible strings of a snowflake object flag.  */
var SnowflakeObjectFlag;
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
})(SnowflakeObjectFlag || (exports.SnowflakeObjectFlag = SnowflakeObjectFlag = {}));
/** Am array of snowflake types. */
const snowflakeTypes = [
    null,
    'Uploaded File',
    'Redirect Link',
    'Collection',
    'Paste',
    'Subdomain/Domain',
    'Self-Destructing File',
];
/** An array of snowflake flags. */
const snowflakeFlags = [null, 'PNG', 'JPEG', 'GIF', 'ICO', 'BMP', 'TIFF', 'WEBM', 'WEBP'];
/**
 * Get the data associated with a snowflake.
 * This will attempt to parse the snowflake even if it is a number.
 * However, numbers are unlikely to return accurate results.
 * @param snowflake The snowflake to parse.
 * @returns The snowflake's data.
 */
function parseSnowflake(snowflake) {
    if (typeof snowflake === 'number') snowflake = (0, convert_base_js_1.convertBase)(snowflake.toString(), 10, 63);
    const binaryString = (0, convert_base_js_1.convertBase)(snowflake.replaceAll('_', '+'), 63, 10),
        binary = BigInt(binaryString);
    const data = {
        timestamp: Number((binary >> 22n) + 1326466131n),
        objectType: Number((binary >> 18n) & 15n),
        objectFlag: Number((binary >> 14n) & 15n),
        sequence: Number(binary & 16383n),
    };
    return {
        created: new Date(data.timestamp * 1000),
        type: snowflakeTypes[data.objectType] ?? null,
        flag: snowflakeFlags[data.objectFlag] ?? null,
        id: snowflake,
        raw: data,
    };
}
exports.parseSnowflake = parseSnowflake;
