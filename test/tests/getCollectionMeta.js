import * as sxcu from 'sxcu.api';

export const active = false;

export async function execute() {
    const collection = await sxcu.getCollectionMeta('6vj_PrdF8').catch((err) => {
        throw err;
    });
    console.log(collection);
}
