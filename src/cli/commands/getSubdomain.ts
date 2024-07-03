import createCommand from '../createCommand.js';
import { resolveError, getSubdomainMeta } from 'sxcu.api';
import { logger } from '../logger.js';

export default createCommand(
    'get-subdomain',
    'Get the information of a subdomain/domain.',
    [
        {
            name: 'domain',
            description: 'The domain to get the information of.',
            required: true,
        },
    ],
    async function (options) {
        const domain = options[0].value;
        const response = await getSubdomainMeta(domain).catch(function (failedResult) {
            const error = resolveError(failedResult);
            logger.error(`Failed to get the information of the domain: ${error.error} (Code: ${error.code})`);
        });
        if (response) {
            logger.info(JSON.stringify(response, null, 4));
        }
    }
);
