import { parseSnowflake } from 'sxcu.api';

export const active = true;

export async function execute() {
    const result = parseSnowflake('6uLzcDqV6');
    console.log(result);
}
