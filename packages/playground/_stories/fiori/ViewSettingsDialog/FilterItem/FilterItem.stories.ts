import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type FilterItem from "@ui5/webcomponents-fiori/dist/FilterItem.js";

export default {
	title: "Fiori/View Settings Dialog/Filter Item",
	component: "FilterItem",
	argTypes,
} as Meta<FilterItem>;

const Template: UI5StoryArgs<FilterItem, StoryArgsSlots> = (args) => html`<ui5-view-settings-dialog id="vsd1">
	<ui5-filter-item slot="filterItems" text="${ifDefined(args.text)}" additional-text="${ifDefined(args.additionalText)}">
		${unsafeHTML(args.values)}
	</ui5-filter-item>
</ui5-view-settings-dialog>`;

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	text: "Department",
	values: `<ui5-filter-item-option slot="values" text="Sales"></ui5-filter-item-option>
<ui5-filter-item-option slot="values" text="Management"></ui5-filter-item-option>
<ui5-filter-item-option slot="values" text="PR"></ui5-filter-item-option>`
};
Basic.decorators = [
	(story) => html`<ui5-button id="btnOpenDialog1">Open ViewSettingsDialog</ui5-button>
	${story()}
	<script>
		btnOpenDialog1.addEventListener("click", function () {
			vsd1.show();
		});
	</script>
	`,
];
Basic.parameters = {
	docs: {
		story: {
			inline: false,
			iframeHeight: "500px",
		},
	}
};
