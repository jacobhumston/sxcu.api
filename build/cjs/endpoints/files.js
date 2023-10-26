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
 * Converts the options to a FormData object.
 * @param file The uploadable file.
 * @param options The file options.
 * @returns The created form data.
 */
function convertOptionsToFormData(file, options) {
    const formData = new FormData();
    formData.set('file', convertFileToBlob(file));
    if (options) {
        console.log(options);
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
    };
}
exports.uploadFile = uploadFile;
async function getFileMeta() {}
exports.getFileMeta = getFileMeta;
async function deleteFile() {}
exports.deleteFile = deleteFile;
