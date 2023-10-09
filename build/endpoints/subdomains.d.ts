/**
 * Check if a subdomain exists.
 * @param subdomain The subdomain to check.
 * @returns If the subdomain currently exists or not.
 */
export declare function checkSubdomain(subdomain: string): Promise<boolean>;
export declare function getSubdomainMeta(): Promise<void>;
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
 * @returns A list of subdomains.
 */
export declare function listSubdomains(): Promise<SubdomainData[]>;
//# sourceMappingURL=subdomains.d.ts.map
