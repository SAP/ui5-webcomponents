import type { IApiReader, IComponentParsedAPI } from "./ApiReader";
import type { InputType as IArgType } from "@storybook/types";

import type { IGenerator } from "./generators/ArgGenerator";
import { ArgSlotsGenerator } from "./generators/ArgSlotsGenerator";
import { ArgEventsGenerator } from "./generators/ArgEventsGenerator";
import { ArgMethodsGenerator } from "./generators/ArgMethodsGenerator";
import { ArgPropertiesGenerator } from "./generators/ArgPropertiesGenerator";
import { ArgUI5CustomDataGenerator } from "./generators/ArgUI5CustomDataGenerator";

type IArgsTypesResult = Record<string, Record<string, IArgType[]>>
type IArgTypesFields = Record<string, IArgType>;

export interface IStoryArgTypesGenerator {
    generateArgTypes(apiCollection: Map<string, IComponentParsedAPI[]>): void;
    getArgTypes(): IArgsTypesResult;
}

export class StoryArgTypesGenerator implements IStoryArgTypesGenerator {
    private apiReader: IApiReader;
    private argTypes: Record<string, IArgType>;
    private generators: IGenerator[];

    constructor(
        apiReader: IApiReader,
        generators: IGenerator[] = [
            new ArgSlotsGenerator(),
            new ArgEventsGenerator(),
            new ArgMethodsGenerator(),
            new ArgPropertiesGenerator(),
            new ArgUI5CustomDataGenerator(),
        ],
    ) {
        this.apiReader = apiReader;
        this.generators = generators;
        this.argTypes = {};
    }

    public generateArgTypes(apiCollection: Map<string, IComponentParsedAPI[]>): void {
        apiCollection.forEach((api, componentName) => {
            this.argTypes[componentName] = this.generateArgTypesForComponent(api);;
        });
    }

    generateArgTypesForComponent(componentApi: IComponentParsedAPI[]): Record<string, IArgTypesFields> {
        const argTypesComponent: Record<string, IArgTypesFields> = {};

        componentApi.forEach((apiData) => {
            const accumulatedArgs = argTypesComponent[apiData.apiType] || {};

            argTypesComponent[apiData.apiType] = this.generateArgTypesForComponentField(apiData, accumulatedArgs);
        });

        return argTypesComponent;
    }

    private generateArgTypesForComponentField(apiData: IComponentParsedAPI, accumulatedArgs: IArgTypesFields): IArgTypesFields {
        this.generators.forEach((generator) => {
            if (generator.isMatch(apiData)) {
                const args = generator.generate(apiData, this.apiReader);

                // check if empty
                if (Object.keys(args).length > 0) {
                    accumulatedArgs[apiData.name] = {
                        ...accumulatedArgs[apiData.name],
                        ...args,
                    };
                }
            }
        });

        return accumulatedArgs;
    }

    public getArgTypes(): IArgsTypesResult {
        return this.argTypes;
    }
}
