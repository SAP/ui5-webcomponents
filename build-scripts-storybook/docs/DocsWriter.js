import path from "path";
/**
 * This class is responsible for writing the docs to the file system.
 * Requires a destination directory.
 */
export class DocsWriter {
    constructor(options) {
        this.directoryUtils = options.directoryUtils;
        this.dest = options.dest;
    }
    async write(files) {
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
    clean() {
        return this.directoryUtils.cleanDirectory(this.dest);
    }
}
//# sourceMappingURL=DocsWriter.js.map