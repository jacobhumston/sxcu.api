import { colorText, fgGreen } from '../colors.js';
import { ParsedOption } from '../createCommand.js';
import { logger } from '../logger.js';
import { logo } from './text-logo.js';
import http from 'node:http';
import parse from './parser.js';
import {
    uploadFile,
    toggleRequestQueue,
    UserAgent,
    resolveError,
    listSubdomains,
    SubdomainData,
    FileOptions,
} from 'sxcu.api';

/**
 * Options index reference:
 * 0 - port (required) NUMBER
 * 1 - url-lifespan (default: 5) NUMBER
 * 2 - log (default: false) BOOLEAN
 * 3 - skip-subdomain-check (default: false) BOOLEAN
 * 4 - token (default: false) FALSE / STRING
 */

/**
 * Main function for the sxcu.api server.
 * @param options The options for the server.
 */
export async function main(options: ParsedOption[]) {
    toggleRequestQueue(true, true);

    const port = options[0].value;
    const urlLifespan = options[1].value;
    const log = options[2].value;
    const skipSubdomainCheck = options[3].value;
    const token = options[4].value;

    logger.clear();
    logger.info(colorText(fgGreen, logo));
    logger.blank();
    logger.info('Attempting to run with the following options:');
    logger.table(
        options.map((value) => ({
            Name: value.name,
            Value: value.name === 'token' ? (value.value !== false ? '***' : 'false') : `${value.value}`,
            Description: value.description,
        }))
    );
    if (token !== false) logger.warn('The authorization header will be required for all requests.');

    const urlPool: { url: string; added: number }[] = [];

    const subdomainList: SubdomainData[] = [];
    if (skipSubdomainCheck === false) {
        logger.info(`Downloading subdomain list...`);
        const result = await listSubdomains().catch(function (err) {
            logger.error(`Failed to load subdomain list: ${err}`);
            logger.warn('Subdomains will not be validated.');
        });
        if (result) {
            result.forEach((value) => subdomainList.push(value));
            logger.success(`Successfully loaded ${subdomainList.length} subdomains which will be used for validation.`);
        }
    } else {
        logger.warn('Subdomains will not be validated.');
    }

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
            if (log === true) logger.error(message);
            return;
        }

        if (!request.method) return err('No method provided.');
        if (request.method.toLowerCase() !== 'post') return err('Method type not allowed.');
        if (!request.url) return err('Invalid URL.');
        if (!request.headers['content-type']) return err('Missing required header.');
        if (!request.headers['user-agent']) return err('Missing required header.');
        if (token !== false && request.headers['authorization'] !== token) return err(`Invalid token.`);

        const chunks: Buffer[] = [];
        request.on('data', (chunk) => chunks.push(chunk));
        request.on('end', async function () {
            if (request.headers['content-type']?.startsWith('multipart/form-data')) {
                try {
                    const data = parse(Buffer.concat(chunks));
                    if (!data['file']) return err('Missing file.');
                    if (data['file'].type !== 'file') return err('Missing file.');

                    const subdomain = request.url?.split('/')[1];
                    let subdomainCheckPassed = false;
                    if (subdomainList.length !== 0) {
                        for (const domain of subdomainList) {
                            if (domain.domain === subdomain) subdomainCheckPassed = true;
                        }
                    } else {
                        subdomainCheckPassed = true;
                    }
                    if (subdomainCheckPassed === false) return err('Failed subdomain check.');

                    if (log === true)
                        logger.info(
                            `Received a file with ${data['file'].file.size} bytes.\nAttempting to upload: ${data['file'].fileName} (${data['file'].fileType})`
                        );

                    const uploadOptions: FileOptions = {};
                    if (data['token'] && data['token'].type === 'text') uploadOptions.token = data['token'].value;
                    if (data['collection'] && data['collection'].type === 'text')
                        uploadOptions.collection = data['collection'].value;
                    if (data['collection_token'] && data['collection_token'].type === 'text')
                        uploadOptions.collectionToken = data['collection_token'].value;
                    if (data['noembed'] && data['noembed'].type === 'text')
                        uploadOptions.noEmbed = data['noembed'].value === 'true' ? true : false;
                    if (data['self_destruct'] && data['self_destruct'].type === 'text')
                        uploadOptions.selfDestruct = data['self_destruct'].value === 'true' ? true : false;
                    if (data['og_properties'] && data['og_properties'].type === 'text') {
                        try {
                            const parsedOG = JSON.parse(data['og_properties'].value);
                            uploadOptions.openGraphProperties = {
                                title: parsedOG.title,
                                description: parsedOG.description,
                                color: parsedOG.color
                                    ? parsedOG.color === 'false'
                                        ? false
                                        : parsedOG.color
                                    : undefined,
                                siteName: parsedOG.site_name,
                                discordHideUrl: parsedOG.discord_hide_url
                                    ? parsedOG.discord_hide_url === 'false'
                                        ? false
                                        : true
                                    : undefined,
                            };
                        } catch (msg) {
                            logger.error('Failed to parse open graph properties!', `${msg}`);
                            uploadOptions.openGraphProperties = undefined;
                        }
                    }

                    UserAgent.set(request.headers['user-agent'] ?? '');
                    const result = await uploadFile(data['file'].file, uploadOptions, subdomain).catch((msg) =>
                        err(`Failed to upload image. ${resolveError(msg).error}`)
                    );

                    if (!result) return;

                    urlPool.push({ url: result.url, added: Date.now() / 1000 });
                    const urlsToRemove: string[] = [];
                    for (const url of urlPool) {
                        if (Date.now() / 1000 - url.added >= urlLifespan) {
                            urlsToRemove.push(url.url);
                        }
                    }
                    urlsToRemove.forEach((url) => {
                        urlPool.splice(
                            urlPool.findIndex((u) => u.url === url),
                            1
                        );
                        if (log === true) logger.warn(`${url} was removed from the url pool. Left: ${urlPool.length}`);
                    });

                    if (log === true) {
                        logger.success(`Uploaded: ${result.url}`);
                        logger.info(`Urls sent: ${urlPool.map((value) => value.url).join(', ')}`);
                    }

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

    server.listen(port, () => {
        logger.success(`Listening on port ${port}.`);
        logger.info(
            `Remember to change your upload url from:\nhttps://<domain>/api/files/create -> http://localhost:${port}/<domain>`
        );
        if (log === true) logger.info('Verbose logging has been enabled.');
    });

    server.on('error', (err) => {
        logger.error(`Failed to listen on port ${port}. Use a different port number and try again.`, `\n${err}`);
    });
}
