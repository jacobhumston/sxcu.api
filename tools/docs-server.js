/**
 * Server used to serve /docs for testing.
 */

import open from 'open';
import express from 'express';
import getPort from 'get-port';
import { exit } from 'node:process';

const app = express();
const port = await getPort();

app.use(express.static('docs/', { extensions: ['html'] }));
app.get('/exit', function (_, response) {
    console.log('/exit accessed, exiting....');
    response.send('Process is being exited, you may now close this page.');
    exit();
});
app.listen(port);

console.log(`Listening on port ${port}...\nOpen http://localhost:${port}/exit to exit the process.`);

open(`http://localhost:${port}`);
