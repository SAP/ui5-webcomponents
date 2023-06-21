import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { StoryFn, Meta } from "@storybook/web-components";

import Toolbar from "@ui5/webcomponents/dist/Toolbar";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import ToolbarDesign from "@ui5/webcomponents/dist/types/ToolbarDesign.js";
import ToolbarStyling from "@ui5/webcomponents/dist/types/ToolbarStyling.js";
import ToolbarAlign from "@ui5/webcomponents/dist/types/ToolbarAlign.js";

import { DocsPage } from "../../../.storybook/docs";

const component = "ui5-toolbar";

export default {
  title: "Main/Toolbar",
  component,
  subcomponents: { ToolbarItem: "ui5-toolbar-item" },
  argTypes,
  parameters: {
    docs: {
      page: DocsPage({ ...componentInfo, component })
    },
  },
} as Meta<Toolbar>;

const Template: UI5StoryArgs<Toolbar, StoryArgsSlots> = (args) => {
	return html` <ui5-toolbar
		design="${ifDefined(args.design)}"
		styling="${ifDefined(args.styling)}"
		align-content="${ifDefined(args.alignContent)}"
		?disabled="${ifDefined(args.disabled)}"
		?reverse-overflow="${ifDefined(args.reverseOverflow)}"
	>
		${unsafeHTML(args.default)}
	</ui5-toolbar>`;
};

export const Basic = Template.bind({});

Basic.args = {
	design: ToolbarDesign.Solid,
	default: `
  <ui5-toolbar-button icon="decline" text="Mid 2"></ui5-toolbar-button>
  <ui5-toolbar-button icon="add" text="Right 1"></ui5-toolbar-button>
  <ui5-toolbar-button icon="employee" text="Right 4"></ui5-toolbar-button>
  <ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later"></ui5-toolbar-button>`,
  };
Basic.storyName = "Basic";

export const ToolbarWithSpacer: UI5StoryArgs<Toolbar, StoryArgsSlots> =  Template.bind({});

ToolbarWithSpacer.storyName = "Toolbar with spacer";
ToolbarWithSpacer.args = {
	default: `
	<ui5-toolbar-button icon="add" text="Left 1 (long)" width="150px" design="Default"></ui5-toolbar-button>
	<ui5-toolbar-button icon="decline" text="Left 2"></ui5-toolbar-button>
	<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
	<ui5-toolbar-button icon="decline" text="Left 4"></ui5-toolbar-button>
	<ui5-toolbar-button icon="add" text="Mid 1"></ui5-toolbar-button>
	<ui5-toolbar-spacer></ui5-toolbar-spacer>
	<ui5-toolbar-button icon="decline" text="Mid 2"></ui5-toolbar-button>
	<ui5-toolbar-button icon="add" text="Right 1"></ui5-toolbar-button>
	<ui5-toolbar-button icon="employee" text="Right 4"></ui5-toolbar-button>
	<ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later"></ui5-toolbar-button>`
}

export const ToolbarWithSeparator: UI5StoryArgs<Toolbar, StoryArgsSlots> = Template.bind({});

ToolbarWithSeparator.storyName = "Toolbar with separator";

ToolbarWithSeparator.args = {
	default: `
		<ui5-toolbar-button icon="add" text="Left 1 (long)" width="150px" design="Default"></ui5-toolbar-button>
		<ui5-toolbar-button icon="decline" text="Left 2"></ui5-toolbar-button>
		<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
		<ui5-toolbar-button icon="decline" text="Left 4"></ui5-toolbar-button>
		<ui5-toolbar-button icon="add" text="Mid 1"></ui5-toolbar-button>
		<ui5-toolbar-separator></ui5-toolbar-separator>
		<ui5-toolbar-button icon="decline" text="Mid 2"></ui5-toolbar-button>
		<ui5-toolbar-button icon="add" text="Right 1"></ui5-toolbar-button>
		<ui5-toolbar-button icon="employee" text="Right 4"></ui5-toolbar-button>
		<ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later"></ui5-toolbar-button>`
}

export const ToolbarWithAlwaysOverflowElements: UI5StoryArgs<Toolbar, StoryArgsSlots> = Template.bind({});

ToolbarWithAlwaysOverflowElements.storyName = "Toolbar with 'always overflow' elements";

ToolbarWithAlwaysOverflowElements.args = {
	default: `
		<ui5-toolbar-button icon="add" text="Left 1 (long)" width="150px" design="Default"></ui5-toolbar-button>
		<ui5-toolbar-button icon="decline" text="Left 2"></ui5-toolbar-button>
		<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
		<ui5-toolbar-button icon="decline" text="Left 4"></ui5-toolbar-button>
		<ui5-toolbar-button icon="add" text="Mid 1"></ui5-toolbar-button>
		<ui5-toolbar-button icon="decline" text="Mid 2" overflow-priority="AlwaysOverflow"></ui5-toolbar-button>
		<ui5-toolbar-button icon="add" text="Right 1" overflow-priority="AlwaysOverflow"></ui5-toolbar-button>
		<ui5-toolbar-button icon="employee" text="Right 4" overflow-priority="AlwaysOverflow"></ui5-toolbar-button>
		<ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later" overflow-priority="AlwaysOverflow"></ui5-toolbar-button>`
}

export const ToolbarWithNeverOverflowElements: UI5StoryArgs<Toolbar, StoryArgsSlots> = Template.bind({});

ToolbarWithNeverOverflowElements.storyName = "Toolbar with 'never overflow' elements";

ToolbarWithNeverOverflowElements.args = {
	default: `
		<ui5-toolbar-button icon="add" text="Left 1 (long)" overflow-priority="NeverOverflow" width="150px" design="Default"></ui5-toolbar-button>
		<ui5-toolbar-button icon="decline" text="Left 2" overflow-priority="NeverOverflow"></ui5-toolbar-button>
		<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
		<ui5-toolbar-button icon="decline" text="Left 4"></ui5-toolbar-button>
		<ui5-toolbar-button icon="add" text="Mid 1"></ui5-toolbar-button>
		<ui5-toolbar-button icon="decline" text="Mid 2" overflow-priority="NeverOverflow"></ui5-toolbar-button>
		<ui5-toolbar-button icon="add" text="Right 1" overflow-priority="NeverOverflow"></ui5-toolbar-button>
		<ui5-toolbar-button icon="employee" text="Right 4" overflow-priority="NeverOverflow"></ui5-toolbar-button>
		<ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later" overflow-priority="NeverOverflow"></ui5-toolbar-button>`
}

export const ToolbarWithClearStyling = Template.bind({});

ToolbarWithClearStyling.storyName = "Toolbar with clear styling";

ToolbarWithClearStyling.args = {
  styling: ToolbarStyling.Clear,
  default: Basic.args.default
};

export const ToolbarWithTransparentDesign = Template.bind({});

ToolbarWithTransparentDesign.storyName = "Toolbar with transparent design";

ToolbarWithTransparentDesign.args = {
  styling: ToolbarDesign.Transparent,
  default: Basic.args.default
};

export const ToolbarWithStartAlignedElements = Template.bind({});


ToolbarWithStartAlignedElements.storyName = "Toolbar with 'Start' aligned elements";

ToolbarWithStartAlignedElements.args = {
  alignContent: ToolbarAlign.Start,
  default: Basic.args.default
};

