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

	it("should navigate on rows", () => {
		cy.get("@rows").eq(0)
			// left click is needed to focus the row
			// otherwise the it would click in the center of the row where an input is
			// resulting in a focus on the input instead of the row
			.click("left");
		cy.get("@rows").eq(0).should("be.focused")

		    .type("{leftarrow}");
		cy.get("@rows").eq(0).should("be.focused")

			.type("{uparrow}");
		cy.get("@headerRow").should("be.focused")

			.type("{uparrow}");
		cy.get("@headerRow").should("be.focused")

			.type("{downarrow}{downarrow}");
		cy.get("@rows").eq(1).should("be.focused")

			.type("{pagedown}");
		cy.get("@rows").eq(21).should("be.focused")

			.type("{pagedown}");
		cy.get("@rows").eq(24).should("be.focused")

			.type("{pagedown}");
		cy.get("#growing").shadow().find("#growing-button").should("be.focused")

			.type("{pageup}");
		cy.get("@rows").eq(5).should("be.focused")

			.type("{pageup}");
		cy.get("@rows").eq(0).should("be.focused")

			.type("{end}");
		cy.get("@rows").eq(24).should("be.focused")

			.type("{end}");
		cy.get("#growing").shadow().find("#growing-button").should("be.focused")

			.type("{home}");
		cy.get("@rows").eq(0).should("be.focused")

			.type("{home}");
		cy.get("@headerRow").should("be.focused");
	});

	it("should navigate on cells", () => {
		cy.get("@rows").eq(0)
			.click("left");

		cy.get("@rows").eq(0).should("be.focused")

			.type("{rightarrow}");
		getCell(0, 0, false).should("be.focused")

			.type("{leftarrow}");
		cy.get("@rows").eq(0).should("be.focused")

			.type("{rightarrow}{rightarrow}");
		getCell(0, 1, false).should("be.focused")

			.type("{home}");
		getCell(0, 0, false).should("be.focused")

			.type("{end}");
		getCell(0, 3, false).should("be.focused")

			.type("{rightarrow}");
		getCell(0, 3, false).should("be.focused")

			.type("{end}");
		cy.get("@rows").eq(0).should("be.focused")

			.type("{end}");
		cy.get("@rows").eq(24).should("be.focused")

			.type("{rightarrow}{rightarrow}{rightarrow}");
		getCell(24, 2, false).should("be.focused")

			.type("{pageup}");
		getCell(4, 0, false).should("be.focused")

			.type("{pageup}");
		getCell(0, 0, false).should("be.focused")

			.type("{pageup}");
		getCell(0, 0, true).should("be.focused")

			.type("{pagedown}");
		getCell(19, 0, false).should("be.focused")

			.type("{pagedown}");
		getCell(24, 0, false).should("be.focused")

			.type("{pagedown}");
		cy.get("#growing").shadow().find("#growing-button").should("be.focused")

			.type("{home}");
		cy.get("@rows").eq(0).should("be.focused")

			.type("{home}");
		cy.get("@headerRow").should("be.focused");

		cy.get("@headerRow").type("{downarrow}{rightarrow}");

		for (let i = 0; i < 3; i++) {
			getCell(i, i, false).should("be.focused")
				.type("{downarrow}{rightarrow}");
		}

		getCell(3, 3, false).should("be.focused")
			.type("{downarrow}");

		getCell(4, 0, false).should("be.focused");
	});

	it("should handle F2/F7/Enter/Tab/Up/Down", () => {
		cy.get("@rows").eq(0).get("#row1-input").as("row1Input");
		cy.get("@rows").eq(1).get("#row2-input").as("row2Input");

		cy.get("@rows").eq(0).click("left");
		cy.get("@rows").eq(0).should("be.focused");

		cy.get("@rows").eq(0).realPress("F2");
		cy.get("@row1Input").eq(0).should("be.focused")

			.realPress("F2");
		getCell(0, 1, false).should("be.focused")

			.realPress("F2");
		cy.get("@row1Input").eq(0).should("be.focused")

			.realPress("F7");
		cy.get("@rows").eq(0).should("be.focused")

			.realPress("F7");
		cy.get("@row1Input").eq(0).should("be.focused")

			.type("{downarrow}");
		cy.get("@row1Input").eq(0).should("be.focused")

			.type("{uparrow}");
		cy.get("@row1Input").eq(0).should("be.focused")

			.realPress(["F2", "{uparrow}"]);
		getCell(0, 1, true).should("be.focused")

			.realPress("F2");
		getCell(0, 1, true).should("be.focused")

			.type("{leftarrow}");
		getCell(0, 0, true).should("be.focused")

			.type("{enter}");
		cy.get("@headerRow").get("#row0-link").should("be.focused")

			.type("{downarrow}");
		getCell(0, 0, false).should("be.focused")

			.realPress("Tab");
		cy.get("#after-table1").should("be.focused")

			.realPress(["Shift", "Tab"]);
		cy.get("@rows").eq(0).should("be.focused")

			.type("{downarrow}");
		cy.get("@rows").eq(1).should("be.focused")

			.realPress("F7");
		cy.get("@row2Input").eq(0).should("be.focused")

			.realPress("Tab");
		cy.get("@rows").eq(1).get("#row2-button").should("be.focused")

			.realPress("F7");
		cy.get("@rows").eq(1).should("be.focused")

			.type("{uparrow}");
		cy.get("@rows").eq(0).should("be.focused")

			.realPress("F7");
		cy.get("@rows").eq(0).get("#row1-button").should("be.focused")

			.type("{uparrow}");
		getCell(0, 2, true).should("be.focused")

			.realPress("F7");
		cy.get("@headerRow").should("be.focused")

			.type("{downarrow}");
		cy.get("@rows").eq(0).should("be.focused")

			.realPress("F7");
		getCell(0, 2, false).should("be.focused")

			.realPress("F7");
		cy.get("@rows").eq(0).should("be.focused")

			.type("{downarrow}");
		cy.get("@rows").eq(1).should("be.focused")

			.realPress("F7");
		getCell(1, 2, false).should("be.focused")

			.realPress(["Shift", "Tab"]);
		cy.get("#before-table1").should("be.focused")

			.realPress("Tab");
		cy.get("@rows").eq(1).should("be.focused");
	});

	it("should should work correctly for interactive rows", () => {
		cy.get("@rows").eq(1).get("#row2-button").as("row2Button");
		cy.get("#table0").get("#before-table1").as("input");
		cy.get("@rows").get("#interactive-row").as("row");

		cy.get("@row").click("left");
		cy.get("@input").should("have.value", "1");

		cy.get("@row").type("{enter}");
		cy.get("@input").should("have.value", "2");

		cy.get("@rows").get("#notinteractive-row").click("left");
		cy.get("@input").should("have.value", "2");

		cy.get("@row2Button").click("left");
		cy.get("@input").should("have.value", "2");

		cy.get("@row2Button").type("{enter}");
		cy.get("@input").should("have.value", "2");

		cy.get("@row2Button").realPress("F7");
		cy.get("@row").should("be.focused");

		cy.get("@row").realPress("Space");
		cy.get("@input").should("have.value", "2");

		cy.get("@row").type("{enter}");
		cy.get("@input").should("have.value", "3");
	});
});
