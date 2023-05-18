import type { IComponentMethod } from "../ApiReader";
import { ArgGenerator } from "./ArgGenerator";
import { InputType as IArgType } from "@storybook/types";

export class ArgMethodsGenerator extends ArgGenerator {
    public fieldName = "methods";

    protected parseData(methods: IComponentMethod[]): Record<string, IArgType> {
        const result: Record<string, any> = {};

        if (!methods) {
            return result;
        }

        methods.forEach((method) => {
            if (method.visibility === "public") {
                result[method.name] = {
                    description: method.description,
                    table: {
                        category: this.fieldName,
                    },
                };

                result[method.name].UI5CustomData =
                    this.parseUI5CustomData(method);
            }
        });

        return result;
    }
}
