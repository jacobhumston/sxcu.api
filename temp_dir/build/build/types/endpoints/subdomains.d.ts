import { Snowflake, Url } from '../types.js';
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
export declare function checkSubdomain(subdomain: SubdomainUrl): Promise<boolean>;
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
export declare function getSubdomainMeta(subdomain: SubdomainUrl): Promise<Subdomain>;
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
export declare function listSubdomains(): Promise<SubdomainData[]>;
//# sourceMappingURL=subdomains.d.ts.map
