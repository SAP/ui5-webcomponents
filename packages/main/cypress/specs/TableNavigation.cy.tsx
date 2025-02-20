import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableGrowing from "../../src/TableGrowing.js";

describe("Table - Keyboard Navigation", () => {
	beforeEach(() => {
		cy.mount(
			<>
				<input id="before-table1" type="Number" value="0"/>
				<Table id="table0">
					<TableGrowing id="growing" type="Button" slot="features"></TableGrowing>
					<TableHeaderRow slot="headerRow">
						<TableHeaderCell><a id="row0-link" href="test.html">Link</a></TableHeaderCell>
						<TableHeaderCell>Header2</TableHeaderCell>
						<TableHeaderCell>Header3</TableHeaderCell>
						<TableHeaderCell>Header4</TableHeaderCell>
					</TableHeaderRow>
					<TableRow>
						<TableCell>Row1Cell0</TableCell>
						<TableCell><input id="row1-input"/></TableCell>
						<TableCell><button id="row1-button">Button 1</button></TableCell>
						<TableCell>Row1Cell3</TableCell>
					</TableRow>
					<TableRow id="interactive-row" interactive>
						<TableCell>Row2Cell0</TableCell>
						<TableCell><input id="row2-input"/></TableCell>
						<TableCell><button id="row2-button">Button 2</button></TableCell>
						<TableCell>Row2Cell3</TableCell>
					</TableRow>
					<TableRow id="notinteractive-row"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell> Here the table structure is broken. There is only one cell in row 5. </TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				</Table>
				<input id="after-table1"/>
			</>
		);

		cy.document().then(doc => {
			const table = doc.getElementById("table0");
			const input = doc.getElementById("before-table1");
			table?.addEventListener("ui5-row-click", () => {
				if (input instanceof HTMLInputElement) {
					input.valueAsNumber++;
				}
			});
		});

		cy.get("#table0").children("ui5-table-row").as("rows");
		cy.get("#table0").children("ui5-table-header-row").as("headerRow");
	});

	function getCell(row: number, cell: number, headerRow: boolean) {
		if (headerRow) {
			return cy.get("@headerRow").children("ui5-table-header-cell").eq(cell);
		}
		return cy.get("@rows").eq(row)
			.children("ui5-table-cell")
			.eq(cell);
	}

	function performActions(actions: { element: Cypress.Chainable, click?: string, condition?: string, conditionValue?:string, type?: string, press?: string | string[] }[]) {
		actions.forEach(action => {
			if (action.click) {
				// @ts-ignore
				action.element.click(action.click);
			}
			if (action.condition) {
				if (action.conditionValue) {
					// timing issue - without wait the check is failing
					action.element.wait(0).should(action.condition, action.conditionValue);
				} else {
					action.element.wait(0).should(action.condition);
				}
			}
			if (action.type) {
				action.element.type(action.type);
			}
			if (action.press) {
				// @ts-ignore
				action.element.realPress(action.press);
			}
		});
	}

	it("should navigate on rows", () => {
		performActions([
			// left click is needed to focus the row
			// otherwise the it would click in the center of the row where an input is
			// resulting in a focus on the input instead of the row
			{ element: cy.get("@rows").eq(0), click: "left" },
			{ element: cy.get("@rows").eq(0), type: "{leftarrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{uparrow}", condition: "be.focused" },
			{ element: cy.get("@headerRow"), type: "{uparrow}", condition: "be.focused" },
			{ element: cy.get("@headerRow"), type: "{downarrow}{downarrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(1), type: "{pagedown}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(21), type: "{pagedown}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(24), type: "{pagedown}", condition: "be.focused" },
			{ element: cy.get("#growing").shadow().find("#growing-button"), type: "{pageup}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(5), type: "{pageup}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{end}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(24), type: "{end}", condition: "be.focused" },
			{ element: cy.get("#growing").shadow().find("#growing-button"), type: "{home}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{home}", condition: "be.focused" },
			{ element: cy.get("@headerRow"), condition: "be.focused" }
		]);
	});

	it("should navigate on cells", () => {
		performActions([
			{ element: cy.get("@rows").eq(0), click: "left" },
			{ element: cy.get("@rows").eq(0), type: "{rightarrow}", condition: "be.focused" },
			{ element: getCell(0, 0, false), type: "{leftarrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{rightarrow}{rightarrow}", condition: "be.focused" },
			{ element: getCell(0, 1, false), type: "{home}", condition: "be.focused" },
			{ element: getCell(0, 0, false), type: "{end}", condition: "be.focused" },
			{ element: getCell(0, 3, false), type: "{rightarrow}", condition: "be.focused" },
			{ element: getCell(0, 3, false), type: "{end}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{end}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(24), type: "{rightarrow}{rightarrow}{rightarrow}", condition: "be.focused" },
			{ element: getCell(24, 2, false), type: "{pageup}", condition: "be.focused" },
			{ element: getCell(4, 0, false), type: "{pageup}", condition: "be.focused" },
			{ element: getCell(0, 0, false), type: "{pageup}", condition: "be.focused" },
			{ element: getCell(0, 0, true), type: "{pagedown}", condition: "be.focused" },
			{ element: getCell(19, 0, false), type: "{pagedown}", condition: "be.focused" },
			{ element: getCell(24, 0, false), type: "{pagedown}", condition: "be.focused" },
			{ element: cy.get("#growing").shadow().find("#growing-button"), type: "{home}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{home}", condition: "be.focused" },
			{ element: cy.get("@headerRow"), type: "{downarrow}{rightarrow}", condition: "be.focused" },
			{ element: getCell(0, 0, false), type: "{downarrow}{rightarrow}", condition: "be.focused" },
			{ element: getCell(1, 1, false), type: "{downarrow}{rightarrow}", condition: "be.focused" },
			{ element: getCell(2, 2, false), type: "{downarrow}{rightarrow}", condition: "be.focused" },
			{ element: getCell(3, 3, false), type: "{downarrow}", condition: "be.focused" },
			{ element: getCell(4, 0, false), condition: "be.focused" }
		]);
	});

	it("should handle F2/F7/Enter/Tab/Up/Down", () => {
		cy.get("@rows").eq(0).get("#row1-input").as("row1Input");
		cy.get("@rows").eq(1).get("#row2-input").as("row2Input");

		performActions([
			{ element: cy.get("@rows").eq(0), click: "left" },
			{ element: cy.get("@rows").eq(0), press: "F2", condition: "be.focused" },
			{ element: cy.get("@row1Input"), press: "F2", condition: "be.focused" },
			{ element: getCell(0, 1, false), press: "F2", condition: "be.focused" },
			{ element: cy.get("@row1Input"), press: "F7", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), press: "F7", condition: "be.focused" },
			{ element: cy.get("@row1Input").eq(0), type: "{downarrow}", condition: "be.focused" },
			{ element: cy.get("@row1Input").eq(0), type: "{uparrow}", condition: "be.focused" },
			{ element: cy.get("@row1Input").eq(0), press: ["F2", "{uparrow}"], condition: "be.focused" },
			{ element: getCell(0, 1, true), press: "F2", condition: "be.focused" },
			{ element: getCell(0, 1, true), type: "{leftarrow}", condition: "be.focused" },
			{ element: getCell(0, 0, true), type: "{enter}", condition: "be.focused" },
			{ element: cy.get("@headerRow").get("#row0-link"), type: "{downarrow}", condition: "be.focused" },
			{ element: getCell(0, 0, false), press: "Tab", condition: "be.focused" },
			{ element: cy.get("#after-table1"), press: ["Shift", "Tab"], condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{downarrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(1), press: "F7", condition: "be.focused" },
			{ element: cy.get("@row2Input").eq(0), press: "Tab", condition: "be.focused" },
			{ element: cy.get("@rows").eq(1).get("#row2-button"), press: "F7", condition: "be.focused" },
			{ element: cy.get("@rows").eq(1), type: "{uparrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), press: "F7", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0).get("#row1-button"), type: "{uparrow}", condition: "be.focused" },
			{ element: getCell(0, 2, true), press: "F7", condition: "be.focused" },
			{ element: cy.get("@headerRow"), type: "{downarrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), press: "F7", condition: "be.focused" },
			{ element: getCell(0, 2, false), press: "F7", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{downarrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(1), press: "F7", condition: "be.focused" },
			{ element: getCell(1, 2, false), press: ["Shift", "Tab"], condition: "be.focused" },
			{ element: cy.get("#before-table1"), press: "Tab", condition: "be.focused" },
			{ element: cy.get("@rows").eq(1), press: "Tab", condition: "be.focused" }
		]);
	});

	it("should should work correctly for interactive rows", () => {
		cy.get("@rows").eq(1).get("#row2-button").as("row2Button");
		cy.get("#table0").get("#before-table1").as("input");
		cy.get("@rows").get("#interactive-row").as("row");

		performActions([
			{ element: cy.get("@row"), click: "left" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "1" },
			{ element: cy.get("@row"), type: "{enter}" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "2" },
			{ element: cy.get("@rows").get("#notinteractive-row"), click: "left" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "2" },
			{ element: cy.get("@row2Button"), click: "left" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "2" },
			{ element: cy.get("@row2Button"), type: "{enter}" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "2" },
			{ element: cy.get("@row2Button"), press: "F7" },
			{ element: cy.get("@row"), condition: "be.focused" },
			{ element: cy.get("@row"), press: "Space" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "2" },
			{ element: cy.get("@row"), type: "{enter}" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "3" }
		]);
	});
});
