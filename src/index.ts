/*
 * Copyright (c) 2024 Jacob Humston. All rights reserved.
 *
 * This software is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * https://github.com/jacobhumston/sxcu.api
 */

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

import { DeletionToken, Token, Url, Snowflake } from './types.js';

import {
    request,
    getRateLimits,
    promisifyRateLimit,
    promisifyGlobalRateLimit,
    promisifyEndpointRateLimit,
    toggleRequestQueue,
    RequestOptions,
    RateLimit,
    Endpoint,
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

import { categorizeImports } from './categorize.js';

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
    request,
    getRateLimits,
    promisifyRateLimit,
    promisifyGlobalRateLimit,
    promisifyEndpointRateLimit,
    toggleRequestQueue,
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
    Endpoint,
};
