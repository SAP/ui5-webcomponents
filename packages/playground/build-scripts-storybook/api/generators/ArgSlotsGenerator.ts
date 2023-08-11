import type { IComponentParsedAPI, IComponentSlot } from "../ApiReader";
import type { IGenerator } from "./ArgGenerator";
import type { InputType as IArgType, SBType } from "@storybook/types";

class ArgSlotsGenerator implements IGenerator {
    isMatch(dataParsed: IComponentParsedAPI): boolean {
        return dataParsed.apiType === "slots";
    }
    generate(dataParsed: IComponentSlot): IArgType {
        return {
            type: dataParsed.type as unknown as SBType,
            description: dataParsed.description,
            control: {
                type: "text"
            },
            table: {
                category: "Slots",
            }
        };
    }
}

export {
    ArgSlotsGenerator,
}
