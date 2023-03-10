import type {
    IApiReader,
    IComponentAPI,
    IComponentData,
    IComponentProperty,
} from "../ApiReader";
import { InputType as IArgType } from "@storybook/types";
import { ArgGenerator } from "./ArgGenerator";

export class ArgPropertiesGenerator extends ArgGenerator {
    public fieldName = "properties";

    protected extractData(componentApi: IComponentData): IComponentAPI[] {
        return componentApi.properties;
    }

    protected parseData(
        properties: IComponentProperty[],
        apiReader: IApiReader
    ): Record<string, IArgType> {
        const result: Record<string, IArgType> = {};
        if (!properties) {
            return result;
        }

        properties.forEach((property) => {
            if (property.visibility === "public") {
                const typeEnum = apiReader.findApi(property.type);
                if (property.readonly) {
                    result[property.name] = {
                        control: {
                            type: false,
                        },
                    };
                } else if (Array.isArray(typeEnum?.properties)) {
                    result[property.name] = {
                        control: "select",
                        options: typeEnum.properties.map((a) => a.type),
                    };
                }
            }
        });

        return result;
    }
}
