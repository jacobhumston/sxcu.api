/**
 * Represents a parsed data plain value.
 */
export type ParsedDataPlain = { type: 'plain'; value: string };

/**
 * Represents a parsed data file.
 */
export type ParsedDataFile = { type: 'file'; fileName: string; image: Blob };

/**
 * Represents parsed data.
 */
export type ParsedData = { [key: string]: ParsedDataPlain | ParsedDataFile };

/**
 * This is an attempted parser for multipart form data.
 * This was made to specifically parse data from ShareX, however
 * it may work with other forms of multipart data.
 *
 * @parm data The data to parse. This should be all combined chunks.
 */
export default function parse(data: string): ParsedData {
    const splittedData = data.split('\n');
    const header = splittedData[0].replaceAll('\r', '');
    const dataToParse = data
        .replaceAll(splittedData[splittedData.length - 2], '')
        .replaceAll('\r', '')
        .split(header);

    dataToParse.forEach(function (value, index) {
        const lines = value.split('\n');
        lines.shift();
        lines.pop();
        dataToParse[index] = lines.join('\n');
    });

    const parsedData: ParsedData = {};
    for (const section of dataToParse) {
        if (section.replaceAll(' ', '').replaceAll('\n', '') === '') continue;
        const meta = section.split('\n')[0];
        /* Any meta with more then the name are assumed to be a file. */
        if (meta.split(';').length > 2) {
            const name = meta.split(';')[1].split('name=')[1].replaceAll('"', '');
            const fileName = meta.split(';')[2].split('filename=')[1].replaceAll('"', '');
            const value = section.split('\n');
            value.shift();
            value.shift();
            value.shift();
            value.pop();
            parsedData[name] = { type: 'file', fileName: fileName, image: new Blob([atob(value.join('\n'))]) };
        } else {
            const name = meta.split(';')[1].split('name=')[1].replaceAll('"', '');
            const value = section.split('\n');
            value.shift();
            value.shift();
            parsedData[name] = { type: 'plain', value: value.join('\n') };
        }
    }

    return parsedData;
}
