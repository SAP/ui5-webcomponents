import { IApiReader, IComponentParsedAPI } from "../ApiReader";
import { IGenerator } from "./ArgGenerator";
import type { InputType as IArgType } from "@storybook/types";

class ArgMethodsGenerator implements IGenerator {
    isMatch(dataParsed: IComponentParsedAPI): boolean {
        return dataParsed.fieldName === "methods";
    }
    generate(dataParsed: IComponentParsedAPI, accumulator: IArgType = {}): IArgType {
        if (this.isMatch(dataParsed)) {
            return {
                ...accumulator[dataParsed.name],
                description: dataParsed.description,
                table: {
                    category: "Methods",
                },
            };
        }

        return accumulator;
    }
}

export {
    ArgMethodsGenerator,
}
