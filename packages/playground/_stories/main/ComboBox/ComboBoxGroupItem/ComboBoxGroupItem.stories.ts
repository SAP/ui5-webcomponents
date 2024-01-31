import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

// @ts-ignore
import type ComboBoxGroupItem from "@ui5/webcomponents/dist/ComboBoxGroupItem.js";

export default {
	title: "Main/Combo Box/Combo Box Group Item",
	component: "ComboBoxGroupItem",
	argTypes,
} as Meta<ComboBoxGroupItem>;

const Template: UI5StoryArgs<ComboBoxGroupItem, StoryArgsSlots> = (
		args
) => html`<ui5-combobox placeholder="Group item showcase">
	<ui5-cb-group-item text="${ifDefined(args.text)}"></ui5-cb-group-item>
	<ui5-cb-item text="Canada"></ui5-cb-item>
	<ui5-cb-item text="Chile"></ui5-cb-item>
</ui5-combobox>`;

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	text: "My group 1"
};