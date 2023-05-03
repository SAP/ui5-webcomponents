import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type ColorPicker from "@ui5/webcomponents/dist/ColorPicker.js";

const component = "ui5-color-picker";

export default {
	title: "Main/ColorPicker",
	component,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<ColorPicker>;

const Template: UI5StoryArgs<ColorPicker, StoryArgsSlots> = (args) => html`<ui5-color-picker
	color="${ifDefined(args.color)}"
>Picker</ui5-color-picker>`;

export const Basic = Template.bind({});
Basic.args = {
	color: "rgba(220, 208, 255, 1)",
};
