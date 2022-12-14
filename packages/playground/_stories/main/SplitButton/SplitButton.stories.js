import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/SplitButton",
    component: "ui5-split-button",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Default SplitButton</h3>
	<div class="snippet">
		<ui5-split-button class="samples-margin">Default</ui5-split-button>
		<ui5-split-button disabled="" class="samples-margin">Default</ui5-split-button>
	</div>
`;

export const Template1 = () => html`
<h3>SplitButton with Design</h3>
	<div class="snippet">
		<ui5-split-button design="Default" class="samples-margin">Default</ui5-split-button>
		<ui5-split-button design="Emphasized" class="samples-margin">Emphasized</ui5-split-button>
		<ui5-split-button design="Positive" class="samples-margin">Positive</ui5-split-button>
		<ui5-split-button design="Negative" class="samples-margin">Negative</ui5-split-button>
		<ui5-split-button design="Attention" class="samples-margin">Attention</ui5-split-button>
		<ui5-split-button design="Transparent" class="samples-margin">Transparent</ui5-split-button>
	</div>
`;

export const Template2 = () => html`
<h3>SplitButton with Icons</h3>
	<div class="snippet">
		<ui5-split-button icon="add" class="samples-margin">Icon</ui5-split-button>
		<ui5-split-button icon="add" active-icon="accept" class="samples-margin">Icon + Active Icon</ui5-split-button>
	</div>
`;