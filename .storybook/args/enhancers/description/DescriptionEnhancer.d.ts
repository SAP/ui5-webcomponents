import { IArgTypeEnhancer, ArgType, IDescriptionRenderer } from "../../types";
export declare class DescriptionEnhancer implements IArgTypeEnhancer {
    constructor(renderer: IDescriptionRenderer);
    private renderer;
    isMatch: (argsType: ArgType) => boolean;
    enhance(argsType: ArgType): ArgType;
}
