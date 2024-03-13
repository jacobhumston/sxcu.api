import { convertSxcuFile } from 'sxcu.api';

export const active = false;

export async function execute() {
    const result = convertSxcuFile('test/assets/test.sxcu');
    console.log(result);
}
