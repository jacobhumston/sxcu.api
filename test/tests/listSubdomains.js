import * as sxcu from '../../build/index.js';

export const active = false;

export async function execute() {
    const subdomains = await sxcu.listSubdomains().catch((err) => {
        console.log(err);
    });
    console.log(subdomains);
}