import createCommand from '../createCommand.js';
import { UserAgent } from 'sxcu.api';

export default createCommand('user-agent', 'Log the current userAgent used for web requests.', [], async function () {
    console.log(UserAgent.get());
});
