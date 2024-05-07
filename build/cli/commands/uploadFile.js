import createCommand from '../createCommand.js';
import { resolveError, uploadFile } from 'sxcu.api';
import fs from 'node:fs';
import { logger } from '../logger.js';
export default createCommand(
    'upload',
    'Upload a file to sxcu.net.',
    [
        {
            name: 'path',
            description: 'Path to the file to upload.',
            required: true,
            result: function (value) {
                value = value.replaceAll('\\', '/');
                const exists = fs.existsSync(value);
                if (!exists) throw `The path '${value}' does not exist.`;
                return value;
            },
        },
    ],
    async function (options) {
        const path = options[0].value;
        const response = await uploadFile(path).catch(function (failedResult) {
            const error = resolveError(failedResult);
            logger.error(`Failed to upload file: ${error.error} (Code: ${error.code})`);
        });
        if (response) {
            logger.success('Uploading was a success! Here is your URL:');
            logger.info(`${response.url}\n\n(ID: ${response.id}) Deletion URL: ${response.deletionUrl}`);
        }
    }
);
