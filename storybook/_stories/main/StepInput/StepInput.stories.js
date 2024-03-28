import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/StepInput",
    component: "StepInput",
    argTypes,
};
const Template = (args) => html `
<div style="max-width: 13rem">
	<ui5-step-input
		value="${ifDefined(args.value)}"
		value-state="${ifDefined(args.valueState)}"
		value-precision="${ifDefined(args.valuePrecision)}"
		min="${ifDefined(args.min)}"
		max="${ifDefined(args.max)}"
		step="${ifDefined(args.step)}"
		?required="${ifDefined(args.required)}"
		?readonly="${ifDefined(args.readonly)}"
		?disabled="${ifDefined(args.disabled)}"
		placeholder="${ifDefined(args.placeholder)}"
		name="${ifDefined(args.name)}"
		accessible-name="${ifDefined(args.accessibleName)}"
		accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
		id="${ifDefined(args.id)}"
		style="${ifDefined(args.style)}"
	>
		${unsafeHTML(args.valueStateMessage)}
	</ui5-step-input>
</div>`;
export const Basic = Template.bind({});
Basic.args = {
    value: 5,
};
export const DifferentValueStates = () => html `
	<div style="max-width: 13rem"> <ui5-step-input value-state="Success" value="5"></ui5-step-input> </div> <br>
	<div style="max-width: 13rem"> <ui5-step-input value-state="Warning" value="5"></ui5-step-input> </div> <br>
	<div style="max-width: 13rem"> <ui5-step-input value-state="Error" value="5"></ui5-step-input> </div> <br>
	<div style="max-width: 13rem"> <ui5-step-input value-state="Information" value="5"></ui5-step-input> </div> <br>
`;
export const MinMax = Template.bind({});
MinMax.storyName = "Min/Max and Step Values";
MinMax.args = {
    value: 0,
    min: -50,
    max: 50,
    step: 10,
};
export const ValuePrecision = Template.bind({});
ValuePrecision.args = {
    value: 5,
    min: 0,
    max: 10,
    step: 0.5,
    valuePrecision: 1,
};
export const Label = Template.bind({});
Label.storyName = "With Text Alignment";
Label.args = {
    id: "myStepInput",
    style: "text-align: left",
    placeholder: "Enter your Number",
    required: true,
};
Label.decorators = [
    (story) => html `<ui5-label class="samples-big-margin-right" for="myStepInput">Number is left-aligned</ui5-label>
	${story()}`,
];
//# sourceMappingURL=StepInput.stories.js.map