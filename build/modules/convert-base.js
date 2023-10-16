/**
 * Convert a number from one base to another.
 * SOURCE: https://stackoverflow.com/questions/1337419/
 * @param value The value to convert.
 * @param fromBase The base to convert from.
 * @param toBase The base to convert to.
 * @returns The converted value.
 */
export function convertBase(value, fromBase, toBase) {
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
