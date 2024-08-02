import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Slider.js";

const table = document.getElementById("table");
const slider = document.getElementById("slider");
slider.addEventListener("input", (e) => {
	table.style.width = `${e.target.value}%`;
});