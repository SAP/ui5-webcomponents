import { ArgType } from "../../../types";
import { DescriptionEnhancer } from "../DescriptionEnhancer";
export declare class EventDescriptionEnhancer extends DescriptionEnhancer {
    isMatch: (argsType: ArgType) => boolean;
}
