import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
export default {
    title: "Main/TimePicker",
    component: "TimePicker",
    argTypes,
};
const Template = (args) => html `<ui5-time-picker
	value="${ifDefined(args.value)}"
	value-state="${ifDefined(args.valueState)}"
	?disabled="${ifDefined(args.disabled)}"
	?readonly="${ifDefined(args.readonly)}"
	placeholder="${ifDefined(args.placeholder)}"
	format-pattern="${ifDefined(args.formatPattern)}"
>
	${unsafeHTML(args.valueStateMessage)}
</ui5-time-picker>`;
export const Basic = Template.bind({});
export const WithValueState = Template.bind({});
WithValueState.storyName = "Value State and Message";
WithValueState.args = {
    formatPattern: "hh:mm:ss a",
    valueState: ValueState.Error,
    valueStateMessage: `<div slot="valueStateMessage">Please provide valid value</div>`,
};
//# sourceMappingURL=TimePicker.stories.js.map