import { DescriptionEnhancer } from "../DescriptionEnhancer";
export class EventDescriptionEnhancer extends DescriptionEnhancer {
    constructor() {
        super(...arguments);
        this.isMatch = (argsType) => {
            return argsType?.table?.category === "events";
        };
    }
}
//# sourceMappingURL=EventDescriptionEnhancer.js.map