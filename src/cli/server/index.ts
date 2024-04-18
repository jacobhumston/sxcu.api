import { colorText, fgGreen } from '../colors.js';
import { ParsedOption } from '../createCommand.js';
import { logger } from '../logger.js';
import { logo } from './text-logo.js';
import http from 'node:http';
import fs from 'node:fs';
import parse from './parser.js';
import { uploadFile, toggleRequestQueue } from 'sxcu.api';

export async function main(options: ParsedOption[]) {
    toggleRequestQueue(true, true);
    
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
        if (!request.headers['content-type']) return err('Missing required header.');

        let chunks = '';
        request.on('data', (chunk) => (chunks += chunk));
        request.on('end', async function () {
            if (request.headers['content-type']?.startsWith('multipart/form-data')) {
                const data = parse(chunks);
                console.log(data);
                let url = ""
                if (data['file'].type === "file") {
                    const result = await uploadFile(data['file'].image).catch((e) => console.log(e))
                    if (result) {
                        url = result.url
                    }
                }
                fs.writeFileSync('e.json', JSON.stringify(data));
                response.write(JSON.stringify({ url: url }));
                response.end();
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
    });

    server.on('error', (err) => {
        logger.error(
            `Failed to listen on port ${options[0].value}. Use a different port number and try again.`,
            `\n${err}`
        );
    });
}
