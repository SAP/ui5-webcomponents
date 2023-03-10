import fs from "fs/promises";
import path from "path";

export interface IStoryReader {
    readStories(directories: string[]): Promise<void[]>;
    getStories(): string[];
    getPackages(): Record<string, string[]>;
}

export class StoryReader implements IStoryReader {
    private stories: Record<string, string[]>;

    constructor() {
        this.stories = {};
    }

    public async readStories(directories: string[]) {
        if (!directories || !directories.length) {
            throw new Error("Directories are required");
        }

        const promises = directories.map(async (directory: string) => {
            const storiesFolders = await fs.readdir(directory);
            const packageName = directory.split(path.sep).at(-1);

            if (!packageName) {
                throw new Error("Package name is required");
            }

            this.stories[packageName] = storiesFolders;
        });

        return Promise.all(promises);
    }

    public getStories() {
        return Object.values(this.stories).flat();
    }

    public getPackages() {
        return this.stories;
    }
}
