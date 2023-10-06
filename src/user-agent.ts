import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Current user agent. */
let userAgent: string | null = null;

/**
 * Set the request user agent.
 * @param agent User agent to use.
 */
export function setUserAgent(agent: string) {
    userAgent = agent;
}

/**
 * Set the request user agent to the sxcu.api default.
 * This may error if the script is unable to find "package.json".
 */
export function useUserAgentDefault() {
    const path = `${dirname(fileURLToPath(import.meta.url))}/../package.json`;
    const packageData = JSON.parse(readFileSync(path).toString('utf-8'));
    userAgent = `${packageData.name}/$${packageData.version} (+${packageData.homepage})`;
}

/**
 * Get the current user agent.
 */
export function getUserAgent() {
    return userAgent;
}
