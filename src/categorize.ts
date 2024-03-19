import {
    // Endpoints
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

    // Other Modules
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

    // Variables
    UserAgent,
} from './index.js';

/**
 * Categorize imports into their respective categories.
 * This does not include types.
 */
export function categorizeImports() {
    return {
        files: { uploadFile: uploadFile, getFileMeta: getFileMeta, deleteFile: deleteFile },
        collections: { createCollection: createCollection, getCollectionMeta: getCollectionMeta },
        subdomains: {
            checkSubdomain: checkSubdomain,
            getSubdomainMeta: getSubdomainMeta,
            listSubdomains: listSubdomains,
        },
        links: { createLink: createLink, deleteLink: deleteLink },
        text: { createPaste: createPaste, deletePaste: deletePaste },
        userAgent: UserAgent,
        utility: {
            createError: createError,
            resolveError: resolveError,
            extractToken: extractToken,
            parseSnowflake: parseSnowflake,
            convertSxcuFile: convertSxcuFile,
            request: request,
            getRateLimits: getRateLimits,
            promisifyRateLimit: promisifyRateLimit,
            promisifyGlobalRateLimit: promisifyGlobalRateLimit,
            promisifyEndpointRateLimit: promisifyEndpointRateLimit,
            toggleRequestQueue: toggleRequestQueue,
        },
    };
}
