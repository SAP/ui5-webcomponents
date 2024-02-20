import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import type ToolbarSeparator from "@ui5/webcomponents/dist/ToolbarSeparator.js";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

export default {
	title: "Main/Toolbar/Toolbar Separator",
	component: "ToolbarSeparator",
	argTypes,
} as Meta<ToolbarSeparator>;

const Template: UI5StoryArgs<ToolbarSeparator, StoryArgsSlots> = (args) => {
	return html`
<ui5-toolbar align-content="Start">
	<ui5-toolbar-button text="Simple button 1"></ui5-toolbar-button>
	<ui5-toolbar-separator></ui5-toolbar-separator>
	<ui5-toolbar-button text="Simple button 2"></ui5-toolbar-button>
</ui5-toolbar>`;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {};