import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type TimePicker from "@ui5/webcomponents/dist/TimePicker.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

const component = "ui5-time-picker";

export default {
	title: "Main/TimePicker",
	component,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<TimePicker>;

const Template: UI5StoryArgs<TimePicker, StoryArgsSlots> = (args) => html`
<ui5-time-picker
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

export const Placeholder = Template.bind({});
Placeholder.args = {
	placeholder: "Event start time...",
};

export const FormatPattern = Template.bind({});
FormatPattern.args = {
	formatPattern: "hh:mm:ss a",
};

export const WithValueState = Template.bind({});
WithValueState.storyName = "Value State and Message";
WithValueState.args = {
	formatPattern: "mm:ss",
	valueState: ValueState.Error,
	valueStateMessage: `<div slot="valueStateMessage">Please provide valid value</div>`,
};