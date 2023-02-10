/**
 * @file sxcu.api library.
 * @author Jacob Humston
 */

// Modules
const fs = require('fs');

// Configuration
const packageVersion = require('../package.json').version;
const packageUrl = 'https://github.com/Lovely-Experiences/sxcu.api';
const userAgent = `sxcu.api/v${packageVersion} (+${packageUrl}) - Node.js ${process.version}`;
const baseUrl = 'https://sxcu.net/api';
const textBaseUrl = 'https://cancer-co.de/';

// Data Objects
const rateLimitData = {};

// Private Methods & Types
/**
 * Save data that is provided from rate limit headers.
 * @function saveRateLimitData
 * @param {Headers} headers
 * @param {string} functionName
 * @returns {null}
 * @private
 */
function saveRateLimitData(headers, functionName) {
    const data = {};
    let isGlobal = false;
    data.limit = headers.get('X-RateLimit-Limit');
    data.remaining = headers.get('X-RateLimit-Remaining');
    data.reset = headers.get('X-RateLimit-Reset');
    data.resetAfter = headers.get('X-RateLimit-Reset-After');
    data.bucket = headers.get('X-RateLimit-Bucket');
    if (headers.get('X-RateLimit-Global') !== null) {
        isGlobal = true;
    }
    if (data.limit === null || data.remaining === null || data.reset === null || data.bucket === null) return null;
    data.limit = Number(data.limit);
    data.remaining = Number(data.remaining);
    data.reset = Number(data.reset);
    data.resetAfter = Number(data.resetAfter);
    data.resetDate = new Date((data.reset + 1) * 1000);
    if (isGlobal === false) {
        for (const bucket in rateLimitData) {
            if (rateLimitData[bucket].functions.findIndex((name) => name === functionName) !== -1) {
                if (bucket !== data.bucket) {
                    delete rateLimitData[bucket];
                }
            }
        }
        if (rateLimitData[data.bucket]) {
            rateLimitData[data.bucket].lastRateLimit = data;
            if (rateLimitData[data.bucket].functions.findIndex((name) => name === functionName) === -1) {
                rateLimitData[data.bucket].functions.push(functionName);
            }
        } else {
            rateLimitData[data.bucket] = {
                functions: [functionName],
                bucket: data.bucket,
                lastRateLimit: data,
                global: false,
            };
        }
    } else {
        rateLimitData['global'] = {
            functions: [],
            bucket: data.bucket,
            lastRateLimit: data,
            global: true,
        };
    }
    return null;
}

// Public Methods
/**
 * Represents a Snowflake.
 * @typedef {string} Snowflake
 */

/**
 * Represents a URL.
 * @typedef {string} URL
 */

/**
 * Represents an error response.
 * @typedef {Object} ErrorResponse
 * @property {string} error Error message.
 * @property {number} code Internal error code.
 */

/**
 * Represents a path to a file.
 * @typedef {string} FilePath
 */

/**
 * Methods that interact with the "Files" endpoint.
 * @namespace Files
 * @example
 * const { files: sxcuFiles } = require("sxcu.api"); // sxcuFiles.<method>
 * const { files } = require("sxcu.api"); // files.<method>
 * const sxcu = require("sxcu.api"); // sxcu.files.<method>
 */
exports.files = {
    /**
     * Represents OpenGraph properties of a file meta response.
     * @typedef {Object} FileMetaResponseOpenGraphProperties
     * @property {string} [color] OpenGraph HEX color code.
     * @property {string} [title] OpenGraph title.
     * @property {string} [description] OpenGraph description.
     * @property {boolean} [discordHideURL] Whether to hide this file's url in Discord or not when sent.
     */

    /**
     * Represents the response returned by 'getFileMeta'.
     * @typedef {Object} FileMetaResponse
     * @property {Snowflake} id ID of the file created.
     * @property {URL} url Public URL of the file.
     * @property {number} views File view count.
     * @property {boolean} viewable Wether the file can be viewed or not.
     * @property {Snowflake?} collection ID of the collection that this file is associated with.
     * @property {number} size File size in bytes.
     * @property {number} creationTime Unix timestamp of when the file was created.
     * @property {Date} creationTimeDate 'creationTime' converted to date object.
     * @property {FileMetaResponseOpenGraphProperties|undefined} openGraphProperties OpenGraph properties for this file.
     */

    /**
     * Get the meta info of a file.
     * @function getFileMeta
     * @param {Snowflake} fileId ID of the file to get the meta info of.
     * @returns {Promise<FileMetaResponse>}
     * @throws {ErrorResponse|any}
     * @memberof Files
     * @instance
     */
    getFileMeta: async function (fileId) {
        return new Promise(function (resolve, reject) {
            fetch(`${baseUrl}/files/${fileId}`, {
                method: 'GET',
                headers: {
                    'User-Agent': userAgent,
                    Accept: 'application/json',
                },
            })
                .then(async function (response) {
                    saveRateLimitData(response.headers, 'getFileMeta');
                    if (response.status === 200) {
                        const parsedData = await response.json();
                        const resolvedData = {};
                        resolvedData.id = parsedData.id;
                        resolvedData.url = parsedData.url;
                        resolvedData.views = parsedData.views;
                        resolvedData.viewable = parsedData.viewable;
                        resolvedData.collection = parsedData.collection;
                        resolvedData.size = parsedData.size;
                        resolvedData.creationTime = parsedData.creation_time;
                        resolvedData.creationTimeDate = new Date(resolvedData.creationTime * 1000);
                        if (parsedData.og_properties !== undefined) {
                            resolvedData.openGraphProperties = {};
                            resolvedData.openGraphProperties.color = parsedData.og_properties.color;
                            resolvedData.openGraphProperties.title = parsedData.og_properties.title;
                            resolvedData.openGraphProperties.description = parsedData.og_properties.description;
                            resolvedData.openGraphProperties.discordHideURL = parsedData.og_properties.discord_hide_url;
                        }
                        resolve(resolvedData);
                    } else if (response.status === 400 || response.status === 429) {
                        const parsedData = await response.json();
                        reject({
                            error: parsedData.error,
                            code: parsedData.code,
                        });
                    } else {
                        reject({
                            error: `Received status code ${response.status}.`,
                            code: 0,
                        });
                    }
                })
                .catch(function (error) {
                    reject({ error: `Request failed: ${error}`, code: -1 });
                });
        });
    },

    /**
     * Represents OpenGraph properties for UploadFileOptions.
     * @typedef {Object} UploadFileOptionsOpenGraphProperties
     * @property {string|boolean} title Configures the value for the 'title' OpenGraph meta tag, if set to false, the tag will be omitted entirely.
     * @property {string|boolean} description Configures the value for the 'description' OpenGraph meta tag, if set to false, the tag will be omitted entirely.
     * @property {string|boolean} color Configures the value for the 'theme-color' OpenGraph meta tag, must be a valid HEX color code, if set to false, the tag will be omitted entirely.
     * @property {string|boolean} siteName Configures the value for the 'site-name' OpenGraph meta tag, if set to false, the tag will be omitted entirely.
     * @property {boolean} discordHideUrl If false, discord will not hide the url of the file when sent as a direct link.
     */

    /**
     * Options for uploading a file.
     * @typedef {Object} UploadFileOptions
     * @property {string} [token] Subdomain's upload token.
     * @property {Snowflake} [collection] Collection to upload too.
     * @property {string} [collectionToken] Collection's upload token.
     * @property {boolean} [noEmbed] If true, the url will be a link directly to the image instead.
     * @property {boolean} [selfDestruct] If true, the file will be automatically deleted after 24 hours.
     * @property {UploadFileOptionsOpenGraphProperties} [openGraphProperties] OpenGraph properties which allow you to change how the url is embedded on different websites.
     */

    /**
     * Represents the response returned by 'uploadFile'.
     * @typedef {Object} UploadedFileResponse
     * @property {Snowflake} id ID of the uploaded file.
     * @property {URL} url URL of the uploaded file.
     * @property {URL} deletionUrl Deletion URL for the uploaded file.
     * @property {string} deletionToken Deletion token for the uploaded file.
     * @property {URL} thumbnail Thumbnail of the uploaded file.
     */

    /**
     * Upload a file and retrieve and URL for it.
     * @function uploadFile
     * @param {FilePath} file Path of the file to upload.
     * @param {UploadFileOptions} [options] Upload file options.
     * @param {URL} [subdomain] Subdomain to upload the file to. Ex; 'something.shx.gg'
     * @returns {Promise<UploadedFileResponse>}
     * @throws {ErrorResponse|any}
     * @memberof Files
     * @instance
     * @tutorial uploading-a-file
     * @example
     * const sxcu = require("sxcu.api");
     * const options = { openGraphProperties: { siteName: "Test Image". discordHideUrl: false } };
     * const uploadData = await sxcu.files.uploadFile("image.png", options).catch(function (e) { console.log(e); });
     * console.log(uploadData);
     */
    uploadFile: async function (file, options, subdomain) {
        return new Promise(function (resolve, reject) {
            const formData = new FormData();
            try {
                formData.set('file', new Blob([fs.readFileSync(file)]));
            } catch (error) {
                reject({ error: `Couldn't parse file: ${error}`, code: -1 });
            }
            if (options) {
                if (options.token) {
                    formData.set('token', options.token);
                }
                if (options.collection) {
                    formData.set('collection', options.collection);
                }
                if (options.collectionToken) {
                    formData.set('collection_token', options.collectionToken);
                }
                if (options.noEmbed === true) {
                    formData.set('noembed', 'true');
                }
                if (options.selfDestruct === true) {
                    formData.set('self_destruct', 'true');
                }
                if (options.openGraphProperties) {
                    formData.set(
                        'og_properties',
                        JSON.stringify({
                            title: options.openGraphProperties.title,
                            description: options.openGraphProperties.description,
                            color: options.openGraphProperties.color,
                            site_name: options.openGraphProperties.siteName,
                            discord_hide_url: options.openGraphProperties.discordHideUrl,
                        })
                    );
                }
            }
            let url = baseUrl;
            if (subdomain) {
                url = 'https://' + subdomain + '/api';
            }
            fetch(`${url}/files/create`, {
                method: 'POST',
                body: formData,
                headers: {
                    'User-Agent': userAgent,
                    Accept: 'application/json',
                },
            })
                .then(async function (response) {
                    saveRateLimitData(response.headers, 'uploadFile');
                    if (response.status === 200) {
                        const data = await response.json();
                        const parsedData = {};
                        parsedData.id = data.id;
                        parsedData.url = data.url;
                        parsedData.deletionUrl = data.del_url;
                        parsedData.deletionToken = data.del_url.split('/').pop();
                        parsedData.thumbnail = data.thumb;
                        resolve(parsedData);
                    } else if (response.status === 400 || response.status === 429) {
                        const data = await response.json();
                        reject({ error: data.error, code: data.code });
                    } else {
                        reject({
                            error: `Received status code ${response.status}.`,
                            code: 0,
                        });
                    }
                })
                .catch(function (error) {
                    reject({ error: `Request failed: ${error}`, code: -1 });
                });
        });
    },

    /**
     * Delete a file using the deletion token.
     * @function deleteFile
     * @param {Snowflake} fileId ID of the file to delete.
     * @param {string} deletionToken Deletion token.
     * @returns {Promise<string>} Message result.
     * @throws {ErrorResponse|any}
     * @memberof Files
     * @instance
     */
    deleteFile: async function (fileId, deletionToken) {
        return new Promise(function (resolve, reject) {
            fetch(`${baseUrl}/files/delete/${fileId}/${deletionToken}`, {
                method: 'GET',
                headers: {
                    'User-Agent': userAgent,
                    Accept: 'application/json',
                },
            })
                .then(async function (response) {
                    saveRateLimitData(response.headers, 'deleteFile');
                    if (response.status === 200) {
                        const data = await response.json();
                        return resolve(data.message);
                    } else if (response.status === 400 || response.status === 429) {
                        const data = await response.json();
                        reject({ error: data.error, code: data.code });
                    } else {
                        reject({
                            error: `Received status code ${response.status}.`,
                            code: 0,
                        });
                    }
                })
                .catch(function (error) {
                    reject({ error: `Request failed: ${error}`, code: -1 });
                });
        });
    },
};

/**
 * Methods that interact with the "Subdomains" endpoint.
 * @namespace Subdomains
 * @example
 * const { subdomains: sxcuSubdomains } = require("sxcu.api"); // sxcuSubdomains.<method>
 * const { subdomains } = require("sxcu.api"); // subdomains.<method>
 * const sxcu = require("sxcu.api"); // sxcu.subdomains.<method>
 */
exports.subdomains = {
    /**
     * Represents values returned by 'listSubdomains'.
     * @typedef {Object} SubdomainListData
     * @property {string} domain Name of the subdomain.
     * @property {number} uploadCount Number of files uploaded to this subdomain.
     * @property {boolean} public Whether this subdomain is public or not.
     * @property {number} fileViews Number of files views on this subdomain.
     */

    /**
     * Get a list of all current subdomains with some basic information about each of them.
     * WARNING: This endpoint contains NSFW domain names.
     * @function listSubdomains
     * @returns {Promise<SubdomainListData[]>} An array of subdomain data.
     * @throws {ErrorResponse|any}
     * @memberof Subdomains
     * @instance
     */
    listSubdomains: async function () {
        return new Promise(function (resolve, reject) {
            fetch(`${baseUrl}/subdomains`, {
                method: 'GET',
                headers: {
                    'User-Agent': userAgent,
                    Accept: 'application/json',
                },
            })
                .then(async function (response) {
                    saveRateLimitData(response.headers, 'listSubdomains');
                    if (response.status === 200) {
                        const data = await response.json();
                        const dataToReturn = [];
                        for (const subdomain of data) {
                            dataToReturn.push({
                                domain: subdomain.domain,
                                uploadCount: subdomain.upload_count,
                                public: subdomain.public,
                                fileViews: subdomain.file_views,
                            });
                        }
                        resolve(dataToReturn);
                    } else if (response.status === 429) {
                        const data = await response.json();
                        reject({ error: data.error, code: data.code });
                    } else {
                        reject({
                            error: `Received status code ${response.status}.`,
                            code: 0,
                        });
                    }
                })
                .catch(function (error) {
                    reject({ error: `Request failed: ${error}`, code: -1 });
                });
        });
    },

    /**
     * Represents the response returned by 'getSubdomainMeta()'.
     * @typedef {Object} SubdomainMetaResponse
     * @property {Snowflake} id ID of the subdomain.
     * @property {number} files Number of files associated with this subdomain.
     * @property {number} links Number of links associated with this subdomain.
     * @property {number} fileViews Total amount of views that all files got combined that are associated with this subdomain.
     * @property {boolean} public Wether this subdomain is public or not.
     * @property {boolean} root Wether this subdomain is a root domain or not.
     * @property {number} lastActivity Timestamp of last interaction with this subdomain. (File views, file uploads, and file deletions.)
     * @property {Date} lastActivityDate 'lastActivity' converted to date object.
     */

    /**
     * Get the meta info of a subdomain.
     * @function getSubdomainMeta
     * @param {string} subdomain Name of the subdomain to get the meta info of. Ex; 'sxcu.net'
     * @returns {Promise<SubdomainMetaResponse>} Meta information for the subdomain provided.
     * @throws {ErrorResponse|any}
     * @memberof Subdomains
     * @instance
     */
    getSubdomainMeta: async function (subdomain) {
        return new Promise(function (resolve, reject) {
            fetch(`${baseUrl}/subdomains/${subdomain}`, {
                method: 'GET',
                headers: {
                    'User-Agent': userAgent,
                    Accept: 'application/json',
                },
            })
                .then(async function (response) {
                    saveRateLimitData(response.headers, 'getSubdomainMeta');
                    if (response.status === 200) {
                        const data = await response.json();
                        const dataToReturn = {};
                        dataToReturn.id = data.id;
                        dataToReturn.files = data.files;
                        dataToReturn.links = data.links;
                        dataToReturn.fileViews = data.file_views;
                        dataToReturn.public = data.public;
                        dataToReturn.root = data.root;
                        dataToReturn.lastActivity = data.last_activity;
                        dataToReturn.lastActivityDate = new Date(data.last_activity * 1000);
                        resolve(dataToReturn);
                    } else if (response.status === 400 || response.status === 429) {
                        const data = await response.json();
                        reject({ error: data.error, code: data.code });
                    } else {
                        reject({
                            error: `Received status code ${response.status}.`,
                            code: 0,
                        });
                    }
                })
                .catch(function (error) {
                    reject({ error: `Request failed: ${error}`, code: -1 });
                });
        });
    },

    /**
     * Check if a subdomain already exists.
     * @function checkSubdomain
     * @param {string} subdomain Name of the subdomain to check. Ex; 'sxcu.net'
     * @returns {Promise<boolean>} Wether the subdomain exists or not.
     * @throws {ErrorResponse|any}
     * @memberof Subdomains
     * @instance
     */
    checkSubdomain: async function (subdomain) {
        return new Promise(function (resolve, reject) {
            fetch(`${baseUrl}/subdomains/check/${subdomain}`, {
                method: 'GET',
                headers: {
                    'User-Agent': userAgent,
                    Accept: 'application/json',
                },
            })
                .then(async function (response) {
                    saveRateLimitData(response.headers, 'checkSubdomain');
                    if (response.status === 200) {
                        const data = await response.json();
                        resolve(data.exists);
                    } else if (response.status === 400 || response.status === 429) {
                        const data = await response.json();
                        reject({ error: data.error, code: data.code });
                    } else {
                        reject({
                            error: `Received status code ${response.status}.`,
                            code: 0,
                        });
                    }
                })
                .catch(function (error) {
                    reject({ error: `Request failed: ${error}`, code: -1 });
                });
        });
    },
};

/**
 * Methods that interact with the "Collections" endpoint.
 * @namespace Collections
 * @example
 * const { collections: sxcuCollections } = require("sxcu.api"); // sxcuCollections.<method>
 * const { collections } = require("sxcu.api"); // collections.<method>
 * const sxcu = require("sxcu.api"); // sxcu.collections.<method>
 */
exports.collections = {
    /**
     * Represents a file object in a collection meta response.
     * @typedef {Object} CollectionMetaResponseFile
     * @property {Snowflake} id ID of the file.
     * @property {URL} url URL of the file.
     * @property {URL} thumbnail Thumbnail of the file.
     * @property {number} views The amount of views of the file.
     */

    /**
     * Represents the response returned by the 'getCollectionMeta' method.
     * @typedef {Object} CollectionMetaResponse
     * @property {Snowflake} id ID of the collection.
     * @property {URL} url URL of the collection.
     * @property {string} title Title of the collection.
     * @property {string} description Description of the collection.
     * @property {number} views The amount of views of the collection.
     * @property {number} creationTime Unix timestamp of when the collection was created.
     * @property {Date} creationTimeDate 'creationTime' converted to a Date object.
     * @property {boolean} public Whether the collection is public or not.
     * @property {boolean} unlisted Whether the collection is unlisted or not.
     * @property {number} fileViews Number of views all the files in this collection got combined.
     * @property {CollectionMetaResponseFile[]} files Files that belong to this collection.
     */

    /**
     * Get the meta information of a collection.
     * @function getCollectionMeta
     * @param {Snowflake} collectionId ID of the collection to get the meta info of.
     * @returns {Promise<CollectionMetaResponse>} Collection meta response.
     * @throws {ErrorResponse|any}
     * @memberof Collections
     * @instance
     */
    getCollectionMeta: async function (collectionId) {
        return new Promise(function (resolve, reject) {
            fetch(`${baseUrl}/collections/${collectionId}`, {
                method: 'GET',
                headers: {
                    'User-Agent': userAgent,
                    Accept: 'application/json',
                },
            })
                .then(async function (response) {
                    saveRateLimitData(response.headers, 'getCollectionMeta');
                    if (response.status === 200) {
                        const data = await response.json();
                        const returnedData = {};
                        returnedData.id = data.id;
                        returnedData.url = 'https://sxcu.net/c/' + data.id;
                        returnedData.title = data.title;
                        returnedData.description = data.desc;
                        returnedData.views = data.views;
                        returnedData.creationTime = data.creation_time;
                        returnedData.creationTimeDate = new Date(data.creation_time * 1000);
                        returnedData.public = data.public;
                        returnedData.unlisted = data.unlisted;
                        returnedData.fileViews = data.file_views;
                        returnedData.files = [];
                        for (const file of data.files) {
                            returnedData.files.push({
                                id: file.id,
                                url: file.url,
                                thumbnail: file.thumb,
                                views: file.views,
                            });
                        }
                        resolve(returnedData);
                    } else if (response.status === 400 || response.status === 429) {
                        const data = await response.json();
                        reject({ error: data.error, code: data.code });
                    } else {
                        reject({
                            error: `Received status code ${response.status}.`,
                            code: 0,
                        });
                    }
                })
                .catch(function (error) {
                    reject({ error: `Request failed: ${error}`, code: -1 });
                });
        });
    },

    /**
     * Response returned by the 'createCollection' method.
     * @typedef {Object} CreatedCollectionResponse
     * @property {Snowflake} collectionId ID of the collection.
     * @property {URL} url URL of the collection.
     * @property {string} title Title of the collection.
     * @property {string?} description Description of the collection.
     * @property {boolean} unlisted Whether this collection is unlisted or not.
     * @property {boolean} private Whether the collection is private or not.
     * @property {string?} collectionToken Upload token of the collection.
     */

    /**
     * Create a collection.
     * @function createCollection
     * @param {string} title Title of the collection.
     * @param {string} [description] Description of the collection.
     * @param {boolean} [isPrivate=false] If true, the collection will be private.
     * @param {boolean} [unlisted=false] If true, the collection will be unlisted.
     * @returns {Promise<CreatedCollectionResponse>} Data about the newly created collection.
     * @throws {ErrorResponse|any}
     * @memberof Collections
     * @instance
     */
    createCollection: async function (title, description, isPrivate, unlisted) {
        // Note that isPrivate is not named 'private' due to jsdoc errors when generating.
        return new Promise(function (resolve, reject) {
            const params = new URLSearchParams();
            params.set('title', title);
            if (description) {
                params.set('desc', description);
            }
            if (isPrivate === true) {
                params.set('private', 'true');
            } else {
                params.set('private', 'false');
            }
            if (unlisted === true) {
                params.set('unlisted', 'true');
            }
            fetch(`${baseUrl}/collections/create`, {
                method: 'POST',
                body: params,
                headers: {
                    'User-Agent': userAgent,
                    Accept: 'application/json',
                },
            })
                .then(async function (response) {
                    saveRateLimitData(response.headers, 'createCollection');
                    if (response.status === 200) {
                        const data = await response.json();
                        const returnedData = {};
                        returnedData.collectionId = data.collection_id;
                        returnedData.url = 'https://sxcu.net/c/' + data.collection_id;
                        returnedData.title = data.title;
                        returnedData.description = data.description ?? null;
                        returnedData.unlisted = data.unlisted;
                        returnedData.private = data.private;
                        returnedData.collectionToken = data.collection_token ?? null;
                        resolve(returnedData);
                    } else if (response.status === 400 || response.status === 429) {
                        const data = await response.json();
                        reject({ error: data.error, code: data.code });
                    } else {
                        reject({
                            error: `Received status code ${response.status}.`,
                            code: 0,
                        });
                    }
                })
                .catch(function (error) {
                    reject({ error: `Request failed: ${error}`, code: -1 });
                });
        });
    },
};

/**
 * Methods that interact with the "Links" endpoint.
 * @namespace Links
 * @example
 * const { links: sxcuLinks } = require("sxcu.api"); // sxcuLinks.<method>
 * const { links } = require("sxcu.api"); // links.<method>
 * const sxcu = require("sxcu.api"); // sxcu.links.<method>
 */
exports.links = {
    /**
     * Represents the response returned by the 'createLink' method.
     * @typedef {Object} CreatedLinkResponse
     * @property {string} id ID of the new redirect link.
     * @property {URL} url URL of the new redirect link.
     * @property {URL} deletionUrl Deletion URL for the new redirect link.
     * @property {string} deletionToken Deletion token for the new redirect link.
     */

    /**
     * Create a link redirect.
     * @function createLink
     * @param {URL} link Link to redirect to.
     * @param {string} [subdomain] Subdomain to upload the link redirect to. Ex; 'shx.gg'
     * @returns {Promise<CreatedLinkResponse>} Data about the newly created link redirect.
     * @throws {ErrorResponse|any}
     * @memberof Links
     * @instance
     */
    createLink: async function (link, subdomain) {
        return new Promise(function (resolve, reject) {
            const params = new URLSearchParams();
            params.set('link', link);
            let url = baseUrl;
            if (subdomain) {
                url = 'https://' + subdomain + '/api';
            }
            fetch(`${url}/links/create`, {
                method: 'POST',
                body: params,
                headers: {
                    'User-Agent': userAgent,
                    Accept: 'application/json',
                },
            })
                .then(async function (response) {
                    saveRateLimitData(response.headers, 'createLink');
                    if (response.status === 200) {
                        const data = await response.json();
                        const returnedData = {};
                        returnedData.id = data.url.split('/').pop();
                        returnedData.url = data.url;
                        returnedData.deletionUrl = data.del_url;
                        returnedData.deletionToken = data.del_url.split('/').pop();
                        resolve(returnedData);
                    } else if (response.status === 400 || response.status === 429) {
                        const data = await response.json();
                        reject({ error: data.error, code: data.code });
                    } else {
                        reject({
                            error: `Received status code ${response.status}.`,
                            code: 0,
                        });
                    }
                })
                .catch(function (error) {
                    reject({ error: `Request failed: ${error}`, code: -1 });
                });
        });
    },

    /**
     * Delete a link redirect.
     * @function deleteLink
     * @param {string} linkId ID of the link redirect to delete.
     * @param {string} deletionToken Deletion token of the link redirect.
     * @returns {Promise<string>} Message result.
     * @throws {ErrorResponse|any}
     * @memberof Links
     * @instance
     */
    deleteLink: async function (linkId, deletionToken) {
        return new Promise(function (resolve, reject) {
            fetch(`${baseUrl}/links/delete/${linkId}/${deletionToken}`, {
                method: 'GET',
                headers: {
                    'User-Agent': userAgent,
                    Accept: 'application/json',
                },
            })
                .then(async function (response) {
                    saveRateLimitData(response.headers, 'deleteLink');
                    if (response.status === 200) {
                        const data = await response.json();
                        resolve(data.message);
                    } else if (response.status === 400 || response.status === 429) {
                        const data = await response.json();
                        reject({ error: data.error, code: data.code });
                    } else {
                        reject({
                            error: `Received status code ${response.status}.`,
                            code: 0,
                        });
                    }
                })
                .catch(function (error) {
                    reject({ error: `Request failed: ${error}`, code: -1 });
                });
        });
    },
};

/**
 * Methods that interact with the "Text" endpoint.
 * @namespace Text
 * @example
 * const { text: sxcuText } = require("sxcu.api"); // sxcuText.<method>
 * const { text } = require("sxcu.api"); // text.<method>
 * const sxcu = require("sxcu.api"); // sxcu.text.<method>
 */
exports.text = {
    /**
     * Represents the response returned by the 'createPaste' method.
     * @typedef {Object} CreatedPasteResponse
     * @property {string} id ID of the new text paste.
     * @property {URL} url URL of the new text paste.
     * @property {URL} deletionUrl Deletion URL for the new text paste.
     * @property {string} deletionToken Deletion token for the new text paste.
     */

    /**
     * Create a text paste.
     * @function createPaste
     * @param {string} text Text that will be used in the text paste.
     * @returns {Promise<CreatedPasteResponse>} Data about the newly created text paste.
     * @throws {ErrorResponse|any}
     * @memberof Text
     * @instance
     */
    createPaste: async function (text) {
        return new Promise(function (resolve, reject) {
            const params = new URLSearchParams();
            params.set('text', text);
            fetch(`${textBaseUrl}/upload`, {
                method: 'POST',
                body: params,
                headers: {
                    'User-Agent': userAgent,
                    Accept: 'application/json',
                },
            })
                .then(async function (response) {
                    saveRateLimitData(response.headers, 'createPaste');
                    if (response.status === 200) {
                        const data = await response.json();
                        const returnedData = {};
                        returnedData.id = data.url.split('/').pop();
                        returnedData.url = data.url;
                        returnedData.deletionUrl = data.del_url;
                        returnedData.deletionToken = data.del_url.split('/').pop();
                        resolve(returnedData);
                    } else if (response.status === 400) {
                        const data = await response.json();
                        reject({ error: data.error, code: data.code });
                    } else {
                        reject({
                            error: `Received status code ${response.status}.`,
                            code: 0,
                        });
                    }
                })
                .catch(function (error) {
                    reject({ error: `Request failed: ${error}`, code: -1 });
                });
        });
    },

    /**
     * Delete a text paste.
     * @function deletePaste
     * @param {string} pasteId ID of the text paste to delete.
     * @param {string} deletionToken Deletion token of the text paste.
     * @returns {Promise<string>} Message result.
     * @throws {ErrorResponse|any}
     * @memberof Text
     * @instance
     */
    deletePaste: async function (pasteId, deletionToken) {
        return new Promise(function (resolve, reject) {
            fetch(`${textBaseUrl}/d/${pasteId}/${deletionToken}`, {
                method: 'GET',
                headers: {
                    'User-Agent': userAgent,
                    Accept: 'application/json',
                },
            })
                .then(async function (response) {
                    saveRateLimitData(response.headers, 'deletePaste');
                    if (response.status === 200) {
                        const data = await response.json();
                        resolve(data.message);
                    } else if (response.status === 400) {
                        const data = await response.json();
                        reject({ error: data.error, code: data.code });
                    } else {
                        reject({
                            error: `Received status code ${response.status}.`,
                            code: 0,
                        });
                    }
                })
                .catch(function (error) {
                    reject({ error: `Request failed: ${error}`, code: -1 });
                });
        });
    },
};

/**
 * Methods that can provide some assistance when using other methods.
 * All methods defined as a utility method do not create API calls.
 * @namespace Utility
 * @example
 * const { utility: sxcuUtility } = require("sxcu.api"); // sxcuUtility.<method>
 * const { utility } = require("sxcu.api"); // utility.<method>
 * const sxcu = require("sxcu.api"); // sxcu.utility.<method>
 */
exports.utility = {
    /**
     * Resolve an error, this can be used to guarantee the presence of a error and code value.
     * @function resolveError
     * @param {any} error Error to resolve.
     * @returns {ErrorResponse} Error response.
     * @memberof Utility
     * @instance
     */
    resolveError: function (error) {
        if (error) {
            if (typeof error === 'object' && !Array.isArray(error)) {
                return { error: error.error ?? error.message ?? 'unknown', code: error.code ?? -1 };
            } else if (typeof error === 'string') {
                return { error: error, code: -1 };
            } else {
                return { error: toString(error).replace('[object Undefined]', 'unknown'), code: -1 };
            }
        } else {
            return { error: 'unknown', code: -1 };
        }
    },

    /**
     * Represents rate limit data.
     * @typedef {Object} RateLimitData
     * @property {number} limit Number of requests allowed.
     * @property {number} remaining Number of requests that can still be made.
     * @property {number} reset Epoch time of when the rate limit resets.
     * @property {number} resetAfter Total amount of time in seconds until the rate limit resets. Note that this value only updates when new rate limit data is processed.
     * @property {string} bucket A unique string that identifies the rate limit.
     * @property {Date} resetDate 'reset' converted to date object.
     */

    /**
     * Represents a rate limit.
     * @typedef {Object} RateLimit
     * @property {string[]} functions An array of function names that caused this rate limit. This array is always empty if 'global' is true.
     * @property {string} bucket A unique string that identifies the rate limit.
     * @property {RateLimitData} lastRateLimit Data of this rate limit.
     * @property {boolean} global Whether this rate limit is the global rate limit or not.
     */

    /**
     * Rate limit data object. This object contains all rate limit buckets, including global.
     * Key of each rate limit is the bucket, however global has the key 'global'.
     * WARNING: Modifying this object may cause issues.
     * @function getRateLimitData
     * @returns {Object.<string, RateLimit>}
     * @memberof Utility
     * @instance
     */
    getRateLimitData: function () {
        return rateLimitData;
    },

    /**
     * Get the current rate limit that was provided by the specific method.
     * @function getRateLimitByMethod
     * @param {string} functionName Name of the method. Ex; 'uploadFile'
     * @returns {RateLimit|null}
     * @memberof Utility
     * @instance
     */
    getRateLimitByMethod: function (functionName) {
        const rateLimitData = this.getRateLimitData();
        let foundRateLimit = null;
        for (const entry of Object.entries(rateLimitData)) {
            const rateLimit = entry[1];
            if (rateLimit.functions.findIndex((name) => name === functionName) !== -1) {
                foundRateLimit = rateLimit;
            }
        }
        return foundRateLimit;
    },

    /**
     * Get the current global limit.
     * @function getGlobalRateLimit
     * @returns {RateLimit|null}
     * @memberof Utility
     * @instance
     */
    getGlobalRateLimit: function () {
        const rateLimitData = this.getRateLimitData();
        return rateLimitData['global'] ?? null;
    },

    /**
     * Get a promise that resolves when the rate limit(s) is no longer in effect.
     * This method will resolve instantly if the global rate limit and none of the provide function name's rate limits have been reached yet.
     * The global rate limit is always accounted for, even when providing a function name.
     * @function getRateLimitPromise
     * @param {string|string[]|'all'} [functionName] Name of the function or an array of function names that belong to the rate limit(s) that you need to get a promise for. Provide the string 'all' if you want all rate limits currently saved to be accounted for.
     * @returns {Promise<void>}
     * @memberof Utility
     * @instance
     * @tutorial obeying-rate-limits
     */
    getRateLimitPromise: async function (functionName) {
        /**
         * Inner method for awaiting rate limits.
         * @function awaitRateLimit
         * @param {RateLimit} rateLimit
         * @returns {Promise<void>}
         * @private
         */
        async function awaitRateLimit(rateLimit) {
            return new Promise(function (resolve) {
                const interval = setInterval(function () {
                    if (new Date() > rateLimit.lastRateLimit.resetDate) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 1000);
            });
        }
        const globalRateLimit = this.getGlobalRateLimit();
        if (globalRateLimit) {
            if (globalRateLimit.lastRateLimit.remaining === 0) {
                await awaitRateLimit(globalRateLimit);
            }
        }
        if (functionName) {
            if (Array.isArray(functionName)) {
                for (const method of functionName) {
                    const rateLimit = this.getRateLimitByMethod(method);
                    if (rateLimit) {
                        if (rateLimit.lastRateLimit.remaining === 0) {
                            await awaitRateLimit(rateLimit);
                        }
                    }
                }
            } else if (functionName === 'all') {
                const rateLimitData = this.getRateLimitData();
                for (const entry of Object.entries(rateLimitData)) {
                    const rateLimit = entry[1];
                    if (rateLimit.global === false) {
                        if (rateLimit.lastRateLimit.remaining === 0) {
                            await awaitRateLimit(rateLimit);
                        }
                    }
                }
            } else {
                const rateLimit = this.getRateLimitByMethod(functionName);
                if (rateLimit) {
                    if (rateLimit.lastRateLimit.remaining === 0) {
                        await awaitRateLimit(rateLimit);
                    }
                }
            }
        }
        return;
    },

    /**
     * Create a sxcu queue.
     * This queue can be used to execute methods in a synchronized manner.
     * @class
     * @memberof Utility
     * @instance
     * @example
     * const { utility } = require("sxcu.api");
     * const queue = new utility.queue();
     */
    queue: class queue {
        /**
         * Represents an object in the queue.
         * @typedef {Object} QueueObject
         * @property {function} function Method to be executed.
         * @property {function} finished Method to be executed once the function has been executed.
         * @property {string} [rateLimit] Rate limit that the method must obey.
         * @private
         */

        /**
         * Queue array.
         * @type {QueueObject[]}
         */
        #queueData = [];

        /**
         * Push a method/function to the queue.
         * @function push
         * @param {function} method Method that should be queued.
         * @param {string} [methodName] Name of the method. This is used to obey the rate limit for the method's specific endpoint. If nothing is provided, only the global rate limit will be obeyed.
         * @returns {Promise<any>}
         * @memberof Utility#queue
         * @instance
         * @example
         * const { utility } = require('sxcu.api');
         * const queue = new utility.queue();
         * queue
         *  .push(() => {
         *      console.log('This function is being executed.');
         *  })
         *  .then(() => {
         *      console.log('The function in the queue has finished execution.');
         *      queue.stop();
         *  });
         */
        async push(method, methodName) {
            const self = this;
            return new Promise(function (resolve) {
                self.#queueData.push({
                    function: method,
                    finished: resolve,
                    rateLimit: methodName,
                });
            });
        }

        /**
         * Clear the queue.
         * @function clear
         * @returns {void}
         * @memberof Utility#queue
         * @instance
         */
        clear() {
            this.#queueData.length = 0;
            return;
        }

        /**
         * Queue interval result. (intervalID)
         * @type {number|null}
         */
        #intervalID = null;

        /**
         * Stop/pause the queue.
         * @function stop
         * @returns {void}
         * @memberof Utility#queue
         * @instance
         */
        stop() {
            return clearInterval(this.#intervalID);
        }

        /**
         * Start/unpause the queue.
         * @function start
         * @returns {void}
         * @memberof Utility#queue
         * @instance
         */
        start() {
            const self = this;
            let processing = false;
            this.#intervalID = setInterval(async function () {
                if (processing === true) return;
                processing = true;
                const queueObject = self.#queueData[0];
                if (queueObject) {
                    await exports.utility.getRateLimitPromise(queueObject.rateLimit);
                    try {
                        const result = await queueObject.function();
                        queueObject.finished(result);
                    } catch (error) {
                        queueObject.finished(exports.utility.resolveError(error));
                    }
                    self.#queueData[0] = undefined;
                    self.#queueData.forEach(function (value, index) {
                        if (index > 0) {
                            self.#queueData[index - 1] = value;
                            self.#queueData[index] = undefined;
                        }
                    });
                }
                processing = false;
            }, 1000);
        }

        /**
         * @param {boolean} [doNotStart] If true, the queue will not be executed until you call 'queue.start()'.
         * @constructs Utility#queue
         * @memberof Utility#queue
         * @instance
         */
        constructor(doNotStart) {
            if (doNotStart !== true) {
                this.start();
            }
        }
    },
};
