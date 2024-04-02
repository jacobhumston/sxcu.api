import createCommand from '../createCommand.js';
import http from 'node:http';

export default createCommand(
    'server',
    'Run a middleware server that adds extra features to uploaded files.',
    [
        {
            name: 'port',
            description: 'The port for the server to run on.',
            required: true,
            result(value) {
                const number = parseInt(value);
                if (isNaN(number)) throw 'Value could not be converted into a number.';
                return number;
            },
        },
    ],
    // eslint-disable-line no-unused-vars
    async function (_, options) {
        console.clear();
        console.log('[Info]: sxcu.api cli server is starting...');

        const server = http.createServer();
        server.on('request', function () {});
        server.listen(options[0].value);
    }
);
