import createCommand from '../createCommand.js';
import { resolveError, createLink } from 'sxcu.api';

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
            console.log(`Failed to create link: ${error.error} (Code: ${error.code})`);
        });
        if (response) {
            console.log('Link was created! Here is your URL:');
            console.log(`\n${response.url}\n\n(ID: ${response.id}) Deletion URL: ${response.deletionUrl}`);
        }
    }
);
