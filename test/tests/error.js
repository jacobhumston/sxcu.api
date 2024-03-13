import * as sxcu from 'sxcu.api';

export const active = true;

export async function execute() {
    throw "failed??"
    const r1 = sxcu.createError('err', 1);
    const r2 = sxcu.resolveError({ error: 'err', code: 1 });
    const r3 = sxcu.resolveError('err');
    [r1, r2, r3].forEach((value, index) => {
        if (value.error !== 'err') throw `r${index - 1} did not return the correct result -> ${value}`;
        if (value.code !== 0 && value.code !== 1) throw `r${index - 1} did not return the correct result -> ${value}`;
    });
}
