import {
    uploadFile,
    getFileMeta,
    deleteFile,
    createCollection,
    getCollectionMeta,
    checkSubdomain,
    getSubdomainMeta,
    listSubdomains,
    createLink,
    deleteLink,
    createPaste,
    deletePaste,
    createError,
    resolveError,
    extractToken,
    parseSnowflake,
    convertSxcuFile,
    request,
    getRateLimits,
    promisifyRateLimit,
    promisifyGlobalRateLimit,
    promisifyEndpointRateLimit,
    toggleRequestQueue,
} from './index.js';
declare const categorized: {
    files: {
        uploadFile: typeof uploadFile;
        getFileMeta: typeof getFileMeta;
        deleteFile: typeof deleteFile;
    };
    collections: {
        createCollection: typeof createCollection;
        getCollectionMeta: typeof getCollectionMeta;
    };
    subdomains: {
        checkSubdomain: typeof checkSubdomain;
        getSubdomainMeta: typeof getSubdomainMeta;
        listSubdomains: typeof listSubdomains;
    };
    links: {
        createLink: typeof createLink;
        deleteLink: typeof deleteLink;
    };
    text: {
        createPaste: typeof createPaste;
        deletePaste: typeof deletePaste;
    };
    userAgent: import('./index.js').UserAgentClass;
    utility: {
        createError: typeof createError;
        resolveError: typeof resolveError;
        extractToken: typeof extractToken;
        parseSnowflake: typeof parseSnowflake;
        convertSxcuFile: typeof convertSxcuFile;
        request: typeof request;
        getRateLimits: typeof getRateLimits;
        promisifyRateLimit: typeof promisifyRateLimit;
        promisifyGlobalRateLimit: typeof promisifyGlobalRateLimit;
        promisifyEndpointRateLimit: typeof promisifyEndpointRateLimit;
        toggleRequestQueue: typeof toggleRequestQueue;
    };
};
/**
 * Categorize imports into their respective categories.
 * This does not include types.
 */
export declare function categorizeImports(): typeof categorized;
export {};
//# sourceMappingURL=categorize.d.ts.map
