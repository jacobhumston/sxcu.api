import createCommand from '../createCommand.js';

export default createCommand(
    'server',
    'Run a middleware server adds extra features to uploaded files.',
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
    async function (_, options) {
        console.clear()
        console.log('Thank you for using ')
    }
);
