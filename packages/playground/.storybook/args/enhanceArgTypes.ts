import type { Renderer, StoryContextForEnhancers } from "@storybook/types";
import { combineParameters } from "@storybook/preview-api";
import { enhanceArgTypesDescriptions } from "./enhancers/enhanceArgTypesDescriptions";

export const enhanceArgTypes = <TRenderer extends Renderer>(
    context: StoryContextForEnhancers<TRenderer>
) => {
    const {
        component,
        argTypes: userArgTypes,
        parameters: { docs = {} },
    } = context;

    const { extractArgTypes } = docs;

    // from custom-elements.json
    const extractedArgTypes =
        extractArgTypes && component ? extractArgTypes(component) : {};

    // combine with user defined argTypes
    const withExtractedTypes = extractedArgTypes
        ? (combineParameters(
              extractedArgTypes,
              userArgTypes
          ) as typeof userArgTypes)
        : userArgTypes;

    Object.keys(withExtractedTypes)
    .filter(key => key.startsWith("_ui5"))
    .forEach(argType => {
        withExtractedTypes[argType].name = withExtractedTypes[argType].name.replaceAll("_ui5", "");

        withExtractedTypes[argType].control = "text"
    })

    // enhance descriptions
    enhanceArgTypesDescriptions(withExtractedTypes);
    return withExtractedTypes;
};
