import { convertSxcuFile } from 'sxcu.api';

export const active = true;

export async function execute() {
    const result = convertSxcuFile('test/assets/test.sxcu');
    console.log(result);
}
