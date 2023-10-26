'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SnowflakeObjectFlag =
    exports.SnowflakeObjectType =
    exports.UserAgentClass =
    exports.UserAgent =
    exports.categorizeImports =
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
const categorize_js_1 = require('./categorize.js');
Object.defineProperty(exports, 'categorizeImports', {
    enumerable: true,
    get: function () {
        return categorize_js_1.categorizeImports;
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
