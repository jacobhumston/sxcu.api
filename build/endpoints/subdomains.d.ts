export declare function checkSubdomain(): Promise<void>;
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
/** The raw version of a subdomain but with less data associated with it.*/
export type SubdomainDataRaw = {
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
export declare function listSubdomains(): Promise<SubdomainData[]>;
//# sourceMappingURL=subdomains.d.ts.map