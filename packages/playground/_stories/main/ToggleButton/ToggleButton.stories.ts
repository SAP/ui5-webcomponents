import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

const component = "ui5-toggle-button";

export default {
	title: "Main/ToggleButton",
	component,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<ToggleButton>;

const Template: UI5StoryArgs<ToggleButton, StoryArgsSlots> = (args) => html`
<ui5-toggle-button
	?pressed="${ifDefined(args.pressed)}"
	?disabled="${ifDefined(args.disabled)}"
	design="${ifDefined(args.design)}"
	icon="${ifDefined(args.icon)}"
	>${unsafeHTML(args.default)}</ui5-toggle-button
>`;

export const Basic = Template.bind({});
Basic.storyName = "Basic ToggleButton";
Basic.args = {
	default: "ToggleButton"
};

export const Pressed = Template.bind({});
Pressed.storyName = "Pressed ToggleButton";
Pressed.args = {
	default: "ToggleButton",
	pressed: true,
};

export const Disabled = Template.bind({});
Disabled.storyName = "Disabled ToggleButton";
Disabled.args = {
	default: "ToggleButton",
	disabled: true,
};

export const DisabledAndPressed = Template.bind({});
DisabledAndPressed.storyName = "Disabled and pressed ToggleButton";
DisabledAndPressed.args = {
	default: "ToggleButton",
	pressed: true,
	disabled: true,
};

export const WithButtonDesign = Template.bind({});
WithButtonDesign.storyName = "ToggleButton with Design";
WithButtonDesign.args = {
	default: "ToggleButton",
	design: ButtonDesign.Positive,
};

export const IconOnly = Template.bind({});
IconOnly.storyName = "Icon-Only ToggleButton";
IconOnly.args = {
	icon: "add",
};

export const WithIcon = Template.bind({});
WithIcon.storyName = "ToggleButton with an icon and design";
WithIcon.args = {
	default: "ToggleButton",
	design: ButtonDesign.Emphasized,
	pressed: false,
	icon: "add",
};