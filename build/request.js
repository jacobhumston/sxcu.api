import { UserAgent } from './classes/user-agent.js';
import { createError } from './error.js';
/** The URL to learn more about setting the User Agent. */
const guideUrl = 'https://sxcu.api.lovelyjacob.com/guides/user-agent.html';
/**
 * Create an API request.
 */
export async function request(options) {
    // Check if the User Agent is set. Throw an error if it isn't.
    if (UserAgent.get() === '') throw createError(`User agent is not set! Learn more: ${guideUrl}`, -1);
    // Make a request to the API.
    const url = options.subdomain
        ? `https://${options.subdomain}/api/${options.path}`
        : `${options.baseUrl}${options.path}`;
    const response = await fetch(url, {
        method: options.type,
        body: options.body ?? undefined,
        headers: {
            'User-Agent': UserAgent.get(),
            Accept: 'application/json',
        },
    }).catch((error) => {
        throw { error: error.toString(), code: 0 };
    });
    // Check for any of the predefined error status codes.
    for (const error of options.statusErrors) {
        if (response.status !== error) continue;
        const json = await response.json().catch((error) => {
            throw { error: error.toString(), code: -1 };
        });
        throw { error: json.error ?? 'Unknown', code: json.code ?? 0 };
    }
    // Try to parse the response as JSON.
    const json = await response.json().catch((error) => {
        throw { error: error.toString(), code: -1 };
    });
    // If it's not an OK, we throw an unknown error.
    if (response.status !== 200) throw { error: json.error ?? 'Unknown', code: response.status };
    // If it's an OK, we return the JSON.
    return json;
}
