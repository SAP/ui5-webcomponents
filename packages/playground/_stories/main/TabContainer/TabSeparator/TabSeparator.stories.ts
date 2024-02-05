import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";
import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";
import type TabSeparator from "@ui5/webcomponents/dist/TabSeparator.js";

export default {
	title: "Main/Tab Container/Tab Separator",
	component: "TabSeparator",
	argTypes,
} as Meta<TabSeparator>;

const Template: UI5StoryArgs<TabSeparator, StoryArgsSlots> = (args) => {
	return html`
<ui5-tabcontainer>
	<ui5-tab icon="calendar" text="Tab 1">
		<ui5-label>Possimus ipsa eos impedit aut nisi repellendus recusandae, temporibus ducimus, necessitatibus tenetur facere, minima vero fugit rem reiciendis natus ratione quia numquam?</ui5-label>
	</ui5-tab>
	<ui5-tab-separator></ui5-tab-separator>
	<ui5-tab icon="action-settings" text="Tab 2">
		<ui5-label>Explicabo laboriosam ab consequuntur, qui dignissimos inventore sapiente ullam quaerat ratione libero vero, beatae laudantium! Aperiam numquam tempore, laudantium perferendis recusandae autem.</ui5-label>
	</ui5-tab>
</ui5-tabcontainer>`;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {};
