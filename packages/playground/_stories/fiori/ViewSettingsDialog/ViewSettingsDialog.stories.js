import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/ViewSettingsDialog",
    component: "ui5-view-settings-dialog",
    subcomponents: {'SortItem' : 'ui5-sort-item', 'FilterItem' : 'ui5-filter-item', 'FilterItemOption' : 'ui5-filter-item-option'},
    argTypes,
};


export const Template0 = () => html`
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