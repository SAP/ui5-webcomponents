import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import type ToolbarSpacer from "@ui5/webcomponents/dist/ToolbarSpacer.js";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

export default {
	title: "Main/Toolbar/Toolbar Spacer",
	component: "ToolbarSpacer",
	argTypes,
} as Meta<ToolbarSpacer>;

const Template: UI5StoryArgs<ToolbarSpacer, StoryArgsSlots> = (args) => {
	return html`
<ui5-toolbar align-content="Start">
	<ui5-toolbar-button text="Simple button 1"></ui5-toolbar-button>
	<ui5-toolbar-spacer width="${ifDefined(args.width)}"></ui5-toolbar-spacer>
	<ui5-toolbar-button text="Simple button 2"></ui5-toolbar-button>
</ui5-toolbar>`;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	width: "300px"
};