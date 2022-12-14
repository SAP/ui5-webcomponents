import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/TimePicker",
    component: "ui5-time-picker",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic TimePicker</h3>
	<div class="snippet">
			<ui5-time-picker id="timepicker1"></ui5-time-picker>
	</div>
`;

export const Template1 = () => html`
<h3>TimePicker in twelve hours format</h3>
	<div class="snippet">
			<ui5-time-picker id="timepicker1" format-pattern="hh:mm:ss a"></ui5-time-picker>
	</div>
`;

export const Template2 = () => html`
<h3>TimePicker with only minutes and seconds</h3>
	<div class="snippet">
			<ui5-time-picker id="timepicker1" format-pattern="mm:ss"></ui5-time-picker>
	</div>
`;

export const Template3 = () => html`
<h3>TimePicker with value-state and valueStateMessage</h3>
	<div class="snippet">
		<ui5-time-picker id="timepicker3" format-pattern="mm:ss" value-state="Error">
			<div slot="valueStateMessage">Please provide valid value</div>
		</ui5-time-picker>
	</div>
`;