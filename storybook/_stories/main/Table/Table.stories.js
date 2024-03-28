import { html } from "lit";
import argTypes from "./argTypes.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import TableMode from "@ui5/webcomponents/dist/types/TableMode.js";
import TableGrowingMode from "@ui5/webcomponents/dist/types/TableGrowingMode.js";
let index = 0;
export default {
    title: "Main/Table",
    component: "Table",
    argTypes,
};
const Template = (args) => html `
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
export const Basic = Template.bind({});
Basic.decorators = [
    (story) => {
        return html `
			<style>
				ui5-table ui5-table-column.table-header-text-alignment::part(column) {
					text-align: end;
				}
			</style>
			${story()}`;
    }
];
Basic.args = {
    mode: TableMode.None,
    columns: `
		<ui5-table-column slot="columns">
			<span>Product</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="800">
			<span>Supplier</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
			<span>Dimensions</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
			<span>Weight</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" class="table-header-text-alignment">
			<span>Price</span>
		</ui5-table-column>`,
    default: `
		<ui5-table-row>
			<ui5-table-cell>
				<span>Notebook Basic 15</span>
			</ui5-table-cell>
			<ui5-table-cell>
				<span>Very Best Screens</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span>30 x 18 x 3cm</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.2</b>KG</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span><b style='padding-right: 0.125rem'>956</b>EUR</span>
			</ui5-table-cell>
		</ui5-table-row>`
};
export const PopinDisplayInline = Template.bind({});
PopinDisplayInline.decorators = [
    (story) => {
        return html `
			<style>
				ui5-table ui5-table-column.table-header-text-alignment::part(column) {
					text-align: end;
				}
			</style>
			${story()}`;
    }
];
PopinDisplayInline.args = {
    columns: `
		<ui5-table-column slot="columns" popin-display="Inline">
			<span>Product</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="600" popin-text="Supplier" demand-popin="" popin-display="Inline">
			<span>Supplier</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="800" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment" popin-display="Inline">
			<span>Dimensions</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="800" popin-text="Weight" demand-popin="" class="table-header-text-alignment" popin-display="Inline">
			<span>Weight</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" class="table-header-text-alignment" popin-display="Inline">
			<span>Price</span>
		</ui5-table-column>`,
    default: `
		<ui5-table-row>
			<ui5-table-cell>
				<span>Notebook Basic 15</span>
			</ui5-table-cell>
			<ui5-table-cell>
				<span>Very Best Screens</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span>30 x 18 x 3cm</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.2</b>KG</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span><b style='padding-right: 0.125rem'>956</b>EUR</span>
			</ui5-table-cell>
		</ui5-table-row>
		<ui5-table-row>
			<ui5-table-cell>
				<span>Notebook Basic 175</span>
			</ui5-table-cell>
			<ui5-table-cell>
				<span>Very Best Screens</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span>29 x 17 x 3.1cm</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.5</b>KG</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span><b style='padding-right: 0.125rem'>1249</b>EUR</span>
			</ui5-table-cell>
		</ui5-table-row>
		<ui5-table-row>
			<ui5-table-cell>
				<span>Notebook Basic 18</span>
			</ui5-table-cell>
			<ui5-table-cell>
				<span>Very Best Screens</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span>28 x 19 x 2.5cm</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.2</b>KG</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span><b style='padding-right: 0.125rem'>1570</b>EUR</span>
			</ui5-table-cell>
		</ui5-table-row>`
};
export const StickyHeader = Template.bind({});
StickyHeader.decorators = [
    story => {
        return html `
			<style>
				ui5-table ui5-table-column.table-header-text-alignment::part(column) {
					text-align: end;
				}
			</style>
			<div style="height: 150px; overflow: scroll;">
				${story()}
			</div>`;
    }
];
StickyHeader.args = {
    stickyColumnHeader: true,
    columns: `
		<ui5-table-column slot="columns">
			<span>Product</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="800">
			<span>Supplier</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
			<span>Dimensions</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
			<span>Weight</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" class="table-header-text-alignment">
			<span>Price</span>
		</ui5-table-column>`,
    default: `
		<ui5-table-row>
			<ui5-table-cell>
				<span>Notebook Basic 15</span>
			</ui5-table-cell>
			<ui5-table-cell>
				<span>Very Best Screens</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span>30 x 18 x 3cm</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.2</b>KG</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span><b style='padding-right: 0.125rem'>956</b>EUR</span>
			</ui5-table-cell>
		</ui5-table-row>
		<ui5-table-row>
			<ui5-table-cell>
				<span>Notebook Basic 175</span>
			</ui5-table-cell>
			<ui5-table-cell>
				<span>Very Best Screens</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span>29 x 17 x 3.1cm</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.5</b>KG</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span><b style='padding-right: 0.125rem'>1249</b>EUR</span>
			</ui5-table-cell>
		</ui5-table-row>
		<ui5-table-row>
			<ui5-table-cell>
				<span>Notebook Basic 18</span>
			</ui5-table-cell>
			<ui5-table-cell>
				<span>Very Best Screens</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span>28 x 19 x 2.5cm</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.2</b>KG</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span><b style='padding-right: 0.125rem'>1570</b>EUR</span>
			</ui5-table-cell>
		</ui5-table-row>
		<ui5-table-row>
			<ui5-table-cell>
				<span>Notebook Basic 19</span>
			</ui5-table-cell>
			<ui5-table-cell>
				<span>Smartcards</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span>32 x 21 x 4cm</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span style="color: #2b7c2b"><b style='padding-right: 0.125rem'>4.2</b>KG</span>
			</ui5-table-cell>
			<ui5-table-cell style="text-align: right">
				<span><b style='padding-right: 0.125rem'>1650</b>EUR</span>
			</ui5-table-cell>
		</ui5-table-row>`
};
export const NoData = Template.bind({});
NoData.decorators = [
    (story) => {
        return html `
			<style>
				ui5-table ui5-table-column.table-header-text-alignment::part(column) {
					text-align: end;
				}
			</style>
			${story()}`;
    }
];
NoData.args = {
    noDataText: "No Data",
    columns: `
		<ui5-table-column slot="columns">
			<span>Product</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="800">
			<span>Supplier</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
			<span>Dimensions</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
			<span>Weight</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" class="table-header-text-alignment">
			<span>Price</span>
		</ui5-table-column>`
};
export const GrowingTableMoreButton = Template.bind({});
NoData.decorators = [
    (story) => {
        return html `
			<style>
				ui5-table ui5-table-column.table-header-text-alignment::part(column) {
					text-align: end;
				}
			</style>
			${story()}`;
    }
];
GrowingTableMoreButton.args = {
    growing: TableGrowingMode.Button,
    columns: `
		<ui5-table-column slot="columns">
			<span>Product</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="800">
			<span>Supplier</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin="" class="table-header-text-alignment">
			<span>Dimensions</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin="" class="table-header-text-alignment">
			<span>Weight</span>
		</ui5-table-column>
		<ui5-table-column slot="columns" class="table-header-text-alignment">
			<span>Price</span>
		</ui5-table-column>`
};
GrowingTableMoreButton.decorators = [
    story => {
        return html `
			${story()}
			<script>
				const growingTable${index} = document.getElementById("table-${index}");
				const rows${index} = 4;
				let loads${index} = 1;
				let sliceIndex${index} = 0;
				let endSliceIndex${index} = sliceIndex${index} + rows${index};
				const init${index} = async (rows) => {
					const response = await fetch("../assets/data/products.json");
					const products = await response.json();
					const collectionLength = products.length;
					const loadsAll = Math.ceil(collectionLength / rows);
					const result = products.slice(sliceIndex${index}, endSliceIndex${index}).map((product, index) => {
						return "<ui5-table-row  id=roll-" + index + ">" +
							"<ui5-table-cell><span>" + product.name +"</span></ui5-table-cell>" +
							"<ui5-table-cell><span>" + product.supplierName + "</span></ui5-table-cell>" +
							"<ui5-table-cell style='text-align: right'><span>" + product.width + " x " + product.depth + " x " + product.height + product.dimUnit + "</span></ui5-table-cell>" +
							"<ui5-table-cell style='text-align: right'><span style='color: #2b7c2b' class='middle'><b style='padding-right: 0.125rem'>" + product.weightMeasure + "</b>" + product.weightUnit + "</span></ui5-table-cell>" +
							"<ui5-table-cell style='text-align: right'><span><b style='padding-right: 0.125rem'> " + product.price + "</b>" + product.currencyCode + "</span></ui5-table-cell></ui5-table-row>";
					}).join("");
					if (loads${index} >= loadsAll) {
						growingTable${index}.growing = "None";
					} else {
						growingTable${index}.setAttribute("growing-button-subtext", loads${index} * rows + " of " + collectionLength);
						sliceIndex${index} += rows;
					}
					growingTable${index}.insertAdjacentHTML('beforeend', result);
				}
				const loadMore${index} = () => {
					growingTable${index}.busy = true;
					setTimeout(() => {
						++loads${index};
						endSliceIndex${index} = sliceIndex${index} + rows${index};
						init${index}(rows${index});
						growingTable${index}.busy = false;
					}, 1500);
				}
				growingTable${index}.addEventListener("load-more", loadMore${index});
				init${index}(rows${index});
			</script>
			<style>
				ui5-table ui5-table-column.table-header-text-alignment::part(column) {
					text-align: end;
				}
			</style>`;
    }
];
GrowingTableMoreButton.storyName = 'Growing with "More" Button';
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
};
GrowingTableScroll.decorators = [
    story => {
        return html `
			<div style="height: 200px; overflow: scroll;">
				${story()}
			</div>
			<script>
				const growingTableScroll${index} = document.getElementById("table-${index}");
				const rowsScroll${index} = 4;
				let sliceIndexScroll${index} = 0;
				let loadsScroll${index} = 1;
				let endSliceIndexScroll${index} = sliceIndexScroll${index} + rowsScroll${index};
				const fill${index} = async (rowsScroll) => {
					const responseScrollTable = await fetch("../assets/data/products.json");
					const productsScrollTable = await responseScrollTable.json();
					const collectionLengthScroll = productsScrollTable.length;
					let loadsAllScroll = Math.ceil(collectionLengthScroll / rowsScroll);
					const result = productsScrollTable.slice(sliceIndexScroll${index}, endSliceIndexScroll${index}).map((product, index) => {
						return "<ui5-table-row  id=roll-" + index + ">" +
							"<ui5-table-cell><span>" + product.name +"</span></ui5-table-cell>" +
							"<ui5-table-cell><span>" + product.supplierName + "</span></ui5-table-cell>" +
							"<ui5-table-cell style='text-align: right'><span>" + product.width + " x " + product.depth + " x " + product.height + product.dimUnit + "</span></ui5-table-cell>" +
							"<ui5-table-cell style='text-align: right'><span style='color: #2b7c2b'><b style='padding-right: 0.125rem'>" + product.weightMeasure + "</b>" + product.weightUnit + "</span></ui5-table-cell>" +
							"<ui5-table-cell style='text-align: right'><span><b style='padding-right: 0.125rem'> " + product.price + "</b>" + product.currencyCode + "</span></ui5-table-cell></ui5-table-row>";
					}).join("");
					if (loadsScroll${index} >= loadsAllScroll) {
						growingTableScroll${index}.growing = "None";
					} else {
						sliceIndexScroll${index} += rowsScroll;
					}
					growingTableScroll${index}.insertAdjacentHTML('beforeend', result);
				}
				const growOnScroll${index} = () => {
					let timeout${index};
					growingTableScroll${index}.busy = true;
					if (timeout${index}) {
						clearTimeout(timeout${index});
					}
					timeout${index} = setTimeout(() => {
						loadsScroll${index}++
						endSliceIndexScroll${index} = sliceIndexScroll${index} + rowsScroll${index};
						fill${index}(rowsScroll${index});
						growingTableScroll${index}.busy = false;
					}, 1500);
				}
				growingTableScroll${index}.addEventListener("load-more", growOnScroll${index});
				fill${index}(rowsScroll${index});
			</script>
			<style>
				ui5-table ui5-table-column.table-header-text-alignment::part(column) {
					text-align: end;
				}
			</style>`;
    }
];
GrowingTableScroll.storyName = "Growing on Scroll";
export const GroupingTableSelect = Template.bind({});
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
};
GroupingTableSelect.storyName = "Grouping and Selection";
//# sourceMappingURL=Table.stories.js.map