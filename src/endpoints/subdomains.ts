import { request } from '../request.js';
import { resolveError } from '../error.js';

/**
 * Check if a subdomain exists.
 * @param subdomain The subdomain to check.
 * @returns If the subdomain currently exists or not.
 */
export async function checkSubdomain(subdomain: string): Promise<boolean> {
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

export async function getSubdomainMeta() {}

/** A subdomain but with less data associated with it. */
export type SubdomainData = {
    /** The name of the subdomain. */
    domain: string;
    /** Amount of files uploaded to this subdomain. */
    uploadCount: number;
    /** Wether this subdomain is public or not. */
    public: boolean;
    /** The total number of views of all files associated with this subdomain. */
    fileViews: number;
};

/** The raw version of a subdomain but with less data associated with it.*/
type SubdomainDataRaw = {
    /** The name of the subdomain. */
    domain: string;
    /** Amount of files uploaded to this subdomain. */
    upload_count: number;
    /** Wether this subdomain is public or not. */
    public: boolean;
    /** The total number of views of all files associated with this subdomain. */
    file_views: number;
};

/**
 * Get a list of all subdomains.
 * @returns A list of subdomains.
 */
export async function listSubdomains(): Promise<SubdomainData[]> {
    const response = await request({
        type: 'GET',
        statusErrors: [429],
        baseUrl: 'https://sxcu.net/api/',
        path: 'subdomains',
    }).catch((error) => {
        throw resolveError(error);
    });

    const array: SubdomainData[] = [];

    response.forEach((subdomain: SubdomainDataRaw) => {
        array.push({
            domain: subdomain.domain,
            uploadCount: subdomain.upload_count,
            public: subdomain.public,
            fileViews: subdomain.file_views,
        });
    });

    return array;
}
