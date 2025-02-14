import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableSelectionMulti.js";
import "@ui5/webcomponents/dist/Label.js";

const selectionFeature = document.getElementById("selection");
selectionFeature.addEventListener("change", (e) => {
	console.log(`Selection: ${selectionFeature.selected}`);
})