/** Type of request. */
export type RequestType = 'GET' | 'POST';

/** Status code and message. */
export type StatusCodeMessage = { code: number; message: string };

export function request(method: RequestType, codes: StatusCodeMessage[]): object {
    return {};
}
