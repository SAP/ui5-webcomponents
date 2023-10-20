import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";

const component = "ui5-button";

export default {
	title: "Main/Button",
	component: "Button",
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<Button>;

const Template: UI5StoryArgs<Button, StoryArgsSlots> = (args) => html`<ui5-button
	design="${ifDefined(args.design)}"
	?disabled="${ifDefined(args.disabled)}"
	icon="${ifDefined(args.icon)}"
	?icon-end="${ifDefined(args.iconEnd)}"
	tooltip="${ifDefined(args.tooltip)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
	accessibility-attributes="${ifDefined(args.accessibilityAttributes)}"
>
	${unsafeHTML(args.default)}
</ui5-button>`;

export const Basic = Template.bind({});
Basic.args = {
	default: "Button Text",
	accessibleName: "Button with Accessible Name",
	icon: "sap-icon://action"
};

export const DifferentTypes = Template.bind({});
DifferentTypes.decorators = [
	(story, {args}) => {
		return html`
${story({args: {...args, design: args.design || ButtonDesign.Emphasized, default: args.default || "Emphasized"}})}
${story({args: {...args, design: args.design || ButtonDesign.Default, default: args.default || "Default"}})}
${story({args: {...args, design: args.design || ButtonDesign.Attention, default: args.default || "Attention"}})}
${story({args: {...args, design: args.design || ButtonDesign.Positive, default: args.default || "Positive"}})}
${story({args: {...args, design: args.design || ButtonDesign.Negative, default: args.default || "Negative"}})}
${story({args: {...args, design: args.design || ButtonDesign.Transparent, default: args.default || "Transparent"}})}`;
	},
];

export const IconOnlyButtons = Template.bind({});
IconOnlyButtons.decorators = [
	(story, {args}) => {
		return html`
${story({args: {...args, design: args.design || ButtonDesign.Default, icon: args.icon || "edit", tooltip: args.tooltip || "Edit Button"}})}
${story({args: {...args, design: args.design || ButtonDesign.Transparent, icon: args.icon || "account", tooltip: args.tooltip || "Account Button"}})}`
	},
];

IconOnlyButtons.storyName = "Icon-Only Buttons";