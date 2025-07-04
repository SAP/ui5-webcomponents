import Label from "../../src/Label.js";
import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";

// packages/main/cypress/specs/TableSelections.cy.test.tsx

describe("TableSelectionMulti headerSelector=ClearAll", () => {
	beforeEach(() => {
		cy.mount(
			<Table id="table2">
				<TableSelectionMulti id="selection" selected="1" headerSelector="ClearAll" slot="features"></TableSelectionMulti>
				<TableHeaderRow id="headerRow" slot="headerRow">
					<TableHeaderCell>ColumnA</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1" rowKey="1">
					<TableCell><Label>Cell A</Label></TableCell>
				</TableRow>
				<TableRow id="row2" rowKey="2">
					<TableCell><Label>Cell B</Label></TableCell>
				</TableRow>
			</Table>
		);
		cy.get("#headerRow").shadow().find("#selection-cell").as("headerRowSelectionCell");
	});

	it("renders ClearAll icon with correct attributes", () => {
		cy.get("@headerRowSelectionCell").find('[data-testid="clear-all-icon"]').as("clearAllIcon");
		cy.get("@clearAllIcon").should("exist");
		cy.get("@clearAllIcon").should("have.attr", "title", "Clear All Selections");
		// Optionally check for role, tabindex, or other attributes
	});

	it("ClearAll icon is active when at least one row is selected", () => {
		cy.get("@headerRowSelectionCell").find('[data-testid="clear-all-icon"]').as("clearAllIcon");
		cy.get("@clearAllIcon").should("have.class", "active");
	});

	it("ClearAll icon is deactive when no rows are selected", () => {
		// Deselect all rows
		cy.get("#selection").invoke("attr", "selected", "");
		cy.get("@headerRowSelectionCell").find('[data-testid="clear-all-icon"]').as("clearAllIcon");
		cy.get("@clearAllIcon").should("not.have.class", "active");
	});

	it("ClearAll icon becomes active when a new selected row is added", () => {
		// Deselect all first
		cy.get("#selection").invoke("attr", "selected", "");
		cy.get("@headerRowSelectionCell").find('[data-testid="clear-all-icon"]').as("clearAllIcon");
		cy.get("@clearAllIcon").should("not.have.class", "active");
		// Add a new selected row
		cy.get("#table2").then($table => {
			$table.append(
				`<ui5-table-row id="row3" row-key="3" selected>
					<ui5-table-cell>Cell C</ui5-table-cell>
				</ui5-table-row>`
			);
		});
		cy.get("#selection").invoke("attr", "selected", "3");
		cy.get("@headerRowSelectionCell").find('[data-testid="clear-all-icon"]').as("clearAllIcon");
		cy.get("@clearAllIcon").should("have.class", "active");
	});

	it("ClearAll icon becomes deactive when the selected row is removed", () => {
		// Remove selected row
		cy.get("#row1").invoke("remove");
		cy.get("#selection").invoke("attr", "selected", "");
		cy.get("@headerRowSelectionCell").find('[data-testid="clear-all-icon"]').as("clearAllIcon");
		cy.get("@clearAllIcon").should("not.have.class", "active");
	});

	it("No selection cell or ClearAll icon when all rows are removed", () => {
		cy.get("#row1").invoke("remove");
		cy.get("#row2").invoke("remove");
		cy.get("#headerRow").shadow().find("#selection-cell").should("not.exist");
	});
});