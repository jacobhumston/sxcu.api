import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Web request user agent class.
 */
export class UserAgentClass {
    value: string = '';

    /**
     * Get the user agent.
     */
    get(): string {
        return this.value;
    }

    /**
     * Set the user agent.
     * @param value User agent to set.
     */
    set(value: string) {
        this.value = value;
    }

    /**
     * Set the user agent to the default.
     * May error if package.json is not found.
     */
    useDefault() {
        const path = `${dirname(fileURLToPath(import.meta.url)).replaceAll('\\', '/')}/../../package.json`;
        const packageData = JSON.parse(readFileSync(path).toString('utf-8'));
        this.set(`${packageData.name}/$${packageData.version} (+${packageData.homepage})`);
    }
}

/** Web request user agent. */
export const UserAgent = new UserAgentClass();
