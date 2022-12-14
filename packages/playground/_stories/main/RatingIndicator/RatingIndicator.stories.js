import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/RatingIndicator",
    component: "ui5-rating-indicator",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic Rating Indicator</h3>
	<div class="snippet">
		<ui5-rating-indicator></ui5-rating-indicator>
		<ui5-rating-indicator value="3"></ui5-rating-indicator>
		<ui5-rating-indicator value="3.7"></ui5-rating-indicator>
	</div>
`;

export const Template1 = () => html`
<h3>Rating Indicator With Different Max Value</h3>
	<div class="snippet">
		<ui5-rating-indicator max="10" value="5"></ui5-rating-indicator>
		<ui5-rating-indicator max="3" value="3"></ui5-rating-indicator>
	</div>
`;

export const Template2 = () => html`
<h3>Disabled Rating Indicator</h3>
	<div class="snippet">
		<ui5-rating-indicator value="4" disabled=""></ui5-rating-indicator>
		<ui5-rating-indicator max="10" value="5" disabled=""></ui5-rating-indicator>
		<ui5-rating-indicator max="3" value="3" disabled=""></ui5-rating-indicator>
	</div>
`;

export const Template3 = () => html`
<h3>Readonly Rating Indicator</h3>
	<div class="snippet">
		<ui5-rating-indicator value="4" readonly=""></ui5-rating-indicator>
		<ui5-rating-indicator max="7" value="5" readonly=""></ui5-rating-indicator>
	</div>
`;