/** A deletion token which is required when deleting something. */
export type DeletionToken = string;

/** Represents a url. */
export type Url = string;

/**
 * Represents a snowflake.
 * A snowflake is only a number in rare cases. (Such as subdomains.)
 */
export type Snowflake = string | number;
