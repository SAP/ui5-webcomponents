import { ArgType } from "../../../types";
import { DescriptionEnhancer } from "../DescriptionEnhancer";

export class MethodDescriptionEnhancer extends DescriptionEnhancer {
    public isMatch = (argsType: ArgType): boolean => {
        return argsType?.table?.category === "methods";
    };
}
