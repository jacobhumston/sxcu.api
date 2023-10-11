import { request } from '../request.js';
import { resolveError } from '../error.js';
/**
 * Check if a subdomain exists.
 * @param subdomain The subdomain to check.
 * @returns If the subdomain currently exists or not.
 */
export async function checkSubdomain(subdomain) {
    const response = await request({
        type: 'GET',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: `subdomains/check/${subdomain}`,
    }).catch((error) => {
        throw resolveError(error);
    });
    return response.exists;
}
/**
 * Get the meta data of a subdomain.
 * @param subdomain The subdomain to get the meta data of.
 * @returns The meta data of the subdomain.
 */
export async function getSubdomainMeta(subdomain) {
    const response = await request({
        type: 'GET',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: `subdomains/${subdomain}`,
    }).catch((error) => {
        throw resolveError(error);
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
 * @returns A list of subdomains.
 */
export async function listSubdomains() {
    const response = await request({
        type: 'GET',
        statusErrors: [429],
        baseUrl: 'https://sxcu.net/api/',
        path: 'subdomains',
    }).catch((error) => {
        throw resolveError(error);
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
