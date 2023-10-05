/** Type of request. */
export type RequestType = 'GET' | 'POST';

/** Status code and message. */
export type StatusCodeMessage = { code: number; message: string };

/** Request options. */
export type RequestOptions = {
    type: RequestType,
    
};

export async function request(options: RequestOptions): Promise<object> {
    return {};
}
