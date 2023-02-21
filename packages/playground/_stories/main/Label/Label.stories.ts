import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type Label from "@ui5/webcomponents/dist/Label.js";

const component = "ui5-label";

export default {
    title: "Main/Label",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Label>;

const Template: UI5StoryArgs<Label, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic Label</h3>
	<div class="snippet">
		<ui5-label>The quick brown fox jumps over the lazy dog.</ui5-label>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>Required Label</h3>
	<div class="snippet">
		<ui5-label required="">Required Label</ui5-label>
	</div>
`;


export const Template2: StoryFn = () => html`
<h3>Required Label With Colon</h3>
	<div class="snippet">
		<ui5-label required="" show-colon="">Required Label</ui5-label>
	</div>
`;


export const Template3: StoryFn = () => html`
<h3>Truncated Label</h3>
	<div class="snippet">
		<ui5-label style="width:200px">Long labels are truncated by default.</ui5-label>
	</div>
`;


export const Template4: StoryFn = () => html`
<h3>Wrapped Label</h3>
	<div class="snippet">
		<ui5-label style="width:200px" wrapping-type="Normal">Long labels can wrap if the 'wrapping-type="Normal"' property is set.</ui5-label>
	</div>
`;


export const Template5: StoryFn = () => html`
<h3>Label 'for'</h3>
	<div class="snippet" style="display: flex;flex-direction: column;">
		<ui5-label id="myLabel" for="myInput" required="" show-colon="">First name</ui5-label>
		<ui5-input id="myInput" required="" placeholder="Enter your name"></ui5-input>
		<br/>
		<ui5-label id="myLabel2" for="myDP" required="" show-colon="">Date of birth</ui5-label>
		<ui5-date-picker id="myDP" required=""></ui5-date-picker>
		<br/>
		<ui5-label id="myLabel3" for="mySelect" required="" show-colon="">Job</ui5-label>
		<ui5-select id="mySelect" required="">
			<ui5-option>Manager</ui5-option>
			<ui5-option>Sales</ui5-option>
			<ui5-option selected="">Developer</ui5-option>
		</ui5-select>
		<br/>
		<ui5-label id="myLabel4" for="myTextArea" required="" show-colon="">Description label test</ui5-label>
		<ui5-textarea id="myTextArea" required="" placeholder="Type as much text as you wish"></ui5-textarea>
		<br/>
		<div style="display: flex; align-items: center;">
			<ui5-label for="myCB" required="" show-colon="">Accept terms of use</ui5-label>
			<ui5-checkbox id="myCB" required=""></ui5-checkbox>
		</div>
</div>
`;
