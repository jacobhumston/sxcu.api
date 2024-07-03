'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.checkSubdomain = checkSubdomain;
exports.getSubdomainMeta = getSubdomainMeta;
exports.listSubdomains = listSubdomains;
const request_js_1 = require('../request.js');
const error_js_1 = require('../error.js');
/**
 * Check if a subdomain exists.
 * @param subdomain The subdomain to check.
 * @returns If the subdomain currently exists or not.
 */
async function checkSubdomain(subdomain) {
    const response = await (0, request_js_1.request)({
        type: 'GET',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: `subdomains/check/${subdomain}`,
    }).catch((error) => {
        throw (0, error_js_1.resolveError)(error);
    });
    return response.exists;
}
/**
 * Get the meta data of a subdomain.
 * @param subdomain The subdomain to get the meta data of.
 * @returns The meta data of the subdomain.
 */
async function getSubdomainMeta(subdomain) {
    const response = await (0, request_js_1.request)({
        type: 'GET',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: `subdomains/${subdomain}`,
    }).catch((error) => {
        throw (0, error_js_1.resolveError)(error);
    });
    return {
        id: response.id,
        files: response.files,
        links: response.links,
        fileViews: response.file_views,
        public: response.public,
        root: response.root,
        lastActivity: response.last_activity,
        lastActivityDate: new Date(response.last_activity * 1000),
    };
}
/**
 * Get a list of all subdomains.
 * WARNING: The returned list includes NSFW domain names.
 * @returns A list of subdomains.
 */
async function listSubdomains() {
    const response = await (0, request_js_1.request)({
        type: 'GET',
        statusErrors: [429],
        baseUrl: 'https://sxcu.net/api/',
        path: 'subdomains',
    }).catch((error) => {
        throw (0, error_js_1.resolveError)(error);
    });
    const array = [];
    response.forEach((subdomain) => {
        array.push({
            domain: subdomain.domain,
            uploadCount: subdomain.upload_count,
            public: subdomain.public,
            fileViews: subdomain.file_views,
        });
    });
    return array;
}
