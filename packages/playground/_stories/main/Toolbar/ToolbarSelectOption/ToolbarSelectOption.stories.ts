import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import type ToolbarSelectOption from "@ui5/webcomponents/dist/ToolbarSelectOption.js";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

export default {
	title: "Main/Toolbar/Toolbar Select Option",
	component: "ToolbarSelectOption",
	argTypes,
} as Meta<ToolbarSelectOption>;

const Template: UI5StoryArgs<ToolbarSelectOption, StoryArgsSlots> = (args) => {
	return html`
	<ui5-toolbar align-content="Start">
	<ui5-toolbar-select>
		<ui5-toolbar-select-option ?selected=${ifDefined(args.selected)}>${unsafeHTML(args.default)}</ui5-toolbar-select-option>
	</ui5-toolbar-select>
</ui5-toolbar>`;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	default: `Toolbar select option 1`
};