import { request } from '../request.js';
import { extractToken } from '../utility.js';
import { DeletionToken, Url, Snowflake } from '../types.js';
import { resolveError } from '../error.js';

/** A link object. */
export type Link = {
    /** The id of this link. */
    id: Snowflake;
    /** The url of this link. */
    url: Url;
    /** The deletion url of this link. */
    deletionUrl: Url;
    /** The deletion token of this link. */
    deletionToken: DeletionToken;
    /**
     * Function to delete this link.
     */
    delete: () => Promise<string>;
};

export async function createLink(link: Url): Promise<Link> {
    const response = await request({
        type: 'POST',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: 'links/create',
        body: new URLSearchParams({ text: link }),
    }).catch((error) => {
        throw resolveError(error);
    });

    return {
        id: extractToken(response.url),
        url: response.url,
        deletionUrl: response.del_url,
        deletionToken: extractToken(response.del_url),
        delete: async () => await deleteLink(extractToken(response.url), extractToken(response.del_url)),
    };
}

export async function deleteLink(id: Snowflake, token: DeletionToken): Promise<string> {
    const response = await request({
        type: 'GET',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: `links/delete/${id}/${token}`,
    }).catch((error) => {
        throw resolveError(error);
    });

    return response.message;
}
