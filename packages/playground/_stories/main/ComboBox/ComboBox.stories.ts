import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type ComboBox from "@ui5/webcomponents/dist/ComboBox.js";

const component = "ui5-combobox";

export default {
    title: "Main/ComboBox",
    component,
    subcomponents: {'ComboBoxItem' : 'ui5-cb-item', 'ComboBoxGroupItem' : 'ui5-cb-group-item'},
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<ComboBox>;

const Template: UI5StoryArgs<ComboBox, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic Example</h3>
	<div class="snippet responsive-snippet">
		<ui5-combobox placeholder="Enter value">
			<ui5-cb-item text="Item 1"></ui5-cb-item>
			<ui5-cb-item text="Item 2"></ui5-cb-item>
			<ui5-cb-item text="Item 3"></ui5-cb-item>
		</ui5-combobox>
		<ui5-combobox value-state="Success" value="Item 1">
			<ui5-cb-item text="Item 1"></ui5-cb-item>
			<ui5-cb-item text="Item 2"></ui5-cb-item>
			<ui5-cb-item text="Item 3"></ui5-cb-item>
		</ui5-combobox>
		<ui5-combobox value-state="Warning" value="Item 2">
			<ui5-cb-item text="Item 1"></ui5-cb-item>
			<ui5-cb-item text="Item 2"></ui5-cb-item>
			<ui5-cb-item text="Item 3"></ui5-cb-item>
		</ui5-combobox>
		<ui5-combobox value-state="Error" value="Item 3">
			<ui5-cb-item text="Item 1"></ui5-cb-item>
			<ui5-cb-item text="Item 2"></ui5-cb-item>
			<ui5-cb-item text="Item 3"></ui5-cb-item>
		</ui5-combobox>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>Disabled and Readonly properties</h3>
	<div class="snippet responsive-snippet">
		<ui5-combobox value="Disabled" disabled="">
			<ui5-cb-item text="Item 1"></ui5-cb-item>
			<ui5-cb-item text="Item 2"></ui5-cb-item>
			<ui5-cb-item text="Item 3"></ui5-cb-item>
		</ui5-combobox>
		<ui5-combobox value="Readonly" readonly="">
			<ui5-cb-item text="Item 1"></ui5-cb-item>
			<ui5-cb-item text="Item 2"></ui5-cb-item>
			<ui5-cb-item text="Item 3"></ui5-cb-item>
		</ui5-combobox>
	</div>
`;


export const Template2: StoryFn = () => html`
<h3>Filters (StartsWithPerTerm(default), StartsWith, Contains)</h3>
		<div class="snippet responsive-snippet">
			<ui5-combobox placeholder="Starts With Per Term filter (default)">
				<ui5-cb-item text="Austria"></ui5-cb-item>
				<ui5-cb-item text="Bulgaria"></ui5-cb-item>
				<ui5-cb-item text="Germany"></ui5-cb-item>
				<ui5-cb-item text="United Kingdom"></ui5-cb-item>
				<ui5-cb-item text="Kazakhstan"></ui5-cb-item>
			</ui5-combobox>
			<ui5-combobox placeholder="StartsWith" filter="StartsWith">
				<ui5-cb-item text="Austria"></ui5-cb-item>
				<ui5-cb-item text="Bulgaria"></ui5-cb-item>
				<ui5-cb-item text="Germany"></ui5-cb-item>
				<ui5-cb-item text="United Kingdom"></ui5-cb-item>
				<ui5-cb-item text="Kazakhstan"></ui5-cb-item>
			</ui5-combobox>
			<ui5-combobox placeholder="Contains" filter="Contains">
				<ui5-cb-item text="Austria"></ui5-cb-item>
				<ui5-cb-item text="Bulgaria"></ui5-cb-item>
				<ui5-cb-item text="Germany"></ui5-cb-item>
				<ui5-cb-item text="United Kingdom"></ui5-cb-item>
				<ui5-cb-item text="Kazakhstan"></ui5-cb-item>
			</ui5-combobox>
		</div>
`;


export const Template3: StoryFn = () => html`
<h3>ComboBox with Two-Column Layout Items</h3>
	<div class="snippet responsive-snippet">
		<ui5-combobox placeholder="Two-column Layout">
			<ui5-cb-item text="Austria" additional-text="AT"></ui5-cb-item>
			<ui5-cb-item text="Belgium" additional-text="BE"></ui5-cb-item>
			<ui5-cb-item text="Brazil" additional-text="BR"></ui5-cb-item>
			<ui5-cb-item text="Bulgaria" additional-text="BG"></ui5-cb-item>
			<ui5-cb-item text="Canada" additional-text="CA"></ui5-cb-item>
		</ui5-combobox>
	</div>
`;


export const Template4: StoryFn = () => html`
<h3>ComboBox with Grouping of Items</h3>
	<div class="snippet responsive-snippet">
		<ui5-combobox placeholder="ComboBox with grouping of suggestions">
			<ui5-cb-group-item text="A"></ui5-cb-group-item>
			<ui5-cb-item text="Argentina"></ui5-cb-item>
			<ui5-cb-item text="Australia"></ui5-cb-item>
			<ui5-cb-item text="Austria"></ui5-cb-item>	
			<ui5-cb-group-item text="B"></ui5-cb-group-item>
			<ui5-cb-item text="Bahrain"></ui5-cb-item>
			<ui5-cb-item text="Belgium"></ui5-cb-item>
			<ui5-cb-item text="Brazil"></ui5-cb-item>
			<ui5-cb-group-item text="C"></ui5-cb-group-item>
			<ui5-cb-item text="Canada"></ui5-cb-item>
			<ui5-cb-item text="Chile"></ui5-cb-item>
		</ui5-combobox>
	</div>
`;
