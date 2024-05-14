import "@ui5/webcomponents/dist/Grid.js";
import "@ui5/webcomponents/dist/GridHeaderRow.js";
import "@ui5/webcomponents/dist/GridHeaderCell.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Toast.js";

const grid = document.getElementById("grid");
const toast = document.getElementById("message");

grid.addEventListener("row-press", (e) => {
	toast.textContent = `Row with key "${e.detail.row.key}" was pressed!`;
	toast.show();
});