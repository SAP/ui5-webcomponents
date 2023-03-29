import { ArgTypes } from "@storybook/types";
import { IArgTypeEnhancer, ArgType } from "../types";
import {
    EventDescriptionEnhancer,
    EventDescriptionRenderer,
    MethodDescriptionEnhancer,
    MethodDescriptionRenderer,
} from "./description";

type Args = Partial<ArgTypes<any>>;

class ArgTypeDescriptionEnhancer {
    constructor(enhancers: IArgTypeEnhancer[]) {
        this.enhancers = enhancers;
    }

    private enhancers: IArgTypeEnhancer[] = [];

    private applyEnhancers(argsType: ArgType): ArgType {
        let result = argsType;
        for (const enhancer of this.enhancers) {
            if (enhancer.isMatch(argsType)) {
                result = enhancer.enhance(argsType);
                break;
            }
        }
        return result;
    }

    public enhanceArgTypesDescriptions(args: Args): Args {
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

export const enhanceArgTypesDescriptions = (args: Args) => {
    const enhancedArgs = enhancer.enhanceArgTypesDescriptions(args);
    return enhancedArgs;
};
