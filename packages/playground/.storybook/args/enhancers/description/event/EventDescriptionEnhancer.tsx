import { ArgType } from "../../../types";
import { DescriptionEnhancer } from "../DescriptionEnhancer";

export class EventDescriptionEnhancer extends DescriptionEnhancer {
    public isMatch = (argsType: ArgType): boolean => {
        return argsType?.table?.category === "events";
    };
}