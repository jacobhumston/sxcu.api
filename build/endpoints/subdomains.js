import { request } from '../request.js';
import { resolveError } from '../error.js';
export async function checkSubdomain() { }
export async function getSubdomainMeta() { }
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
