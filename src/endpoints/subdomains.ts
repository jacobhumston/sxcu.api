import { request } from '../request.js';
import { resolveError } from '../error.js';
import type { Snowflake, Url } from '../types.js';

/**
 * Represents a subdomain's url.
 * Example; `example.shx.gg`
 */
export type SubdomainUrl = Url;

/**
 * Check if a subdomain exists.
 * @param subdomain The subdomain to check.
 * @returns If the subdomain currently exists or not.
 */
export async function checkSubdomain(subdomain: SubdomainUrl): Promise<boolean> {
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

/** Represents a subdomain. */
export type Subdomain = {
    /** The ID of this subdomain. */
    id: Snowflake;
    /** The amount of files on this subdomain. */
    files: number;
    /** The amount of links on this subdomain. */
    links: number;
    /** The total number of views of all files associated with this subdomain. */
    fileViews: number;
    /** If this subdomain is public or not. */
    public: boolean;
    /** If this subdomain is a root domain.  */
    root: boolean;
    /** Timestamp of the last interaction with this subdomain. */
    lastActivity: number;
    /** The date of the last interaction with this subdomain. */
    lastActivityDate: Date;
};

/**
 * Get the meta data of a subdomain.
 * @param subdomain The subdomain to get the meta data of.
 * @returns The meta data of the subdomain.
 */
export async function getSubdomainMeta(subdomain: SubdomainUrl): Promise<Subdomain> {
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

/**
 * Get a list of all subdomains.
 * WARNING: The returned list includes NSFW domain names.
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

    const array: any[] = [];

    response.forEach((subdomain: any) => {
        array.push({
            domain: subdomain.domain,
            uploadCount: subdomain.upload_count,
            public: subdomain.public,
            fileViews: subdomain.file_views,
        });
    });

    return array;
}
