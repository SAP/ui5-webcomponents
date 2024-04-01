import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";
import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";
import type Tab from "@ui5/webcomponents/dist/Tab.js";
import TabLayout from "@ui5/webcomponents/dist/types/TabLayout.js";

export default {
	title: "Main/Tab Container/Tab",
	component: "Tab",
	argTypes,
} as Meta<Tab>;

const Template: UI5StoryArgs<Tab, StoryArgsSlots> = (args) => {
	return html`
<ui5-tabcontainer>
	<ui5-tab
	additional-text="${ifDefined(args.additionalText)}"
	design="${ifDefined(args.design)}"
	?disabled="${ifDefined(args.disabled)}"
	icon="${ifDefined(args.icon)}"
	?selected="${ifDefined(args.selected)}"
	text="${ifDefined(args.text)}"
	>
		${unsafeHTML(args.default)}
		${unsafeHTML(args.items)}
	</ui5-tab>
</ui5-tabcontainer>`;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	text: "Products",
	default: `Products go here`,
	items: `	<ui5-tab slot="items" text="Computers">
	Computers go here ...
	<ui5-tab slot="items" text="Laptops">
		Laptops go here ...
	</ui5-tab>
	<ui5-tab slot="items" text="Desktops">
		<ui5-tab slot="items" text="Work Stations">
			Work Stations go here ...
		</ui5-tab>
		<ui5-tab slot="items" text="Game Stations">
			Game Stations go here ...
		</ui5-tab>
		Desktops go here ...
	</ui5-tab>
</ui5-tab>`
};