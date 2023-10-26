'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteFile = exports.getFileMeta = exports.uploadFile = void 0;
const request_js_1 = require('../request.js');
const error_js_1 = require('../error.js');
const node_fs_1 = require('node:fs');
const utility_js_1 = require('../utility.js');
/**
 * Convert a file to a blob.
 * @param file The file to convert.
 * @returns The created blob.
 */
function convertFileToBlob(file) {
    if (file instanceof Blob) return file;
    if (file instanceof Buffer) return new Blob([file]);
    if (!(0, node_fs_1.existsSync)(file)) throw { error: 'File does not exist.', code: -1 };
    return new Blob([(0, node_fs_1.readFileSync)(file)]);
}
/**
 * Parses FileOptions
 * @param options The options to parse.
 * @param formData The form data to append to.
 */
function parseFileOptions(options, formData) {
    if (options.token) formData.set('token', options.token);
    if (options.collection) formData.set('collection', options.collection.toString());
    if (options.collectionToken) formData.set('collection_token', options.collectionToken);
    if (options.noEmbed) formData.set('noembed', 'true');
    if (options.selfDestruct) formData.set('self_destruct', 'true');
    if (options.openGraphProperties) {
        const { title, description, color, siteName, discordHideUrl } = options.openGraphProperties;
        const data = {};
        if (title) data.title = title;
        if (description) data.description = description;
        if (color) data.color = color;
        if (siteName) data.site_name = siteName;
        if (discordHideUrl) data.hide_discord_url = discordHideUrl;
        if (Object.entries(data).length > 0) formData.set('og_properties', JSON.stringify(data));
    }
    return null;
}
/**
 * Converts the options to a FormData object.
 * @param file The uploadable file.
 * @param options The file options.
 * @returns The created form data.
 */
function convertOptionsToFormData(file, options) {
    const formData = new FormData();
    formData.set('file', convertFileToBlob(file));
    if (options) {
        parseFileOptions(options, formData);
    }
    return formData;
}
/**
 * Upload a file.
 * @param file The file to upload.
 * @param options File options.
 * @param subdomain Subdomain to upload to.
 * @returns The uploaded file.
 */
async function uploadFile(file, options, subdomain) {
    const response = await (0, request_js_1.request)({
        type: 'POST',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: 'files/create',
        body: convertOptionsToFormData(file, options),
        subdomain: subdomain ?? undefined,
    }).catch((error) => {
        throw (0, error_js_1.resolveError)(error);
    });
    return {
        id: response.id,
        url: response.url,
        deletionUrl: response.del_url,
        deletionToken: (0, utility_js_1.extractToken)(response.del_url),
        thumbnail: response.thumb,
        delete: async () => await deleteFile(response.id, (0, utility_js_1.extractToken)(response.del_url)),
    };
}
exports.uploadFile = uploadFile;
async function getFileMeta() {}
exports.getFileMeta = getFileMeta;
/**
 * Delete a file.
 * @param id The ID of the file.
 * @param token The deletion token of the file.
 * @returns The response message. (Success message.)
 */
async function deleteFile(id, token) {
    const response = await (0, request_js_1.request)({
        type: 'GET',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: `files/delete/${id}/${token}`,
    }).catch((error) => {
        throw (0, error_js_1.resolveError)(error);
    });
    return response.message;
}
exports.deleteFile = deleteFile;
