import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import type Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarAlign from "@ui5/webcomponents/dist/types/ToolbarAlign.js";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

const component = "ui5-toolbar";

export default {
	title: "Main/Toolbar",
	component: "Toolbar",
	subcomponents: {
		ToolbarButton: "ToolbarButton",
		ToolbarSelect: "ToolbarSelect",
		ToolbarSelectOption: "ToolbarSelectOption",
		ToolbarSeparator: "ToolbarSeparator",
		ToolbarSpacer: "ToolbarSpacer",
	},
	argTypes,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
} as Meta<Toolbar>;

const Template: UI5StoryArgs<Toolbar, StoryArgsSlots> = (args) => {
	return html`<ui5-toolbar
		align-content="${ifDefined(args.alignContent)}"
	>
		${unsafeHTML(args.default)}
</ui5-toolbar>`;
};

export const Basic = Template.bind({});
Basic.storyName = "Basic";
Basic.args = {
	default: `
	<ui5-toolbar-button 
	icon="decline"
	text="Mid 2">
	</ui5-toolbar-button>
	<ui5-toolbar-button
  		icon="add"
  		text="Right 1">
	</ui5-toolbar-button>
	<ui5-toolbar-button
  		icon="employee"
		text="Right 4">
	</ui5-toolbar-button>
	<ui5-toolbar-button
		id="myOverflowBtn"
		icon="employee"
		text="Call me later">
	</ui5-toolbar-button>`,
};


export const WithSpacer: UI5StoryArgs<Toolbar, StoryArgsSlots> =  Template.bind({});

WithSpacer.args = {
	default: `
	<ui5-toolbar-button icon="add" text="Left 1 (long)" width="150px" design="Default"></ui5-toolbar-button>
	<ui5-toolbar-button icon="decline" text="Left 2"></ui5-toolbar-button>
	<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
	<ui5-toolbar-select>
			<ui5-toolbar-select-option>1</ui5-toolbar-select-option>
			<ui5-toolbar-select-option selected>2</ui5-toolbar-select-option>
			<ui5-toolbar-select-option>3</ui5-toolbar-select-option>
		</ui5-toolbar-select>
	<ui5-toolbar-button icon="add" text="Mid 1"></ui5-toolbar-button>
	<ui5-toolbar-spacer></ui5-toolbar-spacer>
	<ui5-toolbar-button icon="decline" text="Mid 2"></ui5-toolbar-button>
	<ui5-toolbar-button icon="add" text="Right 1"></ui5-toolbar-button>
	<ui5-toolbar-button icon="employee" text="Right 4"></ui5-toolbar-button>
	<ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later"></ui5-toolbar-button>`
}

export const WithSeparator: UI5StoryArgs<Toolbar, StoryArgsSlots> = Template.bind({});

WithSeparator.args = {
	default: `
		<ui5-toolbar-button icon="add" text="Left 1 (long)" width="150px" design="Default"></ui5-toolbar-button>
		<ui5-toolbar-button icon="decline" text="Left 2"></ui5-toolbar-button>
		<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
		<ui5-toolbar-select>
			<ui5-toolbar-select-option>1</ui5-toolbar-select-option>
			<ui5-toolbar-select-option selected>2</ui5-toolbar-select-option>
			<ui5-toolbar-select-option>3</ui5-toolbar-select-option>
		</ui5-toolbar-select>
		<ui5-toolbar-button icon="add" text="Mid 1"></ui5-toolbar-button>
		<ui5-toolbar-separator></ui5-toolbar-separator>
		<ui5-toolbar-button icon="decline" text="Mid 2"></ui5-toolbar-button>
		<ui5-toolbar-button icon="add" text="Right 1"></ui5-toolbar-button>
		<ui5-toolbar-button icon="employee" text="Right 4"></ui5-toolbar-button>
		<ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later"></ui5-toolbar-button>`
}

export const WithAlwaysOverflowItems: UI5StoryArgs<Toolbar, StoryArgsSlots> = Template.bind({});

WithAlwaysOverflowItems.storyName = "With 'AlwaysOverflow' items";

WithAlwaysOverflowItems.args = {
	default: `
		<ui5-toolbar-button icon="add" text="Left 1 (long)" width="150px" design="Default"></ui5-toolbar-button>
		<ui5-toolbar-button icon="decline" text="Left 2"></ui5-toolbar-button>
		<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
		<ui5-toolbar-select>
			<ui5-toolbar-select-option>1</ui5-toolbar-select-option>
			<ui5-toolbar-select-option selected>2</ui5-toolbar-select-option>
			<ui5-toolbar-select-option>3</ui5-toolbar-select-option>
		</ui5-toolbar-select>
		<ui5-toolbar-button icon="add" text="Mid 1"></ui5-toolbar-button>
		<ui5-toolbar-button icon="decline" text="Mid 2" overflow-priority="AlwaysOverflow"></ui5-toolbar-button>
		<ui5-toolbar-button icon="add" text="Right 1" overflow-priority="AlwaysOverflow"></ui5-toolbar-button>
		<ui5-toolbar-button icon="employee" text="Right 4" overflow-priority="AlwaysOverflow"></ui5-toolbar-button>
		<ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later" overflow-priority="AlwaysOverflow"></ui5-toolbar-button>`
}

export const WithNeverOverflowItems: UI5StoryArgs<Toolbar, StoryArgsSlots> = Template.bind({});

WithNeverOverflowItems.storyName = "With 'NeverOverflow' items";

WithNeverOverflowItems.args = {
	default: `
		<ui5-toolbar-button icon="add" text="Left 1 (long)" width="150px" design="Default"></ui5-toolbar-button>
		<ui5-toolbar-button icon="decline" text="Left 2" ></ui5-toolbar-button>
		<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
		<ui5-toolbar-select>
			<ui5-toolbar-select-option>1</ui5-toolbar-select-option>
			<ui5-toolbar-select-option selected>2</ui5-toolbar-select-option>
			<ui5-toolbar-select-option>3</ui5-toolbar-select-option>
		</ui5-toolbar-select>
		<ui5-toolbar-button icon="add" text="Mid 1"></ui5-toolbar-button>
		<ui5-toolbar-button icon="decline" text="Mid 2" ></ui5-toolbar-button>
		<ui5-toolbar-button icon="add" text="Right 1" overflow-priority="NeverOverflow"></ui5-toolbar-button>
		<ui5-toolbar-button icon="employee" text="Right 4" ></ui5-toolbar-button>
		<ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later" overflow-priority="NeverOverflow"></ui5-toolbar-button>`
}

export const WithStartAlignedItems = Template.bind({});


WithStartAlignedItems.storyName = "With 'Start' aligned items";

WithStartAlignedItems.args = {
	alignContent: ToolbarAlign.Start,
	default: Basic.args.default
};

