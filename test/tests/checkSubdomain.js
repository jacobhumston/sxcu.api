import * as sxcu from '../../build/index.js';

export const active = false;

export async function execute() {
    const subdomains = await sxcu.checkSubdomain('sxcu.net').catch((err) => {
        console.log(err);
    });
    console.log(subdomains);
}