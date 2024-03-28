/**
 * This class is responsible for generating the docs.
 * Requires a reader, writer, and optionally parsers and sorters.
 * If no parsers or sorters are provided, the files will be written as is.
 * The parsers and sorters are run in the order they are provided.
 */
export class DocsGenerator {
    constructor(options) {
        this.reader = options.reader;
        this.writer = options.writer;
        this.parsers = options.parsers || [];
        this.sorters = options.sorters || [];
    }
    async generate() {
        let files = await this.reader.read();
        files = await this.parseFiles(files);
        files = await this.sortFiles(files);
        await this.writer.clean();
        await this.writer.write(files);
    }
    async parseFiles(files) {
        const parsedFiles = [];
        for (const file of files) {
            let parsed = file;
            for (const parser of this.parsers) {
                parsed = await parser.parse(parsed);
            }
            parsedFiles.push(parsed);
        }
        return parsedFiles;
    }
    async sortFiles(files) {
        let sorted = files;
        for (const sorter of this.sorters) {
            sorted = sorter.sort(files);
        }
        return sorted;
    }
}
//# sourceMappingURL=DocsGenerator.js.map