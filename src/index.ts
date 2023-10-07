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
    // Types
    Link,
} from './endpoints/links.js';

import {
    // Functions
    createPaste,
    deletePaste,
    // Type
    Paste,
} from './endpoints/text.js';

// Other Modules
import {
    // Functions
    createError,
    resolveError,
    // Types
    ErrorObject,
} from './error.js';

import {
    // Classes
    UserAgent,
    // Types
    UserAgentClass,
} from './classes/user-agent.js';

import {
    // Functions
    categorizeImports,
} from './categorize.js';

import {
    // Types
    DeletionToken,
    Url,
    Snowflake,
} from './types.js';

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
    categorizeImports,
    createError,
    resolveError,

    // Variables
    UserAgent,

    // Classes
    UserAgentClass,

    // Types
    ErrorObject,
    Paste,
    Link,
    DeletionToken,
    Url,
    Snowflake,
};
