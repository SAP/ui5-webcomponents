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
export declare class DocsGenerator implements IDocsGenerator {
    private reader;
    private writer;
    private parsers;
    private sorters;
    constructor(options: IDocsGeneratorOptions);
    generate(): Promise<void>;
    private parseFiles;
    private sortFiles;
}
export {};
