import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/ColorPicker",
    component: "ui5-color-picker",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Pick color</h3>
	<div class="snippet">
		<ui5-color-picker></ui5-color-picker>
	</div>
`;