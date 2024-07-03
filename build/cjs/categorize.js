'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.categorizeImports = categorizeImports;
const index_js_1 = require('./index.js');
/**
 * Categorize imports into their respective categories.
 * This does not include types.
 */
function categorizeImports() {
    return {
        files: {
            uploadFile: index_js_1.uploadFile,
            getFileMeta: index_js_1.getFileMeta,
            deleteFile: index_js_1.deleteFile,
        },
        collections: { createCollection: index_js_1.createCollection, getCollectionMeta: index_js_1.getCollectionMeta },
        subdomains: {
            checkSubdomain: index_js_1.checkSubdomain,
            getSubdomainMeta: index_js_1.getSubdomainMeta,
            listSubdomains: index_js_1.listSubdomains,
        },
        links: { createLink: index_js_1.createLink, deleteLink: index_js_1.deleteLink },
        text: { createPaste: index_js_1.createPaste, deletePaste: index_js_1.deletePaste },
        userAgent: index_js_1.UserAgent,
        utility: {
            createError: index_js_1.createError,
            resolveError: index_js_1.resolveError,
            extractToken: index_js_1.extractToken,
            parseSnowflake: index_js_1.parseSnowflake,
            convertSxcuFile: index_js_1.convertSxcuFile,
            request: index_js_1.request,
            getRateLimits: index_js_1.getRateLimits,
            promisifyRateLimit: index_js_1.promisifyRateLimit,
            promisifyGlobalRateLimit: index_js_1.promisifyGlobalRateLimit,
            promisifyEndpointRateLimit: index_js_1.promisifyEndpointRateLimit,
            toggleRequestQueue: index_js_1.toggleRequestQueue,
        },
    };
}
