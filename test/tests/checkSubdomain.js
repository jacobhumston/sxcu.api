import * as sxcu from 'sxcu.api';

export const active = false;

export async function execute() {
    const subdomains = await sxcu.checkSubdomain('sxcu.net').catch((err) => {
        throw err;
    });
    console.log(subdomains);
}
