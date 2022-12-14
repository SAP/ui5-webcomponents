import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/RangeSlider",
    component: "ui5-range-slider",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic Range Slider</h3>
	<div class="snippet">
		<ui5-range-slider end-value="20"></ui5-range-slider>
	</div>
`;

export const Template1 = () => html`
<h3>Range Slider with Custom 'min', 'max', 'startValue' and 'endValue' Properties</h3>
	<div class="snippet">
		<ui5-range-slider min="100" max="200" start-value="120" end-value="150"></ui5-range-slider>
	</div>
`;

export const Template2 = () => html`
<h3>Range Slider with Tooltips</h3>
	<div class="snippet">
		<ui5-range-slider start-value="3" end-value="13" show-tooltip=""></ui5-range-slider>
	</div>
`;

export const Template3 = () => html`
<h3>Range Slider with Tickmarks and Custom Step</h3>
	<div class="snippet">
		<ui5-range-slider step="2" start-value="12" end-value="24" show-tickmarks=""></ui5-range-slider>
	</div>
`;

export const Template4 = () => html`
<h3>Range Slider with Tooltips, Tickmarks and Labels</h3>
	<div class="snippet">
		<ui5-range-slider min="0" max="112" step="2" start-value="4" end-value="12" show-tooltip="" label-interval="2" show-tickmarks=""></ui5-range-slider>
	</div>
`;