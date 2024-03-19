import * as sxcu from 'sxcu.api';

export const active = false;

export async function execute() {
    const subdomains = await sxcu.listSubdomains().catch((err) => {
        throw err;
    });
    console.log(subdomains);
}
