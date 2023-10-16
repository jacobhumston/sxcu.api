import { request } from '../request.js';
import { resolveError } from '../error.js';
import { SubdomainUrl } from './subdomains.js';
import { readFileSync, existsSync } from 'node:fs';
import { DeletionToken, Snowflake, Token, Url } from '../types.js';
import { extractToken } from '../utility.js';

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
        /** Configures the value for the 'title' OpenGraph meta tag. */
        title?: string;
        /** Configures the value for the 'description' OpenGraph meta tag. */
        description?: string;
        /** Configures the value for the 'theme-color' OpenGraph meta tag. */
        color?: string;
        /** Configures the value for the 'site-name' OpenGraph meta tag. */
        siteName?: string;
        /** If false, discord will not hide the url of the file when sent as a direct link. */
        discordHideUrl?: boolean;
    };
};

export type FileData = {
    id: Snowflake;
    url: Url;
    deletionUrl: Url;
    deletionToken: DeletionToken;
    thumbnail: Url;
};

/**
 * Convert a file to a blob.
 * @param file The file to convert.
 */
function convertFileToBlob(file: string | Buffer | Blob): Blob {
    if (file instanceof Blob) return file;
    if (file instanceof Buffer) return new Blob([file]);
    if (!existsSync(file)) throw { error: 'File does not exist.', code: -1 };
    return new Blob([readFileSync(file)]);
}

export async function uploadFile(
    file: string | Buffer | Blob,
    options?: FileOptions,
    subdomain?: SubdomainUrl
): Promise<FileData> {
    const formData = new FormData();
    formData.set('file', convertFileToBlob(file));

    const response = await request({
        type: 'POST',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: 'files/create',
        body: formData,
        subdomain: subdomain ?? undefined,
    }).catch((error) => {
        throw resolveError(error);
    });

    return {
        id: response.id,
        url: response.url,
        deletionUrl: response.del_url,
        deletionToken: extractToken(response.del_url),
        thumbnail: response.thumb,
    };
}

export async function getFileMeta() {}

export async function deleteFile() {}
