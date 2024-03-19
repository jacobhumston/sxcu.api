import { request } from '../request.js';
import { DeletionToken, Url, Snowflake } from '../types.js';
import { extractToken } from '../utility.js';
import { resolveError } from '../error.js';

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
export async function createPaste(text: string): Promise<Paste> {
    const response = await request({
        type: 'POST',
        statusErrors: [400],
        baseUrl: 'https://cancer-co.de/',
        path: 'upload',
        body: new URLSearchParams({ text: text }),
    }).catch((error) => {
        throw resolveError(error);
    });

    return {
        id: extractToken(response.url),
        url: response.url,
        deletionUrl: response.del_url,
        deletionToken: extractToken(response.del_url),
        delete: async () => await deletePaste(extractToken(response.url), extractToken(response.del_url)),
    };
}

/**
 * Delete a paste.
 * @param id The ID of the paste.
 * @param token The deletion token of the paste.
 * @returns The response message. (Success message.)
 */
export async function deletePaste(id: Snowflake, token: DeletionToken): Promise<string> {
    const response = await request({
        type: 'GET',
        statusErrors: [400],
        baseUrl: 'https://cancer-co.de/',
        path: `d/${id}/${token}`,
    }).catch((error) => {
        throw resolveError(error);
    });

    return response.message;
}
