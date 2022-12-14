import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/Slider",
    component: "ui5-slider",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic Slider</h3>
	<div class="snippet">
		<ui5-slider></ui5-slider>
	</div>
`;

export const Template1 = () => html`
<h3>Slider with Tooltip</h3>
	<div class="snippet">
		<ui5-slider min="0" max="20" show-tooltip=""></ui5-slider>
	</div>
`;

export const Template2 = () => html`
<h3>Disabled Slider with Tickmarks and Labels</h3>
	<div class="snippet">
		<ui5-slider min="20" max="100" label-interval="5" disabled="" show-tickmarks=""></ui5-slider>
	</div>
`;

export const Template3 = () => html`
<h3>Slider Tooltip, Tickmarks and Labels</h3>
	<div class="snippet">
		<ui5-slider min="-20" max="20" step="2" value="12" show-tooltip="" label-interval="2" show-tickmarks=""></ui5-slider>
	</div>
`;