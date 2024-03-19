import * as sxcu from 'sxcu.api';

export const active = false;

export async function execute() {
    const collection = await sxcu.createCollection('test collection').catch((err) => {
        throw err;
    });
    console.log(collection);
}
