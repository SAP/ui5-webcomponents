import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/TextArea",
    component: "ui5-textarea",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic TextArea</h3>
	<div class="snippet">
		<ui5-textarea class="textarea-width" placeholder="Type as much text as you wish"></ui5-textarea>
	</div>
`;

export const Template1 = () => html`
<h3>TextArea with Maximum Length</h3>
	<div class="snippet">
		<ui5-textarea class="textarea-width" placeholder="Type no more than 10 symbols" maxlength="10" show-exceeded-text=""></ui5-textarea>
	</div>
`;

export const Template2 = () => html`
<h3>TextArea with Label</h3>
	<div class="snippet">
		<ui5-label for="textAreaWithLabelID">Description</ui5-label>
		<ui5-textarea id="textAreaWithLabelID" class="textarea-width" placeholder="Enter description"></ui5-textarea>
	</div>
`;