/// <reference types="node" resolution-mode="require"/>
import { SubdomainUrl } from './subdomains.js';
import { DeletionToken, Snowflake, Token, Url } from '../types.js';
/** Represents file options which can be utilized in `uploadFile`. */
export type FileOptions = {
    /** Subdomain upload token. */
    token?: Token;
    /** The ID of a collection to upload the image to. */
    collection?: Snowflake;
    /** The upload token of the collection.
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
/** A file but with less data associated with it. */
export type FileData = {
    id: Snowflake;
    url: Url;
    deletionUrl: Url;
    deletionToken: DeletionToken;
    thumbnail: Url;
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
export declare function getFileMeta(): Promise<void>;
export declare function deleteFile(): Promise<void>;
//# sourceMappingURL=files.d.ts.map
