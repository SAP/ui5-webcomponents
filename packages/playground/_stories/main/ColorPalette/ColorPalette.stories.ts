import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type ColorPalette from "@ui5/webcomponents/dist/ColorPalette.js";

const component = "ui5-color-palette";

export default {
    title: "Main/ColorPalette",
    component,
    subcomponents: {'ColorPaletteItem' : 'ui5-color-palette-item'},
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<ColorPalette>;

const Template: UI5StoryArgs<ColorPalette, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Color Palette</h3>
	<div class="snippet">
		<ui5-color-palette>
			<ui5-color-palette-item value="darkblue"></ui5-color-palette-item>
			<ui5-color-palette-item value="pink"></ui5-color-palette-item>
			<ui5-color-palette-item value="#444444"></ui5-color-palette-item>
			<ui5-color-palette-item value="rgb(0,200,0)"></ui5-color-palette-item>
			<ui5-color-palette-item value="green"></ui5-color-palette-item>
			<ui5-color-palette-item value="darkred"></ui5-color-palette-item>
			<ui5-color-palette-item value="yellow"></ui5-color-palette-item>
			<ui5-color-palette-item value="blue"></ui5-color-palette-item>
			<ui5-color-palette-item value="cyan"></ui5-color-palette-item>
			<ui5-color-palette-item value="orange"></ui5-color-palette-item>
			<ui5-color-palette-item value="#5480e7"></ui5-color-palette-item>
			<ui5-color-palette-item value="#ff6699"></ui5-color-palette-item>
		</ui5-color-palette>
	</div>
`;
