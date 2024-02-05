import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta } from "@storybook/web-components";
import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type SideNavigationSubItem from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";

export default {
	title: "Fiori/Side Navigation/Side Navigation Sub Item",
	component: "SideNavigationSubItem",
	argTypes,
} as Meta<SideNavigationSubItem>;

const Template: UI5StoryArgs<SideNavigationSubItem, StoryArgsSlots> = (args) => {
	return html`
	<ui5-side-navigation>
	<ui5-side-navigation-item text="Events" icon="calendar" expanded>
		<ui5-side-navigation-sub-item
			text="${ifDefined(args.text)}"
			icon="${ifDefined(args.icon)}"
			href="${ifDefined(args.href)}"
			?selected="${ifDefined(args.selected)}"
			target="${ifDefined(args.target)}"
		></ui5-side-navigation-sub-item>
	</ui5-side-navigation-item>
</ui5-side-navigation>`;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	text: "Local",
	selected: true
};