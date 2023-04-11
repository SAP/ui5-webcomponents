import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";

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

const Template: UI5StoryArgs<ToggleButton, StoryArgsSlots> = (args) => html`<ui5-toggle-button
	?pressed="${ifDefined(args.pressed)}"
	?disabled="${ifDefined(args.disabled)}"
	design="${ifDefined(args.design)}"
	icon="${ifDefined(args.icon)}"
>
	${unsafeHTML(args.default)}
</ui5-toggle-button>`;

export const Basic = Template.bind({});
Basic.args = {
	default: "Default",
};

export const Pressed = Template.bind({});
Pressed.args = {
	default: "Pressed",
	pressed: true,
};

export const DisabledAndPressed = Template.bind({});
DisabledAndPressed.args = {
	default: "ToggleButton",
	pressed: true,
	disabled: true,
};

export const IconOnly = Template.bind({});
IconOnly.storyName = "Icon-Only ToggleButton";
IconOnly.args = {
	icon: "add",
};

export const WithIconAndDesign = Template.bind({});
WithIconAndDesign.args = {
	default: "ToggleButton",
	design: ButtonDesign.Positive,
	pressed: false,
	icon: "add",
};