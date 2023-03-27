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

export class DocsReader implements IDocsReader {
    private src: string;
    private ignore: string[];
    private directoryUtils: IDirectoryUtils;

    constructor(options: IDocsReaderOptions) {
        this.src = options.src;
        this.ignore = options.ignore;
        this.directoryUtils = options.directoryUtils;
    }

    public async read(): Promise<IFile[]> {
        if (!this.src) {
            throw new Error("DocsReader: src is not defined");
        }

        const files = await this.directoryUtils.readFiles(
            this.src,
            this.ignore
        );

        const filesPromises = files.map(async (file: string) => {
            const relativePath = this.directoryUtils.getRelativePath(
                file,
                this.src
            );
            const content = await this.directoryUtils.readContent(file);
            return {
                path: relativePath,
                content,
            };
        });

        return Promise.all(filesPromises);
    }
}
