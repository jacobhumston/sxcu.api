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
 * Convert a file to a blob.
 * @param file The file to convert.
 * @returns The created blob.
 */
function convertFileToBlob(file: UploadableFile): Blob {
    if (file instanceof Blob) return file;
    if (file instanceof Buffer) return new Blob([file]);
    if (!existsSync(file)) throw { error: 'File does not exist.', code: -1 };
    return new Blob([readFileSync(file)]);
}

/**
 * Parses FileOptions
 * @param options The options to parse.
 * @param formData The form data to append to.
 */
function parseFileOptions(options: FileOptions, formData: FormData): null {
    if (options.token) formData.set('token', options.token);
    if (options.collection) formData.set('collection', options.collection.toString());
    if (options.collectionToken) formData.set('collection_token', options.collectionToken);
    if (options.noEmbed) formData.set('noembed', 'true');
    if (options.selfDestruct) formData.set('self_destruct', 'true');
    if (options.openGraphProperties) {
        const { title, description, color, siteName, discordHideUrl } = options.openGraphProperties;
        const data: { [key: string]: string | boolean } = {};
        if (title) data.title = title;
        if (description) data.description = description;
        if (color) data.color = color;
        if (siteName) data.site_name = siteName;
        if (discordHideUrl) data.hide_discord_url = discordHideUrl;
        if (Object.entries(data).length > 0) formData.set('og_properties', JSON.stringify(data));
    }
    return null;
}

/**
 * Converts the options to a FormData object.
 * @param file The uploadable file.
 * @param options The file options.
 * @returns The created form data.
 */
function convertOptionsToFormData(file: UploadableFile, options?: FileOptions): FormData {
    const formData = new FormData();
    formData.set('file', convertFileToBlob(file));
    if (options) {
        parseFileOptions(options, formData);
    }
    return formData;
}

/**
 * Upload a file.
 * @param file The file to upload.
 * @param options File options.
 * @param subdomain Subdomain to upload to.
 * @returns The uploaded file.
 */
export async function uploadFile(
    file: UploadableFile,
    options?: FileOptions,
    subdomain?: SubdomainUrl
): Promise<FileData> {
    const response = await request({
        type: 'POST',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: 'files/create',
        body: convertOptionsToFormData(file, options),
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
        delete: async () => await deleteFile(response.id, extractToken(response.del_url)),
        getMeta: async () => await getFileMeta(response.id),
    };
}

/**
 * Get the meta information of a file.
 * @param id The ID of the file.
 * @returns The meta information.
 */
export async function getFileMeta(id: Snowflake): Promise<FileMeta> {
    const response = await request({
        type: 'GET',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: `files/${id}`,
    }).catch((error) => {
        throw resolveError(error);
    });

    const openGraphProperties: any = response.og_properties ?? {};

    return {
        id: response.id,
        url: response.url,
        views: response.views,
        viewable: response.viewable,
        collection: response.collection,
        size: response.size,
        creationTime: response.creation_time,
        creationTimeDate: new Date(response.creation_time * 1000),
        openGraphProperties: {
            color: openGraphProperties.color,
            title: openGraphProperties.title,
            description: openGraphProperties.description,
            discordHideUrl: openGraphProperties.hide_discord_url,
        },
    };
}

/**
 * Delete a file.
 * @param id The ID of the file.
 * @param token The deletion token of the file.
 * @returns The response message. (Success message.)
 */
export async function deleteFile(id: Snowflake, token: DeletionToken): Promise<string> {
    const response = await request({
        type: 'GET',
        statusErrors: [400, 429],
        baseUrl: 'https://sxcu.net/api/',
        path: `files/delete/${id}/${token}`,
    }).catch((error) => {
        throw resolveError(error);
    });

    return response.message;
}
