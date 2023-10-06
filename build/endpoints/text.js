import { request } from '../request.js';
import { extractToken } from '../utility.js';
import { resolveError } from '../error.js';
/**
 * Create a paste.
 * @param text The text to upload.
 */
export async function createPaste(text) {
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
export async function deletePaste(id, token) {
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
