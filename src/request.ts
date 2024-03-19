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
};

/**
 * Rate limit storage.
 * Key is the bucket id.
 * The global rate limit has the key _Global.
 */
const RateLimits: { [key: string]: RateLimit } = {};

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
    };

    if (foundRateLimit.isGlobal) {
        RateLimits['_Global'] = foundRateLimit;
    } else {
        RateLimits[foundRateLimit.bucket] = foundRateLimit;
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
    return structuredClone(RateLimits);
}

/**
 * Returns a copy of the global rate limit if it's available.
 */
export function getGlobalRateLimit(): RateLimit | null {
    return RateLimits['_Global'] ? structuredClone(RateLimits['_Global']) : null;
}

/**
 * Returns a promise that resolves once the rate limit is over.
 * This will return instantly unless the rate limit has been exceeded.
 */
export function promisifyRateLimit(RateLimit: RateLimit): Promise<void> {
    const rateLimit = RateLimit;
    if (rateLimit.remaining > 0) return new Promise((r) => r());
    return new Promise(function (resolve) {
        setTimeout(resolve, rateLimit.resetAfter + 1); // Add an extra second as a precautionary measure.
    });
}

/**
 * A wrapper for promisifyRateLimit that uses the global rate limit as the first argument.
 * Note that if the global rate limit isn't available, it will instantly resolve.
 */
export function promisifyGlobalRateLimit(): Promise<void> {
    const rateLimit = getGlobalRateLimit();
    if (rateLimit) return promisifyRateLimit(rateLimit);
    return new Promise((r) => r());
}
