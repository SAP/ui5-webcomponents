import { JSXToHtmlString } from "../EnhancerUtils";
export class DescriptionEnhancer {
    constructor(renderer) {
        this.isMatch = (argsType) => {
            return false;
        };
        this.renderer = renderer;
    }
    enhance(argsType) {
        const description = argsType.description || "";
        const descriptionElement = this.renderer.render(argsType.UI5CustomData);
        // we don't parse the props.description as it already contains HTML
        argsType.description =
            description + JSXToHtmlString(descriptionElement);
        delete argsType.UI5CustomData;
        return argsType;
    }
}
//# sourceMappingURL=DescriptionEnhancer.js.map