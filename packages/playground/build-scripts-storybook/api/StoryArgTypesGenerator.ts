import type { IApiReader } from "./ApiReader";
import type { IGenerator } from "./generators/ArgGenerator";
import type { InputType as IArgType } from "@storybook/types";

import { ArgPropertiesGenerator } from "./generators/ArgPropertiesGenerator";
import { ArgSlotsGenerator } from "./generators/ArgSlotsGenerator";
import { ArgMethodsGenerator } from "./generators/ArgMethodsGenerator";

export interface IStoryArgTypesGenerator {
    generateArgTypes(apiReader: IApiReader, stories: string[]): void;
    getArgTypes(): Record<string, IArgType>;
}

export class StoryArgTypesGenerator implements IStoryArgTypesGenerator {
    private argTypes: Record<string, IArgType>;
    private generators: IGenerator[];

    constructor(
        generators: IGenerator[] = [
            new ArgSlotsGenerator(),
            new ArgPropertiesGenerator(),
            new ArgMethodsGenerator(),
        ]
    ) {
        this.generators = generators;
        this.argTypes = {};
    }

     private generate(componentName: string, apiReader: IApiReader): IArgType {
        const result: Record<string, IArgType> = {};

        this.generators.forEach((generator) => {
            const data = generator.generate(componentName, apiReader);
            result[generator.fieldName] = data;
        });

        return result;
    }

    public generateArgTypes(apiReader: IApiReader, stories: string[]) {
        stories.forEach((storyName) => {
            this.argTypes[storyName] = this.generate(
                storyName,
                apiReader
            );
        });
    }

    public getArgTypes(): Record<string, IArgType> {
        return this.argTypes;
    }
}
