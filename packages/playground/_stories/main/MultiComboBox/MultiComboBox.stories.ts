import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type MultiComboBox from "@ui5/webcomponents/dist/MultiComboBox.js";

const component = "ui5-multi-combobox";

export default {
    title: "Main/MultiComboBox",
    component,
    subcomponents: {'MultiComboBoxItem' : 'ui5-mcb-item', 'MultiComboBoxGroupItem' : 'ui5-mcb-group-item'},
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<MultiComboBox>;

const Template: UI5StoryArgs<MultiComboBox, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic MultiComboBox</h3>
	<div class="snippet" style="display: flex; flex-wrap: wrap;">
		<ui5-multi-combobox placeholder="Type your value">
			<ui5-mcb-item selected="" text="UI5"></ui5-mcb-item>
		</ui5-multi-combobox>
		<ui5-multi-combobox readonly="" value="Readonly combo">
			<ui5-mcb-item selected="" text="UI5"></ui5-mcb-item>
		</ui5-multi-combobox>
		<ui5-multi-combobox disabled="" value="Disabled combo">
			<ui5-mcb-item selected="" text="UI5"></ui5-mcb-item>
		</ui5-multi-combobox>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>MultiComboBox with items</h3>
	<div class="snippet">
		<ui5-multi-combobox style="width: 100%" placeholder="Choose your countries">
			<ui5-mcb-item selected="" text="Argentina"></ui5-mcb-item>
			<ui5-mcb-item text="Bulgaria"></ui5-mcb-item>
			<ui5-mcb-item text="Denmark"></ui5-mcb-item>
			<ui5-mcb-item text="England"></ui5-mcb-item>
			<ui5-mcb-item text="Albania"></ui5-mcb-item>
			<ui5-mcb-item text="Morocco"></ui5-mcb-item>
			<ui5-mcb-item text="Portugal"></ui5-mcb-item>
			<ui5-mcb-item text="Germany"></ui5-mcb-item>
			<ui5-mcb-item text="Philippines"></ui5-mcb-item>
			<ui5-mcb-item text="Paraguay"></ui5-mcb-item>
		</ui5-multi-combobox>
	</div>
`;


export const Template2: StoryFn = () => html`
<h3>MultiComboBox with free text input</h3>
	<div class="snippet">
		<ui5-multi-combobox style="width: 100%" placeholder="Choose your countries" allow-custom-values="">
			<ui5-mcb-item text="Argentina"></ui5-mcb-item>
			<ui5-mcb-item selected="" text="Bulgaria"></ui5-mcb-item>
			<ui5-mcb-item text="Denmark"></ui5-mcb-item>
			<ui5-mcb-item selected="" text="England"></ui5-mcb-item>
			<ui5-mcb-item text="Albania"></ui5-mcb-item>
			<ui5-mcb-item text="Morocco"></ui5-mcb-item>
			<ui5-mcb-item text="Portugal"></ui5-mcb-item>
			<ui5-mcb-item selected="" text="Germany"></ui5-mcb-item>
			<ui5-mcb-item text="Philippines"></ui5-mcb-item>
			<ui5-mcb-item text="Paraguay"></ui5-mcb-item>
		</ui5-multi-combobox>
	</div>
`;


export const Template3: StoryFn = () => html`
<h3>MultiComboBox with Value State</h3>
	<div class="snippet" style="display: flex; flex-wrap: wrap;">
		<ui5-multi-combobox value-state="Success">
			<ui5-mcb-item text="Fortune"></ui5-mcb-item>
			<ui5-mcb-item text="Luck"></ui5-mcb-item>
			<ui5-mcb-item selected="" text="Success"></ui5-mcb-item>
		</ui5-multi-combobox>
		<ui5-multi-combobox value-state="Warning">
			<ui5-mcb-item text="Attention"></ui5-mcb-item>
			<ui5-mcb-item text="Caution"></ui5-mcb-item>
			<ui5-mcb-item selected="" text="Warning"></ui5-mcb-item>
		</ui5-multi-combobox>
		<ui5-multi-combobox value-state="Error">
			<ui5-mcb-item text="Fault"></ui5-mcb-item>
			<ui5-mcb-item selected="" text="Error"></ui5-mcb-item>
			<ui5-mcb-item text="Mistake"></ui5-mcb-item>
		</ui5-multi-combobox>
	</div>
`;


export const Template4: StoryFn = () => html`
<h3>MultiComboBox with Grouping of Items</h3>
	<div class="snippet responsive-snippet">
		<ui5-multi-combobox placeholder="Select a country">
			<ui5-mcb-group-item text="Asia"></ui5-mcb-group-item>
			<ui5-mcb-item text="Afghanistan"></ui5-mcb-item>
			<ui5-mcb-item text="China"></ui5-mcb-item>
			<ui5-mcb-item text="India"></ui5-mcb-item>
			<ui5-mcb-item text="Indonesia"></ui5-mcb-item>
			<ui5-mcb-group-item text="Europe"></ui5-mcb-group-item>
			<ui5-mcb-item text="Austria"></ui5-mcb-item>
			<ui5-mcb-item text="Bulgaria"></ui5-mcb-item>
			<ui5-mcb-item text="Germany"></ui5-mcb-item>
			<ui5-mcb-item text="Italy"></ui5-mcb-item>
			<ui5-mcb-group-item text="North America"></ui5-mcb-group-item>
			<ui5-mcb-item text="Canada"></ui5-mcb-item>
			<ui5-mcb-item text="Granada"></ui5-mcb-item>
			<ui5-mcb-item text="Haiti"></ui5-mcb-item>
			<ui5-mcb-item text="United States"></ui5-mcb-item>
		</ui5-multi-combobox>
	</div>
`;
