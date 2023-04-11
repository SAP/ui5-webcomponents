import { IArgTypeEnhancer, ArgType, IDescriptionRenderer } from "../../types";
import { JSXToHtmlString } from "../EnhancerUtils";

export class DescriptionEnhancer implements IArgTypeEnhancer {
    constructor(renderer: IDescriptionRenderer) {
        this.renderer = renderer;
    }

    private renderer: IDescriptionRenderer;

    public isMatch = (argsType: ArgType): boolean => {
        return false;
    };

    public enhance(argsType: ArgType): ArgType {
        const description = argsType.description || "";
        const descriptionElement = this.renderer.render(argsType.UI5CustomData);
        // we don't parse the props.description as it already contains HTML
        argsType.description =
            description + JSXToHtmlString(descriptionElement);
        delete argsType.UI5CustomData;
        return argsType;
    }
}
