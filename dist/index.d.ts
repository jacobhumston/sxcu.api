export namespace files {
    function getFileMeta(fileId: string): Promise<{
        /**
         * ID of the file created.
         */
        id: string;
        /**
         * Public URL of the file.
         */
        url: string;
        /**
         * File view count.
         */
        views: number;
        /**
         * Wether the file can be viewed or not.
         */
        viewable: boolean;
        /**
         * ID of the collection that this file is associated with.
         */
        collection: string;
        /**
         * File size in bytes.
         */
        size: number;
        /**
         * Unix timestamp of when the file was created.
         */
        creationTime: number;
        /**
         * 'creationTime' converted to date object.
         */
        creationTimeDate: Date;
        /**
         * OpenGraph properties for this file.
         */
        openGraphProperties: {
            /**
             * OpenGraph HEX color code.
             */
            color?: string;
            /**
             * OpenGraph title.
             */
            title?: string;
            /**
             * OpenGraph description.
             */
            description?: string;
            /**
             * Whether to hide this file's url in Discord or not when sent.
             */
            discordHideURL?: boolean;
        };
    }>;
    function uploadFile(file: string, options?: {
        /**
         * Subdomain's upload token.
         */
        token?: string;
        /**
         * Collection to upload too.
         */
        collection?: string;
        /**
         * Collection's upload token.
         */
        collectionToken?: string;
        /**
         * If true, the url will be a link directly to the image instead.
         */
        noEmbed?: boolean;
        /**
         * If true, the file will be automatically deleted after 24 hours.
         */
        selfDestruct?: boolean;
        /**
         * OpenGraph properties which allow you to change how the url is embedded on different websites.
         */
        openGraphProperties?: {
            /**
             * Configures the value for the 'title' OpenGraph meta tag, if set to false, the tag will be omitted entirely.
             */
            title: string | boolean;
            /**
             * Configures the value for the 'description' OpenGraph meta tag, if set to false, the tag will be omitted entirely.
             */
            description: string | boolean;
            /**
             * Configures the value for the 'theme-color' OpenGraph meta tag, must be a valid HEX color code, if set to false, the tag will be omitted entirely.
             */
            color: string | boolean;
            /**
             * Configures the value for the 'site-name' OpenGraph meta tag, if set to false, the tag will be omitted entirely.
             */
            siteName: string | boolean;
            /**
             * If false, discord will not hide the url of the file when sent as a direct link.
             */
            discordHideUrl: boolean;
        };
    }, subdomain?: string): Promise<{
        /**
         * ID of the uploaded file.
         */
        id: string;
        /**
         * URL of the uploaded file.
         */
        url: string;
        /**
         * Deletion URL for the uploaded file.
         */
        deletionUrl: string;
        /**
         * Deletion token for the uploaded file.
         */
        deletionToken: string;
        /**
         * Thumbnail of the uploaded file.
         */
        thumbnail: string;
    }>;
    function deleteFile(fileId: string, deletionToken: string): Promise<string>;
}
export namespace subdomains {
    function listSubdomains(): Promise<{
        /**
         * Name of the subdomain.
         */
        domain: string;
        /**
         * Number of files uploaded to this subdomain.
         */
        uploadCount: number;
        /**
         * Whether this subdomain is public or not.
         */
        public: boolean;
        /**
         * Number of files views on this subdomain.
         */
        fileViews: number;
    }[]>;
    function getSubdomainMeta(subdomain: string): Promise<{
        /**
         * ID of the subdomain.
         */
        id: string;
        /**
         * Number of files associated with this subdomain.
         */
        files: number;
        /**
         * Number of links associated with this subdomain.
         */
        links: number;
        /**
         * Total amount of views that all files got combined that are associated with this subdomain.
         */
        fileViews: number;
        /**
         * Wether this subdomain is public or not.
         */
        public: boolean;
        /**
         * Wether this subdomain is a root domain or not.
         */
        root: boolean;
        /**
         * Timestamp of last interaction with this subdomain. (File views, file uploads, and file deletions.)
         */
        lastActivity: number;
        /**
         * 'lastActivity' converted to date object.
         */
        lastActivityDate: Date;
    }>;
    function checkSubdomain(subdomain: string): Promise<boolean>;
}
export namespace collections {
    function getCollectionMeta(collectionId: string): Promise<{
        /**
         * ID of the collection.
         */
        id: string;
        /**
         * Title of the collection.
         */
        title: string;
        /**
         * Description of the collection.
         */
        description: string;
        /**
         * The amount of views of the collection.
         */
        views: number;
        /**
         * Unix timestamp of when the collection was created.
         */
        creationTime: number;
        /**
         * 'creationTime' converted to a Date object.
         */
        creationTimeDate: Date;
        /**
         * Whether the collection is public or not.
         */
        public: boolean;
        /**
         * Whether the collection is unlisted or not.
         */
        unlisted: boolean;
        /**
         * Number of views all the files in this collection got combined.
         */
        fileViews: number;
        /**
         * Files that belong to this collection.
         */
        files: {
            /**
             * ID of the file.
             */
            id: string;
            /**
             * URL of the file.
             */
            url: string;
            /**
             * Thumbnail of the file.
             */
            thumbnail: string;
            /**
             * The amount of views of the file.
             */
            views: number;
        }[];
    }>;
    function createCollection(title: string, description?: string, isPrivate?: boolean, unlisted?: boolean): Promise<{
        collectionId: string;
        /**
         * Title of the collection.
         */
        title: string;
        /**
         * Description of the collection.
         */
        description: string;
        /**
         * Whether this collection is unlisted or not.
         */
        unlisted: boolean;
        /**
         * Whether the collection is private or not.
         */
        private: boolean;
        /**
         * Upload token of the collection.
         */
        collectionToken: string;
    }>;
}
export namespace links {
    function createLink(link: string, subdomain?: string): Promise<{
        /**
         * ID of the new redirect link.
         */
        id: string;
        /**
         * URL of the new redirect link.
         */
        url: string;
        /**
         * Deletion URL for the new redirect link.
         */
        deletionUrl: string;
        /**
         * Deletion token for the new redirect link.
         */
        deletionToken: string;
    }>;
    function deleteLink(linkId: string, deletionToken: string): Promise<string>;
}
export namespace text {
    function createPaste(text: string): Promise<{
        /**
         * ID of the new text paste.
         */
        id: string;
        /**
         * URL of the new text paste.
         */
        url: string;
        /**
         * Deletion URL for the new text paste.
         */
        deletionUrl: string;
        /**
         * Deletion token for the new text paste.
         */
        deletionToken: string;
    }>;
    function deletePaste(pasteId: string, deletionToken: string): Promise<string>;
}
export namespace utility {
    function resolveError(error: any): ErrorResponse;
    function getRateLimitData(): {
        [x: string]: {
            /**
             * An array of function names that caused this rate limit. This array is always empty if 'global' is true.
             */
            functions: string[];
            /**
             * A unique string that identifies the rate limit.
             */
            bucket: string;
            /**
             * Data of this rate limit.
             */
            lastRateLimit: {
                /**
                 * Number of requests allowed.
                 */
                limit: number;
                /**
                 * Number of requests that can still be made.
                 */
                remaining: number;
                /**
                 * Epoch time of when the rate limit resets.
                 */
                reset: number;
                /**
                 * Total amount of time in seconds until the rate limit resets. Note that this value only updates when new rate limit data is processed.
                 */
                resetAfter: number;
                /**
                 * A unique string that identifies the rate limit.
                 */
                bucket: string;
                /**
                 * 'reset' converted to date object.
                 */
                resetDate: Date;
            };
            /**
             * Whether this rate limit is the global rate limit or not.
             */
            global: boolean;
        };
    };
}
/**
 * Represents a Snowflake.
 */
export type Snowflake = string;
/**
 * Represents a URL.
 */
export type URL = string;
/**
 * Represents an error response.
 */
export type ErrorResponse = {
    /**
     * Error message.
     */
    error: string;
    /**
     * Internal error code.
     */
    code: number;
};
/**
 * Represents a path to a file.
 */
export type FilePath = string;
//# sourceMappingURL=index.d.ts.map