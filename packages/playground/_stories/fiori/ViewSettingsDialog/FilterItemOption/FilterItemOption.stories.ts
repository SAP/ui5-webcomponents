import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type FilterItemOption from "@ui5/webcomponents-fiori/dist/FilterItemOption.js";

export default {
	title: "Fiori/View Settings Dialog/Filter Item Option",
	component: "FilterItemOption",
	argTypes,
} as Meta<FilterItemOption>;

const Template: UI5StoryArgs<FilterItemOption, StoryArgsSlots> = (args) => html`<ui5-view-settings-dialog id="vsd1">
	<ui5-filter-item slot="filterItems" text="Department">
		<ui5-filter-item-option
			slot="values"
			text="${ifDefined(args.text)}"
			?selected="${ifDefined(args.selected)}"
		></ui5-filter-item-option>
		<ui5-filter-item-option
			slot="values"
			text="Management"
		></ui5-filter-item-option>
	</ui5-filter-item>
</ui5-view-settings-dialog>`;

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	text: "Current filter item option",
	selected: true
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
