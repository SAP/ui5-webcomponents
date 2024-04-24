import "@ui5/webcomponents-compat/dist/Table.js";
import "@ui5/webcomponents-compat/dist/TableRow.js";
import "@ui5/webcomponents-compat/dist/TableColumn.js";
import "@ui5/webcomponents-compat/dist/TableCell.js";

const growingTable = [...document.getElementsByTagName("ui5-table")][0];

const rows = 2;
let loads = 1
let sliceIndex = 0;
let endSliceIndex = 2;

// Create handler for the "load-more" event
const loadMore = () => {
	growingTable.busy = true;

	setTimeout(() => {
		endSliceIndex = sliceIndex + rows;
		const result = products.slice(sliceIndex, endSliceIndex).map((product, index) => {
			return "<ui5-table-row  id=roll-" + index + ">" +
				"<ui5-table-cell><span>" + product.name +"</span></ui5-table-cell>" +
				"<ui5-table-cell><span>" + product.supplierName + "</span></ui5-table-cell>" +
				"<ui5-table-cell><span>" + product.width + " x " + product.depth + " x " + product.height + product.dimUnit + "</span></ui5-table-cell>" +
				"<ui5-table-cell><span><b>" + product.weightMeasure + "</b>" + product.weightUnit + "</span></ui5-table-cell>" +
				"<ui5-table-cell><span><b> " + product.price + "</b>" + product.currencyCode + "</span></ui5-table-cell></ui5-table-row>";
		}).join("");
		sliceIndex += rows;
		growingTable.insertAdjacentHTML('beforeend', result);
		growingTable.growingButtonSubtext = (++loads * rows) + " of " + products.length;
		growingTable.busy = false;

		if (loads == products.length/2) {
			growingTable.growing = "None"
		}
	}, 1500);
}

// Listen for "load-more" the event
growingTable.addEventListener("load-more", loadMore);

// Use mock data
const products = [
	{
		"productId": "HT-1000",
		"category": "Laptops",
		"mainCategory": "Computer Systems",
		"taxTarifCode": "1",
		"supplierName": "Very Best Screens",
		"weightMeasure": 4.2,
		"weightUnit": "KG",
		"description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
		"name": "Notebook Basic 15",
		"dateOfSale": "2017-03-26",
		"productPicUrl": "../assets/images/products/HT-1000.jpg",
		"status": "Available",
		"quantity": 10,
		"uOm": "PC",
		"currencyCode": "EUR",
		"price": 956,
		"width": 30,
		"depth": 18,
		"height": 3,
		"dimUnit": "cm"
	},
	{
		"productId": "HT-1001",
		"category": "Laptops",
		"mainCategory": "Computer Systems",
		"taxTarifCode": "1",
		"supplierName": "Very Best Screens",
		"weightMeasure": 4.5,
		"weightUnit": "KG",
		"description": "Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
		"name": "Notebook Basic 17",
		"dateOfSale": "2017-04-17",
		"productPicUrl": "../assets/images/products/HT-1001.jpg",
		"status": "Available",
		"quantity": 20,
		"uOm": "PC",
		"currencyCode": "EUR",
		"price": 1249,
		"width": 29,
		"depth": 17,
		"height": 3.1,
		"dimUnit": "cm"
	},
	{
		"productId": "HT-1002",
		"category": "Laptops",
		"mainCategory": "Computer Systems",
		"taxTarifCode": "1",
		"supplierName": "Very Best Screens",
		"weightMeasure": 4.2,
		"weightUnit": "KG",
		"description": "Notebook Basic 18 with 2,80 GHz quad core, 18\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
		"name": "Notebook Basic 18",
		"dateOfSale": "2017-01-07",
		"productPicUrl": "../assets/images/products/HT-1002.jpg",
		"status": "Available",
		"quantity": 10,
		"uOm": "PC",
		"currencyCode": "EUR",
		"price": 1570,
		"width": 28,
		"depth": 19,
		"height": 2.5,
		"dimUnit": "cm"
	},
	{
		"productId": "HT-1003",
		"category": "Laptops",
		"mainCategory": "Computer Systems",
		"taxTarifCode": "1",
		"supplierName": "Smartcards",
		"weightMeasure": 4.2,
		"weightUnit": "KG",
		"description": "Notebook Basic 19 with 2,80 GHz quad core, 19\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
		"name": "Notebook Basic 19",
		"dateOfSale": "2017-04-09",
		"productPicUrl": "../assets/images/products/HT-1003.jpg",
		"status": "Available",
		"quantity": 15,
		"uOm": "PC",
		"currencyCode": "EUR",
		"price": 1650,
		"width": 32,
		"depth": 21,
		"height": 4,
		"dimUnit": "cm"
	},
	{
		"productId": "HT-1007",
		"category": "Accessories",
		"mainCategory": "Computer Components",
		"taxTarifCode": "1",
		"supplierName": "Technocom",
		"weightMeasure": 0.2,
		"weightUnit": "KG",
		"description": "Digital Organizer with State-of-the-Art Storage Encryption",
		"name": "ITelO Vault",
		"dateOfSale": "2017-05-17",
		"productPicUrl": "../assets/images/products/HT-1007.jpg",
		"status": "Available",
		"quantity": 15,
		"uOm": "PC",
		"currencyCode": "EUR",
		"price": 299,
		"width": 32,
		"depth": 22,
		"height": 3,
		"dimUnit": "cm"
	},
	{
		"productId": "HT-1010",
		"category": "Accessories",
		"mainCategory": "Computer Systems",
		"taxTarifCode": "1",
		"supplierName": "Very Best Screens",
		"weightMeasure": 4.3,
		"weightUnit": "KG",
		"description": "Notebook Professional 15 with 2,80 GHz quad core, 15\" Multitouch LCD, 8 GB DDR3 RAM, 500 GB SSD - DVD-Writer (DVD-R/+R/-RW/-RAM),Windows 8 Pro",
		"name": "Notebook Professional 15",
		"dateOfSale": "2017-02-22",
		"productPicUrl": "../assets/images/products/HT-1010.jpg",
		"status": "Available",
		"quantity": 16,
		"uOm": "PC",
		"currencyCode": "EUR",
		"price": 1999,
		"width": 33,
		"depth": 20,
		"height": 3,
		"dimUnit": "cm"
	},
	{
		"productId": "HT-1011",
		"category": "Laptops",
		"mainCategory": "Computer Systems",
		"taxTarifCode": "1",
		"supplierName": "Very Best Screens",
		"weightMeasure": 4.1,
		"weightUnit": "KG",
		"description": "Notebook Professional 17 with 2,80 GHz quad core, 17\" Multitouch LCD, 8 GB DDR3 RAM, 500 GB SSD - DVD-Writer (DVD-R/+R/-RW/-RAM),Windows 8 Pro",
		"name": "Notebook Professional 17",
		"dateOfSale": "2017-01-02",
		"productPicUrl": "../assets/images/products/HT-1011.jpg",
		"status": "Available",
		"quantity": 17,
		"uOm": "PC",
		"currencyCode": "EUR",
		"price": 2299,
		"width": 33,
		"depth": 23,
		"height": 2,
		"dimUnit": "cm"
	},
	{
		"productId": "HT-1020",
		"category": "Accessories",
		"mainCategory": "Computer Components",
		"taxTarifCode": "1",
		"supplierName": "Technocom",
		"weightMeasure": 0.16,
		"weightUnit": "KG",
		"description": "Digital Organizer with State-of-the-Art Encryption for Storage and Network Communications",
		"name": "ITelO Vault Net",
		"dateOfSale": "2017-05-08",
		"productPicUrl": "../assets/images/products/HT-1020.jpg",
		"status": "Available",
		"quantity": 14,
		"uOm": "PC",
		"currencyCode": "EUR",
		"price": 459,
		"width": 10,
		"depth": 1.8,
		"height": 17,
		"dimUnit": "cm"
	},
	{
		"productId": "HT-1021",
		"category": "Accessories",
		"mainCategory": "Computer Components",
		"taxTarifCode": "1",
		"supplierName": "Technocom",
		"weightMeasure": 0.18,
		"weightUnit": "KG",
		"description": "Digital Organizer with State-of-the-Art Encryption for Storage and Secure Stellite Link",
		"name": "ITelO Vault SAT",
		"dateOfSale": "2017-06-30",
		"productPicUrl": "../assets/images/products/HT-1021.jpg",
		"status": "Available",
		"quantity": 50,
		"uOm": "PC",
		"currencyCode": "EUR",
		"price": 149,
		"width": 11,
		"depth": 1.7,
		"height": 18,
		"dimUnit": "cm"
	},
	{
		"productId": "HT-1022",
		"category": "Accessories",
		"mainCategory": "Computer Components",
		"taxTarifCode": "1",
		"supplierName": "Technocom",
		"weightMeasure": 0.2,
		"weightUnit": "KG",
		"description": "32 GB Digital Assistant with high-resolution color screen",
		"name": "Comfort Easy",
		"dateOfSale": "2017-03-02",
		"productPicUrl": "../assets/images/products/HT-1022.jpg",
		"status": "Available",
		"quantity": 30,
		"uOm": "PC",
		"currencyCode": "EUR",
		"price": 1679,
		"width": 84,
		"depth": 1.5,
		"height": 14,
		"dimUnit": "cm"
	}
]