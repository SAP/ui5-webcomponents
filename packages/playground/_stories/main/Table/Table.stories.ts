import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type Table from "@ui5/webcomponents/dist/Table.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import TableMode from "@ui5/webcomponents/dist/types/TableMode.js";
import TableGrowingMode from "@ui5/webcomponents/dist/types/TableGrowingMode.js";

const component = "ui5-table";
let index = 0;

export default {
    title: "Main/Table",
    component,
    subcomponents: {'TableColumn' : 'ui5-table-column', 'TableRow' : 'ui5-table-row', 'TableGroupRow' : 'ui5-table-group-row', 'TableCell' : 'ui5-table-cell'},
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Table>;

const Template: UI5StoryArgs<Table, StoryArgsSlots> = (args) => html`
<ui5-table
	id="table-${++index}"
	no-data-text="${ifDefined(args.noDataText)}"
	growing-button-text="${ifDefined(args.growingButtonText)}"
	growing-button-subtext="${ifDefined(args.growingButtonSubtext)}"
	?hide-no-data="${ifDefined(args.hideNoData)}"
	growing="${ifDefined(args.growing)}"
	?busy="${ifDefined(args.busy)}"
	busy-delay="${ifDefined(args.busyDelay)}"
	?sticky-column-header="${ifDefined(args.stickyColumnHeader)}"
	mode="${ifDefined(args.mode)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
>
	${unsafeHTML(args.default)}
	${unsafeHTML(args.columns)}
</ui5-table>
`;

export const BasicTable = Template.bind({});
BasicTable.args = {
	columns: `
<ui5-table-column slot="columns">
	<span style="line-height: 1.4rem">Product</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="800">
	<span style="line-height: 1.4rem">Supplier</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
	<span style="line-height: 1.4rem">Dimensions</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
	<span style="line-height: 1.4rem">Weight</span>
</ui5-table-column>
<ui5-table-column slot="columns" class="table-header-text-alignment">
	<span style="line-height: 1.4rem">Price</span>
</ui5-table-column>`,
default:`
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 15</b></span>
			<span style="margin-top: 0.5rem">HT-1000</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>30 x 18 x 3cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>956</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>`
};

export const TableSingleSelect = Template.bind({});
TableSingleSelect.args = {
	mode: TableMode.SingleSelect,
	columns: `
<ui5-table-column slot="columns">
	<span>Product</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="600" popin-text="Supplier" demand-popin="">
	<span>Supplier</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="800" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
	<span>Dimensions</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="800" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
	<span>Weight</span>
</ui5-table-column>
<ui5-table-column slot="columns" class="table-header-text-alignment">
	<span>Price</span>
</ui5-table-column>`,
default: `
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 15</b></span>
			<span style="margin-top: 0.5rem">HT-1000</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>30 x 18 x 3cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>956</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 175</b></span>
			<span style="margin-top: 0.5rem">HT-1001</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>29 x 17 x 3.1cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.5</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>1249</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 18</b></span>
			<span style="margin-top: 0.5rem">HT-1002</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>28 x 19 x 2.5cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>1570</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>`
}
TableSingleSelect.storyName = "Table in SingleSelect mode";

export const TableMultiSelect = Template.bind({});
TableMultiSelect.args = {
	mode: TableMode.MultiSelect,
	columns: `
<ui5-table-column slot="columns">
	<span>Product</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="600" popin-text="Supplier" demand-popin="">
	<span>Supplier</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="800" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
	<span>Dimensions</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="800" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
	<span>Weight</span>
</ui5-table-column>
<ui5-table-column slot="columns" class="table-header-text-alignment">
	<span>Price</span>
</ui5-table-column>`,
default: `
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 15</b></span>
			<span style="margin-top: 0.5rem">HT-1000</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>30 x 18 x 3cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>956</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 175</b></span>
			<span style="margin-top: 0.5rem">HT-1001</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>29 x 17 x 3.1cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.5</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>1249</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 18</b></span>
			<span style="margin-top: 0.5rem">HT-1002</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>28 x 19 x 2.5cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>1570</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>`
}
TableMultiSelect.storyName = "Table in MultiSelect mode";

export const TableDisplayInline = Template.bind({});
TableDisplayInline.args = {
	columns: `
<ui5-table-column slot="columns">
	<span>Product</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="600" popin-text="Supplier" demand-popin="">
	<span>Supplier</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="800" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
	<span>Dimensions</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="800" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
	<span>Weight</span>
</ui5-table-column>
<ui5-table-column slot="columns" class="table-header-text-alignment">
	<span>Price</span>
</ui5-table-column>`,
default: `
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 15</b></span>
			<span style="margin-top: 0.5rem">HT-1000</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>30 x 18 x 3cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>956</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 175</b></span>
			<span style="margin-top: 0.5rem">HT-1001</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>29 x 17 x 3.1cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.5</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>1249</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 18</b></span>
			<span style="margin-top: 0.5rem">HT-1002</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>28 x 19 x 2.5cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>1570</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 15</b></span>
			<span style="margin-top: 0.5rem">HT-1000</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>30 x 18 x 3cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>956</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 175</b></span>
			<span style="margin-top: 0.5rem">HT-1001</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>29 x 17 x 3.1cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.5</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>1249</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 18</b></span>
			<span style="margin-top: 0.5rem">HT-1002</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>28 x 19 x 2.5cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>1570</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 15</b></span>
			<span style="margin-top: 0.5rem">HT-1000</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>30 x 18 x 3cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>956</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 175</b></span>
			<span style="margin-top: 0.5rem">HT-1001</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>29 x 17 x 3.1cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.5</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>1249</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 18</b></span>
			<span style="margin-top: 0.5rem">HT-1002</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>28 x 19 x 2.5cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>1570</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 15</b></span>
			<span style="margin-top: 0.5rem">HT-1000</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>30 x 18 x 3cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>956</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 175</b></span>
			<span style="margin-top: 0.5rem">HT-1001</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>29 x 17 x 3.1cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.5</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>1249</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>
<ui5-table-row>
	<ui5-table-cell>
		<div class="double-line-content">
			<span><b>Notebook Basic 18</b></span>
			<span style="margin-top: 0.5rem">HT-1002</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Very Best Screens</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>28 x 19 x 2.5cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>1570</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>`
}
TableDisplayInline.decorators = [
	(story) =>  {
		return html `
<div class="header">
	<button id="toggleSticky" style="height: 32px">Toggle Sticky Column Header</button>
</div>
${story()}
<script>
document.getElementById("toggleSticky").addEventListener("click", function(event) {
document.getElementById("table-${index}").stickyColumnHeader = !document.getElementById("table-${index}").stickyColumnHeader
});
</script>`
	}
]


export const TableNoData = Template.bind({});
TableNoData.args = {
	columns: `
<ui5-table-column slot="columns">
	<span style="line-height: 1.4rem">Product</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="800">
	<span style="line-height: 1.4rem">Supplier</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
	<span style="line-height: 1.4rem">Dimensions</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
	<span style="line-height: 1.4rem">Weight</span>
</ui5-table-column>
<ui5-table-column slot="columns" class="table-header-text-alignment">
	<span style="line-height: 1.4rem">Price</span>
</ui5-table-column>`,
	noDataText: "No Data"

};
TableNoData.storyName = "Table with No Data";

export const GrowingTableMoreButton= Template.bind({});
GrowingTableMoreButton.args = {
	growing: TableGrowingMode.Button,
	growingButtonSubtext: "[4 / 12]",
	columns: `
<ui5-table-column slot="columns">
	<span style="line-height: 1.4rem">Product</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="800">
	<span style="line-height: 1.4rem">Supplier</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
	<span style="line-height: 1.4rem">Dimensions</span>
</ui5-table-column>
<ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
	<span style="line-height: 1.4rem">Weight</span>
</ui5-table-column>
<ui5-table-column slot="columns" class="table-header-text-alignment">
	<span style="line-height: 1.4rem">Price</span>
</ui5-table-column>`

};
GrowingTableMoreButton.decorators = [
	(story) => {
		return html`
${story()}
<script>
	// Growing Table
	var products = {
		"ProductCollection": [
			{
				"ProductId": "HT-1000",
				"Category": "Laptops",
				"MainCategory": "Computer Systems",
				"TaxTarifCode": "1",
				"SupplierName": "Very Best Screens",
				"WeightMeasure": 4.2,
				"WeightUnit": "KG",
				"Description": "Notebook Basic 15 with 2,80 GHz quad core, 15' LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
				"Name": "Notebook Basic 15",
				"DateOfSale": "2017-03-26",
				"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
				"Status": "Available",
				"Quantity": 10,
				"UoM": "PC",
				"CurrencyCode": "EUR",
				"Price": 956,
				"Width": 30,
				"Depth": 18,
				"Height": 3,
				"DimUnit": "cm"
			},
			{
				"ProductId": "HT-1001",
				"Category": "Laptops",
				"MainCategory": "Computer Systems",
				"TaxTarifCode": "1",
				"SupplierName": "Very Best Screens",
				"WeightMeasure": 4.5,
				"WeightUnit": "KG",
				"Description": "Notebook Basic 17 with 2,80 GHz quad core, 17' LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
				"Name": "Notebook Basic 17",
				"DateOfSale": "2017-04-17",
				"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
				"Status": "Available",
				"Quantity": 20,
				"UoM": "PC",
				"CurrencyCode": "EUR",
				"Price": 1249,
				"Width": 29,
				"Depth": 17,
				"Height": 3.1,
				"DimUnit": "cm"
			},
			{
				"ProductId": "HT-1002",
				"Category": "Laptops",
				"MainCategory": "Computer Systems",
				"TaxTarifCode": "1",
				"SupplierName": "Very Best Screens",
				"WeightMeasure": 4.2,
				"WeightUnit": "KG",
				"Description": "Notebook Basic 18 with 2,80 GHz quad core, 18' LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
				"Name": "Notebook Basic 18",
				"DateOfSale": "2017-01-07",
				"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1002.jpg",
				"Status": "Available",
				"Quantity": 10,
				"UoM": "PC",
				"CurrencyCode": "EUR",
				"Price": 1570,
				"Width": 28,
				"Depth": 19,
				"Height": 2.5,
				"DimUnit": "cm"
			},
			{
				"ProductId": "HT-1003",
				"Category": "Laptops",
				"MainCategory": "Computer Systems",
				"TaxTarifCode": "1",
				"SupplierName": "Smartcards",
				"WeightMeasure": 4.2,
				"WeightUnit": "KG",
				"Description": "Notebook Basic 19 with 2,80 GHz quad core, 19' LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
				"Name": "Notebook Basic 19",
				"DateOfSale": "2017-04-09",
				"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1003.jpg",
				"Status": "Available",
				"Quantity": 15,
				"UoM": "PC",
				"CurrencyCode": "EUR",
				"Price": 1650,
				"Width": 32,
				"Depth": 21,
				"Height": 4,
				"DimUnit": "cm"
			},
			{
				"ProductId": "HT-1007",
				"Category": "Accessories",
				"MainCategory": "Computer Components",
				"TaxTarifCode": "1",
				"SupplierName": "Technocom",
				"WeightMeasure": 0.2,
				"WeightUnit": "KG",
				"Description": "Digital Organizer with State-of-the-Art Storage Encryption",
				"Name": "ITelO Vault",
				"DateOfSale": "2017-05-17",
				"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1007.jpg",
				"Status": "Available",
				"Quantity": 15,
				"UoM": "PC",
				"CurrencyCode": "EUR",
				"Price": 299,
				"Width": 32,
				"Depth": 22,
				"Height": 3,
				"DimUnit": "cm"
			},
			{
				"ProductId": "HT-1010",
				"Category": "Accessories",
				"MainCategory": "Computer Systems",
				"TaxTarifCode": "1",
				"SupplierName": "Very Best Screens",
				"WeightMeasure": 4.3,
				"WeightUnit": "KG",
				"Description": "Notebook Professional 15 with 2,80 GHz quad core, 15' Multitouch LCD, 8 GB DDR3 RAM, 500 GB SSD - DVD-Writer (DVD-R/+R/-RW/-RAM),Windows 8 Pro",
				"Name": "Notebook Professional 15",
				"DateOfSale": "2017-02-22",
				"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1010.jpg",
				"Status": "Available",
				"Quantity": 16,
				"UoM": "PC",
				"CurrencyCode": "EUR",
				"Price": 1999,
				"Width": 33,
				"Depth": 20,
				"Height": 3,
				"DimUnit": "cm"
			},
			{
				"ProductId": "HT-1011",
				"Category": "Laptops",
				"MainCategory": "Computer Systems",
				"TaxTarifCode": "1",
				"SupplierName": "Very Best Screens",
				"WeightMeasure": 4.1,
				"WeightUnit": "KG",
				"Description": "Notebook Professional 17 with 2,80 GHz quad core, 17' Multitouch LCD, 8 GB DDR3 RAM, 500 GB SSD - DVD-Writer (DVD-R/+R/-RW/-RAM),Windows 8 Pro",
				"Name": "Notebook Professional 17",
				"DateOfSale": "2017-01-02",
				"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1011.jpg",
				"Status": "Available",
				"Quantity": 17,
				"UoM": "PC",
				"CurrencyCode": "EUR",
				"Price": 2299,
				"Width": 33,
				"Depth": 23,
				"Height": 2,
				"DimUnit": "cm"
			},
			{
				"ProductId": "HT-1020",
				"Category": "Accessories",
				"MainCategory": "Computer Components",
				"TaxTarifCode": "1",
				"SupplierName": "Technocom",
				"WeightMeasure": 0.16,
				"WeightUnit": "KG",
				"Description": "Digital Organizer with State-of-the-Art Encryption for Storage and Network Communications",
				"Name": "ITelO Vault Net",
				"DateOfSale": "2017-05-08",
				"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1020.jpg",
				"Status": "Available",
				"Quantity": 14,
				"UoM": "PC",
				"CurrencyCode": "EUR",
				"Price": 459,
				"Width": 10,
				"Depth": 1.8,
				"Height": 17,
				"DimUnit": "cm"
			},
			{
				"ProductId": "HT-1021",
				"Category": "Accessories",
				"MainCategory": "Computer Components",
				"TaxTarifCode": "1",
				"SupplierName": "Technocom",
				"WeightMeasure": 0.18,
				"WeightUnit": "KG",
				"Description": "Digital Organizer with State-of-the-Art Encryption for Storage and Secure Stellite Link",
				"Name": "ITelO Vault SAT",
				"DateOfSale": "2017-06-30",
				"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1021.jpg",
				"Status": "Available",
				"Quantity": 50,
				"UoM": "PC",
				"CurrencyCode": "EUR",
				"Price": 149,
				"Width": 11,
				"Depth": 1.7,
				"Height": 18,
				"DimUnit": "cm"
			},
			{
				"ProductId": "HT-1022",
				"Category": "Accessories",
				"MainCategory": "Computer Components",
				"TaxTarifCode": "1",
				"SupplierName": "Technocom",
				"WeightMeasure": 0.2,
				"WeightUnit": "KG",
				"Description": "32 GB Digital Assistant with high-resolution color screen",
				"Name": "Comfort Easy",
				"DateOfSale": "2017-03-02",
				"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1022.jpg",
				"Status": "Available",
				"Quantity": 30,
				"UoM": "PC",
				"CurrencyCode": "EUR",
				"Price": 1679,
				"Width": 84,
				"Depth": 1.5,
				"Height": 14,
				"DimUnit": "cm"
			},
			{
				"ProductId": "HT-1023",
				"Category": "Accessories",
				"MainCategory": "Computer Components",
				"TaxTarifCode": "1",
				"SupplierName": "Technocom",
				"WeightMeasure": 0.8,
				"WeightUnit": "KG",
				"Description": "64 GB Digital Assistant with high-resolution color screen and synthesized voice output",
				"Name": "Comfort Senior",
				"DateOfSale": "2017-02-25",
				"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1023.jpg",
				"Status": "Available",
				"Quantity": 24,
				"UoM": "PC",
				"CurrencyCode": "EUR",
				"Price": 512,
				"Width": 80,
				"Depth": 1.6,
				"Height": 13,
				"DimUnit": "cm"
			}
		]
	},
	growingTable = document.getElementById("table-${index}"),
	collectionLength = products.ProductCollection.length;
	rows = 4,
	loads = 1,
	loadsAll = Math.ceil(collectionLength / rows),
	sliceIndex = 0,
	endSliceIndex = sliceIndex + rows;

	function init(rows) {
		let result = "";
		products.ProductCollection.slice(sliceIndex, endSliceIndex).forEach(function (product, index, arr) {
			let htmlTableRow = "<ui5-table-row  id=roll-" + index + ">" +
						"<ui5-table-cell>" +
						"<div class='double-line-content'>" +
						"<span><b>" + product.Name +"</b></span>" +
						"<span style='margin-top: 0.5rem'>" + product.ProductId +"</span>" +
						"</div></ui5-table-cell>" +
						"<ui5-table-cell><span>" + product.SupplierName + "</span></ui5-table-cell>" +
						"<ui5-table-cell style='text-align: right'><span>" + product.Width + " x " + product.Depth + " x " + product.Height + product.DimUnit + "</span></ui5-table-cell>" +
						"<ui5-table-cell style='text-align: right'><span style='color: #2b7c2b' class='middle'><b>" + product.WeightMeasure + "</b>" + product.WeightUnit + "</span></ui5-table-cell>" +
						"<ui5-table-cell style='text-align: right'><span><b> " + product.Price + "</b>" + product.CurrencyCode + "</span></ui5-table-cell></ui5-table-row>";
			result += htmlTableRow;
		});
		if (loads >= loadsAll) {
			growingTable.growing = "None";
		} else {
			growingTable.setAttribute("growing-button-subtext", loads * rows + " of " + collectionLength);
			sliceIndex += rows;
		}
		growingTable.insertAdjacentHTML('beforeend', result);

	}
	function loadMore() {
		growingTable.busy = true;
		setTimeout(function() {
			++loads;
			endSliceIndex = sliceIndex + rows;
			init(rows);
			growingTable.busy = false;
		}, 1500);
	}
	growingTable.addEventListener("load-more", loadMore);
	init(rows);
</script>
<style>
	ui5-table ui5-table-column.table-header-text-alignment::part(column) {
		text-align: end;
	}
</style>
`;
	}
]
GrowingTableMoreButton.storyName = 'Growing Table with "More" button';


export const GrowingTableScroll = Template.bind({});
GrowingTableScroll.args = {
	growing: TableGrowingMode.Scroll,
	columns: `
<ui5-table-column id="column-1" slot="columns" width="350px">
	<ui5-label>Product</ui5-label>
</ui5-table-column>
<ui5-table-column id="column-2" slot="columns" min-width="800" popin-text="Supplier">
	<ui5-label>Supplier</ui5-label>
</ui5-table-column>
<ui5-table-column id="column-3" slot="columns" min-width="600" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
	<div class="column-content">
		<ui5-label>Dimensions</ui5-label>
	</div>
</ui5-table-column>
<ui5-table-column id="column-4" slot="columns" min-width="600" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
	<ui5-label>Weight</ui5-label>
</ui5-table-column>
<ui5-table-column id="column-5" slot="columns" class="table-header-text-alignment">
	<ui5-label>Price</ui5-label>
</ui5-table-column>`
}

GrowingTableScroll.decorators = [
	(story) =>  {
		return html `
			${story()}
		<script>
			var productsScrollTable = {
				"ProductCollection": [
					{
						"ProductId": "HT-1000",
						"Category": "Laptops",
						"MainCategory": "Computer Systems",
						"TaxTarifCode": "1",
						"SupplierName": "Very Best Screens",
						"WeightMeasure": 4.2,
						"WeightUnit": "KG",
						"Description": "Notebook Basic 15 with 2,80 GHz quad core, 15' LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
						"Name": "Notebook Basic 15",
						"DateOfSale": "2017-03-26",
						"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
						"Status": "Available",
						"Quantity": 10,
						"UoM": "PC",
						"CurrencyCode": "EUR",
						"Price": 956,
						"Width": 30,
						"Depth": 18,
						"Height": 3,
						"DimUnit": "cm"
					},
					{
						"ProductId": "HT-1001",
						"Category": "Laptops",
						"MainCategory": "Computer Systems",
						"TaxTarifCode": "1",
						"SupplierName": "Very Best Screens",
						"WeightMeasure": 4.5,
						"WeightUnit": "KG",
						"Description": "Notebook Basic 17 with 2,80 GHz quad core, 17' LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
						"Name": "Notebook Basic 17",
						"DateOfSale": "2017-04-17",
						"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
						"Status": "Available",
						"Quantity": 20,
						"UoM": "PC",
						"CurrencyCode": "EUR",
						"Price": 1249,
						"Width": 29,
						"Depth": 17,
						"Height": 3.1,
						"DimUnit": "cm"
					},
					{
						"ProductId": "HT-1002",
						"Category": "Laptops",
						"MainCategory": "Computer Systems",
						"TaxTarifCode": "1",
						"SupplierName": "Very Best Screens",
						"WeightMeasure": 4.2,
						"WeightUnit": "KG",
						"Description": "Notebook Basic 18 with 2,80 GHz quad core, 18' LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
						"Name": "Notebook Basic 18",
						"DateOfSale": "2017-01-07",
						"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1002.jpg",
						"Status": "Available",
						"Quantity": 10,
						"UoM": "PC",
						"CurrencyCode": "EUR",
						"Price": 1570,
						"Width": 28,
						"Depth": 19,
						"Height": 2.5,
						"DimUnit": "cm"
					},
					{
						"ProductId": "HT-1003",
						"Category": "Laptops",
						"MainCategory": "Computer Systems",
						"TaxTarifCode": "1",
						"SupplierName": "Smartcards",
						"WeightMeasure": 4.2,
						"WeightUnit": "KG",
						"Description": "Notebook Basic 19 with 2,80 GHz quad core, 19' LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
						"Name": "Notebook Basic 19",
						"DateOfSale": "2017-04-09",
						"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1003.jpg",
						"Status": "Available",
						"Quantity": 15,
						"UoM": "PC",
						"CurrencyCode": "EUR",
						"Price": 1650,
						"Width": 32,
						"Depth": 21,
						"Height": 4,
						"DimUnit": "cm"
					},
					{
						"ProductId": "HT-1007",
						"Category": "Accessories",
						"MainCategory": "Computer Components",
						"TaxTarifCode": "1",
						"SupplierName": "Technocom",
						"WeightMeasure": 0.2,
						"WeightUnit": "KG",
						"Description": "Digital Organizer with State-of-the-Art Storage Encryption",
						"Name": "ITelO Vault",
						"DateOfSale": "2017-05-17",
						"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1007.jpg",
						"Status": "Available",
						"Quantity": 15,
						"UoM": "PC",
						"CurrencyCode": "EUR",
						"Price": 299,
						"Width": 32,
						"Depth": 22,
						"Height": 3,
						"DimUnit": "cm"
					},
					{
						"ProductId": "HT-1010",
						"Category": "Accessories",
						"MainCategory": "Computer Systems",
						"TaxTarifCode": "1",
						"SupplierName": "Very Best Screens",
						"WeightMeasure": 4.3,
						"WeightUnit": "KG",
						"Description": "Notebook Professional 15 with 2,80 GHz quad core, 15' Multitouch LCD, 8 GB DDR3 RAM, 500 GB SSD - DVD-Writer (DVD-R/+R/-RW/-RAM),Windows 8 Pro",
						"Name": "Notebook Professional 15",
						"DateOfSale": "2017-02-22",
						"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1010.jpg",
						"Status": "Available",
						"Quantity": 16,
						"UoM": "PC",
						"CurrencyCode": "EUR",
						"Price": 1999,
						"Width": 33,
						"Depth": 20,
						"Height": 3,
						"DimUnit": "cm"
					},
					{
						"ProductId": "HT-1011",
						"Category": "Laptops",
						"MainCategory": "Computer Systems",
						"TaxTarifCode": "1",
						"SupplierName": "Very Best Screens",
						"WeightMeasure": 4.1,
						"WeightUnit": "KG",
						"Description": "Notebook Professional 17 with 2,80 GHz quad core, 17' Multitouch LCD, 8 GB DDR3 RAM, 500 GB SSD - DVD-Writer (DVD-R/+R/-RW/-RAM),Windows 8 Pro",
						"Name": "Notebook Professional 17",
						"DateOfSale": "2017-01-02",
						"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1011.jpg",
						"Status": "Available",
						"Quantity": 17,
						"UoM": "PC",
						"CurrencyCode": "EUR",
						"Price": 2299,
						"Width": 33,
						"Depth": 23,
						"Height": 2,
						"DimUnit": "cm"
					},
					{
						"ProductId": "HT-1020",
						"Category": "Accessories",
						"MainCategory": "Computer Components",
						"TaxTarifCode": "1",
						"SupplierName": "Technocom",
						"WeightMeasure": 0.16,
						"WeightUnit": "KG",
						"Description": "Digital Organizer with State-of-the-Art Encryption for Storage and Network Communications",
						"Name": "ITelO Vault Net",
						"DateOfSale": "2017-05-08",
						"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1020.jpg",
						"Status": "Available",
						"Quantity": 14,
						"UoM": "PC",
						"CurrencyCode": "EUR",
						"Price": 459,
						"Width": 10,
						"Depth": 1.8,
						"Height": 17,
						"DimUnit": "cm"
					},
					{
						"ProductId": "HT-1021",
						"Category": "Accessories",
						"MainCategory": "Computer Components",
						"TaxTarifCode": "1",
						"SupplierName": "Technocom",
						"WeightMeasure": 0.18,
						"WeightUnit": "KG",
						"Description": "Digital Organizer with State-of-the-Art Encryption for Storage and Secure Stellite Link",
						"Name": "ITelO Vault SAT",
						"DateOfSale": "2017-06-30",
						"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1021.jpg",
						"Status": "Available",
						"Quantity": 50,
						"UoM": "PC",
						"CurrencyCode": "EUR",
						"Price": 149,
						"Width": 11,
						"Depth": 1.7,
						"Height": 18,
						"DimUnit": "cm"
					},
					{
						"ProductId": "HT-1022",
						"Category": "Accessories",
						"MainCategory": "Computer Components",
						"TaxTarifCode": "1",
						"SupplierName": "Technocom",
						"WeightMeasure": 0.2,
						"WeightUnit": "KG",
						"Description": "32 GB Digital Assistant with high-resolution color screen",
						"Name": "Comfort Easy",
						"DateOfSale": "2017-03-02",
						"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1022.jpg",
						"Status": "Available",
						"Quantity": 30,
						"UoM": "PC",
						"CurrencyCode": "EUR",
						"Price": 1679,
						"Width": 84,
						"Depth": 1.5,
						"Height": 14,
						"DimUnit": "cm"
					},
					{
						"ProductId": "HT-1023",
						"Category": "Accessories",
						"MainCategory": "Computer Components",
						"TaxTarifCode": "1",
						"SupplierName": "Technocom",
						"WeightMeasure": 0.8,
						"WeightUnit": "KG",
						"Description": "64 GB Digital Assistant with high-resolution color screen and synthesized voice output",
						"Name": "Comfort Senior",
						"DateOfSale": "2017-02-25",
						"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1023.jpg",
						"Status": "Available",
						"Quantity": 24,
						"UoM": "PC",
						"CurrencyCode": "EUR",
						"Price": 512,
						"Width": 80,
						"Depth": 1.6,
						"Height": 13,
						"DimUnit": "cm"
					}
				]
			},
			growingTableScroll = document.getElementById("table-${index}"),
			result = '',
			collectionLengthScroll = productsScrollTable.ProductCollection.length;
			rowsScroll = 4,
			loadsScroll = 1,
			loadsAllScroll = Math.ceil(collectionLengthScroll / rowsScroll),
			sliceIndexScroll = 0,
			endSliceIndexScroll = sliceIndexScroll + rowsScroll;
			function fill(rowsScroll) {
				productsScrollTable.ProductCollection.slice(sliceIndexScroll, endSliceIndexScroll).forEach(function (product, index, arr) {
					let test = "<ui5-table-row  id=roll-" + index + ">" +
						"<ui5-table-cell>" +
						"<div class='double-line-content'>" +
						"<span><b>" + product.Name +"</b></span>" +
						"<span style='margin-top: 0.5rem'>" + product.ProductId +"</span>" +
						"</div></ui5-table-cell>" +
						"<ui5-table-cell><span>" + product.SupplierName + "</span></ui5-table-cell>" +
						"<ui5-table-cell style='text-align: right'><span>" + product.Width + " x " + product.Depth + " x " + product.Height + product.DimUnit + "</span></ui5-table-cell>" +
						"<ui5-table-cell style='text-align: right'><span style='color: #2b7c2b'><b>" + product.WeightMeasure + "</b>" + product.WeightUnit + "</span></ui5-table-cell>" +
						"<ui5-table-cell style='text-align: right'><span><b> " + product.Price + "</b>" + product.CurrencyCode + "</span></ui5-table-cell></ui5-table-row>";
					result += test;
				});
				if (loadsScroll >= loadsAllScroll) {
					growingTableScroll.growing = "None";
				} else {
					sliceIndexScroll += rowsScroll;
				}
				growingTableScroll.insertAdjacentHTML('beforeend', result);
			}
			function growOnScroll() {
				growingTableScroll.busy = true;
				if (timeout) {
					clearTimeout(timeout);
				}
				var timeout = setTimeout(() => {
					loadsScroll++
					endSliceIndexScroll = sliceIndexScroll + rowsScroll;
					fill(rowsScroll);
					growingTableScroll.busy = false;
				}, 1500);
			}
			growingTableScroll.addEventListener("load-more", growOnScroll);
			fill(rowsScroll);
</script>
<style>
	ui5-table ui5-table-column.table-header-text-alignment::part(column) {
		text-align: end;
	}
</style>
`
	}
]

GrowingTableScroll.storyName = "Growing Table on Scroll";

export const GroupingTableSingleSelect= Template.bind({});
GroupingTableSingleSelect.args = {
	mode: TableMode.SingleSelect,
	columns: `
	<ui5-table-column id="column-1" slot="columns">
		<ui5-label>City</ui5-label>
	</ui5-table-column>
	<ui5-table-column id="column-2" slot="columns" min-width="500" popin-text="Supplier" demand-popin="">
		<ui5-label>Supplier</ui5-label>
	</ui5-table-column>
	<ui5-table-column id="column-3" slot="columns" min-width="500">
		<ui5-label>Country</ui5-label>
	</ui5-table-column>
	`,
	default: `
	<ui5-table-group-row>Country: Bulgaria</ui5-table-group-row>
	<ui5-table-row>
		<ui5-table-cell><span>Sofia</span></ui5-table-cell>
		<ui5-table-cell><span>Company 1</span></ui5-table-cell>
		<ui5-table-cell><span>Bulgaria</span></ui5-table-cell>
	</ui5-table-row>
	<ui5-table-row>
		<ui5-table-cell><span>Plovdiv</span></ui5-table-cell>
		<ui5-table-cell><span>Company 2</span></ui5-table-cell>
		<ui5-table-cell><span>Bulgaria</span></ui5-table-cell>
	</ui5-table-row>
	<ui5-table-group-row><span>Country: USA</span></ui5-table-group-row>
	<ui5-table-row>
		<ui5-table-cell><span>Denver</span></ui5-table-cell>
		<ui5-table-cell><span>Company 3</span></ui5-table-cell>
		<ui5-table-cell><span>USA</span></ui5-table-cell>
	</ui5-table-row>
	<ui5-table-row>
		<ui5-table-cell><span>Boston</span></ui5-table-cell>
		<ui5-table-cell><span>Company 4</span></ui5-table-cell>
		<ui5-table-cell><span>USA</span></ui5-table-cell>
	</ui5-table-row>
	`
}
GroupingTableSingleSelect.storyName = "Table with grouping (SingleSelect - click on item to set navigated)";




export const GroupingTableMultiSelect= Template.bind({});
GroupingTableMultiSelect.args = {
	mode: TableMode.MultiSelect,
	columns: `
	<ui5-table-column id="column-1" slot="columns">
		<ui5-label>City</ui5-label>
	</ui5-table-column>
	<ui5-table-column id="column-2" slot="columns" min-width="500" popin-text="Supplier" demand-popin="">
		<ui5-label>Supplier</ui5-label>
	</ui5-table-column>
	<ui5-table-column id="column-3" slot="columns" min-width="500">
		<ui5-label>Country</ui5-label>
	</ui5-table-column>
	`,
	default: `
	<ui5-table-group-row>Country: Bulgaria</ui5-table-group-row>
	<ui5-table-row>
		<ui5-table-cell><span>Sofia</span></ui5-table-cell>
		<ui5-table-cell><span>Company 1</span></ui5-table-cell>
		<ui5-table-cell><span>Bulgaria</span></ui5-table-cell>
	</ui5-table-row>
	<ui5-table-row>
		<ui5-table-cell><span>Plovdiv</span></ui5-table-cell>
		<ui5-table-cell><span>Company 2</span></ui5-table-cell>
		<ui5-table-cell><span>Bulgaria</span></ui5-table-cell>
	</ui5-table-row>
	<ui5-table-group-row><span>Country: USA</span></ui5-table-group-row>
	<ui5-table-row>
		<ui5-table-cell><span>Denver</span></ui5-table-cell>
		<ui5-table-cell><span>Company 3</span></ui5-table-cell>
		<ui5-table-cell><span>USA</span></ui5-table-cell>
	</ui5-table-row>
	<ui5-table-row>
		<ui5-table-cell><span>Boston</span></ui5-table-cell>
		<ui5-table-cell><span>Company 4</span></ui5-table-cell>
		<ui5-table-cell><span>USA</span></ui5-table-cell>
	</ui5-table-row>
	`
}
GroupingTableMultiSelect.storyName = "Tables with grouping (MultiSelect)";