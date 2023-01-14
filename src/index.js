// Modules
const https = require("https");
const fs = require("fs");

// Configuration
const packageVersion = "1.0.2";
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
 * Methods that interact with the files endpoint.
 * @namespace Files
 * @example
 * const { Files: sxcuFiles } = require("sxcu.api");
 */
exports.Files = {
    /**
     * Represents OpenGraph properties of a file meta response.
     * @typedef {Object} FileMetaResponseOpenGraphProperties
     * @property {string?} color OpenGraph HEX color code.
     * @property {string?} title OpenGraph title.
     * @property {string?} description OpenGraph description.
     * @property {boolean?} discordHideURL Whether to hide this file's url in Discord or not when sent.
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
                    headers: { "User-Agent": userAgent, Accept: "application/json" },
                },
                function (response) {
                    response.on("data", function (data) {
                        if (response.statusCode == 200) {
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
                                resolvedData.openGraphProperties.discordHideURL = parsedData.og_properties.discord_hide_url;
                            }
                            resolve(resolvedData);
                        } else if (response.statusCode == 400 || response.statusCode == 429) {
                            const parsedData = JSON.parse(data);
                            reject({ error: parsedData.error, code: parsedData.code });
                        } else {
                            reject({ error: `Received status code ${Response.statusCode}.`, code: 0 });
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
};
