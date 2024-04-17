import createCommand from '../createCommand.js';

export default createCommand(
    'server',
    'Run a middleware server that adds extra features to uploaded files. (WIP)',
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
        {
            name: 'url-lifespan',
            description: 'The amount of time in seconds that a url stays in the url pool. (Default: 5)',
            required: false,
            result(value) {
                const number = parseInt(value);
                if (isNaN(number)) throw 'Value could not be converted into a number.';
                return number;
            },
            default: 5,
        },
    ],
    async function (options) {
        const server = await import('../server/index.js');
        server.main(options);
    }
);
