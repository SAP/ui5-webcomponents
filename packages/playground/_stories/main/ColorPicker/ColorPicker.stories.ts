import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
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

const Template: UI5StoryArgs<ColorPicker, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Pick color</h3>
	<div class="snippet">
		<ui5-color-picker></ui5-color-picker>
	</div>
`;
