'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.createCollection = createCollection;
exports.getCollectionMeta = getCollectionMeta;
const request_js_1 = require('../request.js');
const error_js_1 = require('../error.js');
/**
 * Create a collection.
 * @param title The title of this collection.
 * @param options Collection creation options.
 */
async function createCollection(title, options) {
    options = options ?? {};
    const params = new URLSearchParams();
    params.set('title', title);
    if (options.description) params.set('desc', options.description);
    params.set('private', options.private ? `${options.private}` : 'false');
    params.set('unlisted', options.unlisted ? `${options.unlisted}` : 'false');
    const response = await (0, request_js_1.request)({
        type: 'POST',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: 'collections/create',
        body: params,
    }).catch((error) => {
        throw (0, error_js_1.resolveError)(error);
    });
    return {
        id: response.collection_id,
        title: response.title,
        description: response.description,
        unlisted: response.unlisted,
        private: response.private,
        token: response.collection_token,
        url: `https://sxcu.net/c/${response.collection_id}`,
    };
}
/**
 * Get the meta information of a collection.
 * @param id The ID of the collection.
 */
async function getCollectionMeta(id) {
    const response = await (0, request_js_1.request)({
        type: 'GET',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: `collections/${id}`,
    }).catch((error) => {
        throw (0, error_js_1.resolveError)(error);
    });
    return {
        id: response.id,
        title: response.title,
        description: response.desc,
        views: response.views,
        creationTime: response.creation_time,
        creationTimeDate: new Date(response.creation_time * 1000),
        public: response.public,
        unlisted: response.unlisted,
        fileViews: response.file_views,
        files: response.files.map((file) => ({
            id: file.id,
            url: file.url,
            thumbnail: file.thumb,
            views: file.views,
        })),
    };
}
