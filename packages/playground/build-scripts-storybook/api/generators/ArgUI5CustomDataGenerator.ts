import type { IComponentParsedAPI } from "../ApiReader";
import type { IGenerator } from "./ArgGenerator";
import type { InputType as IArgType } from "@storybook/types";

class ArgUI5CustomDataGenerator implements IGenerator {
    isMatch(dataParsed: IComponentParsedAPI): boolean {
        return ['methods', 'events'].includes(dataParsed.apiType);
    }
    generate(dataParsed: IComponentParsedAPI): IArgType {
        return {
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
