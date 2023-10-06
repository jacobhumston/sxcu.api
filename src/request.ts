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
    /** Request path to append to the base url. */
    path: string;
    /** Body of the request. (If needed.) */
    body?: any;
};

/** Create an API request. */
export async function request(options: RequestOptions): Promise<object> {
    return options;
}
