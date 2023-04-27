import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type StepInput from "@ui5/webcomponents/dist/StepInput.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState";

const component = "ui5-step-input";

export default {
	title: "Main/StepInput",
	component,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<StepInput>;

const Template: UI5StoryArgs<StepInput, StoryArgsSlots> = (args) => html`<ui5-step-input
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
</ui5-step-input>`;

export const Basic = Template.bind({});
Basic.args = {
	value: 5,
};

export const Readonly = Template.bind({});
Readonly.args = {
	value: 5,
	readonly: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	value: 5,
	disabled: true,
};

export const Design = Template.bind({});
Design.storyName = "Value State";
Design.args = {
	value: 5,
	valueState: ValueState.Success,
};

export const MinMax = Template.bind({});
MinMax.storyName = "Min/Max and Step Values";
MinMax.args = {
	value: 0,
	min: -100,
	max: 100,
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
Label.storyName = "With Label and Alignment";
Label.args = {
	id: "myStepInput",
	style: "text-align: left",
	placeholder: "Enter your Number",
	required: true,
};
Label.decorators = [
	(story) => html`<ui5-label class="samples-big-margin-right" for="myStepInput">Number</ui5-label>
	${story()}`,
]