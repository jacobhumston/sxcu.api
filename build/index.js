// Endpoints
import { 
// Functions
uploadFile, getFileMeta, deleteFile, } from './endpoints/files.js';
import { 
// Functions
createCollection, getCollectionMeta, } from './endpoints/collections.js';
import { 
// Functions
checkSubdomain, getSubdomainMeta, listSubdomains, } from './endpoints/subdomains.js';
import { 
// Functions
createLink, deleteLink, } from './endpoints/links.js';
import { 
// Functions
createPaste, deletePaste, } from './endpoints/text.js';
// Other Modules
import { 
// Functions
createError, resolveError, } from './error.js';
import { 
// Functions
setUserAgent, useUserAgentDefault, getUserAgent, } from './user-agent.js';
/**
 * Categorize imports into their respective categories.
 * This does not include types.
 */
export function categorizeImports() {
    return {
        files: {
            uploadFile: uploadFile,
            getFileMeta: getFileMeta,
            deleteFile: deleteFile,
        },
        collections: {
            createCollection: createCollection,
            getCollectionMeta: getCollectionMeta,
        },
        subdomains: {
            checkSubdomain: checkSubdomain,
            getSubdomainMeta: getSubdomainMeta,
            listSubdomains: listSubdomains,
        },
        links: {
            createLink: createLink,
            deleteLink: deleteLink,
        },
        text: {
            createPaste: createPaste,
            deletePaste: deletePaste,
        },
        utility: {
            createError: createError,
            resolveError: resolveError,
            setUserAgent: setUserAgent,
            useUserAgentDefault: useUserAgentDefault,
            getUserAgent: getUserAgent,
        },
    };
}
export { 
// Endpoints
uploadFile, getFileMeta, deleteFile, createCollection, getCollectionMeta, checkSubdomain, getSubdomainMeta, listSubdomains, createLink, deleteLink, createPaste, deletePaste, 
// Other Modules
createError, resolveError, setUserAgent, useUserAgentDefault, getUserAgent, };
