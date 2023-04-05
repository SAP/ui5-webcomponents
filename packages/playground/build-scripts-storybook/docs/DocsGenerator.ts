import type { IDocsParser } from "./parsers";
import type { IDocsSorter } from "./sorters";
import type { IDocsReader } from "./DocsReader";
import type { IDocsWriter } from "./DocsWriter";

export interface IDocsGenerator {
    generate(): void;
}

export interface IFile {
    path: string;
    content: string;
}

interface IDocsGeneratorOptions {
    reader: IDocsReader;
    writer: IDocsWriter;
    parsers?: IDocsParser[];
    sorters?: IDocsSorter[];
}

/**
 * This class is responsible for generating the docs.
 * Requires a reader, writer, and optionally parsers and sorters.
 * If no parsers or sorters are provided, the files will be written as is.
 * The parsers and sorters are run in the order they are provided.
 */
export class DocsGenerator implements IDocsGenerator {
    private reader: IDocsReader;
    private writer: IDocsWriter;
    private parsers: IDocsParser[];
    private sorters: IDocsSorter[];

    constructor(options: IDocsGeneratorOptions) {
        this.reader = options.reader;
        this.writer = options.writer;

        this.parsers = options.parsers || [];
        this.sorters = options.sorters || [];
    }

    public async generate(): Promise<void> {
        let files = await this.reader.read();

        files = await this.parseFiles(files);
        files = await this.sortFiles(files);

        await this.writer.clean();
        await this.writer.write(files);
    }

    private async parseFiles(files: IFile[]): Promise<IFile[]> {
        const parsedFiles: IFile[] = [];
        for (const file of files) {
            let parsed = file;
            for (const parser of this.parsers) {
                parsed = await parser.parse(parsed);
            }
            parsedFiles.push(parsed);
        }
        return parsedFiles;
    }

    private async sortFiles(files: IFile[]): Promise<IFile[]> {
        let sorted = files;
        for (const sorter of this.sorters) {
            sorted = sorter.sort(files);
        }
        return sorted;
    }
}
