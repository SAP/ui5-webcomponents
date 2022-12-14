import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/Badge",
    component: "ui5-badge",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic Badge</h3>
	<div class="snippet">
		<ui5-badge color-scheme="1">available 1</ui5-badge>
		<ui5-badge color-scheme="2">required 2</ui5-badge>
		<ui5-badge color-scheme="3">3K</ui5-badge>
		<ui5-badge color-scheme="4">bug 4</ui5-badge>
		<ui5-badge color-scheme="5">in process 5</ui5-badge>
		<ui5-badge color-scheme="6">in warehouse 6</ui5-badge>
		<ui5-badge color-scheme="7">7\$</ui5-badge>
		<ui5-badge color-scheme="8">solution provided 8</ui5-badge>
		<ui5-badge color-scheme="9">pending release 9</ui5-badge>
		<ui5-badge color-scheme="10">customer action 10</ui5-badge>
		<ui5-badge style="width:200px;">This would truncate as it is too long</ui5-badge>
	</div>
`;

export const Template1 = () => html`
<h3>Badge with Icon</h3>
	<div class="snippet">
		<ui5-badge color-scheme="1">
				<ui5-icon name="accept" slot="icon"></ui5-icon>done
		</ui5-badge>
		<ui5-badge color-scheme="2">
				<ui5-icon name="sap-ui5" slot="icon"></ui5-icon>
		</ui5-badge>
		<ui5-badge color-scheme="3">
				<ui5-icon name="add-equipment" slot="icon"></ui5-icon>in process
		</ui5-badge>
		<ui5-badge color-scheme="4">
				<ui5-icon name="lab" slot="icon"></ui5-icon>
		</ui5-badge>
		<ui5-badge color-scheme="5">
				<ui5-icon name="email-read" slot="icon"></ui5-icon>
		</ui5-badge>
		<ui5-badge color-scheme="6">
				<ui5-icon name="pending" slot="icon"></ui5-icon>pending
		</ui5-badge>
		<ui5-badge color-scheme="7">
				<ui5-icon name="lightbulb" slot="icon"></ui5-icon>
		</ui5-badge>
		<ui5-badge color-scheme="8">
				<ui5-icon name="locked" slot="icon"></ui5-icon>
		</ui5-badge>
	</div>
`;