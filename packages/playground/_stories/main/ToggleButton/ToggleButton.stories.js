import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/ToggleButton",
    component: "ui5-toggle-button",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>ToggleButton States</h3>
	<div class="snippet">
		<ui5-toggle-button class="samples-margin">ToggleButton</ui5-toggle-button>
		<ui5-toggle-button class="samples-margin" pressed="">Pressed ToggleButton</ui5-toggle-button>
		<ui5-toggle-button class="samples-margin" disabled="">Disabled ToggleButton</ui5-toggle-button>
		<ui5-toggle-button class="samples-margin" disabled="" pressed="">Disabled and Pressed ToggleButton</ui5-toggle-button>
		<ui5-toggle-button class="samples-margin" design="Positive">Accept ToggleButton</ui5-toggle-button>
		<ui5-toggle-button class="samples-margin" design="Positive" pressed="">Pressed Accept ToggleButton</ui5-toggle-button>
		<ui5-toggle-button class="samples-margin" design="Negative">Reject ToggleButton</ui5-toggle-button>
		<ui5-toggle-button class="samples-margin" design="Negative" pressed="">Pressed Reject ToggleButton</ui5-toggle-button>
		<ui5-toggle-button class="samples-margin" design="Transparent">Transparent ToggleButton</ui5-toggle-button>
		<ui5-toggle-button class="samples-margin" design="Transparent" pressed="">Pressed Transparent ToggleButton</ui5-toggle-button>
	</div>
`;

export const Template1 = () => html`
<h3>ToggleButton with Icon</h3>
	<div class="snippet">
		<ui5-toggle-button class="samples-margin" icon="menu">Menu</ui5-toggle-button>
		<ui5-toggle-button class="samples-margin" design="Emphasized" icon="add">Add</ui5-toggle-button>
		<ui5-toggle-button class="samples-margin" design="Default" icon="nav-back">Back</ui5-toggle-button>
		<ui5-toggle-button class="samples-margin" design="Positive" icon="accept">Accept</ui5-toggle-button>
		<ui5-toggle-button class="samples-margin" design="Negative" icon="sys-cancel">Deny</ui5-toggle-button>
	</div>
`;

export const Template2 = () => html`
<h3>ToggleButton with Icon Only</h3>
	<div class="snippet">
			<ui5-toggle-button class="samples-margin" icon="away"></ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" icon="action-settings" pressed=""></ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" icon="add"></ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" icon="alert" pressed=""></ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" icon="accept" design="Positive"></ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" icon="bookmark" design="Positive" pressed=""></ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" icon="cancel" design="Negative"></ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" icon="call" design="Negative" pressed=""></ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" icon="camera" design="Transparent"></ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" icon="cart" design="Transparent" pressed=""></ui5-toggle-button>
	</div>
`;

export const Template3 = () => html`
<h3>ToggleButton</h3>
	<div class="snippet">
			<ui5-toggle-button class="samples-margin">Yes/No</ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" pressed="">Yes/No</ui5-toggle-button>
			<ui5-toggle-button class="samples-margin">Toggle Button</ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" pressed="">Toggle Button pressed</ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" design="Positive">On/Off</ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" design="Positive" pressed="">On/Off</ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" design="Negative">Menu</ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" design="Negative" pressed="">Menu</ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" design="Transparent">Transparent</ui5-toggle-button>
			<ui5-toggle-button class="samples-margin" design="Transparent" pressed="">Transparent</ui5-toggle-button>
	</div>
`;