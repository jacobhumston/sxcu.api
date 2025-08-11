/*
 * Copyright (c) 2024 Jacob Humston. All rights reserved.
 *
 * This software is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * https://github.com/jacobhumston/sxcu.api
 */
// Endpoints
export { uploadFile, getFileMeta, deleteFile } from './endpoints/files.js';
export { createCollection, getCollectionMeta } from './endpoints/collections.js';
export { checkSubdomain, getSubdomainMeta, listSubdomains } from './endpoints/subdomains.js';
export { createLink, deleteLink } from './endpoints/links.js';
export { createPaste, deletePaste } from './endpoints/text.js';
// Other Modules
export { createError, resolveError } from './error.js';
export { UserAgent, UserAgentClass } from './classes/user-agent.js';
export {
    request,
    getRateLimits,
    promisifyRateLimit,
    promisifyGlobalRateLimit,
    promisifyEndpointRateLimit,
    toggleRequestQueue,
} from './request.js';
export { extractToken, parseSnowflake, convertSxcuFile } from './utility.js';
export { categorizeImports } from './categorize.js';
