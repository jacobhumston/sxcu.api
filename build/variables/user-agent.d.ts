/**
 * Web request user agent class.
 */
export declare class UserAgentClass {
    value: string;
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
     * May error if package.json is not found.
     */
    useDefault(): void;
}
/** Web request user agent. */
export declare const UserAgent: UserAgentClass;
//# sourceMappingURL=user-agent.d.ts.map
