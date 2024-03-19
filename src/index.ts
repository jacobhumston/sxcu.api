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

import {
    createCollection,
    getCollectionMeta,
    CreateCollectionOptions,
    CreatedCollection,
    FileCollectionMeta,
    CollectionMeta,
} from './endpoints/collections.js';

import { checkSubdomain, getSubdomainMeta, listSubdomains, SubdomainData, Subdomain } from './endpoints/subdomains.js';

import { createLink, deleteLink, Link } from './endpoints/links.js';

import { createPaste, deletePaste, Paste } from './endpoints/text.js';

// Other Modules
import { createError, resolveError, ErrorObject } from './error.js';

import { UserAgent, UserAgentClass } from './classes/user-agent.js';

import { categorizeImports } from './categorize.js';

import { DeletionToken, Token, Url, Snowflake } from './types.js';

import {
    request,
    getRateLimits,
    promisifyRateLimit,
    promisifyGlobalRateLimit,
    RequestOptions,
    RateLimit,
} from './request.js';

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
    request,
    getRateLimits,
    promisifyRateLimit,
    promisifyGlobalRateLimit,

    // Variables
    UserAgent,

    // Classes
    UserAgentClass,

    // Types
    FileOptions,
    FileData,
    UploadableFile,
    FileMeta,
    CreateCollectionOptions,
    CreatedCollection,
    FileCollectionMeta,
    CollectionMeta,
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
    RequestOptions,
    RateLimit,
};
