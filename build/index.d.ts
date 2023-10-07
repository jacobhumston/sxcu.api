import { uploadFile, getFileMeta, deleteFile } from './endpoints/files.js';
import { createCollection, getCollectionMeta } from './endpoints/collections.js';
import { checkSubdomain, getSubdomainMeta, listSubdomains } from './endpoints/subdomains.js';
import { createLink, deleteLink, Link } from './endpoints/links.js';
import { createPaste, deletePaste, Paste } from './endpoints/text.js';
import { createError, resolveError, ErrorObject } from './error.js';
import { UserAgent, UserAgentClass } from './classes/user-agent.js';
import { categorizeImports } from './categorize.js';
import { DeletionToken, Url, Snowflake } from './types.js';
export {
    uploadFile,
    getFileMeta,
    deleteFile,
    createCollection,
    getCollectionMeta,
    checkSubdomain,
    getSubdomainMeta,
    listSubdomains,
    createLink,
    deleteLink,
    createPaste,
    deletePaste,
    categorizeImports,
    createError,
    resolveError,
    UserAgent,
    UserAgentClass,
    ErrorObject,
    Paste,
    Link,
    DeletionToken,
    Url,
    Snowflake,
};
//# sourceMappingURL=index.d.ts.map
