import { IApiReader, IComponentParsedAPI } from "../ApiReader";
import { IGenerator } from "./ArgGenerator";
import type { InputType as IArgType } from "@storybook/types";

class ArgUI5CustomDataGenerator implements IGenerator {
    isMatch(dataParsed: IComponentParsedAPI): boolean {
        return ['methods', 'events'].includes(dataParsed.fieldName);
    }
    generate(dataParsed: IComponentParsedAPI, accumulator: IArgType = {}): IArgType {
        return {
            ...accumulator[dataParsed.name],
            UI5CustomData: {
                // if dataParsed.parameters is undefined, then it will be ignored
                ...(dataParsed.parameters ? { parameters: dataParsed.parameters } : {}),
                // if dataParsed.returnValues is undefined, then it will be ignored
                ...(dataParsed.returnValue ? { returnValues: dataParsed.returnValue } : {}),
            },
        };
    }
}

export {
    ArgUI5CustomDataGenerator,
}
