import type { IDirectoryUtils } from "../DirectoryUtils";
import type { IFile } from "./DocsGenerator";
export interface IDocsReader {
    read(): Promise<IFile[]>;
}
interface IDocsReaderOptions {
    src: string;
    ignore: string[];
    directoryUtils: IDirectoryUtils;
}
/**
 * This class is responsible for reading the docs from the file system.
 * Requires a source directory and optionally an array of files to ignore.
 * The files are returned as an array of IFile objects.
 * The IFile object contains the path and content of the file.
 */
export declare class DocsReader implements IDocsReader {
    private src;
    private ignore;
    private directoryUtils;
    constructor(options: IDocsReaderOptions);
    read(): Promise<IFile[]>;
}
export {};
