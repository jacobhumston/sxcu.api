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
        delete: async () => await deleteFile(response.id, extractToken(response.del_url)),
        getMeta: async () => await getFileMeta(response.id),
    };
}
/**
 * Get the meta information of a file.
 * @param id The ID of the file.
 * @returns The meta information.
 */
export async function getFileMeta(id) {
    const response = await request({
        type: 'GET',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: `files/${id}`,
    }).catch((error) => {
        throw resolveError(error);
    });
    const openGraphProperties = response.og_properties ?? {};
    return {
        id: response.id,
        url: response.url,
        views: response.views,
        viewable: response.viewable,
        collection: response.collection,
        size: response.size,
        creationTime: response.creation_time,
        creationTimeDate: new Date(response.creation_time * 1000),
        openGraphProperties: {
            color: openGraphProperties.color,
            title: openGraphProperties.title,
            description: openGraphProperties.description,
            discordHideUrl: openGraphProperties.hide_discord_url,
        },
    };
}
/**
 * Delete a file.
 * @param id The ID of the file.
 * @param token The deletion token of the file.
 * @returns The response message. (Success message.)
 */
export async function deleteFile(id, token) {
    const response = await request({
        type: 'GET',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: `files/delete/${id}/${token}`,
    }).catch((error) => {
        throw resolveError(error);
    });
    return response.message;
}
