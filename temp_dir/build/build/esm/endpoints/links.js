import { request } from '../request.js';
import { extractToken } from '../utility.js';
import { resolveError } from '../error.js';
/**
 * Create a link.
 * @param url Url to create the link for.
 * @param subdomain Subdomain to create the link on.
 * @returns The created link.
 */
export async function createLink(url, subdomain) {
    const response = await request({
        type: 'POST',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: 'links/create',
        subdomain: subdomain ?? undefined,
        body: new URLSearchParams({ link: url }),
    }).catch((error) => {
        throw resolveError(error);
    });
    return {
        id: extractToken(response.url),
        url: response.url,
        deletionUrl: response.del_url,
        deletionToken: extractToken(response.del_url),
        delete: async () => await deleteLink(extractToken(response.url), extractToken(response.del_url)),
    };
}
/**
 * Delete a link.
 * @param id The ID of the link.
 * @param token The deletion token of the link.
 * @returns The response message. (Success message.)
 */
export async function deleteLink(id, token) {
    const response = await request({
        type: 'GET',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: `links/delete/${id}/${token}`,
    }).catch((error) => {
        throw resolveError(error);
    });
    return response.message;
}
