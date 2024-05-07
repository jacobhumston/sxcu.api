/// <reference types="node" />
import { SubdomainUrl } from './subdomains.js';
import { DeletionToken, Snowflake, Token, Url } from '../types.js';
/** Represents file options which can be utilized in `uploadFile`. */
export type FileOptions = {
    /** Subdomain upload token. */
    token?: Token;
    /** The ID of a collection to upload the image to. */
    collection?: Snowflake;
    /**
     * The upload token of the collection.
     * Only required if it's private.
     */
    collectionToken?: Token;
    /** If true, the url will directly link to the image instead of an embed. */
    noEmbed?: boolean;
    /** If true, the file will be automatically deleted after 24 hours. */
    selfDestruct?: boolean;
    /** Open Graph properties for this file. */
    openGraphProperties?: {
        /**
         * Configures the value for the 'title' OpenGraph meta tag.
         * If set to false, the tag will be omitted entirely.
         * */
        title?: string | false;
        /**
         * Configures the value for the 'description' OpenGraph meta tag.
         * If set to false, the tag will be omitted entirely.
         * */
        description?: string | false;
        /**
         * Configures the value for the 'theme-color' OpenGraph meta tag.
         * If set to false, the tag will be omitted entirely.
         * */
        color?: string | false;
        /**
         * Configures the value for the 'site-name' OpenGraph meta tag.
         * If set to false, the tag will be omitted entirely.
         * */
        siteName?: string | false;
        /** If false, discord will not hide the url of the file when sent as a direct link. */
        discordHideUrl?: boolean;
    };
};
/**
 * Represents the meta data of a file.
 * It's similar to FileData but contains more information.
 */
export type FileMeta = {
    /** ID of the file. */
    id: Snowflake;
    /** URL of the file. */
    url: Url;
    /** The amount of views this file has. */
    views: number;
    /** If this file is viewable or not. */
    viewable: boolean;
    /** ID of the collection this file belongs to. */
    collection?: Snowflake;
    /** Size of the file in bytes. */
    size: number;
    /** Unix timestamp of when this file was created. */
    creationTime: number;
    /** Date object of which represents when this file was created. */
    creationTimeDate: Date;
    /** Open Graph Properties for this file. */
    openGraphProperties?: FileOptions['openGraphProperties'];
};
/** A file but with less data associated with it. */
export type FileData = {
    /** The ID of this file. */
    id: Snowflake;
    /** The url of this file. */
    url: Url;
    /** The deletion url of this file. */
    deletionUrl: Url;
    /** The deletion token of this file. */
    deletionToken: DeletionToken;
    /** Thumbnail url of the uploaded file. */
    thumbnail: Url;
    /** Function to delete this file. */
    delete: () => Promise<string>;
    /** Function to get the meta data of this file. */
    getMeta: () => Promise<FileMeta>;
};
/** Represents what is considered an uploadable file. */
export type UploadableFile = string | Buffer | Blob;
/**
 * Upload a file.
 * @param file The file to upload.
 * @param options File options.
 * @param subdomain Subdomain to upload to.
 * @returns The uploaded file.
 */
export declare function uploadFile(
    file: UploadableFile,
    options?: FileOptions,
    subdomain?: SubdomainUrl
): Promise<FileData>;
/**
 * Get the meta information of a file.
 * @param id The ID of the file.
 * @returns The meta information.
 */
export declare function getFileMeta(id: Snowflake): Promise<FileMeta>;
/**
 * Delete a file.
 * @param id The ID of the file.
 * @param token The deletion token of the file.
 * @returns The response message. (Success message.)
 */
export declare function deleteFile(id: Snowflake, token: DeletionToken): Promise<string>;
//# sourceMappingURL=files.d.ts.map
