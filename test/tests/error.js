import * as sxcu from '../../build/index.js';

export async function execute() {
    sxcu.createError('err', 1);
    sxcu.resolveError({ error: 'err', code: 1 });
    sxcu.resolveError('err');
}
