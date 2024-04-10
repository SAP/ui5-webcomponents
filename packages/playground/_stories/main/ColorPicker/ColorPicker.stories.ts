import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";
import type ColorPicker from "@ui5/webcomponents/dist/ColorPicker.js";

export default {
	title: "Main/ColorPicker",
	component: "ColorPicker",
	argTypes,
} as Meta<ColorPicker>;

const Template: UI5StoryArgs<ColorPicker, StoryArgsSlots> = (args) => html`<ui5-color-picker
	color="${ifDefined(args.value)}"
>Picker</ui5-color-picker>`;

export const Basic = Template.bind({});
Basic.args = {
	value: "rgba(220, 208, 255, 1)",
};
