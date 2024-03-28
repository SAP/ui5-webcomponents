import { promises as fsPromises } from "fs";
import path from "path";
import glob from "glob";
/**
 * This class is responsible for reading and writing files to the file system.
 * It also provides some utility methods for working with file paths.
 */
export class DirectoryUtils {
    async assureDirectoryExistence(directory) {
        if (!directory) {
            throw new Error("No file path provided");
        }
        try {
            const dir = path.dirname(directory);
            await fsPromises.mkdir(dir, { recursive: true });
        }
        catch (error) {
            // if the directory already exists, we don't need to create it
            if (error.code !== "EEXIST") {
                throw error;
            }
        }
        return Promise.resolve();
    }
    async cleanDirectory(directory) {
        if (!directory) {
            throw new Error("No directory path provided");
        }
        try {
            await fsPromises.rm(directory, { recursive: true });
        }
        catch (error) {
            // if the directory does not exist, we don't need to clean it
            if (error.code !== "ENOENT") {
                throw error;
            }
        }
        return Promise.resolve();
    }
    async readFiles(src, ignore = []) {
        if (!src) {
            throw new Error("No source path provided");
        }
        const config = {
            absolute: false,
            ignore: ignore.map((pattern) => path.resolve(pattern)),
        };
        // this src is a regex, e.g. ../../../docs/**/*
        const files = await new Promise((resolve, reject) => {
            const onDone = (err, files) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(files);
                }
            };
            glob(src, config, onDone);
        });
        return files;
    }
    async writeFile(filePath, content) {
        if (!filePath) {
            throw new Error("No file path provided");
        }
        if (!content) {
            throw new Error("No content provided");
        }
        await fsPromises.writeFile(filePath, content);
    }
    globToRelativePath(globStr, filePath) {
        if (!filePath) {
            throw new Error("No file path provided");
        }
        if (!globStr) {
            throw new Error("No glob string provided");
        }
        // globStr is a regex, e.g. ../../../docs/**/*
        // filePath is a path, e.g. ../../../docs/help/README.md
        // the result should be ./help/README.md
        // substring the globStr to get the path without the glob pattern
        const globPath = globStr.substring(0, globStr.indexOf("*"));
        // substring the filePath to get the path without the glob pattern
        const filePathWithoutGlob = filePath.substring(globPath.length);
        return path.join(".", filePathWithoutGlob);
    }
    async readContent(filePath) {
        if (!filePath) {
            throw new Error("No file path provided");
        }
        const content = await fsPromises.readFile(filePath, "utf8");
        return content;
    }
    joinPath(filePath) {
        if (!filePath) {
            throw new Error("No file path provided");
        }
        return path.join(__dirname, filePath);
    }
}
//# sourceMappingURL=DirectoryUtils.js.map