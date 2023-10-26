import { request } from '../request.js';
import { resolveError } from '../error.js';
import { readFileSync, existsSync } from 'node:fs';
import { extractToken } from '../utility.js';
/**
 * Convert a file to a blob.
 * @param file The file to convert.
 * @returns The created blob.
 */
function convertFileToBlob(file) {
    if (file instanceof Blob) return file;
    if (file instanceof Buffer) return new Blob([file]);
    if (!existsSync(file)) throw { error: 'File does not exist.', code: -1 };
    return new Blob([readFileSync(file)]);
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
export async function uploadFile(file, options, subdomain) {
    const response = await request({
        type: 'POST',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: 'files/create',
        body: convertOptionsToFormData(file, options),
        subdomain: subdomain ?? undefined,
    }).catch((error) => {
        throw resolveError(error);
    });
    return {
        id: response.id,
        url: response.url,
        deletionUrl: response.del_url,
        deletionToken: extractToken(response.del_url),
        thumbnail: response.thumb,
    };
}
export async function getFileMeta() {}
export async function deleteFile() {}
