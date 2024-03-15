//import { request } from '../request.js';

import { Snowflake } from '../types';

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
 * Create a collection.
 * @param title The title of this collection.
 * @param options Collection creation options.
 */
export async function createCollection(title: string, options?: CreateCollectionOptions) {}

/**
 * Get the meta information of a collection.
 * @param id The ID of the collection.
 */
export async function getCollectionMeta(id: Snowflake) {}
