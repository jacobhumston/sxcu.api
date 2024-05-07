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
 * Create an API request.
 * @param options Options for this request.
 */
export declare function request(options: RequestOptions): Promise<{
    [key: string]: any;
}>;
/**
 * Returns a copy of the object containing all stored rate limits.
 */
export declare function getRateLimits(): {
    [key: string]: RateLimit;
};
/**
 * Returns a copy of the global rate limit if it's available.
 */
export declare function getGlobalRateLimit(): RateLimit | null;
/**
 * Returns a promise that resolves once the rate limit is over.
 * This will return instantly unless the rate limit has been exceeded.
 * @param rateLimit The rate limit to promisify.
 */
export declare function promisifyRateLimit(rateLimit: RateLimit): Promise<void>;
/**
 * A wrapper for promisifyRateLimit that uses the global rate limit as the first argument.
 * Note that if the global rate limit isn't available then it will instantly resolve.
 */
export declare function promisifyGlobalRateLimit(): Promise<void>;
/**
 * A wrapper for promisifyRateLimit that uses an endpoint's rate limit as the first argument.
 * Note that if rate limit data for said endpoint isn't available then it will instantly resolve.
 * @param endpoint Endpoint to promisify the rate limit of.
 */
export declare function promisifyEndpointRateLimit(endpoint: Endpoint): Promise<void>;
/**
 * Toggle the request queue.
 * The request queue enables all requests to automatically respect rate limits.
 * It's important to note that this only handles rate limit errors, nothing else.
 * The request queue does NOT keep the current process running indefinitely.
 * @param enabled If the queue should be enabled or not.
 * @param retryEnabled If true, rate limit errors will automatically be retried. Default is false.
 */
export declare function toggleRequestQueue(enabled: boolean, retryEnabled?: boolean): void;
//# sourceMappingURL=request.d.ts.map
