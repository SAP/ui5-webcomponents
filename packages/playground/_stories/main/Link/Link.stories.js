import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/Link",
    component: "ui5-link",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Different Link Designs</h3>
	<div class="snippet">
		<ui5-link class="samples-big-margin-right" href="https://www.sap.com" target="_blank">Standard Link</ui5-link>
		<ui5-link class="samples-big-margin-right" href="https://www.sap.com" target="_blank" design="Subtle">Subtle link</ui5-link>
		<ui5-link class="samples-big-margin-right" href="https://www.sap.com" target="_blank" disabled="">Disabled</ui5-link>
		<ui5-link class="samples-big-margin-right" href="https://www.sap.com" target="_blank" design="Emphasized">Emphasized</ui5-link>
	</div>
`;