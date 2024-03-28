import type { IDirectoryUtils } from "../DirectoryUtils";
import type { IFile } from "./DocsGenerator";
export interface IDocsWriter {
    write(files: IFile[]): Promise<void>;
    clean(): Promise<void>;
}
interface IDocsWriterOptions {
    dest: string;
    directoryUtils: IDirectoryUtils;
}
/**
 * This class is responsible for writing the docs to the file system.
 * Requires a destination directory.
 */
export declare class DocsWriter implements IDocsWriter {
    private dest;
    private directoryUtils;
    constructor(options: IDocsWriterOptions);
    write(files: IFile[]): Promise<void>;
    clean(): Promise<void>;
}
export {};
