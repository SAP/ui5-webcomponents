import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type Table from "@ui5/webcomponents/dist/Table.js";

const component = "ui5-table";

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

const Template: UI5StoryArgs<Table, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic Table</h3>
	<div class="snippet flex-column">
		<!-- Header -->
		<div class="header">
			<span>Products table - resize your browser to make some columns pop-in</span>
			<ui5-button id="toggleSticky">Toggle Sticky Column Header</ui5-button>
		</div>
		<ui5-table class="demo-table" id="tbl">
			<!-- Columns -->
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
			</ui5-table-column>
		</ui5-table>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>Table in SingleSelect mode</h3>
	<div class="snippet flex-column">
		<ui5-table class="demo-table" id="singleSelectTbl" mode="SingleSelect">
			<!-- Columns -->
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
			</ui5-table-column>
		</ui5-table>
	</div>
`;


export const Template2: StoryFn = () => html`
<h3>Table in MultiSelect mode</h3>
	<div class="snippet flex-column">
		<ui5-table class="demo-table" id="multiSelectTbl" mode="MultiSelect">
			<!-- Columns -->
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
			</ui5-table-column>
		</ui5-table>
	</div>
`;


export const Template3: StoryFn = () => html`
<h3>Table Display Inline</h3>
	<div class="snippet flex-column">
		<!-- Header -->
		<div class="header">
			<span>Products table - resize your browser to make the columns display inline</span>
			<button id="toggleSticky" style="height: 32px">Toggle Sticky Column Header</button>
		</div>
		<ui5-table class="demo-table" id="tblDisplayInline">
			<!-- Columns -->
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
			</ui5-table-column>
		</ui5-table>
	</div>
`;


export const Template4: StoryFn = () => html`
<h3>Table with No Data</h3>
		<div class="snippet flex-column">
			<ui5-table class="demo-table" no-data-text="No Data">
				<!-- Columns -->
				<ui5-table-column slot="columns">
					<span style="line-height: 1.4rem">Product</span>
				</ui5-table-column>
				<ui5-table-column slot="columns" min-width="800" popin-text="Supplier">
					<span style="line-height: 1.4rem">Supplier</span>
				</ui5-table-column>
				<ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin="">
					<span style="line-height: 1.4rem">Dimensions</span>
				</ui5-table-column>
				<ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin="">
					<span style="line-height: 1.4rem">Weight</span>
				</ui5-table-column>
				<ui5-table-column slot="columns">
					<span style="line-height: 1.4rem">Price</span>
				</ui5-table-column>
			</ui5-table>
		</div>
`;


export const Template5: StoryFn = () => html`
<h3>Growing Table with "More" button</h3>
	<div class="snippet">
		<ui5-table id="myTbl" growing="Button" growing-button-subtext="[4 / 12]">
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
			</ui5-table-column>
		</ui5-table>
	</div>
	<script>
		// Growing Table
		var products2 = {
			"ProductCollection": [
				{
					"ProductId": "HT-1000",
					"Category": "Laptops",
					"MainCategory": "Computer Systems",
					"TaxTarifCode": "1",
					"SupplierName": "Very Best Screens",
					"WeightMeasure": 4.2,
					"WeightUnit": "KG",
					"Description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
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
					"Description": "Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
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
					"Description": "Notebook Basic 18 with 2,80 GHz quad core, 18\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
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
					"Description": "Notebook Basic 19 with 2,80 GHz quad core, 19\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
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
					"Description": "Notebook Professional 15 with 2,80 GHz quad core, 15\" Multitouch LCD, 8 GB DDR3 RAM, 500 GB SSD - DVD-Writer (DVD-R/+R/-RW/-RAM),Windows 8 Pro",
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
					"Description": "Notebook Professional 17 with 2,80 GHz quad core, 17\" Multitouch LCD, 8 GB DDR3 RAM, 500 GB SSD - DVD-Writer (DVD-R/+R/-RW/-RAM),Windows 8 Pro",
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
		};
		var growingTable = document.getElementById("myTbl");
		var loads = 1;
		function init(rows) {
			var result = '';
			products2.ProductCollection.slice(0, rows).forEach(function (product, index, arr) {
				var test = "<ui5-table-row  id=roll-".concat(index, ">\n\t\t\t\t\t\t\t<ui5-table-cell>\n\t\t\t\t\t\t\t\t<div class=\"double-line-content\">\n\t\t\t\t\t\t\t\t\t<ui5-label>\n\t\t\t\t\t\t\t\t\t\t<b>").concat(product.Name, "</b>\n\t\t\t\t\t\t\t\t\t</ui5-label>\n\t\t\t\t\t\t\t\t\t<ui5-label style=\"margin-top: 0.5rem\">").concat(product.ProductId, "</ui5-label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</ui5-table-cell>\n\n\t\t\t\t\t\t\t<ui5-table-cell >\n\t\t\t\t\t\t\t\t<ui5-label class=\"middle\" >").concat(product.SupplierName, "</ui5-label>\n\t\t\t\t\t\t\t</ui5-table-cell>\n\n\t\t\t\t\t\t\t<ui5-table-cell style='text-align: right'>\n\t\t\t\t\t\t\t\t<ui5-label class=\"middle\" >").concat(product.Width, " x ").concat(product.Depth, " x ").concat(product.Height, " ").concat(product.DimUnit, "</ui5-label>\n\t\t\t\t\t\t\t</ui5-table-cell>\n\n\t\t\t\t\t\t\t<ui5-table-cell style='text-align: right'>\n\t\t\t\t\t\t\t\t<ui5-label style=\"color: #2b7c2b\" class=\"middle\">\n\t\t\t\t\t\t\t\t\t<b>").concat(product.WeightMeasure, "</b> ").concat(product.WeightUnit, "</ui5-label>\n\t\t\t\t\t\t\t</ui5-table-cell>\n\n\t\t\t\t\t\t\t<ui5-table-cell style='text-align: right'>\n\t\t\t\t\t\t\t\t<ui5-label class=\"middle\" >\n\t\t\t\t\t\t\t\t\t<b>").concat(product.Price, "</b> ").concat(product.CurrencyCode, "</ui5-label>\n\t\t\t\t\t\t\t</ui5-table-cell>\n\n\t\t\t\t\t\t</ui5-table-row>");
				result += test;
			});
			growingTable.insertAdjacentHTML('beforeend', result);
			if (loads === 3) {
				growingTable.growing = "None";
			} else {
				growingTable.setAttribute("growing-button-subtext", loads * rows + " of 12");
			}
		}
		function loadMore() {
			growingTable.busy = true;
			setTimeout(function() {
				++loads;
				init(4);
				growingTable.busy = false;
			}, 1500);
		}
		growingTable.addEventListener("load-more", loadMore);
		init(4);
	</script>
`;
Template5.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};

export const Template6: StoryFn = () => html`
<h3>Growing Table on Scroll</h3>
	<div class="snippet" style="height: 200px; overflow: scroll;">
		<ui5-table id="myTblOnScroll" growing="Scroll">
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
			</ui5-table-column>
		</ui5-table>
	</div>
	<script>
		// Growing Table
		var products3 = {
			"ProductCollection": [
				{
					"ProductId": "HT-1000",
					"Category": "Laptops",
					"MainCategory": "Computer Systems",
					"TaxTarifCode": "1",
					"SupplierName": "Very Best Screens",
					"WeightMeasure": 4.2,
					"WeightUnit": "KG",
					"Description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
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
					"Description": "Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
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
					"Description": "Notebook Basic 18 with 2,80 GHz quad core, 18\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
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
					"Description": "Notebook Basic 19 with 2,80 GHz quad core, 19\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
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
					"Description": "Notebook Professional 15 with 2,80 GHz quad core, 15\" Multitouch LCD, 8 GB DDR3 RAM, 500 GB SSD - DVD-Writer (DVD-R/+R/-RW/-RAM),Windows 8 Pro",
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
					"Description": "Notebook Professional 17 with 2,80 GHz quad core, 17\" Multitouch LCD, 8 GB DDR3 RAM, 500 GB SSD - DVD-Writer (DVD-R/+R/-RW/-RAM),Windows 8 Pro",
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
				}, {
					"ProductId": "HT-1030",
					"Category": "Flat Screen Monitors",
					"MainCategory": "Computer Components",
					"TaxTarifCode": "1",
					"SupplierName": "Very Best Screens",
					"WeightMeasure": 21,
					"WeightUnit": "KG",
					"Description": "Optimum Hi-Resolution max. 1920 x 1080 @ 85Hz, Dot Pitch: 0.27mm",
					"Name": "Ergo Screen E-I",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1030.jpg",
					"Status": "Available",
					"Quantity": 14,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 230,
					"Width": 37,
					"Depth": 12,
					"Height": 36,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1031",
					"Category": "Flat Screen Monitors",
					"MainCategory": "Computer Components",
					"TaxTarifCode": "1",
					"SupplierName": "Very Best Screens",
					"WeightMeasure": 21,
					"WeightUnit": "KG",
					"Description": "Optimum Hi-Resolution max. 1920 x 1200 @ 85Hz, Dot Pitch: 0.26mm",
					"Name": "Ergo Screen E-II",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1031.jpg",
					"Status": "Available",
					"Quantity": 24,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 285,
					"Width": 40.8,
					"Depth": 19,
					"Height": 43,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1032",
					"Category": "Flat Screen Monitors",
					"MainCategory": "Computer Components",
					"TaxTarifCode": "1",
					"SupplierName": "Very Best Screens",
					"WeightMeasure": 21,
					"WeightUnit": "KG",
					"Description": "Optimum Hi-Resolution max. 2560 x 1440 @ 85Hz, Dot Pitch: 0.25mm",
					"Name": "Ergo Screen E-III",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1032.jpg",
					"Status": "Available",
					"Quantity": 50,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 345,
					"Width": 40.8,
					"Depth": 19,
					"Height": 43,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1035",
					"Category": "Flat Screen Monitors",
					"MainCategory": "Computer Components",
					"TaxTarifCode": "1",
					"SupplierName": "Very Best Screens",
					"WeightMeasure": 14,
					"WeightUnit": "KG",
					"Description": "Optimum Hi-Resolution max. 1600 x 1200 @ 85Hz, Dot Pitch: 0.24mm",
					"Name": "Flat Basic",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1035.jpg",
					"Status": "Available",
					"Quantity": 23,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 399,
					"Width": 39,
					"Depth": 20,
					"Height": 41,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1036",
					"Category": "Flat Screen Monitors",
					"MainCategory": "Computer Components",
					"TaxTarifCode": "1",
					"SupplierName": "Very Best Screens",
					"WeightMeasure": 15,
					"WeightUnit": "KG",
					"Description": "Optimum Hi-Resolution max. 2048 x 1080 @ 85Hz, Dot Pitch: 0.26mm",
					"Name": "Flat Future",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1036.jpg",
					"Status": "Available",
					"Quantity": 22,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 430,
					"Width": 45,
					"Depth": 26,
					"Height": 46,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1037",
					"Category": "Flat Screen Monitors",
					"MainCategory": "Computer Components",
					"TaxTarifCode": "1",
					"SupplierName": "Very Best Screens",
					"WeightMeasure": 17,
					"WeightUnit": "KG",
					"Description": "Optimum Hi-Resolution max. 2016 x 1512 @ 85Hz, Dot Pitch: 0.24mm",
					"Name": "Flat XL",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1037.jpg",
					"Status": "Available",
					"Quantity": 23,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 1230,
					"Width": 54.5,
					"Depth": 22.1,
					"Height": 39.1,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1040",
					"Category": "Printers",
					"MainCategory": "Printers & Scanners",
					"TaxTarifCode": "1",
					"SupplierName": "Alpha Printers",
					"WeightMeasure": 32,
					"WeightUnit": "KG",
					"Description": "Print 2400 dpi image quality color documents at speeds of up to 32 ppm (color) or 36 ppm (monochrome), letter/A4. Powerful 500 MHz processor, 512MB of memory",
					"Name": "Laser Professional Eco",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1040.jpg",
					"Status": "Available",
					"Quantity": 21,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 830,
					"Width": 51,
					"Depth": 46,
					"Height": 30,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1041",
					"Category": "Printers",
					"MainCategory": "Printers & Scanners",
					"TaxTarifCode": "1",
					"SupplierName": "Alpha Printers",
					"WeightMeasure": 23,
					"WeightUnit": "KG",
					"Description": "Up to 22 ppm color or 24 ppm monochrome A4/letter, powerful 500 MHz processor and 128MB of memory",
					"Name": "Laser Basic",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1041.jpg",
					"Status": "Available",
					"Quantity": 8,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 490,
					"Width": 48,
					"Depth": 42,
					"Height": 26,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1042",
					"Category": "Printers",
					"MainCategory": "Printers & Scanners",
					"TaxTarifCode": "1",
					"SupplierName": "Alpha Printers",
					"WeightMeasure": 17,
					"WeightUnit": "KG",
					"Description": "Print up to 25 ppm letter and 24 ppm A4 color or monochrome, with Available first-page-out-time of less than 13 seconds for monochrome and less than 15 seconds for color",
					"Name": "Laser Allround",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1042.jpg",
					"Status": "Available",
					"Quantity": 9,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 349,
					"Width": 53,
					"Depth": 50,
					"Height": 65,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1050",
					"Category": "Printers",
					"MainCategory": "Printers & Scanners",
					"TaxTarifCode": "1",
					"SupplierName": "Alpha Printers",
					"WeightMeasure": 3,
					"WeightUnit": "KG",
					"Description": "4800 dpi x 1200 dpi - up to 35 ppm (mono) / up to 34 ppm (color) - capacity: 250 sheets - Hi-Speed USB, Ethernet",
					"Name": "Ultra Jet Super Color",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1050.jpg",
					"Status": "Available",
					"Quantity": 17,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 139,
					"Width": 41,
					"Depth": 41,
					"Height": 28,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1051",
					"Category": "Printers",
					"MainCategory": "Printers & Scanners",
					"TaxTarifCode": "1",
					"SupplierName": "Printer for All",
					"WeightMeasure": 1.9,
					"WeightUnit": "KG",
					"Description": "1000 dpi x 1000 dpi - up to 35 ppm (mono) / up to 34 ppm (color) - capacity: 250 sheets - Hi-Speed USB - excellent dimensions for the small office",
					"Name": "Ultra Jet Mobile",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1051.jpg",
					"Status": "Available",
					"Quantity": 18,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 99,
					"Width": 46,
					"Depth": 32,
					"Height": 25,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1052",
					"Category": "Printers",
					"MainCategory": "Printers & Scanners",
					"TaxTarifCode": "1",
					"SupplierName": "Printer for All",
					"WeightMeasure": 18,
					"WeightUnit": "KG",
					"Description": "4800 dpi x 1200 dpi - up to 35 ppm (mono) / up to 34 ppm (color) - capacity: 250 sheets - Hi-Speed USB2.0, Ethernet",
					"Name": "Ultra Jet Super Highspeed",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1052.jpg",
					"Status": "Available",
					"Quantity": 25,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 170,
					"Width": 41,
					"Depth": 41,
					"Height": 28,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1055",
					"Category": "Multifunction Printers",
					"MainCategory": "Printers & Scanners",
					"TaxTarifCode": "1",
					"SupplierName": "Printer for All",
					"WeightMeasure": 6.3,
					"WeightUnit": "KG",
					"Description": "1000 dpi x 1000 dpi - up to 16 ppm (mono) / up to 15 ppm (color)- capacity 80 sheets - scanner (216 x 297 mm, 1200dpi x 2400dpi)",
					"Name": "Multi Print",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1055.jpg",
					"Status": "Available",
					"Quantity": 16,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 99,
					"Width": 55,
					"Depth": 45,
					"Height": 29,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1056",
					"Category": "Multifunction Printers",
					"MainCategory": "Printers & Scanners",
					"TaxTarifCode": "1",
					"SupplierName": "Printer for All",
					"WeightMeasure": 4.3,
					"WeightUnit": "KG",
					"Description": "1200 dpi x 1200 dpi - up to 25 ppm (mono) / up to 24 ppm (color)- capacity 80 sheets - scanner (216 x 297 mm, 2400dpi x 4800dpi, high resolution)",
					"Name": "Multi Color",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1056.jpg",
					"Status": "Available",
					"Quantity": 5,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 119,
					"Width": 51,
					"Depth": 41.3,
					"Height": 22,
					"DimUnit": "cm"
				}, {
					"ProductId": "HT-1060",
					"Category": "Mice",
					"MainCategory": "Computer Components",
					"TaxTarifCode": "1",
					"SupplierName": "Oxynum",
					"WeightMeasure": 0.09,
					"WeightUnit": "KG",
					"Description": "Cordless Optical USB Mice, Laptop, Color: Black, Plug&Play",
					"Name": "Cordless Mouse",
					"ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1060.jpg",
					"Status": "Available",
					"Quantity": 25,
					"UoM": "PC",
					"CurrencyCode": "EUR",
					"Price": 9,
					"Width": 6,
					"Depth": 14.5,
					"Height": 3.5,
					"DimUnit": "cm"
				}
			]
		};
		var growingTable2 = document.getElementById("myTblOnScroll");
		function fill(rows) {
			var result = '';
			products3.ProductCollection.slice(0, rows).forEach(function (product, index, arr) {
				var test = "<ui5-table-row  id=roll-".concat(index, ">\n\t\t\t\t\t\t\t<ui5-table-cell>\n\t\t\t\t\t\t\t\t<div class=\"double-line-content\">\n\t\t\t\t\t\t\t\t\t<ui5-label>\n\t\t\t\t\t\t\t\t\t\t<b>").concat(product.Name, "</b>\n\t\t\t\t\t\t\t\t\t</ui5-label>\n\t\t\t\t\t\t\t\t\t<ui5-label style=\"margin-top: 0.5rem\">").concat(product.ProductId, "</ui5-label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</ui5-table-cell>\n\n\t\t\t\t\t\t\t<ui5-table-cell>\n\t\t\t\t\t\t\t\t<ui5-label class=\"middle\" >").concat(product.SupplierName, "</ui5-label>\n\t\t\t\t\t\t\t</ui5-table-cell>\n\n\t\t\t\t\t\t\t<ui5-table-cell style='text-align: right'>\n\t\t\t\t\t\t\t\t<ui5-label class=\"middle\" >").concat(product.Width, " x ").concat(product.Depth, " x ").concat(product.Height, " ").concat(product.DimUnit, "</ui5-label>\n\t\t\t\t\t\t\t</ui5-table-cell>\n\n\t\t\t\t\t\t\t<ui5-table-cell style='text-align: right'>\n\t\t\t\t\t\t\t\t<ui5-label style=\"color: #2b7c2b\" class=\"middle\">\n\t\t\t\t\t\t\t\t\t<b>").concat(product.WeightMeasure, "</b> ").concat(product.WeightUnit, "</ui5-label>\n\t\t\t\t\t\t\t</ui5-table-cell>\n\n\t\t\t\t\t\t\t<ui5-table-cell style='text-align: right'>\n\t\t\t\t\t\t\t\t<ui5-label class=\"middle\" >\n\t\t\t\t\t\t\t\t\t<b>").concat(product.Price, "</b> ").concat(product.CurrencyCode, "</ui5-label>\n\t\t\t\t\t\t\t</ui5-table-cell>\n\n\t\t\t\t\t\t</ui5-table-row>");
				result += test;
			});
			growingTable2.insertAdjacentHTML('beforeend', result);
		}
		function growOnScroll() {
			growingTable2.busy = true;
			if (timeout) {
				clearTimeout(timeout);
			}
			var timeout = setTimeout(() => {
				fill(4);
				growingTable2.busy = false;
			}, 1500);
		}
		growingTable2.addEventListener("load-more", growOnScroll);
		fill(10);
	</script>
`;
Template6.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};

export const Template7: StoryFn = () => html`
<h3>Table with grouping (SingleSelect - click on item to set navigated)</h3>
	<div class="snippet flex-column">
		<!-- Header -->
		<div class="header">
			<span>The <em>ui5-table-group-row</em> allows visual grouping of the table rows.</span>
		</div>
		<ui5-table class="demo-table-single" mode="SingleSelect">
			<ui5-table-column id="column-1" slot="columns">
				<ui5-label>City</ui5-label>
			</ui5-table-column>
			<ui5-table-column id="column-2" slot="columns" min-width="500" popin-text="Supplier" demand-popin="">
				<ui5-label>Supplier</ui5-label>
			</ui5-table-column>
			<ui5-table-column id="column-3" slot="columns" min-width="500">
				<ui5-label>Country</ui5-label>
			</ui5-table-column>
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
		</ui5-table>
	</div>
`;


export const Template8: StoryFn = () => html`
<h3>Tables with grouping (MultiSelect)</h3>
	<div class="snippet flex-column">
		<ui5-table class="demo-table-multi" mode="MultiSelect">
			<ui5-table-column id="column-1" slot="columns">
				<ui5-label>City</ui5-label>
			</ui5-table-column>
			<ui5-table-column id="column-2" slot="columns" min-width="500" popin-text="Supplier" demand-popin="">
				<ui5-label>Supplier</ui5-label>
			</ui5-table-column>
			<ui5-table-column id="column-3" slot="columns" min-width="500">
				<ui5-label>Country</ui5-label>
			</ui5-table-column>
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
		</ui5-table>
	</div>
`;
