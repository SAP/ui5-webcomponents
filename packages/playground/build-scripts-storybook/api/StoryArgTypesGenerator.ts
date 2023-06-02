import type { IApiReader, IComponentParsedAPI } from "./ApiReader";
import type { InputType as IArgType } from "@storybook/types";

import { IGenerator } from "./generators/ArgGenerator";
import { ArgSlotsGenerator } from "./generators/ArgSlotsGenerator";
import { ArgEventsGenerator } from "./generators/ArgEventsGenerator";
import { ArgMethodsGenerator } from "./generators/ArgMethodsGenerator";
import { ArgPropertiesGenerator } from "./generators/ArgPropertiesGenerator";
import { ArgUI5CustomDataGenerator } from "./generators/ArgUI5CustomDataGenerator";

type IArgsTypesResult = Record<string, Record<string, IArgType[]>>
type IArgTypesFields = Record<string, IArgType>;

export interface IStoryArgTypesGenerator {
    generateArgTypes(data: Map<string, IComponentParsedAPI[]>): void;
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

    public generateArgTypes(dataCollection: Map<string, IComponentParsedAPI[]>): void {
        dataCollection.forEach((apiCollection, componentName) => {
            this.argTypes[componentName] = this.generateArgTypesForComponent(apiCollection);;
        });
    }

    generateArgTypesForComponent(apiCollection: IComponentParsedAPI[]): Record<string, IArgTypesFields> {
        const argTypesComponent: Record<string, IArgTypesFields> = {};

        apiCollection.forEach((data) => {
            const fields = argTypesComponent[data.fieldName] || {};

            argTypesComponent[data.fieldName] = this.generateArgTypesForComponentField(data, fields);;
        });

        return argTypesComponent;
    }

    private generateArgTypesForComponentField(data: IComponentParsedAPI, fields: IArgTypesFields): IArgTypesFields {
        this.generators.forEach((generator) => {
            if (generator.isMatch(data)) {
                fields[data.name] = {
                    ...fields[data.name],
                    ...generator.generate(data, fields[data.name], this.apiReader),
                };
            }
        });

        return fields;
    }

    public getArgTypes(): IArgsTypesResult {
        return this.argTypes;
    }
}
