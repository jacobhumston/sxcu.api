import type { Snowflake, Token, Url } from '../types';
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
    /** The description of the collection. */
    description: string;
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
    token?: Token | null;
    /** The created collection's url. */
    url: Url;
};
/**
 * A file in a collection meta.
 */
export type FileCollectionMeta = {
    /** The ID of this file. */
    id: Snowflake;
    /** The url of this file. */
    url: Url;
    /** The url of the thumbnail which belongs to this file. */
    thumbnail: Url;
    /** The amount of views this file has. */
    views: number;
};
/**
 * A collections meta information.
 */
export type CollectionMeta = {
    /** The collection's ID. */
    id: Snowflake;
    /** The collection's title. */
    title: string;
    /** The collection's description. */
    description: string;
    /** The collection's view count. */
    views: number;
    /** The unix timestamp of when this collection was created. */
    creationTime: number;
    /** The date of when this collection was created. */
    creationTimeDate: Date;
    /** If true, this collection is public. */
    public: boolean;
    /** If true, this collection is unlisted. */
    unlisted: boolean;
    /** The total amount of views the files in this collection have. */
    fileViews: number;
    /** An array of files that belong to this collection. */
    files: FileCollectionMeta[];
};
/**
 * Create a collection.
 * @param title The title of this collection.
 * @param options Collection creation options.
 */
export declare function createCollection(title: string, options?: CreateCollectionOptions): Promise<CreatedCollection>;
/**
 * Get the meta information of a collection.
 * @param id The ID of the collection.
 */
export declare function getCollectionMeta(id: Snowflake): Promise<CollectionMeta>;
//# sourceMappingURL=collections.d.ts.map
