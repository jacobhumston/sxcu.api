import createCommand from '../createCommand.js';
import { UserAgent } from 'sxcu.api';
import { logger } from '../logger.js';

export default createCommand('user-agent', 'Log the current userAgent used for web requests.', [], async function () {
    logger.info(UserAgent.get());
});
