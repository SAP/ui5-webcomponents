import type { IApiReader, IComponentData, IComponentSlot } from "../ApiReader";
import { ArgGenerator, IGenerator } from "./ArgGenerator";
import { InputType as IArgType } from "@storybook/types";

export class ArgSlotsGenerator extends ArgGenerator {
    public fieldName = "slots";

    protected extractData(componentApi: IComponentData): IComponentSlot[] {
        return componentApi.slots;
    }

    protected parseData(slots: IComponentSlot[]): Record<string, IArgType> {
        const result: Record<string, IArgType> = {};
        if (!slots) {
            return {};
        }

        slots.forEach((slot) => {
            result[slot.name] = {
                table: {
                    type: {
                        summary: "Slot",
                    },
                    defaultValue: {
                        summary: slot.name,
                    },
                },
            };
        });

        return result;
    }
}
