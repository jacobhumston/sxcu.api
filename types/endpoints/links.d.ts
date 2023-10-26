import { DeletionToken, Url, Snowflake } from '../types.js';
import { SubdomainUrl } from './subdomains.js';
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
    /** Function to delete this link. */
    delete: () => Promise<string>;
};
/**
 * Create a link.
 * @param url Url to create the link for.
 * @param subdomain Subdomain to create the link on.
 * @returns The created link.
 */
export declare function createLink(url: Url, subdomain?: SubdomainUrl): Promise<Link>;
/**
 * Delete a link.
 * @param id The ID of the link.
 * @param token The deletion token of the link.
 * @returns The response message. (Success message.)
 */
export declare function deleteLink(id: Snowflake, token: DeletionToken): Promise<string>;
//# sourceMappingURL=links.d.ts.map
