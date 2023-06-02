import { IApiReader, IComponentParsedAPI } from "../ApiReader";
import { IGenerator } from "./ArgGenerator";
import type { InputType as IArgType } from "@storybook/types";

class ArgEventsGenerator implements IGenerator {
    isMatch(dataParsed: IComponentParsedAPI): boolean {
        return dataParsed.fieldName === "events";
    }
    generate(dataParsed: IComponentParsedAPI): IArgType {
        return {
            description: dataParsed.description,
            table: {
                category: "Events",
            },
        };
    }
}

export {
    ArgEventsGenerator,
}