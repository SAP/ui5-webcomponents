import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import type ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

export default {
	title: "Main/Toolbar/Toolbar Button",
	component: "ToolbarButton",
	argTypes,
} as Meta<ToolbarButton>;

const Template: UI5StoryArgs<ToolbarButton, StoryArgsSlots> = (args) => {
	return html`
<ui5-toolbar align-content="Start">
	<ui5-toolbar-button
		text="${ifDefined(args.text)}"
		accessibility-attributes="${ifDefined(args.accessibilityAttributes)}"
		accessible-name="${ifDefined(args.accessibleName)}"
		accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
		design="${ifDefined(args.design)}"
		?disabled="${ifDefined(args.disabled)}"
		icon="${ifDefined(args.icon)}"
		?icon-end="${ifDefined(args.iconEnd)}"
		tooltip="${ifDefined(args.tooltip)}"
		width="${ifDefined(args.width)}"
	></ui5-toolbar-button>
</ui5-toolbar>`;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	text: "Simple toolbar button"
};