import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import type Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarAlign from "@ui5/webcomponents/dist/types/ToolbarAlign.js";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";
import TemplateToolbarTypes from "./TemplateToolbarTypes.js";

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

export const Types: StoryFn = TemplateToolbarTypes.bind({});

