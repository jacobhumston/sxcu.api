/**
 * Extracts the token or id from a url or path.
 * @param url Url to extract the token from.
 * @returns The token.
 */
export function extractToken(url) {
    return url.split('/').pop() ?? '';
}
// 539SYFuIC to base 10 1253213101899776
function convertBase(value, from_base, to_base) {
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
export function parseSnowflake(snowflake) {
    console.log(convertBase(snowflake, 63, 10));
}
