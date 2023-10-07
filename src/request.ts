import { UserAgent } from './classes/user-agent.js';

/** Request options. */
export type RequestOptions = {
    /** Type of request. */
    type: 'GET' | 'POST';
    /** Array of error status codes and messages. */
    statusErrors: number[];
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
 */
export async function request(options: RequestOptions): Promise<any> {
    // Make a request to the API.
    const response = await fetch(`${options.baseUrl}${options.path}`, {
        method: options.type,
        body: options.body ?? undefined,
        headers: {
            'User-Agent': UserAgent.get(),
            Accept: 'application/json',
        },
    }).catch((error) => {
        throw { error: error, code: 0 };
    });

    // Check for any of the predefined error status codes.
    for (const error of options.statusErrors) {
        if (response.status !== error) continue;
        const json = await response.json().catch((error) => {
            throw { error: error, code: -1 };
        });
        throw { error: json.error ?? 'Unknown', code: json.code ?? 0 };
    }

    // If it's not an OK, we throw an unknown error.
    if (response.status !== 200) throw { error: 'Unknown', code: response.status };

    // If it's an OK, we return the JSON.
    return await response.json().catch((error) => {
        throw { error: error, code: -1 };
    });
}
