// Endpoints
import {
    uploadFile,
    getFileMeta,
    deleteFile,
    FileOptions,
    FileData,
    UploadableFile,
    FileMeta,
} from './endpoints/files.js';

import { createCollection, getCollectionMeta } from './endpoints/collections.js';

import { checkSubdomain, getSubdomainMeta, listSubdomains, SubdomainData, Subdomain } from './endpoints/subdomains.js';

import { createLink, deleteLink, Link } from './endpoints/links.js';

import { createPaste, deletePaste, Paste } from './endpoints/text.js';

// Other Modules
import { createError, resolveError, ErrorObject } from './error.js';

import { UserAgent, UserAgentClass } from './classes/user-agent.js';

import { categorizeImports } from './categorize.js';

import { DeletionToken, Token, Url, Snowflake } from './types.js';

import {
    extractToken,
    parseSnowflake,
    convertSxcuFile,
    ParsedSnowflake,
    SnowflakeObjectType,
    SnowflakeObjectFlag,
    ConvertedSxcuFile,
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
    convertSxcuFile,
    categorizeImports,

    // Variables
    UserAgent,

    // Classes
    UserAgentClass,

    // Types
    FileOptions,
    FileData,
    UploadableFile,
    FileMeta,
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
    ConvertedSxcuFile,
};
