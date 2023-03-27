import { promises as fsPromises } from "fs";
import path from "path";
import glob from "glob";

export interface IDirectoryUtils {
    assureDirectoryExistence(filePath: string): Promise<string | void>;
    cleanDirectory(dir: string): Promise<void>;
    readFiles(src: string, ignore: string[]): Promise<string[]>;
    writeFile(filePath: string, content: string): Promise<void>;
    getRelativePath(filePath: string, globStr: string): string;
    readContent(filePath: string): Promise<string>;
    resolvePath(filePath: string): string;
}

export class DirectoryUtils implements IDirectoryUtils {
    public async assureDirectoryExistence(
        filePath: string
    ): Promise<string | void> {
        if (!filePath) {
            throw new Error("No file path provided");
        }

        try {
            const dir = path.dirname(filePath);
            await fsPromises.mkdir(dir, { recursive: true });
        } catch (error: any) {
            // if the directory already exists, we don't need to create it
            if (error.code !== "EEXIST") {
                throw error;
            }
        }

        return Promise.resolve();
    }

    public async cleanDirectory(dir: string): Promise<void> {
        if (!dir) {
            throw new Error("No directory path provided");
        }

        try {
            await fsPromises.rm(dir, { recursive: true });
        } catch (error: any) {
            // if the directory does not exist, we don't need to clean it
            if (error.code !== "ENOENT") {
                throw error;
            }
        }

        return Promise.resolve();
    }

    public async readFiles(
        src: string,
        ignore: string[] = []
    ): Promise<string[]> {
        if (!src) {
            throw new Error("No source path provided");
        }

        // this src is a regex, e.g. ../../../docs/**/*
        const files = await new Promise<string[]>((resolve, reject) => {
            glob(src, { absolute: false, ignore }, (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });

        return files;
    }

    public async writeFile(filePath: string, content: string): Promise<void> {
        if (!filePath) {
            throw new Error("No file path provided");
        }
        if (!content) {
            throw new Error("No content provided");
        }

        await fsPromises.writeFile(filePath, content);
    }

    public getRelativePath(filePath: string, globStr: string): string {
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

    public async readContent(filePath: string): Promise<string> {
        if (!filePath) {
            throw new Error("No file path provided");
        }
        const content = await fsPromises.readFile(filePath, "utf8");
        return content;
    }

    public resolvePath(filePath: string): string {
        if (!filePath) {
            throw new Error("No file path provided");
        }
        return path.join(__dirname, filePath);
    }
}
