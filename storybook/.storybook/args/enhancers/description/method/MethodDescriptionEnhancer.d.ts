import { ArgType } from "../../../types";
import { DescriptionEnhancer } from "../DescriptionEnhancer";
export declare class MethodDescriptionEnhancer extends DescriptionEnhancer {
    isMatch: (argsType: ArgType) => boolean;
}
