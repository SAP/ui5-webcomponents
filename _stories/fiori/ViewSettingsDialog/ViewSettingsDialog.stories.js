import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Fiori/View Settings Dialog",
    component: "ViewSettingsDialog",
    subcomponents: { 'SortItem': 'SortItem', 'FilterItem': 'FilterItem', 'FilterItemOption': 'FilterItemOption' },
    argTypes,
};
const Template = (args) => html `<ui5-view-settings-dialog
	id="${ifDefined(args.id)}"
	sort-descending="${ifDefined(args.sortDescending)}"
>
	${unsafeHTML(args.sortItems)}
	${unsafeHTML(args.filterItems)}
</ui5-view-settings-dialog>`;
export const Basic = Template.bind({});
Basic.storyName = "Example Usage";
Basic.args = {
    id: "vsd1",
    sortDescending: true,
    sortItems: `<ui5-sort-item slot="sortItems" text="Name" selected=""></ui5-sort-item>
<ui5-sort-item slot="sortItems" text="Position"></ui5-sort-item>
<ui5-sort-item slot="sortItems" text="Company"></ui5-sort-item>
<ui5-sort-item slot="sortItems" text="Department"></ui5-sort-item>`,
    filterItems: `<ui5-filter-item slot="filterItems" text="Position">
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
</ui5-filter-item>`,
};
Basic.decorators = [
    (story) => html `<ui5-button id="btnOpenDialog1">Open ViewSettingsDialog</ui5-button>
	${story()}
	<br/>
	<br/>
	<div id="vsdResults"></div>
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
//# sourceMappingURL=ViewSettingsDialog.stories.js.map