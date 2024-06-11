import "@ui5/webcomponents/dist/Grid.js";
import "@ui5/webcomponents/dist/GridHeaderRow.js";
import "@ui5/webcomponents/dist/GridHeaderCell.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/ComboBox.js";
import "@ui5/webcomponents/dist/ComboBoxItem.js";

const selectionFeature = document.getElementById("selection");
const selectionGroup = document.getElementById("selectionGroup");
selectionGroup.addEventListener("change", (e) => {
	selectionFeature.selected = "";
	selectionFeature.mode = e.target.text;
})