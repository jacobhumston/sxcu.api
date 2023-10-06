import { uploadFile, getFileMeta, deleteFile } from './endpoints/files.js';
import { createCollection, getCollectionMeta } from './endpoints/collections.js';
import { checkSubdomain, getSubdomainMeta, listSubdomains } from './endpoints/subdomains.js';
import { createLink, deleteLink } from './endpoints/links.js';
import { createPaste, deletePaste } from './endpoints/text.js';
import { createError, resolveError, ErrorObject } from './error.js';
import { setUserAgent, useUserAgentDefault, getUserAgent } from './user-agent.js';
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
    userAgent: {
        setUserAgent: typeof setUserAgent;
        useUserAgentDefault: typeof useUserAgentDefault;
        getUserAgent: typeof getUserAgent;
    };
    utility: {
        createError: typeof createError;
        resolveError: typeof resolveError;
    };
};
export { uploadFile, getFileMeta, deleteFile, createCollection, getCollectionMeta, checkSubdomain, getSubdomainMeta, listSubdomains, createLink, deleteLink, createPaste, deletePaste, createError, resolveError, setUserAgent, useUserAgentDefault, getUserAgent, ErrorObject, };
//# sourceMappingURL=index.d.ts.map