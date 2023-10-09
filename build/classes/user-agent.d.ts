/**
 * Web request user agent class.
 */
export declare class UserAgentClass {
    #private;
    /**
     * Get the user agent.
     */
    get(): string;
    /**
     * Set the user agent.
     * @param value User agent to set.
     */
    set(value: string): void;
    /**
     * Set the user agent to the default.
     * Will error if sxcu.api's package.json is not present.
     * @param pathOverride A path to a package.json to use instead of sxcu.api's package.json. The package.json needs to include `name`, `version`, and `homepage`.
     */
    useDefault(pathOverride?: string): void;
}
/** Web request user agent. */
export declare const UserAgent: UserAgentClass;
//# sourceMappingURL=user-agent.d.ts.map
