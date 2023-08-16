import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";
import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";
import { DocsPage } from "../../../.storybook/docs";
import type RadioButton from "@ui5/webcomponents/dist/RadioButton.js";
import { ifDefined } from "lit/directives/if-defined.js";
import WrappingType from "@ui5/webcomponents/dist/types/WrappingType.js";

const component = "ui5-radio-button";

export default {
	title: "Main/Radio Button",
	component: "RadioButton",
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<RadioButton>;

const Template: UI5StoryArgs<RadioButton, StoryArgsSlots> = (args) => {
	return html`
<ui5-radio-button
	name="${ifDefined(args.name)}"
	text="${ifDefined(args.text)}"
	?required="${ifDefined(args.required)}"
	?checked="${ifDefined(args.checked)}"
	?disabled="${ifDefined(args.disabled)}"
	?readonly="${ifDefined(args.readonly)}"
	value-state="${ifDefined(args.valueState)}"
	value="${ifDefined(args.value)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
	wrapping-type="${ifDefined(args.wrappingType)}"
>
<ui5-radio-button>`
};

export const Basic = Template.bind({});
Basic.args = {
	name: "GroupA",
};

Basic.decorators = [
	(story, { args }) => {
		let i = 0;
		return html`
			${story({args: {text: `Option ${++i}`, checked: true, ...args, }})}
			${story({args: {text: `Option ${++i}`, ...Basic.args}})}
			${story({args: {text: `Option ${i++}`, ...Basic.args}})}
		`;
	},
];

export const Variations: StoryFn = () => html`
<ui5-radio-button text="Option A" checked="" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option B" value-state="None" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option C" value-state="Warning" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option D" value-state="Error" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option C" value-state="Success" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option D" value-state="Information" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option E" disabled="" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option F" readonly="" name="GroupA"></ui5-radio-button>
`;

export const Wrapping = Template.bind({});
Wrapping.args = {
	wrappingType: WrappingType.Normal,
	text: `ui5-radio-button with 'wrapping-type=Normal' set and some long text`,
};
Wrapping.decorators = [
	(story) => {
		return html`
<style>
	ui5-radio-button {
		width: 200px;
	}
</style>
${story()}`;
	}
];