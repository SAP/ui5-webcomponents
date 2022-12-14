import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/Breadcrumbs",
    component: "ui5-breadcrumbs",
    subcomponents: {'BreadcrumbsItem' : 'ui5-breadcrumbs-item'},
    argTypes,
};


export const Template0 = () => html`
<h3>Standard Breadcrumbs</h3>
	<div class="snippet">
		<ui5-breadcrumbs>
			<ui5-breadcrumbs-item href="https://www.sap.com" target="_blank">Root Page </ui5-breadcrumbs-item>
			<ui5-breadcrumbs-item href="https://www.sap.com">Parent Page</ui5-breadcrumbs-item>
			<ui5-breadcrumbs-item>Current Page</ui5-breadcrumbs-item>
		</ui5-breadcrumbs>
	</div>
`;

export const Template1 = () => html`
<h3>Breadcrumbs with no current page</h3>
	<div class="snippet">
		<ui5-breadcrumbs design="NoCurrentPage">
			<ui5-breadcrumbs-item href="https://www.sap.com" target="_blank">Root Page </ui5-breadcrumbs-item>
			<ui5-breadcrumbs-item href="https://www.sap.com">Parent Page</ui5-breadcrumbs-item>
		</ui5-breadcrumbs>
	</div>
`;

export const Template2 = () => html`
<h3>Breadcrumbs with specific separator</h3>
	<div class="snippet">
		<div>
			<ui5-breadcrumbs separator-style="Slash">
				<ui5-breadcrumbs-item href="https://www.sap.com">Root Page </ui5-breadcrumbs-item>
				<ui5-breadcrumbs-item href="https://www.sap.com">Parent Page</ui5-breadcrumbs-item>
				<ui5-breadcrumbs-item>Current Page</ui5-breadcrumbs-item>
			</ui5-breadcrumbs>
		</div>
		<div>
			<ui5-breadcrumbs separator-style="BackSlash">
				<ui5-breadcrumbs-item href="https://www.sap.com">Root Page </ui5-breadcrumbs-item>
				<ui5-breadcrumbs-item href="https://www.sap.com">Parent Page</ui5-breadcrumbs-item>
				<ui5-breadcrumbs-item>Current Page</ui5-breadcrumbs-item>
			</ui5-breadcrumbs>
		</div>
		<div>
			<ui5-breadcrumbs separator-style="DoubleBackSlash">
				<ui5-breadcrumbs-item href="https://www.sap.com">Root Page </ui5-breadcrumbs-item>
				<ui5-breadcrumbs-item href="https://www.sap.com">Parent Page</ui5-breadcrumbs-item>
				<ui5-breadcrumbs-item>Current Page</ui5-breadcrumbs-item>
			</ui5-breadcrumbs>
		</div>
		<div>
			<ui5-breadcrumbs separator-style="DoubleGreaterThan">
				<ui5-breadcrumbs-item href="https://www.sap.com">Root Page </ui5-breadcrumbs-item>
				<ui5-breadcrumbs-item href="https://www.sap.com">Parent Page</ui5-breadcrumbs-item>
				<ui5-breadcrumbs-item>Current Page</ui5-breadcrumbs-item>
			</ui5-breadcrumbs>
		</div>
		<div>
			<ui5-breadcrumbs separator-style="DoubleSlash">
				<ui5-breadcrumbs-item href="https://www.sap.com">Root Page </ui5-breadcrumbs-item>
				<ui5-breadcrumbs-item href="https://www.sap.com">Parent Page</ui5-breadcrumbs-item>
				<ui5-breadcrumbs-item>Current Page</ui5-breadcrumbs-item>
			</ui5-breadcrumbs>
		</div>
		<div>
			<ui5-breadcrumbs separator-style="GreaterThan">
				<ui5-breadcrumbs-item href="https://www.sap.com">Root Page </ui5-breadcrumbs-item>
				<ui5-breadcrumbs-item href="https://www.sap.com">Parent Page</ui5-breadcrumbs-item>
				<ui5-breadcrumbs-item>Current Page</ui5-breadcrumbs-item>
			</ui5-breadcrumbs>
		</div>
	</div>
`;