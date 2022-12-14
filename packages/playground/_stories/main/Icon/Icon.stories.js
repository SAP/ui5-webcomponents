import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/Icon",
    component: "ui5-icon",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic Icons</h3>
	<div class="snippet">
		<ui5-icon class="samples-margin" name="activate"></ui5-icon>
		<ui5-icon class="samples-margin" name="activities"></ui5-icon>
		<ui5-icon class="samples-margin" name="add-equipment"></ui5-icon>
		<ui5-icon class="samples-margin" name="add-document"></ui5-icon>
		<ui5-icon class="samples-margin" name="add-employee"></ui5-icon>
	</div>
`;

export const Template1 = () => html`
<h3>SAP Fiori Tools Icons</h3>
	<div class="snippet">
		<ui5-icon class="samples-margin" name="tnt/antenna"></ui5-icon>
		<ui5-icon class="samples-margin" name="tnt/api"></ui5-icon>
		<ui5-icon class="samples-margin" name="tnt/modem"></ui5-icon>
		<ui5-icon class="samples-margin" name="tnt/data-store"></ui5-icon>
		<ui5-icon class="samples-margin" name="tnt/flow"></ui5-icon>
	</div>
`;

export const Template2 = () => html`
<h3>Customized Icons</h3>
	<div class="snippet">
		<ui5-icon class="samples-margin" name="employee" style="width:3rem;height:3rem;font-size:1.5rem;color:crimson;background-color:#fafafa"></ui5-icon>
		<ui5-icon class="samples-margin" name="menu" style="width:3rem;height:3rem;font-size:1.5rem;color:crimson;background-color:#fafafa"></ui5-icon>
	</div>
`;