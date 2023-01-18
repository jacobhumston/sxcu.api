/**
 * @file sxcu.api library.
 * @author Jacob Humston
 */

// Modules
const https = require("https");
const fs = require("fs");

// Configuration
const packageVersion = "1.1.2";
const packageUrl = "https://github.com/Lovely-Experiences/sxcu.api";
const userAgent = `sxcu.api/${packageVersion} (+${packageUrl})`;
const baseURL = "https://sxcu.net/api";

/**
 * Extra string values that can represent a boolean for query strings.
 * @typedef {'True'|'true'|'1'|'False'|'false'|'0'} BooleanQueryStringExtraOptions
 */

/**
 * Represents a boolean for query strings.
 * @typedef {boolean|BooleanQueryStringExtraOptions} BooleanQueryString
 */

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
 * Methods that interact with the files endpoint.
 * @namespace Files
 * @example
 * const { files: sxcuFiles } = require("sxcu.api");
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

    // TODO: Change method to use the new 'fetch' api.
    /**
     * Get the meta info of a file.
     * @function getFileMeta
     * @param {Snowflake} fileId ID of the file to get the meta info of.
     * @returns {Promise<FileMetaResponse>}
     * @throws {ErrorResponse}
     * @memberof Files
     * @instance
     */
    getFileMeta: async function (fileId) {
        return new Promise(function (resolve, reject) {
            const request = https.request(
                `${baseURL}/files/${fileId}`,
                {
                    method: "GET",
                    headers: {
                        "User-Agent": userAgent,
                        Accept: "application/json",
                    },
                },
                function (incomingMessage) {
                    incomingMessage.on("data", function (data) {
                        if (incomingMessage.statusCode == 200) {
                            const parsedData = JSON.parse(data);
                            const resolvedData = {};
                            resolvedData.id = parsedData.id;
                            resolvedData.url = parsedData.url;
                            resolvedData.views = parsedData.views;
                            resolvedData.viewable = parsedData.viewable;
                            resolvedData.collection = parsedData.collection;
                            resolvedData.size = parsedData.size;
                            resolvedData.creationTime = parsedData.creation_time;
                            resolvedData.creationTimeDate = new Date(resolvedData.creationTime * 1000);
                            if (parsedData.og_properties != undefined) {
                                resolvedData.openGraphProperties = {};
                                resolvedData.openGraphProperties.color = parsedData.og_properties.color;
                                resolvedData.openGraphProperties.title = parsedData.og_properties.title;
                                resolvedData.openGraphProperties.description = parsedData.og_properties.description;
                                resolvedData.openGraphProperties.discordHideURL =
                                    parsedData.og_properties.discord_hide_url;
                            }
                            resolve(resolvedData);
                        } else if (incomingMessage.statusCode == 400 || incomingMessage.statusCode == 429) {
                            const parsedData = JSON.parse(data);
                            reject({
                                error: parsedData.error,
                                code: parsedData.code,
                            });
                        } else {
                            reject({
                                error: `Received status code ${incomingMessage.statusCode}.`,
                                code: 0,
                            });
                        }
                    });
                }
            );
            request.on("error", function (Error) {
                reject({ error: Error, code: -1 });
            });
            request.end();
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
     * @throws {ErrorResponse}
     * @memberof Files
     * @instance
     */
    uploadFile: async function (file, options, subdomain) {
        return new Promise(function (resolve, reject) {
            const formData = new FormData();
            try {
                formData.set("file", new Blob([fs.readFileSync(file)]));
            } catch (error) {
                reject({ error: `Couldn't parse file: ${error}`, code: -1 });
            }
            if (options) {
                if (options.token) {
                    formData.set("token", options.token);
                }
                if (options.collection) {
                    formData.set("collection", options.collection);
                }
                if (options.collectionToken) {
                    formData.set("collection_token", options.collectionToken);
                }
                if (options.noEmbed == true) {
                    formData.set("noembed", "true");
                }
                if (options.selfDestruct == true) {
                    formData.set("self_destruct", "true");
                }
                if (options.openGraphProperties) {
                    formData.set(
                        "og_properties",
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
            let url = baseURL;
            if (subdomain) {
                url = "https://" + subdomain + "/api";
            }
            fetch(`${url}/files/create`, {
                method: "POST",
                body: formData,
                headers: {
                    "User-Agent": userAgent,
                    Accept: "application/json",
                },
            })
                .then(async function (response) {
                    if (response.status == 200) {
                        const data = await response.json();
                        const parsedData = {};
                        parsedData.id = data.id;
                        parsedData.url = data.url;
                        parsedData.deletionUrl = data.del_url;
                        parsedData.deletionToken = data.del_url.split("/").pop();
                        parsedData.thumbnail = data.thumb;
                        resolve(parsedData);
                    } else if (response.status == 400 || response.status == 429) {
                        const data = await response.json();
                        reject({ error: data.error, code: data.code });
                    } else {
                        reject({
                            error: `Received status code ${incomingMessage.statusCode}.`,
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
     * @throws {ErrorResponse}
     * @memberof Files
     * @instance
     */
    deleteFile: async function (fileId, deletionToken) {
        return new Promise(function (resolve, reject) {
            fetch(`${baseURL}/files/delete/${fileId}/${deletionToken}`, {
                method: "GET",
                headers: {
                    "User-Agent": userAgent,
                    Accept: "application/json",
                },
            })
                .then(async function (response) {
                    if (response.status == 200) {
                        const data = await response.json();
                        return resolve(data.message);
                    } else if (response.status == 400 || response.status == 429) {
                        const data = await response.json();
                        reject({ error: data.error, code: data.code });
                    } else {
                        reject({
                            error: `Received status code ${incomingMessage.statusCode}.`,
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
