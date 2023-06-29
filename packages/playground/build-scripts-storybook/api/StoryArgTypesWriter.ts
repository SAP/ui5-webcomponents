import fs from "fs/promises";
import path from "path";

import type { IApiReader } from "./ApiReader";
import type { IStoryArgTypesGenerator } from "./StoryArgTypesGenerator";
import type { IStoryReader } from "./StoryReader";
import type { InputType as IArgType } from "@storybook/types";

export interface IStoryArgTypesWriter {
    writeArgTypes(
        directory: string,
        apiReader: IApiReader,
        storyReader: IStoryReader,
        storyArgTypesGenerator: IStoryArgTypesGenerator
    ): Promise<void[]>;
}

export class StoryArgTypesWriter implements IStoryArgTypesWriter {
    private static readonly STORIES_WRITE_FILE_NAME = "argTypes.ts";

    public writeArgTypes(
        directory: string,
        apiReader: IApiReader,
        storyReader: IStoryReader,
        storyArgTypesGenerator: IStoryArgTypesGenerator
    ): Promise<void[]> {
        const packages = storyReader.getPackages();
        const argTypes = storyArgTypesGenerator.getArgTypes();

        const promises = Object.entries(packages).map(async ([packageName, stories]) => {
            for (const story of stories) {
                const storyPath = path.join(directory, packageName, story, StoryArgTypesWriter.STORIES_WRITE_FILE_NAME);
                const content = this.generateFile(apiReader, story, argTypes);
                this.writeFile(storyPath, content, story);
            }
        });

        return Promise.all(promises);
    }

    private generateFile(
        apiReader: IApiReader,
        story: string,
        argTypes: Record<string, Record<string, IArgType[]>>
    ): string {
        if (!argTypes[story]) {
            throw new Error(`No argTypes found for story ${story}`);
        }

        const { properties, methods, slots = {}, events = {} } = argTypes[story];
        const slotNames = Object.keys(slots);

        const info = JSON.stringify(apiReader.findInfo(story), null, 4);
        const args = JSON.stringify({ ...properties, ...methods, ...slots, ...events }, null, 4);

        const content = `export default ${args};
export const componentInfo = ${info};
export type StoryArgsSlots = {
${slotNames.map((slotName) => `    ${slotName}: string;`).join("\n")}
}`;
        return content;
    }

    async writeFile(path: string, data: string, story: string) {
        try {
            await fs.writeFile(path, data);
            console.log(`File ${story}/argType.ts written successfully`);
        } catch (err) {
            console.error(err);
        }
    }
}
