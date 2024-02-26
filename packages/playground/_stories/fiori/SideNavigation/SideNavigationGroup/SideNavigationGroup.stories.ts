import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta } from "@storybook/web-components";
import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type SideNavigationGroup from "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";

export default {
	title: "Fiori/Side Navigation/Side Navigation Group",
	component: "SideNavigationGroup",
	argTypes,
} as Meta<SideNavigationGroup>;

const Template: UI5StoryArgs<SideNavigationGroup, StoryArgsSlots> = (args) => {
	return html`
<ui5-side-navigation>
	<ui5-side-navigation-group
		text="${ifDefined(args.text)}"
		?expanded="${ifDefined(args.expanded)}"
	>
		${unsafeHTML(args.default)}
	</ui5-side-navigation-group>
</ui5-side-navigation>`;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	text: "Group",
	expanded: true,
	default: `<ui5-side-navigation-item text="Item"></ui5-side-navigation-item>`
};