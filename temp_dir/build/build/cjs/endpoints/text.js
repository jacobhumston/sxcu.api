'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.deletePaste = exports.createPaste = void 0;
const request_js_1 = require('../request.js');
const utility_js_1 = require('../utility.js');
const error_js_1 = require('../error.js');
/**
 * Create a paste.
 * @param text The text to upload.
 * @returns The created link.
 */
async function createPaste(text) {
    const response = await (0, request_js_1.request)({
        type: 'POST',
        statusErrors: [400],
        baseUrl: 'https://cancer-co.de/',
        path: 'upload',
        body: new URLSearchParams({ text: text }),
    }).catch((error) => {
        throw (0, error_js_1.resolveError)(error);
    });
    return {
        id: (0, utility_js_1.extractToken)(response.url),
        url: response.url,
        deletionUrl: response.del_url,
        deletionToken: (0, utility_js_1.extractToken)(response.del_url),
        delete: async () =>
            await deletePaste(
                (0, utility_js_1.extractToken)(response.url),
                (0, utility_js_1.extractToken)(response.del_url)
            ),
    };
}
exports.createPaste = createPaste;
/**
 * Delete a paste.
 * @param id The ID of the paste.
 * @param token The deletion token of the paste.
 * @returns The response message. (Success message.)
 */
async function deletePaste(id, token) {
    const response = await (0, request_js_1.request)({
        type: 'GET',
        statusErrors: [400],
        baseUrl: 'https://cancer-co.de/',
        path: `d/${id}/${token}`,
    }).catch((error) => {
        throw (0, error_js_1.resolveError)(error);
    });
    return response.message;
}
exports.deletePaste = deletePaste;
