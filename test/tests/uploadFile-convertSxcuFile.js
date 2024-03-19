import { convertSxcuFile, uploadFile } from 'sxcu.api';

export const active = true;

export async function execute() {
    const sxcuFile = convertSxcuFile('test/assets/test.sxcu');
    const uploadedFile = await uploadFile('test/assets/test.png', sxcuFile.options, sxcuFile.domain);
    console.log(uploadedFile);
}
