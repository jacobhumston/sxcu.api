import { UserAgent } from './classes/user-agent.js';

/** Request options. */
export type RequestOptions = {
    /** Type of request. */
    type: 'GET' | 'POST';
    /** Array of error status codes. */
    statusErrors: number[];
    /** Base url of the request. */
    baseUrl: 'https://sxcu.net/api/' | 'https://cancer-co.de/';
    /**
     * The subdomain to make the request too. (If applicable.)
     * This option will override baseUrl.
     * Example; `example.shx.gg`
     */
    subdomain?: string;
    /**
     * Request path to append to the base url.
     * Do not include the first slash.
     */
    path: string;
    /** Body of the request. (If needed.) */
    body?: BodyInit | null | undefined;
    /** URL parameters. (If needed.) */
    params?: URLSearchParams;
};

/**
 * Represents a rate limit.
 */
export type RateLimit = {
    /** If true, this rate limit is global. */
    isGlobal: boolean;
    /** The number of requests that can be made. */
    limit: number;
    /** The number of remaining requests that can be made. */
    remaining: number;
    /** Epoch time at which this rate limit resets. */
    reset: number;
    /** Date at which this rate limit resets. */
    resetDate: Date;
    /** Total time (in seconds) of when the current rate limit bucket will reset. */
    resetAfter: number;
    /** The bucket that this rate limit belongs to. */
    bucket: string;
    /**
     * Endpoint that this rate limit belongs to.
     * This will be null if isGlobal is true.
     */
    endpoint: string | null;
};

/**
 * Available endpoints.
 */
export type Endpoint = 'text' | 'subdomains' | 'links' | 'files' | 'collections';

/**
 * Rate limit storage.
 * Key is the bucket id.
 * The global rate limit has the key _Global.
 */
const rateLimits: { [key: string]: RateLimit } = {};

/**
 * If the request queue is enabled or not.
 */
let requestQueueEnabled: boolean = false;

/**
 * If the request queue's automatic retry is enabled or not.
 */
let requestQueueAutomaticRetryEnabled: boolean = false;

/**
 * Attempts to get the JSON from a response.
 * @param response The response to get the JSON from.
 */
async function getJSON(response: Response): Promise<{ [key: string]: any }> {
    return await response.json().catch((error) => {
        throw { error: error.toString(), code: -1 };
    });
}

/**
 * Create an API request.
 * @param options Options for this request.
 */
export async function request(options: RequestOptions): Promise<{ [key: string]: any }> {
    // Check if the User Agent is set, if it isn't then we will set it for them.
    if (UserAgent.get() === '') UserAgent.useDefault();

    // Make a request to the API.
    let url = options.subdomain
        ? `https://${options.subdomain}/api/${options.path}`
        : `${options.baseUrl}${options.path}`;

    if (options.params) url = `${url}?${options.params.toString()}`;

    // Get this request's endpoint.
    const endpoint: any = options.baseUrl !== 'https://sxcu.net/api/' ? 'text' : options.path.split('/')[0];

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
    const foundRateLimit: RateLimit = {
        isGlobal: response.headers.get('X-RateLimit-Global') ? true : false,
        limit: parseInt(response.headers.get('X-RateLimit-Limit') ?? '0'),
        remaining: parseInt(response.headers.get('X-RateLimit-Remaining') ?? '0'),
        reset: parseInt(response.headers.get('X-RateLimit-Reset') ?? '0'),
        resetDate: new Date(parseInt(response.headers.get('X-RateLimit-Reset') ?? '0') * 1000),
        resetAfter: parseFloat(response.headers.get('X-RateLimit-Reset-After') ?? '0'),
        bucket: response.headers.get('X-RateLimit-Bucket') ?? '?',
        endpoint: response.headers.get('X-RateLimit-Global') ? null : endpoint,
    };

    if (foundRateLimit.isGlobal) {
        rateLimits['_Global'] = foundRateLimit;
    } else {
        rateLimits[foundRateLimit.bucket] = foundRateLimit;
    }

    // Retry the request if it failed due to the rate limit. Only if the retry queue is enabled.
    if (response.status !== 200 && requestQueueEnabled && requestQueueAutomaticRetryEnabled) {
        const json = await getJSON(response);
        const error: string = json.error ?? 'Unknown';
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
export function getRateLimits(): { [key: string]: RateLimit } {
    return structuredClone(rateLimits);
}

/**
 * Returns a copy of the global rate limit if it's available.
 */
export function getGlobalRateLimit(): RateLimit | null {
    return rateLimits['_Global'] ? structuredClone(rateLimits['_Global']) : null;
}

/**
 * Returns a blank promise.
 */
function blankPromise(): Promise<void> {
    return new Promise((resolve) => resolve());
}

/**
 * Returns a promise that resolves once the rate limit is over.
 * This will return instantly unless the rate limit has been exceeded.
 * @param rateLimit The rate limit to promisify.
 */
export function promisifyRateLimit(rateLimit: RateLimit): Promise<void> {
    if (rateLimit.remaining > 0) return blankPromise();
    return new Promise(function (resolve) {
        setTimeout(resolve, rateLimit.resetAfter + 1); // Add an extra second as a precautionary measure.
    });
}

/**
 * A wrapper for promisifyRateLimit that uses the global rate limit as the first argument.
 * Note that if the global rate limit isn't available then it will instantly resolve.
 */
export function promisifyGlobalRateLimit(): Promise<void> {
    const rateLimit = getGlobalRateLimit();
    if (rateLimit) return promisifyRateLimit(rateLimit);
    return blankPromise();
}

/**
 * A wrapper for promisifyRateLimit that uses an endpoint's rate limit as the first argument.
 * Note that if rate limit data for said endpoint isn't available then it will instantly resolve.
 * @param endpoint Endpoint to promisify the rate limit of.
 */
export function promisifyEndpointRateLimit(endpoint: Endpoint) {
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
export function toggleRequestQueue(enabled: boolean, retryEnabled?: boolean) {
    requestQueueEnabled = enabled;
    requestQueueAutomaticRetryEnabled = retryEnabled ?? false;
}
