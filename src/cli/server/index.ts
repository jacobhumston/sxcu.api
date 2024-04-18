import { colorText, fgGreen } from '../colors.js';
import { ParsedOption } from '../createCommand.js';
import { logger } from '../logger.js';
import { logo } from './text-logo.js';
import http from 'node:http';

export async function main(options: ParsedOption[]) {
    logger.clear();
    logger.info(colorText(fgGreen, logo));
    logger.blank();
    logger.info('Attempting to run with the following options:');
    logger.table(options.map((value) => ({ Name: value.name, Value: value.value, Description: value.description })));

    const server = http.createServer();
    server.on('request', function (request, response) {
        function err(message: string): void {
            response.statusCode = 400;
            response.write(JSON.stringify({ error: message }));
            response.end();
            return;
        }

        if (!request.method) return err('No method provided.');
        if (request.method.toLowerCase() !== 'post') return err('Method type not allowed.');
        if (!request.url) return err('Invalid URL.');

        let chunks = '';
        request.on('data', (chunk) => (chunks += chunk));
        request.on('end', function () {
            console.log(chunks);
            response.end();
        });
    });

    server.listen(options[0].value, () => {
        logger.success(`Listening on port ${options[0].value}.`);
        logger.info(
            `Remember to change your upload url from:\nhttps://<domain>/api/files/create -> http://localhost:${options[0].value}/<domain>`
        );
    });

    server.on('error', (err) => {
        logger.error(
            `Failed to listen on port ${options[0].value}. Use a different port number and try again.`,
            `\n${err}`
        );
    });
}
