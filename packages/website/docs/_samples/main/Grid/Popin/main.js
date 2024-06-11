import "@ui5/webcomponents/dist/Grid.js";
import "@ui5/webcomponents/dist/GridHeaderRow.js";
import "@ui5/webcomponents/dist/GridHeaderCell.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Slider.js";

const grid = document.getElementById("grid");
const slider = document.getElementById("slider");
slider.addEventListener("input", (e) => {
	grid.style.width = `${e.target.value}%`;
});