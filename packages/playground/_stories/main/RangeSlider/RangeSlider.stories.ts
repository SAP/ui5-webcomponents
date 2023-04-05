import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type RangeSlider from "@ui5/webcomponents/dist/RangeSlider.js";

const component = "ui5-range-slider";

export default {
    title: "Main/RangeSlider",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<RangeSlider>;

const Template: UI5StoryArgs<RangeSlider, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic Range Slider</h3>
	<div class="snippet">
		<ui5-range-slider end-value="20"></ui5-range-slider>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>Range Slider with Custom 'min', 'max', 'startValue' and 'endValue' Properties</h3>
	<div class="snippet">
		<ui5-range-slider min="100" max="200" start-value="120" end-value="150"></ui5-range-slider>
	</div>
`;


export const Template2: StoryFn = () => html`
<h3>Range Slider with Tooltips</h3>
	<div class="snippet">
		<ui5-range-slider start-value="3" end-value="13" show-tooltip=""></ui5-range-slider>
	</div>
`;


export const Template3: StoryFn = () => html`
<h3>Range Slider with Tickmarks and Custom Step</h3>
	<div class="snippet">
		<ui5-range-slider step="2" start-value="12" end-value="24" show-tickmarks=""></ui5-range-slider>
	</div>
`;


export const Template4: StoryFn = () => html`
<h3>Range Slider with Tooltips, Tickmarks and Labels</h3>
	<div class="snippet">
		<ui5-range-slider min="0" max="112" step="2" start-value="4" end-value="12" show-tooltip="" label-interval="2" show-tickmarks=""></ui5-range-slider>
	</div>
`;
