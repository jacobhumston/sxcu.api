import createCommand from '../createCommand.js';
import { resolveError, createLink } from 'sxcu.api';
import { logger } from '../logger.js';
export default createCommand(
    'link',
    'Create a link.',
    [
        {
            name: 'url',
            description: 'The url to create the redirect of.',
            required: true,
        },
    ],
    async function (options) {
        const response = await createLink(options[0].value).catch(function (failedResult) {
            const error = resolveError(failedResult);
            logger.error(`Failed to create link: ${error.error} (Code: ${error.code})`);
        });
        if (response) {
            logger.success('Link was created! Here is your URL:');
            logger.info(`${response.url}\n\n(ID: ${response.id}) Deletion URL: ${response.deletionUrl}`);
        }
    }
);
