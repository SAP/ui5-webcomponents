import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-progress-indicator";
export default {
    title: "Main/ProgressIndicator",
    component,
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component }),
        },
    },
    argTypes,
};
const Template = (args) => html `<ui5-progress-indicator
        ?disabled="${ifDefined(args.disabled)}"
        ?hide-value="${ifDefined(args.hideValue)}"
        value="${ifDefined(args.value)}"
        display-value="${ifDefined(args.displayValue)}"
        value-state="${ifDefined(args.valueState)}"
        style="${ifDefined(args.style)}"
    ></ui5-progress-indicator>`;
export const Basic = Template.bind({});
Basic.args = {
    value: 25,
};
export const DisplayValue = Template.bind({});
DisplayValue.args = {
    value: 25,
    displayValue: "Custom Display Value",
};
export const CustomSize = Template.bind({});
CustomSize.args = {
    value: 25,
    style: "height: 50px; width: 200px;",
};
export const ValueStates = () => html `
<ui5-progress-indicator
    value-state="None"
    value="25"
></ui5-progress-indicator>
<ui5-progress-indicator
    value-state="Error"
    value="50"
></ui5-progress-indicator>
<ui5-progress-indicator
    value-state="Warning"
    value="75"
></ui5-progress-indicator>
<ui5-progress-indicator
    value-state="Success"
    value="90"
></ui5-progress-indicator>
<ui5-progress-indicator
    value-state="Information"
    value="100"
></ui5-progress-indicator>
`;
//# sourceMappingURL=ProgressIndicator.stories.js.map