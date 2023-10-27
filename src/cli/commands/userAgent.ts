import createCommand from '../createCommand.js';
import { UserAgent } from 'sxcu.api';

export default createCommand('user-agent', 'Log the current userAgent used for web requests.', [], function () {
    console.log(UserAgent.get());
});
