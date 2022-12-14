import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/BusyIndicator",
    component: "ui5-busy-indicator",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Busy Indicator with different size</h3>
		<div class="snippet flex center">
			<ui5-busy-indicator active="" size="Small"></ui5-busy-indicator>
			<ui5-busy-indicator active="" size="Medium"></ui5-busy-indicator>
			<ui5-busy-indicator active="" size="Large"></ui5-busy-indicator>
		</div>
`;

export const Template1 = () => html`
<h3>Busy Indicator wrapping other elements</h3>
	<div class="snippet flex">
		<ui5-button id="fetch-btn" style="width: 120px;">Fetch List Data</ui5-button>
		<ui5-busy-indicator id="busy-container" size="Medium">
			<ui5-list id="fetch-list" no-data-text="No Data" header-text="Available Items"></ui5-list>
		</ui5-busy-indicator>
	</div>
`;