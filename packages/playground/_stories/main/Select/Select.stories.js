import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/Select",
    component: "ui5-select",
    subcomponents: {'Option' : 'ui5-option'},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic Select</h3>
	<div class="snippet">
		<ui5-select class="select">
			<ui5-option icon="iphone">Phone</ui5-option>
			<ui5-option icon="ipad">Tablet</ui5-option>
			<ui5-option icon="laptop" selected="">Desktop</ui5-option>
		</ui5-select>
		<ui5-select disabled="" class="select">
				<ui5-option icon="iphone" selected="">Phone</ui5-option>
				<ui5-option icon="ipad">Tablet</ui5-option>
				<ui5-option icon="laptop">Desktop</ui5-option>
		</ui5-select>
	</div>
`;

export const Template1 = () => html`
<h3>Select with Value State and Value State Message</h3>
	<div class="snippet">
		<ui5-select value-state="Success" class="select">
				<ui5-option icon="meal" selected="">Apple</ui5-option>
				<ui5-option icon="meal">Avocado</ui5-option>
				<ui5-option icon="meal">Mango</ui5-option>
		</ui5-select>
		<ui5-select value-state="Warning" class="select">
				<ui5-option icon="meal">Orange</ui5-option>
				<ui5-option icon="meal" selected="">Pumpkin</ui5-option>
				<ui5-option icon="meal">Carrot</ui5-option>
				<div slot="valueStateMessage">Information message. This is a <a href="#">Link</a>. Extra long text used as an information message. Extra long text used as an information message - 2. Extra long text used as an information message - 3.</div>
				<div slot="valueStateMessage">Information message 2. This is a <a href="#">Link</a>. Extra long text used as an information message. Extra long text used as an information message - 2. Extra long text used as an information message - 3.</div>
		</ui5-select>
		<ui5-select value-state="Error" class="select">
				<ui5-option icon="meal">Strawberry</ui5-option>
				<ui5-option icon="meal">Tomato</ui5-option>
				<ui5-option icon="meal" selected="">Red Chili Pepper</ui5-option>
				<div slot="valueStateMessage">Information message. This is a <a href="#">Link</a>. Extra long text used as an information message. Extra long text used as an information message - 2. Extra long text used as an information message - 3.</div>
				<div slot="valueStateMessage">Information message 2. This is a <a href="#">Link</a>. Extra long text used as an information message. Extra long text used as an information message - 2. Extra long text used as an information message - 3.</div>
		</ui5-select>
		<ui5-select value-state="Information" class="select">
			<ui5-option icon="meal">Blueberry</ui5-option>
			<ui5-option icon="meal">Grape</ui5-option>
			<ui5-option icon="meal" selected="">Plum</ui5-option>
			<div slot="valueStateMessage">Information message. This is a <a href="#">Link</a>. Extra long text used as an information message. Extra long text used as an information message - 2. Extra long text used as an information message - 3.</div>
			<div slot="valueStateMessage">Information message 2. This is a <a href="#">Link</a>. Extra long text used as an information message. Extra long text used as an information message - 2. Extra long text used as an information message - 3.</div>
		</ui5-select>
	</div>
`;

export const Template2 = () => html`
<h3>Select with Two-Column Layout Items</h3>
	<div class="snippet">
		<ui5-select class="select">
			<ui5-option additional-text="AT">Austria</ui5-option>
			<ui5-option additional-text="BE">Belgium</ui5-option>
			<ui5-option additional-text="BR">Brazil</ui5-option>
			<ui5-option additional-text="BG">Bulgaria</ui5-option>
			<ui5-option additional-text="CA">Canada</ui5-option>
		</ui5-select>
	</div>
`;