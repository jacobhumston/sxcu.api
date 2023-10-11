/** An error object. */
export type ErrorObject = {
    /** Error message. */
    error: string;
    /**
     * Error code.
     * 0 is unknown and -1 is local error.
     */
    code: number;
};
/**
 * Create an error code.
 * @param message Error message.
 * @param code Error code.
 */
export declare function createError(message: string, code: number): ErrorObject;
/**
 * Attempt to resolve an error from "thing".
 * @param thing Thing to attempt to convert to an error.
 */
export declare function resolveError(thing: any): ErrorObject;
//# sourceMappingURL=error.d.ts.map
