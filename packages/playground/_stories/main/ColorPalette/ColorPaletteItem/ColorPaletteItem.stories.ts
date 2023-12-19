import { html } from "lit";
import type { Meta } from "@storybook/web-components";
import { ifDefined } from "lit/directives/if-defined.js";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs.js";

import type ColorPaletteItem from "@ui5/webcomponents/dist/ColorPaletteItem.js";

const component = "ui5-color-palette-item";

export default {
	title: "Main/ColorPalette/ColorPaletteItem",
	component: "ColorPaletteItem",
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
		},
	},
	argTypes,
} as Meta<ColorPaletteItem>;

const Template: UI5StoryArgs<ColorPaletteItem, StoryArgsSlots> = (args) => html`<ui5-color-palette>
	<ui5-color-palette-item value="${ifDefined(args.value)}"></ui5-color-palette-item>
</ui5-color-palette>`;

export const Basic = Template.bind({});
Basic.storyName = "Color Palette with Items";
Basic.tags = ["_hidden_"];
Basic.args = {
	value: "#ff6699"
};