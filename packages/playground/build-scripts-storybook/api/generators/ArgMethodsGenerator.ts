import type {
    IComponentAPI,
    IComponentData,
    IComponentMethod,
} from "../ApiReader";
import { ArgGenerator } from "./ArgGenerator";
import { InputType as IArgType } from "@storybook/types";

export class ArgMethodsGenerator extends ArgGenerator {
    public fieldName = "methods";

    protected extractData(componentApi: IComponentData): IComponentAPI[] {
        return componentApi.methods;
    }

    protected parseData(methods: IComponentMethod[]): Record<string, IArgType> {
        const result: Record<string, any> = {};

        if (!methods) {
            return result;
        }

        methods.forEach((method) => {
            if (method.visibility === "public") {
                result[method.name] = {
                    table: {
                        category: "methods",
                    },
                };
            }
        });

        return result;
    }
}
