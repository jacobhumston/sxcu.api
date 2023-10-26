'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.request = void 0;
const user_agent_js_1 = require('./classes/user-agent.js');
const error_js_1 = require('./error.js');
/** The URL to learn more about setting the User Agent. */
const guideUrl = 'https://sxcu.api.lovelyjacob.com/guides/user-agent.html';
/**
 * Attempts to get the JSON from a response.
 * @param response The response to get the JSON from.
 */
async function getJSON(response) {
    return await response.json().catch((error) => {
        throw { error: error.toString(), code: -1 };
    });
}
/**
 * Create an API request.
 */
async function request(options) {
    // Check if the User Agent is set. Throw an error if it isn't.
    if (user_agent_js_1.UserAgent.get() === '')
        throw (0, error_js_1.createError)(`User agent is not set! Learn more: ${guideUrl}`, -1);
    // Make a request to the API.
    const url = options.subdomain
        ? `https://${options.subdomain}/api/${options.path}`
        : `${options.baseUrl}${options.path}`;
    const response = await fetch(url, {
        method: options.type,
        body: options.body ?? undefined,
        headers: {
            'User-Agent': user_agent_js_1.UserAgent.get(),
            Accept: 'application/json',
        },
    }).catch((error) => {
        throw { error: error.toString(), code: 0 };
    });
    // Check for any of the predefined error status codes.
    for (const error of options.statusErrors) {
        if (response.status !== error) continue;
        const json = await getJSON(response);
        throw { error: json.error ?? 'Unknown', code: json.code ?? 0 };
    }
    // Try to parse the response as JSON.
    const json = await getJSON(response);
    // If it's not an OK, we throw an unknown error.
    if (response.status !== 200) throw { error: json.error ?? 'Unknown', code: response.status };
    // If it's an OK, we return the JSON.
    return json;
}
exports.request = request;
