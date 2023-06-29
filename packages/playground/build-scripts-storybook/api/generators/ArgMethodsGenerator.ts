import { IApiReader, IComponentParsedAPI } from "../ApiReader";
import { IGenerator } from "./ArgGenerator";
import type { InputType as IArgType } from "@storybook/types";

class ArgMethodsGenerator implements IGenerator {
    isMatch(dataParsed: IComponentParsedAPI): boolean {
        return dataParsed.apiType === "methods";
    }
    generate(dataParsed: IComponentParsedAPI): IArgType {
        return {
            description: dataParsed.description,
            table: {
                category: "Methods",
            },
        };
    }
}

export {
    ArgMethodsGenerator,
}
