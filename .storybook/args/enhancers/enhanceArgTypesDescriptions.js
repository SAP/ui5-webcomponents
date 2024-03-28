import { EventDescriptionEnhancer, EventDescriptionRenderer, MethodDescriptionEnhancer, MethodDescriptionRenderer, } from "./description";
class ArgTypeDescriptionEnhancer {
    constructor(enhancers) {
        this.enhancers = [];
        this.enhancers = enhancers;
    }
    applyEnhancers(argsType) {
        let result = argsType;
        for (const enhancer of this.enhancers) {
            if (enhancer.isMatch(argsType)) {
                result = enhancer.enhance(argsType);
                break;
            }
        }
        return result;
    }
    enhanceArgTypesDescriptions(args) {
        for (const prop in args) {
            const type = args[prop];
            if (type && type.UI5CustomData) {
                args[prop] = this.applyEnhancers(type);
            }
        }
        return args;
    }
}
const enhancers = [
    new EventDescriptionEnhancer(new EventDescriptionRenderer()),
    new MethodDescriptionEnhancer(new MethodDescriptionRenderer()),
];
const enhancer = new ArgTypeDescriptionEnhancer(enhancers);
export const enhanceArgTypesDescriptions = (args) => {
    const enhancedArgs = enhancer.enhanceArgTypesDescriptions(args);
    return enhancedArgs;
};
//# sourceMappingURL=enhanceArgTypesDescriptions.js.map