import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import type ToolbarSelect from "@ui5/webcomponents/dist/ToolbarSelect.js";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

export default {
	title: "Main/Toolbar/Toolbar Select",
	component: "ToolbarSelect",
	argTypes,
} as Meta<ToolbarSelect>;

const Template: UI5StoryArgs<ToolbarSelect, StoryArgsSlots> = (args) => {
	return html`
<ui5-toolbar align-content="Start">
	<ui5-toolbar-select
		accessible-name="${ifDefined(args.accessibleName)}"
		accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
		?disabled="${ifDefined(args.disabled)}"
		value-state="${ifDefined(args.valueState)}"
		width="${ifDefined(args.width)}"
	>
		${unsafeHTML(args.default)}
	</ui5-toolbar-select>
</ui5-toolbar>`;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	default: `<ui5-toolbar-select-option>Toolbar select option 1</ui5-toolbar-select-option>
<ui5-toolbar-select-option>Toolbar select option 2</ui5-toolbar-select-option>`
};