import { colorText } from './colors.js';

export type LoggerType = 'Info' | 'Warn' | 'Success' | 'Error';

export function log(type: LoggerType, ...message: string[]): void {
    console.log(colorText(type, message.join(' ')));
    return;
}
