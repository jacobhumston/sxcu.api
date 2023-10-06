import { ErrorObject } from './error.js';
import { getUserAgent } from './user-agent.js';

/** Status code and message. */
export type StatusCodeMessage = { code: number; message: string };

/** Request options. */
export type RequestOptions = {
    /** Type of request. */
    type: 'GET' | 'POST';
    /** Array of error status codes and messages. */
    statusErrors: StatusCodeMessage[];
    /** Base url of the request. */
    baseUrl: 'https://sxcu.net/api/' | 'https://cancer-co.de/';
    /**
     * Request path to append to the base url.
     * Do not include the first slash.
     */
    path: string;
    /** Body of the request. (If needed.) */
    body?: any;
};

/**
 * Create an API request.
 * @throws {ErrorObject}
 */
export async function request(options: RequestOptions): Promise<object> {
    const response = await fetch(`${options.baseUrl}${options.path}`, {
        method: options.type,
        body: options.body ?? undefined,
        headers: {
            'User-Agent': getUserAgent() ?? '',
            Accept: 'application/json',
        },
    }).catch((error) => {
        throw { message: error, code: 0 };
    });

    options.statusErrors.forEach((error) => {
        if (response.status === error.code) {
            throw { message: error.message, code: response.status };
        }
    });

    if (response.status !== 200) throw { message: 'Unknown', code: response.status };

    return await response.json().catch((error) => {
        throw { message: error, code: -1 };
    });
}
