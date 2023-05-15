import { html } from "lit";
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
</ui5-table-row>`
}

export const TableStickyHeader = Template.bind({});
TableStickyHeader.decorators = [
	(story) => {
		return html`
<div style="height: 150px; overflow: scroll;">
	${story()}
</div>
`;
	}
]
TableStickyHeader.args = {
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
	stickyColumnHeader: true,
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
			<span><b>Notebook Basic 19</b></span>
			<span style="margin-top: 0.5rem">HT-1003</span>
		</div>
	</ui5-table-cell>
	<ui5-table-cell>
		<span>Smartcards</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span>32 x 21 x 4cm</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span style="color: #2b7c2b"><b>4.2</b>KG</span>
	</ui5-table-cell>
	<ui5-table-cell style="text-align: right">
		<span><b>1650</b>EUR</span>
	</ui5-table-cell>
</ui5-table-row>`
};

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
	let growingTable${index} = document.getElementById("table-${index}"),
		rows${index} = 4,
		loads${index} = 1,
		sliceIndex${index} = 0,
		endSliceIndex${index} = sliceIndex${index} + rows${index};

	async function init(growingTable, rows, loads, sliceIndex, endSliceIndex) {
		let response = await fetch("../assets/data/products.json"),
			products = await response.json(),
			collectionLength = products.length,
			loadsAll = Math.ceil(collectionLength / rows),
		 	result = "";

		products.slice(sliceIndex, endSliceIndex).forEach(function (product, index, arr) {
			let htmlTableRow = "<ui5-table-row  id=roll-" + index + ">" +
						"<ui5-table-cell>" +
						"<div class='double-line-content'>" +
						"<span><b>" + product.name +"</b></span>" +
						"<span style='margin-top: 0.5rem'>" + product.productId +"</span>" +
						"</div></ui5-table-cell>" +
						"<ui5-table-cell><span>" + product.supplierName + "</span></ui5-table-cell>" +
						"<ui5-table-cell style='text-align: right'><span>" + product.width + " x " + product.depth + " x " + product.height + product.dimUnit + "</span></ui5-table-cell>" +
						"<ui5-table-cell style='text-align: right'><span style='color: #2b7c2b' class='middle'><b>" + product.weightMeasure + "</b>" + product.weightUnit + "</span></ui5-table-cell>" +
						"<ui5-table-cell style='text-align: right'><span><b> " + product.price + "</b>" + product.currencyCode + "</span></ui5-table-cell></ui5-table-row>";
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
		growingTable${index}.busy = true;
		setTimeout(function() {
			++loads${index};
			endSliceIndex${index} = sliceIndex${index} + rows${index};
			init(growingTable${index}, rows${index}, loads${index}, sliceIndex${index}, endSliceIndex${index});
			growingTable${index}.busy = false;
		}, 1500);
	}
	growingTable${index}.addEventListener("load-more", loadMore);
	init(growingTable${index}, rows${index}, loads${index}, sliceIndex${index}, endSliceIndex${index});
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
<div style="height: 200px; overflow: scroll;">
	${story()}
</div>
<script>
	let growingTableScroll${index} = document.getElementById("table-${index}"),
		rowsScroll${index} = 4,
		loadsScroll${index} = 1,
		sliceIndexScroll${index} = 0,
		endSliceIndexScroll${index} = sliceIndexScroll${index} + rowsScroll${index};

	async function fill(rowsScroll, loadsScroll, sliceIndexScroll, endSliceIndexScroll) {
		let result = "",
			responseScrollTable = await fetch("../assets/data/products.json"),
			productsScrollTable = await responseScrollTable.json(),
			collectionLengthScroll = productsScrollTable.length,
			loadsAllScroll = Math.ceil(collectionLengthScroll / rowsScroll);

		productsScrollTable.slice(sliceIndexScroll, endSliceIndexScroll).forEach(function (product, index, arr) {
			let test = "<ui5-table-row  id=roll-" + index + ">" +
				"<ui5-table-cell>" +
				"<div class='double-line-content'>" +
				"<span><b>" + product.name +"</b></span>" +
				"<span style='margin-top: 0.5rem'>" + product.productId +"</span>" +
				"</div></ui5-table-cell>" +
				"<ui5-table-cell><span>" + product.supplierName + "</span></ui5-table-cell>" +
				"<ui5-table-cell style='text-align: right'><span>" + product.width + " x " + product.depth + " x " + product.height + product.dimUnit + "</span></ui5-table-cell>" +
				"<ui5-table-cell style='text-align: right'><span style='color: #2b7c2b'><b>" + product.weightMeasure + "</b>" + product.weightUnit + "</span></ui5-table-cell>" +
				"<ui5-table-cell style='text-align: right'><span><b> " + product.price + "</b>" + product.currencyCode + "</span></ui5-table-cell></ui5-table-row>";
			result += test;
		});
		if (loadsScroll >= loadsAllScroll) {
			growingTableScroll${index}.growing = "None";
		} else {
			sliceIndexScroll${index} += rowsScroll${index};
		}
		growingTableScroll${index}.insertAdjacentHTML('beforeend', result);
	}
	function growOnScroll() {
		growingTableScroll${index}.busy = true;
		if (timeout) {
			clearTimeout(timeout);
		}
		var timeout = setTimeout(() => {
			loadsScroll${index}++
			endSliceIndexScroll${index} = sliceIndexScroll${index} + rowsScroll${index};
			fill(rowsScroll${index}, loadsScroll${index}, sliceIndexScroll${index}, endSliceIndexScroll${index});
			growingTableScroll${index}.busy = false;
		}, 1500);
	}
	growingTableScroll${index}.addEventListener("load-more", growOnScroll);
	fill(rowsScroll${index}, loadsScroll${index}, sliceIndexScroll${index}, endSliceIndexScroll${index});
</script>
<style>
	ui5-table ui5-table-column.table-header-text-alignment::part(column) {
		text-align: end;
	}
</style>
`;
	}
]

GrowingTableScroll.storyName = "Growing Table on Scroll";

export const GroupingTableSelect= Template.bind({});
GroupingTableSelect.args = {
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
GroupingTableSelect.storyName = "Table with grouping and select mode";
