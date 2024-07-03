'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.createError = createError;
exports.resolveError = resolveError;
/**
 * Create an error code.
 * @param message Error message.
 * @param code Error code.
 */
function createError(message, code) {
    return { error: message, code: code };
}
/**
 * Attempt to resolve an error from "thing".
 * @param thing Thing to attempt to convert to an error.
 */
function resolveError(thing) {
    // Check if thing is null or undefined.
    if (thing === null || thing === undefined) return { error: 'Unknown', code: 0 };
    if (!Array.isArray(thing) && typeof thing === 'object') {
        // Check if thing is an object. (And not an array.)
        return { error: thing.error ?? thing.message ?? 'Unknown', code: thing.code ?? 0 };
    } else if (typeof thing === 'string') {
        // Check if thing is a string.
        return { error: thing, code: 0 };
    } else {
        // If thing is anything else, we will return this.
        return { error: 'Unknown', code: 0 };
    }
}
