import { UserAgent } from './classes/user-agent.js';
/**
 * Rate limit storage.
 * Key is the bucket id.
 * The global rate limit has the key _Global.
 */
const rateLimits = {};
/**
 * If the request queue is enabled or not.
 */
let requestQueueEnabled = false;
/**
 * If the request queue's automatic retry is enabled or not.
 */
let requestQueueAutomaticRetryEnabled = false;
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
 * @param options Options for this request.
 */
export async function request(options) {
    // Check if the User Agent is set, if it isn't then we will set it for them.
    if (UserAgent.get() === '') UserAgent.useDefault();
    // Make a request to the API.
    let url = options.subdomain
        ? `https://${options.subdomain}/api/${options.path}`
        : `${options.baseUrl}${options.path}`;
    if (options.params) url = `${url}?${options.params.toString()}`;
    // Get this request's endpoint.
    const endpoint = options.baseUrl !== 'https://sxcu.net/api/' ? 'text' : options.path.split('/')[0];
    // Handle the request queue if enabled.
    if (requestQueueEnabled) {
        await promisifyGlobalRateLimit();
        await promisifyEndpointRateLimit(endpoint);
    }
    // Make the request.
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
    // Update rate limit data.
    const foundRateLimit = {
        isGlobal: response.headers.get('X-RateLimit-Global') ? true : false,
        limit: parseInt(response.headers.get('X-RateLimit-Limit') ?? '0'),
        remaining: parseInt(response.headers.get('X-RateLimit-Remaining') ?? '0'),
        reset: parseInt(response.headers.get('X-RateLimit-Reset') ?? '0'),
        resetDate: new Date(parseInt(response.headers.get('X-RateLimit-Reset') ?? '0') * 1000),
        resetAfter: parseFloat(response.headers.get('X-RateLimit-Reset-After') ?? '0'),
        bucket: response.headers.get('X-RateLimit-Bucket') ?? '?',
        endpoint: response.headers.get('X-RateLimit-Global') ? null : endpoint,
    };
    if (foundRateLimit.bucket !== '?') {
        if (foundRateLimit.isGlobal) {
            rateLimits['_Global'] = foundRateLimit;
        } else {
            rateLimits[foundRateLimit.bucket] = foundRateLimit;
        }
    }
    // Retry the request if it failed due to the rate limit. Only if the retry queue is enabled.
    if (response.status !== 200 && requestQueueEnabled && requestQueueAutomaticRetryEnabled) {
        const json = await getJSON(response);
        const error = json.error ?? 'Unknown';
        if (error.toLocaleLowerCase().includes('rate limit')) {
            return await request(options);
        }
    }
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
/**
 * Returns a copy of the object containing all stored rate limits.
 */
export function getRateLimits() {
    return structuredClone(rateLimits);
}
/**
 * Returns a copy of the global rate limit if it's available.
 */
export function getGlobalRateLimit() {
    return rateLimits['_Global'] ? structuredClone(rateLimits['_Global']) : null;
}
/**
 * Returns a blank promise.
 */
function blankPromise() {
    return new Promise((resolve) => resolve());
}
/**
 * Returns a promise that resolves once the rate limit is over.
 * This will return instantly unless the rate limit has been exceeded.
 * @param rateLimit The rate limit to promisify.
 */
export function promisifyRateLimit(rateLimit) {
    if (rateLimit.remaining > 0) return blankPromise();
    return new Promise(function (resolve) {
        setTimeout(resolve, (rateLimit.resetAfter + 1) * 1000); // Add an extra second as a precautionary measure.
    });
}
/**
 * A wrapper for promisifyRateLimit that uses the global rate limit as the first argument.
 * Note that if the global rate limit isn't available then it will instantly resolve.
 */
export function promisifyGlobalRateLimit() {
    const rateLimit = getGlobalRateLimit();
    if (rateLimit) return promisifyRateLimit(rateLimit);
    return blankPromise();
}
/**
 * A wrapper for promisifyRateLimit that uses an endpoint's rate limit as the first argument.
 * Note that if rate limit data for said endpoint isn't available then it will instantly resolve.
 * @param endpoint Endpoint to promisify the rate limit of.
 */
export function promisifyEndpointRateLimit(endpoint) {
    let rateLimit = null;
    Object.entries(rateLimits).forEach(([key, value]) => {
        if (value.endpoint === endpoint && key !== '_Global') rateLimit = value;
    });
    if (rateLimit) return promisifyRateLimit(rateLimit);
    return blankPromise();
}
/**
 * Toggle the request queue.
 * The request queue enables all requests to automatically respect rate limits.
 * It's important to note that this only handles rate limit errors, nothing else.
 * The request queue does NOT keep the current process running indefinitely.
 * @param enabled If the queue should be enabled or not.
 * @param retryEnabled If true, rate limit errors will automatically be retried. Default is false.
 */
export function toggleRequestQueue(enabled, retryEnabled) {
    requestQueueEnabled = enabled;
    requestQueueAutomaticRetryEnabled = retryEnabled ?? false;
}
