import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Progress Indicator",
    component: "ProgressIndicator",
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
export const Customised = Template.bind({});
Customised.args = {
    value: 25,
    displayValue: "Custom Display Value",
    style: "height: 50px; width: 200px;",
};
//# sourceMappingURL=ProgressIndicator.stories.js.map