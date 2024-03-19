import { request } from '../request.js';
import { Snowflake, Token } from '../types';
import { resolveError } from '../error.js';

/**
 * Available options that can be provided when creating a collection.
 */
export type CreateCollectionOptions = {
    /** Description of this collection. */
    description?: string;
    /** If true, the collection will be private. */
    private?: boolean;
    /** If true, the collection will be unlisted. */
    unlisted?: boolean;
};

/**
 * Represents a created collection.
 */
export type CreatedCollection = {
    /** The ID of the created collection. */
    id: Snowflake;
    /** The title of the created collection. */
    title: string;
    /** The description of the collection, if available. */
    description?: string;
    /** If true, the created collection is unlisted. */
    unlisted: boolean;
    /**
     * If true, the created collection is private.
     * Private collections require a token to upload to.
     */
    private: boolean;
    /**
     * The token which can be used when uploading images to the created collection.
     * This is only returned if the created collection is private.
     */
    token?: Token;
};

/**
 * Create a collection.
 * @param title The title of this collection.
 * @param options Collection creation options.
 */
export async function createCollection(title: string, options?: CreateCollectionOptions): Promise<CreatedCollection> {
    options = options ?? {};

    const params = new URLSearchParams();
    params.set('title', title);
    if (options.description) params.set('desc', options.description);
    params.set('private', options.private ? `${options.private}` : 'false');
    params.set('unlisted', options.unlisted ? `${options.unlisted}` : 'false');

    const response = await request({
        type: 'POST',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: 'links/create',
        body: params,
    }).catch((error) => {
        throw resolveError(error);
    });

    return {
        id: response.collection_id,
        title: response.title,
        description: response.description,
        unlisted: response.unlisted,
        private: response.private,
        token: response.collection_token,
    };
}

/**
 * Get the meta information of a collection.
 * @param id The ID of the collection.
 */
export async function getCollectionMeta(id: Snowflake) {}
