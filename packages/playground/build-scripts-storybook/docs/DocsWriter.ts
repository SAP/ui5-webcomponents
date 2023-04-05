import path from "path";
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
export class DocsWriter implements IDocsWriter {
    private dest: string;
    private directoryUtils: IDirectoryUtils;

    constructor(options: IDocsWriterOptions) {
        this.directoryUtils = options.directoryUtils;
        this.dest = options.dest;
    }

    public async write(files: IFile[]): Promise<void> {
        if (files.length === 0) {
            throw new Error("No files to write");
        }

        if (!this.dest) {
            throw new Error("No destination path provided");
        }

        for (const file of files) {
            const filePath = path.join(this.dest, file.path);
            await this.directoryUtils.assureDirectoryExistence(filePath);
            await this.directoryUtils.writeFile(filePath, file.content);
        }
    }

    public clean(): Promise<void> {
        return this.directoryUtils.cleanDirectory(this.dest);
    }
}
