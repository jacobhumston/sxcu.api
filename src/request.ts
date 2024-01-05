import { UserAgent } from './classes/user-agent.js';
import { createError } from './error.js';

/** Request options. */
export type RequestOptions = {
    /** Type of request. */
    type: 'GET' | 'POST';
    /** Array of error status codes and messages. */
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
};

/** The URL to learn more about setting the User Agent. */
const guideUrl: string = 'https://sxcu.api.lovelyjacob.com/guides/user-agent.html';

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
 */
export async function request(options: RequestOptions): Promise<{ [key: string]: any }> {
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
