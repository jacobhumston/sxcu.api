// Endpoints
import {
    // Functions
    uploadFile,
    getFileMeta,
    deleteFile,
    // Types,
    FileOptions,
    FileData,
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
    // Types
    SubdomainData,
    Subdomain,
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
    Token,
    Url,
    Snowflake,
} from './types.js';

import {
    // Functions
    extractToken,
    parseSnowflake,
    // Types
    ParsedSnowflake,
    SnowflakeObjectType,
    SnowflakeObjectFlag,
} from './utility.js';

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
    extractToken,
    parseSnowflake,
    categorizeImports,

    // Variables
    UserAgent,

    // Classes
    UserAgentClass,

    // Types
    FileOptions,
    FileData,
    ErrorObject,
    SubdomainData,
    Subdomain,
    Paste,
    Link,
    DeletionToken,
    Token,
    Url,
    Snowflake,
    ParsedSnowflake,
    SnowflakeObjectType,
    SnowflakeObjectFlag,
};
