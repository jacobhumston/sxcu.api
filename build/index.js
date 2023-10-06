// Endpoints
import {
    // Functions
    uploadFile,
    getFileMeta,
    deleteFile,
} from './endpoints/files.js';
import {
    // Functions
    createCollection,
    getCollectionMeta,
} from './endpoints/collections.js';
import {
    // Functions
    checkSubdomain,
    getSubdomainMeta,
    listSubdomains,
} from './endpoints/subdomains.js';
import {
    // Functions
    createLink,
    deleteLink,
} from './endpoints/links.js';
import {
    // Functions
    createPaste,
    deletePaste,
} from './endpoints/text.js';
// Other Modules
import {
    // Functions
    createError,
    resolveError,
} from './error.js';
import {
    // Functions
    setUserAgent,
    useUserAgentDefault,
    getUserAgent,
} from './user-agent.js';
export {
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
    setUserAgent,
    useUserAgentDefault,
    getUserAgent,
};
