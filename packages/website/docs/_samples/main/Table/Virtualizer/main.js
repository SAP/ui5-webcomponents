import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableVirtualizer.js";
import "@ui5/webcomponents/dist/TableSelection.js";

class ProductStore {
	constructor() {
		this.products = [];
	}

	async fetchProducts(first, last) {
		const products = [];
		for (let i = first; i < last; i++) {
			this.products[i] ??= await this.fetchProduct(i);
			products.push(this.products[i]);
		}
		return products;
	}

	async fetchProduct(index) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve({
					key: `P${index}`,
					name: `Product ${index}`,
					height: `${(Math.random() * 100).toFixed(0)} cm`,
					weight: `${(Math.random() * 100).toFixed(1)} KG`,
					price: `${(Math.random() * 1000).toFixed(2)} EUR`
				});
			}, Math.random() * 10); // Simulate network delay
		});
	}
}

const productStore = new ProductStore();
const table = document.getElementById("table");
const rowTemplate = document.getElementById("rowTemplate");
const virtualizer = document.getElementById("virtualizer");

virtualizer.addEventListener("range-change", async (e) => {
	const { first, last } = e.detail;
	const products = await productStore.fetchProducts(first, last);
	for (let i = first; i < last; i++) {
		const rowIndex = i - first;
		const product = products[rowIndex];
		const row = table.rows[rowIndex] || table.appendChild(rowTemplate.content.firstElementChild.cloneNode(true));
		row.setAttribute("position", i);
		row.setAttribute("row-key", product.key);
		row.querySelectorAll("[data]").forEach(el => {
			el.textContent = product[el.getAttribute("data")];
		});
	}
	for (let i = last; i < table.rows.length; i++) {
		table.rows[i].remove();
	}
});

requestAnimationFrame(() => virtualizer.reset());