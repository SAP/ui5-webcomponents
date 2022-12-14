import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/StepInput",
    component: "ui5-step-input",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic Step Input</h3>
	<div class="snippet">
		<div class="shorter">
			<ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5"></ui5-step-input>
			<ui5-step-input class="samples-margin samples-responsive-margin-bottom" readonly="" value="5"></ui5-step-input>
			<ui5-step-input class="samples-margin samples-responsive-margin-bottom" disabled="" value="5"></ui5-step-input>
		</div>
	</div>
`;

export const Template1 = () => html`
<h3>Step Input with alignment</h3>
	<div class="snippet">
		<div class="shorter">
			<ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5"></ui5-step-input>
			<ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5" style="text-align: center"></ui5-step-input>
			<ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5" style="text-align: right"></ui5-step-input>
		</div>
	</div>
`;

export const Template2 = () => html`
<h3>Step Input with min, max, step and valuePrecision</h3>
	<div class="snippet">
		<div class="shorter">
			<ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5" min="0" max="10" step="1"></ui5-step-input>
			<ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="0" min="-100" max="100" step="10"></ui5-step-input>
			<ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="10" min="0" max="20" step="0.5" value-precision="1"></ui5-step-input>
		</div>
	</div>
`;

export const Template3 = () => html`
<h3>Step Input with Value State</h3>
	<div class="snippet">
		<div class="shorter">
			<ui5-step-input class="samples-margin samples-responsive-margin-bottom" value-state="Success"></ui5-step-input>
			<ui5-step-input class="samples-margin samples-responsive-margin-bottom" value-state="Warning"></ui5-step-input>
			<ui5-step-input class="samples-margin samples-responsive-margin-bottom" value-state="Error"></ui5-step-input>
			<ui5-step-input class="samples-margin samples-responsive-margin-bottom" value-state="Information"></ui5-step-input>
		</div>
	</div>
`;

export const Template4 = () => html`
<h3>Step Input with Label</h3>
	<div class="snippet">
		<div class="flex-column samples-margin">
			<div class="shorter">
				<ui5-label class="samples-big-margin-right" for="myStepInput" required="" show-colon="">Number</ui5-label>
				<ui5-step-input id="myStepInput" placeholder="Enter your Number" required=""></ui5-step-input>
			</div>
		</div>
	</div>
`;