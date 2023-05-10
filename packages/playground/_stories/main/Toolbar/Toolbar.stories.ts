import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { StoryFn, Meta } from "@storybook/web-components";

import type Toolbar from "@ui5/webcomponents/dist/Toolbar";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

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
  return html`<ui5-toolbar design="Solid" styling="${ifDefined(args.styling)}">
        <ui5-toolbar-button icon="add" text="Left 1 (long)" width="150px" design="Default"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Left 2"></ui5-toolbar-button>
				<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Left 4"></ui5-toolbar-button>
				<ui5-toolbar-button icon="add" text="Mid 1"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Mid 2"></ui5-toolbar-button>
				<ui5-toolbar-button icon="add" text="Right 1"></ui5-toolbar-button>
				<ui5-toolbar-button icon="employee" text="Right 4"></ui5-toolbar-button>
				<ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later"></ui5-toolbar-button>
    </ui5-toolbar>`;
};

export const Basic = Template.bind({});
Basic.storyName = "Basic";
Basic.args = {
  default: ``,
};

export const ToolbarWithSpacer: UI5StoryArgs<Toolbar, StoryArgsSlots> = (args) => {
  return html`<ui5-toolbar design="Solid">
        <ui5-toolbar-button icon="add" text="Left 1 (long)" width="150px" design="Default"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Left 2"></ui5-toolbar-button>
				<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Left 4"></ui5-toolbar-button>
				<ui5-toolbar-button icon="add" text="Mid 1"></ui5-toolbar-button>
        <ui5-toolbar-spacer></ui5-toolbar-spacer>
				<ui5-toolbar-button icon="decline" text="Mid 2"></ui5-toolbar-button>
				<ui5-toolbar-button icon="add" text="Right 1"></ui5-toolbar-button>
				<ui5-toolbar-button icon="employee" text="Right 4"></ui5-toolbar-button>
				<ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later"></ui5-toolbar-button>
    </ui5-toolbar>`;
};
ToolbarWithSpacer.storyName = "Toolbar with spacer";

export const ToolbarWithSeparator: UI5StoryArgs<Toolbar, StoryArgsSlots> = (args) => {
  return html`<ui5-toolbar design="Solid">
        <ui5-toolbar-button icon="add" text="Left 1 (long)" width="150px" design="Default"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Left 2"></ui5-toolbar-button>
				<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Left 4"></ui5-toolbar-button>
				<ui5-toolbar-button icon="add" text="Mid 1"></ui5-toolbar-button>
        <ui5-toolbar-separator></ui5-toolbar-separator>
				<ui5-toolbar-button icon="decline" text="Mid 2"></ui5-toolbar-button>
				<ui5-toolbar-button icon="add" text="Right 1"></ui5-toolbar-button>
				<ui5-toolbar-button icon="employee" text="Right 4"></ui5-toolbar-button>
				<ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later"></ui5-toolbar-button>
    </ui5-toolbar>`;
};
ToolbarWithSeparator.storyName = "Toolbar with separator";

export const ToolbarWithAlwaysOverflowElements: UI5StoryArgs<Toolbar, StoryArgsSlots> = (args) => {
  return html`<ui5-toolbar design="Solid">
        <ui5-toolbar-button icon="add" text="Left 1 (long)" width="150px" design="Default"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Left 2"></ui5-toolbar-button>
				<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Left 4"></ui5-toolbar-button>
				<ui5-toolbar-button icon="add" text="Mid 1"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Mid 2" priority="always"></ui5-toolbar-button>
				<ui5-toolbar-button icon="add" text="Right 1" priority="Always"></ui5-toolbar-button>
				<ui5-toolbar-button icon="employee" text="Right 4" priority="Always"></ui5-toolbar-button>
				<ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later" priority="Always"></ui5-toolbar-button>
    </ui5-toolbar>`;
};
ToolbarWithAlwaysOverflowElements.storyName = "Toolbar with 'always overflow' elements";

export const ToolbarWithNeverOverflowElements: UI5StoryArgs<Toolbar, StoryArgsSlots> = (args) => {
  return html`<ui5-toolbar design="Solid">
  <ui5-toolbar-button icon="add" text="Left 1 (long)" priority="Never" width="150px" design="Default"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Left 2" priority="Never"></ui5-toolbar-button>
				<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Left 4"></ui5-toolbar-button>
				<ui5-toolbar-button icon="add" text="Mid 1"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Mid 2" priority="Never"></ui5-toolbar-button>
				<ui5-toolbar-button icon="add" text="Right 1" priority="Never"></ui5-toolbar-button>
				<ui5-toolbar-button icon="employee" text="Right 4" priority="Never"></ui5-toolbar-button>
				<ui5-toolbar-button id="myOverflowBtn" icon="employee" text="Call me later" priority="Never"></ui5-toolbar-button>
    </ui5-toolbar>`;
};
ToolbarWithNeverOverflowElements.storyName = "Toolbar with 'never overflow' elements";

export const ToolbarWithClearStyling = Template.bind({styling: "Clear"});
ToolbarWithClearStyling.args = {
  styling: "Clear"
};

ToolbarWithClearStyling.storyName = "Toolbar with clear styling";