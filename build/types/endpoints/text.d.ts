import type { DeletionToken, Url, Snowflake } from '../types.js';
/** A paste object. */
export type Paste = {
    /** The id of this paste. */
    id: Snowflake;
    /** The url of this paste. */
    url: Url;
    /** The deletion url of this paste. */
    deletionUrl: Url;
    /** The deletion token of this paste. */
    deletionToken: DeletionToken;
    /**
     * Function to delete this paste.
     */
    delete: () => Promise<string>;
};
/**
 * Create a paste.
 * @param text The text to upload.
 * @returns The created link.
 */
export declare function createPaste(text: string): Promise<Paste>;
/**
 * Delete a paste.
 * @param id The ID of the paste.
 * @param token The deletion token of the paste.
 * @returns The response message. (Success message.)
 */
export declare function deletePaste(id: Snowflake, token: DeletionToken): Promise<string>;
//# sourceMappingURL=text.d.ts.map
