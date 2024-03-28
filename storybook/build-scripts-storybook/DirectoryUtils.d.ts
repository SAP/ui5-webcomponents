export interface IDirectoryUtils {
    assureDirectoryExistence(filePath: string): Promise<string | void>;
    cleanDirectory(dir: string): Promise<void>;
    readFiles(src: string, ignore?: string[]): Promise<string[]>;
    writeFile(filePath: string, content: string): Promise<void>;
    globToRelativePath(globStr: string, filePath: string): string;
    readContent(filePath: string): Promise<string>;
    joinPath(filePath: string): string;
}
/**
 * This class is responsible for reading and writing files to the file system.
 * It also provides some utility methods for working with file paths.
 */
export declare class DirectoryUtils implements IDirectoryUtils {
    assureDirectoryExistence(directory: string): Promise<string | void>;
    cleanDirectory(directory: string): Promise<void>;
    readFiles(src: string, ignore?: string[]): Promise<string[]>;
    writeFile(filePath: string, content: string): Promise<void>;
    globToRelativePath(globStr: string, filePath: string): string;
    readContent(filePath: string): Promise<string>;
    joinPath(filePath: string): string;
}
