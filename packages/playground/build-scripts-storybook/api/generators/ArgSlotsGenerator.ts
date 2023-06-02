import { IApiReader, IComponentParsedAPI } from "../ApiReader";
import { IGenerator } from "./ArgGenerator";
import type { InputType as IArgType } from "@storybook/types";

class ArgSlotsGenerator implements IGenerator {
    isMatch(dataParsed: IComponentParsedAPI): boolean {
        return dataParsed.fieldName === "slots";
    }
    generate(dataParsed: IComponentParsedAPI): IArgType {
        return {
            table: {
                type: {
                    summary: "Slot",
                },
                defaultValue: {
                    summary: dataParsed.name,
                },
            },
        };
    }
}

export {
    ArgSlotsGenerator,
}
