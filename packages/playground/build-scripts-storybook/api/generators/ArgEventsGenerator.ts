import type { IComponentMethod } from "../ApiReader";
import { ArgGenerator } from "./ArgGenerator";
import { InputType as IArgType } from "@storybook/types";

export class ArgEventsGenerator extends ArgGenerator {
    public fieldName = "events";

    protected parseData(events: IComponentMethod[]): Record<string, IArgType> {
        const result: Record<string, any> = {};

        if (!events) {
            return result;
        }

        events.forEach((event) => {
            if (event.visibility === "public") {
                result[event.name] = {
                    description: event.description,
                    table: {
                        category: this.fieldName,
                    },
                };

                result[event.name].UI5CustomData =
                    this.parseUI5CustomData(event);
            }
        });

        return result;
    }
}
