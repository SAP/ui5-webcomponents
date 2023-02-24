import { ArgTypes } from "@storybook/types";
import { descriptionToHtml } from "./descriptionToHtml";

export const enhanceArgTypesDescriptions = (
    argsTypes: Partial<ArgTypes<any>>
) => {
    Object.keys(argsTypes).forEach((prop) => {
        const types = argsTypes[prop];
        if (types && types.customDescription) {
            types.description = descriptionToHtml(types.customDescription);
            delete types.customDescription;
        }
    });

    return argsTypes;
};
