import { DescriptionEnhancer } from "../DescriptionEnhancer";
export class MethodDescriptionEnhancer extends DescriptionEnhancer {
    constructor() {
        super(...arguments);
        this.isMatch = (argsType) => {
            return argsType?.table?.category === "methods";
        };
    }
}
//# sourceMappingURL=MethodDescriptionEnhancer.js.map