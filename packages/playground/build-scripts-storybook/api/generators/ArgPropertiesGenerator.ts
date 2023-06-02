import { IApiReader, IComponentParsedAPI, IComponentProperty } from "../ApiReader";
import { IGenerator } from "./ArgGenerator";
import type { InputType as IArgType } from "@storybook/types";

class ArgPropertiesGenerator implements IGenerator {
    isMatch(dataParsed: IComponentParsedAPI): boolean {
        return dataParsed.fieldName === "properties";
    }
    generate(dataParsed: IComponentProperty, apiReader: IApiReader): IArgType {
        let result = {};
        const typeEnum = apiReader.findApi(dataParsed.type);

        if (dataParsed.readonly) {
            result = {
                control: {
                    type: false,
                },
            };
        } else if (Array.isArray(typeEnum?.properties)) {
            result = {
                control: "select",
                options: typeEnum.properties.map((a) => a.type),
            };
        }

        return result;
    }
}

export {
    ArgPropertiesGenerator,
}
