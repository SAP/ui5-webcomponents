import { IComponentParsedAPI } from "../ApiReader";
import { IGenerator } from "./ArgGenerator";
import type { InputType as IArgType } from "@storybook/types";

class ArgSlotsGenerator implements IGenerator {
    isMatch(dataParsed: IComponentParsedAPI): boolean {
        return dataParsed.apiType === "slots";
    }
    generate(dataParsed: IComponentParsedAPI): IArgType {
        return {
            "control": {
                "type": "text"
            }
        };
    }
}

export {
    ArgSlotsGenerator,
}
