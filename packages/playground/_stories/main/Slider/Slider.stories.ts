import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type Slider from "@ui5/webcomponents/dist/Slider.js";

const component = "ui5-slider";

export default {
    title: "Main/Slider",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Slider>;

const Template: UI5StoryArgs<Slider, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic Slider</h3>
	<div class="snippet">
		<ui5-slider></ui5-slider>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>Slider with Tooltip</h3>
	<div class="snippet">
		<ui5-slider min="0" max="20" show-tooltip=""></ui5-slider>
	</div>
`;


export const Template2: StoryFn = () => html`
<h3>Disabled Slider with Tickmarks and Labels</h3>
	<div class="snippet">
		<ui5-slider min="20" max="100" label-interval="5" disabled="" show-tickmarks=""></ui5-slider>
	</div>
`;


export const Template3: StoryFn = () => html`
<h3>Slider Tooltip, Tickmarks and Labels</h3>
	<div class="snippet">
		<ui5-slider min="-20" max="20" step="2" value="12" show-tooltip="" label-interval="2" show-tickmarks=""></ui5-slider>
	</div>
`;
