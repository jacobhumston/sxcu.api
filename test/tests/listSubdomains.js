import * as sxcu from 'sxcu.api';

export const active = false;

export async function execute() {
    const subdomains = await sxcu.listSubdomains().catch((err) => {
        console.log(err);
    });
    console.log(subdomains);
}
