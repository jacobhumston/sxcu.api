'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.createLink = createLink;
exports.deleteLink = deleteLink;
const request_js_1 = require('../request.js');
const utility_js_1 = require('../utility.js');
const error_js_1 = require('../error.js');
/**
 * Create a link.
 * @param url Url to create the link for.
 * @param subdomain Subdomain to create the link on.
 * @returns The created link.
 */
async function createLink(url, subdomain) {
    const response = await (0, request_js_1.request)({
        type: 'POST',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: 'links/create',
        subdomain: subdomain ?? undefined,
        body: new URLSearchParams({ link: url }),
    }).catch((error) => {
        throw (0, error_js_1.resolveError)(error);
    });
    return {
        id: (0, utility_js_1.extractToken)(response.url),
        url: response.url,
        deletionUrl: response.del_url,
        deletionToken: (0, utility_js_1.extractToken)(response.del_url),
        delete: async () =>
            await deleteLink(
                (0, utility_js_1.extractToken)(response.url),
                (0, utility_js_1.extractToken)(response.del_url)
            ),
    };
}
/**
 * Delete a link.
 * @param id The ID of the link.
 * @param token The deletion token of the link.
 * @returns The response message. (Success message.)
 */
async function deleteLink(id, token) {
    const response = await (0, request_js_1.request)({
        type: 'GET',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: `links/delete/${id}/${token}`,
    }).catch((error) => {
        throw (0, error_js_1.resolveError)(error);
    });
    return response.message;
}
