import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/ProgressIndicator",
    component: "ui5-progress-indicator",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic Progress Indicator</h3>
	<div class="snippet">
        <ui5-progress-indicator value="0"></ui5-progress-indicator>
        <ui5-progress-indicator value="25"></ui5-progress-indicator>
        <ui5-progress-indicator value="75" disabled=""></ui5-progress-indicator>
        <ui5-progress-indicator value="100"></ui5-progress-indicator>
	</div>
`;

export const Template1 = () => html`
<h3>Progress Indicator With Custom Display Value</h3>
	<div class="snippet">
        <ui5-progress-indicator value="25" display-value="Custom Display Value"></ui5-progress-indicator>
	</div>
`;

export const Template2 = () => html`
<h3>Progress Indicator With Value State</h3>
	<div class="snippet">
        <ui5-progress-indicator value-state="None" value="25"></ui5-progress-indicator>
        <ui5-progress-indicator value-state="Error" value="50"></ui5-progress-indicator>
        <ui5-progress-indicator value-state="Warning" value="75"></ui5-progress-indicator>
        <ui5-progress-indicator value-state="Success" value="90"></ui5-progress-indicator>
        <ui5-progress-indicator value-state="Information" value="100"></ui5-progress-indicator>
	</div>
`;

export const Template3 = () => html`
<h3>Progress Indicator With Custom Sizes</h3>
	<div class="snippet">
        <ui5-progress-indicator value="25" style="height: 50px; width: 200px;"></ui5-progress-indicator>
        <ui5-progress-indicator value="75" style="height: 50px; width: 200px;"></ui5-progress-indicator>
	</div>
`;