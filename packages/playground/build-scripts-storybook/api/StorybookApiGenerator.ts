import path from "path";

import { ApiReader } from "./ApiReader";
import { StoryArgTypesGenerator } from "./StoryArgTypesGenerator";
import { StoryArgTypesWriter } from "./StoryArgTypesWriter";
import { StoryReader } from "./StoryReader";

import type { IApiReader } from "./ApiReader";
import type { IStoryArgTypesGenerator } from "./StoryArgTypesGenerator";
import type { IStoryArgTypesWriter } from "./StoryArgTypesWriter";
import type { IStoryReader } from "./StoryReader";

interface IStorybookApiGenerator {
    generate(
        apiJsonFiles: string[],
        storiesFiles: string[],
        directory: string
    ): Promise<void>;
}

class StorybookApiGenerator implements IStorybookApiGenerator {
    private apiReader: IApiReader;
    private storyReader: IStoryReader;
    private storyArgTypesGenerator: IStoryArgTypesGenerator;
    private storyArgTypesWriter: IStoryArgTypesWriter;

    constructor(
        apiReader = new ApiReader(),
        storyReader = new StoryReader(),
        storyArgTypesGenerator = new StoryArgTypesGenerator(),
        storyArgTypesWriter = new StoryArgTypesWriter()
    ) {
        this.apiReader = apiReader;
        this.storyReader = storyReader;
        this.storyArgTypesGenerator = storyArgTypesGenerator;
        this.storyArgTypesWriter = storyArgTypesWriter;
    }

    async generate(
        apiJsonFiles: string[],
        storiesFiles: string[],
        directory: string
    ) {
        await this.apiReader.readApiFiles(apiJsonFiles);
        await this.storyReader.readStories(storiesFiles);

        const stories = this.storyReader.getStories();
        this.storyArgTypesGenerator.generateArgTypes(this.apiReader, stories);

        await this.storyArgTypesWriter.writeArgTypes(
            directory,
            this.apiReader,
            this.storyReader,
            this.storyArgTypesGenerator
        );
    }
}

export { StorybookApiGenerator };
