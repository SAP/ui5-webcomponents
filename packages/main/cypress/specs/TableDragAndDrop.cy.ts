import { html } from "lit";

import "../../src/Table.js";
import "../../src/TableHeaderRow.js";
import "../../src/TableCell.js";
import "../../src/TableRow.js";

describe("API", () => {
	beforeEach(() => {
		cy.mount(html`
			<ui5-table id="table">
				<ui5-table-header-row slot="headerRow">
					<ui5-table-header-cell><span>ColumnA</span></ui5-table-header-cell>
					<ui5-table-header-cell><span>ColumnB</span></ui5-table-header-cell>
				</ui5-table-header-row>
				${Array.from({ length: 10 }).map((_, index) => html`
					<ui5-table-row row-key="${index}" movable>
						<ui5-table-cell><ui5-label>Cell A</ui5-label></ui5-table-cell>
						<ui5-table-cell><ui5-label>Cell B</ui5-label></ui5-table-cell>
					</ui5-table-row>
				`)}
			</ui5-table>
		`);
	});
});
