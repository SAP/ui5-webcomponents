import "@ui5/webcomponents/dist/Grid.js";
import "@ui5/webcomponents/dist/GridGrowing.js";
import "@ui5/webcomponents/dist/GridHeaderRow.js";
import "@ui5/webcomponents/dist/GridHeaderCell.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Input.js";

const MAX_GROW = 20;

const grid = document.getElementById("grid");
const growing = document.getElementById("growing");

let counter = 0;

growing.addEventListener("load-more", () => {
	for (let i = 0; i < 5; i++) {
		const newRow = document.createElement("ui5-grid-row");
		newRow.setAttribute("key", grid.rows.length + i);
		newRow.innerHTML = `
			<ui5-grid-cell><ui5-label><b>Notebook Basic ${18 + grid.rows.length + i}</b><br>HT-100${2 + grid.rows.length + i}</ui5-label></ui5-grid-cell>
			<ui5-grid-cell><ui5-label>Technocom</ui5-label></ui5-grid-cell>
			<ui5-grid-cell><ui5-label>32 x 21 x 4 cm</ui5-label></ui5-grid-cell>
			<ui5-grid-cell><ui5-label style="color: #2b7c2b"><b>3.7</b> KG</ui5-label></ui5-grid-cell>
			<ui5-grid-cell><ui5-label><b>29</b> EUR</ui5-label></ui5-grid-cell>
		`;
		grid.appendChild(newRow);
	}

	counter++;
	if (counter >= MAX_GROW) {
		growing.disabled = true;
		return;
	}
});
