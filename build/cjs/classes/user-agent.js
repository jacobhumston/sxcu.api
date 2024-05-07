'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserAgent = exports.UserAgentClass = void 0;
const node_fs_1 = require('node:fs');
/**
 * Web request user agent class.
 */
class UserAgentClass {
    #value = '';
    /**
     * Get the user agent.
     */
    get() {
        return this.#value;
    }
    /**
     * Set the user agent.
     * @param value User agent to set.
     */
    set(value) {
        this.#value = value;
    }
    /**
     * Set the user agent to the default.
     * Will error if sxcu.api's package.json is not present.
     * @param pathOverride A path to a package.json to use instead of sxcu.api's package.json. The package.json needs to include `name`, `version`, and `homepage`.
     */
    useDefault(pathOverride) {
        if (!(0, node_fs_1.existsSync)('node_modules/sxcu.api/package.json'))
            throw { error: 'node_modules/sxcu.api/package.json does not exists!', code: -1 };
        const path = pathOverride ?? `node_modules/sxcu.api/package.json`;
        const packageData = JSON.parse((0, node_fs_1.readFileSync)(path).toString('utf-8'));
        this.set(`${packageData.name}/$${packageData.version} (+${packageData.homepage})`);
    }
}
exports.UserAgentClass = UserAgentClass;
/** User agent used for all requests. */
exports.UserAgent = new UserAgentClass();
