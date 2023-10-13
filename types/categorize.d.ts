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
} from './index.js';
/**
 * Categorize imports into their respective categories.
 * This does not include types.
 */
export declare function categorizeImports(): {
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
    };
};
//# sourceMappingURL=categorize.d.ts.map
