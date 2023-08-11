import type { IComponentParsedAPI } from "../ApiReader";
import type { IGenerator } from "./ArgGenerator";
import type { InputType as IArgType } from "@storybook/types";

class ArgEventsGenerator implements IGenerator {
    isMatch(dataParsed: IComponentParsedAPI): boolean {
        return dataParsed.apiType === "events";
    }
    generate(dataParsed: IComponentParsedAPI): IArgType {
        return {
            control: false,
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