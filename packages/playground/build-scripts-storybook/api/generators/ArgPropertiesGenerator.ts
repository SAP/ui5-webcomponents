import type { IApiReader, IComponentParsedAPI, IComponentProperty } from "../ApiReader";
import type { IGenerator } from "./ArgGenerator";
import type { InputType as IArgType, SBType } from "@storybook/types";

const DEFAULT_CONTROL = "text";

const TYPE_TO_CONTROL_MAP = new Map<string, string>([
    ["boolean", "boolean"],
    ["string", "text"],
    ["integer", "number"],
    ["float", "number"],
    ["object", "object"]
]);
class ArgPropertiesGenerator implements IGenerator {
    isMatch(dataParsed: IComponentParsedAPI): boolean {
        return dataParsed.apiType === "properties";
    }
    generate(dataParsed: IComponentProperty, apiReader: IApiReader): IArgType {
        // if type is another module, then we need to find it
        const typeEnum = apiReader.findApi(dataParsed.type);

        let result: IArgType = {
            type: dataParsed.type as unknown as SBType,
            control: { type: TYPE_TO_CONTROL_MAP.get(dataParsed.type?.toLowerCase()) || DEFAULT_CONTROL },
            description: dataParsed.description,
            table: {
                category: "Properties",
                defaultValue: { summary: dataParsed.defaultValue },
            },
        }

        if (dataParsed.readonly) {
            result.control.type = false;
        } else if (Array.isArray(typeEnum?.properties)) {
            // if type is and enum, we use the select control
            result = {
                ...result,
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
