/**
 * This class is responsible for reading the docs from the file system.
 * Requires a source directory and optionally an array of files to ignore.
 * The files are returned as an array of IFile objects.
 * The IFile object contains the path and content of the file.
 */
export class DocsReader {
    constructor(options) {
        this.src = options.src;
        this.ignore = options.ignore;
        this.directoryUtils = options.directoryUtils;
    }
    async read() {
        if (!this.src) {
            throw new Error("DocsReader: src is not defined");
        }
        const files = await this.directoryUtils.readFiles(this.src, this.ignore);
        const filesPromises = files.map(async (file) => {
            const relativePath = this.directoryUtils.globToRelativePath(this.src, file);
            const content = await this.directoryUtils.readContent(file);
            return {
                path: relativePath,
                content,
            };
        });
        return Promise.all(filesPromises);
    }
}
//# sourceMappingURL=DocsReader.js.map