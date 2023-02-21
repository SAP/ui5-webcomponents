import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type ViewSettingsDialog from "@ui5/webcomponents-fiori/dist/ViewSettingsDialog.js";

const component = "ui5-view-settings-dialog";

export default {
    title: "Fiori/ViewSettingsDialog",
    component,
    subcomponents: {'SortItem' : 'ui5-sort-item', 'FilterItem' : 'ui5-filter-item', 'FilterItemOption' : 'ui5-filter-item-option'},
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<ViewSettingsDialog>;

const Template: UI5StoryArgs<ViewSettingsDialog, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Usage</h3>
	<div class="snippet">
		<ui5-button id="btnOpenDialog1">Open ViewSettingsDialog</ui5-button>
		<ui5-view-settings-dialog id="vsd1">
				<ui5-sort-item slot="sortItems" text="Name" selected=""></ui5-sort-item>
				<ui5-sort-item slot="sortItems" text="Position"></ui5-sort-item>
				<ui5-sort-item slot="sortItems" text="Company"></ui5-sort-item>
				<ui5-sort-item slot="sortItems" text="Department"></ui5-sort-item>
				<ui5-filter-item slot="filterItems" text="Position">
					<ui5-filter-item-option slot="values" text="CTO"></ui5-filter-item-option>
					<ui5-filter-item-option slot="values" text="CPO"></ui5-filter-item-option>
					<ui5-filter-item-option slot="values" text="VP"></ui5-filter-item-option>
				</ui5-filter-item>
				<ui5-filter-item slot="filterItems" text="Department">
					<ui5-filter-item-option slot="values" text="Sales"></ui5-filter-item-option>
					<ui5-filter-item-option slot="values" text="Management"></ui5-filter-item-option>
					<ui5-filter-item-option slot="values" text="PR"></ui5-filter-item-option>
				</ui5-filter-item>
				<ui5-filter-item slot="filterItems" text="Location">
					<ui5-filter-item-option slot="values" text="Walldorf"></ui5-filter-item-option>
					<ui5-filter-item-option slot="values" text="New York"></ui5-filter-item-option>
					<ui5-filter-item-option slot="values" text="London"></ui5-filter-item-option>
				</ui5-filter-item>
				<ui5-filter-item slot="filterItems" text="Reports to">
					<ui5-filter-item-option slot="values" text="CTO"></ui5-filter-item-option>
					<ui5-filter-item-option slot="values" text="CPO"></ui5-filter-item-option>
					<ui5-filter-item-option slot="values" text="VP"></ui5-filter-item-option>
				</ui5-filter-item>
			</ui5-view-settings-dialog>
		<br/>
		<br/>
		<div id="vsdResults"></div>
	</div>
	<script>
		var vsdResults = document.getElementById("vsdResults");
		btnOpenDialog1.addEventListener("click", function () {
			vsdResults.innerHTML = "";
			vsd1.show();
		});
		vsd1.addEventListener("confirm", function(evt) {
			vsdResults.innerHTML = JSON.stringify(evt.detail);
		});
	</script>
`;
Template0.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};