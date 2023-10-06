import { uploadFile, getFileMeta, deleteFile } from './endpoints/files.js';
import { createCollection, getCollectionMeta } from './endpoints/collections.js';
import { checkSubdomain, getSubdomainMeta, listSubdomains } from './endpoints/subdomains.js';
import { createLink, deleteLink } from './endpoints/links.js';
import { createPaste, deletePaste } from './endpoints/text.js';
import { createError, resolveError, ErrorObject } from './error.js';
import { setUserAgent, useUserAgentDefault, getUserAgent } from './user-agent.js';
export {
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
    setUserAgent,
    useUserAgentDefault,
    getUserAgent,
    ErrorObject,
};
//# sourceMappingURL=index.d.ts.map
