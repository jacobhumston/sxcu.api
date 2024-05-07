'use strict';
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
Object.defineProperty(exports, '__esModule', { value: true });
exports.SnowflakeObjectFlag =
    exports.SnowflakeObjectType =
    exports.UserAgentClass =
    exports.UserAgent =
    exports.categorizeImports =
    exports.toggleRequestQueue =
    exports.promisifyEndpointRateLimit =
    exports.promisifyGlobalRateLimit =
    exports.promisifyRateLimit =
    exports.getRateLimits =
    exports.request =
    exports.convertSxcuFile =
    exports.parseSnowflake =
    exports.extractToken =
    exports.resolveError =
    exports.createError =
    exports.deletePaste =
    exports.createPaste =
    exports.deleteLink =
    exports.createLink =
    exports.listSubdomains =
    exports.getSubdomainMeta =
    exports.checkSubdomain =
    exports.getCollectionMeta =
    exports.createCollection =
    exports.deleteFile =
    exports.getFileMeta =
    exports.uploadFile =
        void 0;
// Endpoints
const files_js_1 = require('./endpoints/files.js');
Object.defineProperty(exports, 'uploadFile', {
    enumerable: true,
    get: function () {
        return files_js_1.uploadFile;
    },
});
Object.defineProperty(exports, 'getFileMeta', {
    enumerable: true,
    get: function () {
        return files_js_1.getFileMeta;
    },
});
Object.defineProperty(exports, 'deleteFile', {
    enumerable: true,
    get: function () {
        return files_js_1.deleteFile;
    },
});
const collections_js_1 = require('./endpoints/collections.js');
Object.defineProperty(exports, 'createCollection', {
    enumerable: true,
    get: function () {
        return collections_js_1.createCollection;
    },
});
Object.defineProperty(exports, 'getCollectionMeta', {
    enumerable: true,
    get: function () {
        return collections_js_1.getCollectionMeta;
    },
});
const subdomains_js_1 = require('./endpoints/subdomains.js');
Object.defineProperty(exports, 'checkSubdomain', {
    enumerable: true,
    get: function () {
        return subdomains_js_1.checkSubdomain;
    },
});
Object.defineProperty(exports, 'getSubdomainMeta', {
    enumerable: true,
    get: function () {
        return subdomains_js_1.getSubdomainMeta;
    },
});
Object.defineProperty(exports, 'listSubdomains', {
    enumerable: true,
    get: function () {
        return subdomains_js_1.listSubdomains;
    },
});
const links_js_1 = require('./endpoints/links.js');
Object.defineProperty(exports, 'createLink', {
    enumerable: true,
    get: function () {
        return links_js_1.createLink;
    },
});
Object.defineProperty(exports, 'deleteLink', {
    enumerable: true,
    get: function () {
        return links_js_1.deleteLink;
    },
});
const text_js_1 = require('./endpoints/text.js');
Object.defineProperty(exports, 'createPaste', {
    enumerable: true,
    get: function () {
        return text_js_1.createPaste;
    },
});
Object.defineProperty(exports, 'deletePaste', {
    enumerable: true,
    get: function () {
        return text_js_1.deletePaste;
    },
});
// Other Modules
const error_js_1 = require('./error.js');
Object.defineProperty(exports, 'createError', {
    enumerable: true,
    get: function () {
        return error_js_1.createError;
    },
});
Object.defineProperty(exports, 'resolveError', {
    enumerable: true,
    get: function () {
        return error_js_1.resolveError;
    },
});
const user_agent_js_1 = require('./classes/user-agent.js');
Object.defineProperty(exports, 'UserAgent', {
    enumerable: true,
    get: function () {
        return user_agent_js_1.UserAgent;
    },
});
Object.defineProperty(exports, 'UserAgentClass', {
    enumerable: true,
    get: function () {
        return user_agent_js_1.UserAgentClass;
    },
});
const request_js_1 = require('./request.js');
Object.defineProperty(exports, 'request', {
    enumerable: true,
    get: function () {
        return request_js_1.request;
    },
});
Object.defineProperty(exports, 'getRateLimits', {
    enumerable: true,
    get: function () {
        return request_js_1.getRateLimits;
    },
});
Object.defineProperty(exports, 'promisifyRateLimit', {
    enumerable: true,
    get: function () {
        return request_js_1.promisifyRateLimit;
    },
});
Object.defineProperty(exports, 'promisifyGlobalRateLimit', {
    enumerable: true,
    get: function () {
        return request_js_1.promisifyGlobalRateLimit;
    },
});
Object.defineProperty(exports, 'promisifyEndpointRateLimit', {
    enumerable: true,
    get: function () {
        return request_js_1.promisifyEndpointRateLimit;
    },
});
Object.defineProperty(exports, 'toggleRequestQueue', {
    enumerable: true,
    get: function () {
        return request_js_1.toggleRequestQueue;
    },
});
const utility_js_1 = require('./utility.js');
Object.defineProperty(exports, 'extractToken', {
    enumerable: true,
    get: function () {
        return utility_js_1.extractToken;
    },
});
Object.defineProperty(exports, 'parseSnowflake', {
    enumerable: true,
    get: function () {
        return utility_js_1.parseSnowflake;
    },
});
Object.defineProperty(exports, 'convertSxcuFile', {
    enumerable: true,
    get: function () {
        return utility_js_1.convertSxcuFile;
    },
});
Object.defineProperty(exports, 'SnowflakeObjectType', {
    enumerable: true,
    get: function () {
        return utility_js_1.SnowflakeObjectType;
    },
});
Object.defineProperty(exports, 'SnowflakeObjectFlag', {
    enumerable: true,
    get: function () {
        return utility_js_1.SnowflakeObjectFlag;
    },
});
const categorize_js_1 = require('./categorize.js');
Object.defineProperty(exports, 'categorizeImports', {
    enumerable: true,
    get: function () {
        return categorize_js_1.categorizeImports;
    },
});
