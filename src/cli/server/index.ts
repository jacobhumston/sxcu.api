import { colorText, fgGreen } from '../colors.js';
import { ParsedOption } from '../createCommand.js';
import { logger } from '../logger.js';
import { logo } from './text-logo.js';
import http from 'node:http';
import parse from './parser.js';
import { uploadFile, toggleRequestQueue, UserAgent } from 'sxcu.api';

/**
 * Main function for the sxcu.api server.
 * @param options The options for the server.
 */
export async function main(options: ParsedOption[]) {
    toggleRequestQueue(true, true);

    logger.clear();
    logger.info(colorText(fgGreen, logo));
    logger.blank();
    logger.info('Attempting to run with the following options:');
    logger.table(options.map((value) => ({ Name: value.name, Value: value.value, Description: value.description })));

    const urlPool: { url: string; added: number }[] = [];

    const server = http.createServer();
    server.on('request', function (request, response) {
        /**
         * The function to send the error message.
         * @param message The error message.
         */
        function err(message: string): void {
            response.statusCode = 400;
            response.write(JSON.stringify({ error: message }));
            response.end();
            return;
        }

        if (!request.method) return err('No method provided.');
        if (request.method.toLowerCase() !== 'post') return err('Method type not allowed.');
        if (!request.url) return err('Invalid URL.');
        if (!request.headers['content-type']) return err('Missing required header.');
        if (!request.headers['user-agent']) return err('Missing required header.');

        const chunks: Buffer[] = [];
        request.on('data', (chunk) => chunks.push(chunk));
        request.on('end', async function () {
            if (request.headers['content-type']?.startsWith('multipart/form-data')) {
                try {
                    const data = parse(Buffer.concat(chunks));
                    if (!data['file']) return err('Missing file.');
                    if (data['file'].type !== 'file') return err('Missing file.');

                    UserAgent.set(request.headers['user-agent'] ?? '');
                    const result = await uploadFile(data['file'].file);

                    urlPool.push({ url: result.url, added: Date.now() / 1000 });
                    urlPool.forEach(function (value, index) {
                        if (Date.now() / 1000 - value.added >= options[1].value) {
                            urlPool.splice(index, 1);
                            if (options[2].value === true)
                                logger.warn(`${value.url} was removed from the url pool. Left: ${urlPool.length}`);
                        }
                    });

                    if (options[2].value === true)
                        logger.success(`Uploaded: ${result.url} Urls: ${urlPool.map((value) => value.url).join(', ')}`);

                    response.write(
                        JSON.stringify({
                            url: urlPool.map((value) => value.url).join('\n'),
                            thumb: result.thumbnail,
                            del_url: result.deletionUrl,
                        })
                    );
                    response.end();
                } catch {
                    return err('Something went wrong.');
                }
            } else {
                console.log(request.headers['content-type']);
                return err('Invalid content type.');
            }
        });
    });

    server.listen(options[0].value, () => {
        logger.success(`Listening on port ${options[0].value}.`);
        logger.info(
            `Remember to change your upload url from:\nhttps://<domain>/api/files/create -> http://localhost:${options[0].value}/<domain>`
        );
        if (options[2].value === true) logger.info('Verbose logging has been enabled.');
    });

    server.on('error', (err) => {
        logger.error(
            `Failed to listen on port ${options[0].value}. Use a different port number and try again.`,
            `\n${err}`
        );
    });
}
