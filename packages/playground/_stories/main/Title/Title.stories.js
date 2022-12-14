import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/Title",
    component: "ui5-title",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Title in All Available Levels</h3>
	<div class="snippet flex-column">
		<ui5-title level="H1">Title level 1</ui5-title>
		<ui5-title level="H2">Title level 2</ui5-title>
		<ui5-title level="H3">Title level 3</ui5-title>
		<ui5-title level="H4">Title level 4</ui5-title>
		<ui5-title level="H5">Title level 5</ui5-title>
		<ui5-title level="H6">Title level 6</ui5-title>
	</div>
`;