/**
 * Extracts the token or id from a url or path.
 * @param url Url to extract the token from.
 * @returns The token.
 */
export function extractToken(url) {
    return url.split('/').pop() ?? '';
}
