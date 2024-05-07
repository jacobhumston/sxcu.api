/**
 * Cleans a string of \n and \r escape codes.
 * @param string The string to clean.
 * @returns The cleaned string.
 */
export function cleanString(string) {
    return string.replaceAll('\n', '').replaceAll('\r', '');
}
/**
 * This is an attempted parser for multipart form data.
 * This was made to specifically parse data from ShareX, however
 * it may work with other forms of multipart data.
 *
 * @parm data The data to parse. This should be all combined chunks.
 */
export default function parse(data) {
    const parsedData = {};
    const lines = [];
    let currentLineIndex = 0;
    for (const byte of data.values()) {
        const byteBuffer = Buffer.from([byte]);
        const stringedByte = byteBuffer.toString();
        if (!lines[currentLineIndex]) lines[currentLineIndex] = { string: '', buffer: Buffer.from([]) };
        lines[currentLineIndex] = {
            string: (lines[currentLineIndex].string += stringedByte),
            buffer: Buffer.concat([lines[currentLineIndex].buffer, byteBuffer]),
        };
        if (stringedByte === '\n') {
            currentLineIndex++;
            continue;
        }
    }
    const sections = [];
    const header = cleanString(lines[0].string);
    let currentSectionIndex = 0;
    for (const line of lines) {
        if (currentSectionIndex === -1) continue;
        const cleanedString = cleanString(line.string);
        if (cleanedString === `${header}--`) {
            currentSectionIndex = -1;
            continue;
        }
        if (cleanedString === header) {
            currentSectionIndex++;
            continue;
        }
        if (!sections[currentSectionIndex]) sections[currentSectionIndex] = { lines: [] };
        sections[currentSectionIndex].lines.push(line);
    }
    for (const section of sections) {
        if (!section) continue;
        const contentDisposition = cleanString(section.lines[0].string);
        const contentType = cleanString(section.lines[1].string);
        const name = contentDisposition.split('name=')[1].replaceAll('"', '').split(';')[0];
        if (contentType.length === 0) {
            parsedData[name] = {
                type: 'text',
                value: section.lines
                    .splice(2)
                    .map((value) => cleanString(value.string))
                    .join('\n'),
            };
        } else {
            parsedData[name] = {
                type: 'file',
                fileName: contentDisposition.split('filename=')[1].replaceAll('"', ''),
                fileType: cleanString(contentType.split(': ')[1]),
                file: new Blob([Buffer.concat(section.lines.splice(3).map((value) => value.buffer))]),
            };
        }
    }
    return parsedData;
}
