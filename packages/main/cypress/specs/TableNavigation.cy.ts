import { html } from "lit";
import "../../src/Bar.js";
import "../../src/Table.js";
import "../../src/TableHeaderRow.js";
import "../../src/TableCell.js";
import "../../src/TableRow.js";
import "../../src/TableGrowing.js";

describe("Table - Keyboard Navigation", () => {
	function mountTable() {
		cy.mount(html`
			<input id="before" type="number" value="0">
			<ui5-table id="table0">
				<ui5-table-growing id="growing" type="Button" slot="features"></ui5-table-growing>
				<ui5-table-header-row slot="headerRow">
					<ui5-table-header-cell><a id="row0-link" href="test.html">Link</a></ui5-table-header-cell>
					<ui5-table-header-cell>Header2</ui5-table-header-cell>
					<ui5-table-header-cell>Header3</ui5-table-header-cell>
					<ui5-table-header-cell>Header4</ui5-table-header-cell>
				</ui5-table-header-row>
				<ui5-table-row>
					<ui5-table-cell>Row1Cell0</ui5-table-cell>
					<ui5-table-cell><input id="row1-input"></ui5-table-cell>
					<ui5-table-cell><button id="row1-button">Button 1</button></ui5-table-cell>
					<ui5-table-cell>Row1Cell3</ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row id="interactive-row" interactive>
					<ui5-table-cell>Row2Cell0</ui5-table-cell>
					<ui5-table-cell><input id="row2-input"></ui5-table-cell>
					<ui5-table-cell><button id="row2-button">Button 2</button></ui5-table-cell>
					<ui5-table-cell>Row2Cell3</ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row id="notinteractive-row"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell> Here the table structure is broken. There is only one cell in row 5. </ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				<ui5-table-row> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			</ui5-table>
			<input id="after">
		`);
	}

	it("should navigate on rows", () => {
		mountTable();

		cy.get("[ui5-table-header-row],[ui5-table-row]")
			.as("rows");

		cy.get("#growing")
			.as("growing");

		cy.get("@rows")
			.eq(1)
			.realClick({ x: 1, y: 1 });

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get("@rows")
			.eq(0)
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get("@rows")
			.eq(0)
			.should("be.focused");

		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");

		cy.get("@rows")
			.eq(2)
			.should("be.focused");

		cy.realPress("PageDown");

		cy.get("@rows")
			.eq(22)
			.should("be.focused");

		cy.realPress("PageDown");

		cy.get("@rows")
			.eq(25)
			.should("be.focused");

		cy.realPress("PageDown");

		cy.get("@growing")
			.should("be.focused");

		cy.realPress("PageUp");

		cy.get("@rows")
			.eq(6)
			.should("be.focused");

		cy.realPress("PageUp");

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("PageUp");

		cy.get("@rows")
			.eq(0)
			.should("be.focused");

		cy.realPress("End");

		cy.get("@rows")
			.eq(25)
			.should("be.focused");

		cy.realPress("End");

		cy.get("@growing")
			.should("be.focused");

		cy.realPress("Home");

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("Home");

		cy.get("@rows")
			.eq(0)
			.should("be.focused");
	});

	it("should navigate on cells", () => {
		mountTable();

		cy.get("[ui5-table-header-row],[ui5-table-row]")
			.as("rows");

		cy.get("#growing")
			.as("growing");

		const checkFocus = (rowIndex: number, cellIndex: number) => {
			cy.get("@rows")
				.eq(rowIndex)
				.find("[ui5-table-header-cell],[ui5-table-cell]")
				.eq(cellIndex)
				.should("be.focused");
		};

		cy.get("@rows")
			.eq(1)
			.realClick({ x: 1, y: 1 });

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("ArrowRight");

		checkFocus(1, 0);

		cy.realPress("ArrowLeft");

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("ArrowRight");
		cy.realPress("ArrowRight");

		checkFocus(1, 1);

		cy.realPress("Home");

		checkFocus(1, 0);

		cy.realPress("End");

		checkFocus(1, 3);

		cy.realPress("ArrowRight");

		checkFocus(1, 3);

		cy.realPress("End");

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("End");

		cy.get("@rows")
			.eq(25)
			.should("be.focused");

		cy.realPress("ArrowRight");
		cy.realPress("ArrowRight");
		cy.realPress("ArrowRight");

		checkFocus(25, 2);

		cy.realPress("PageUp");

		checkFocus(5, 0);

		cy.realPress("PageUp");

		checkFocus(1, 0);

		cy.realPress("PageUp");

		checkFocus(0, 0);

		cy.realPress("PageDown");

		checkFocus(20, 0);

		cy.realPress("PageDown");

		checkFocus(25, 0);

		cy.realPress("PageDown");

		cy.get("@growing")
			.should("be.focused");

		cy.realPress("Home");

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("Home");

		cy.get("@rows")
			.eq(0)
			.should("be.focused");

		for (let i = 0; i < 4; i++) {
			cy.realPress("ArrowDown");
			cy.realPress("ArrowRight");

			checkFocus(i + 1, i);
		}

		checkFocus(4, 3);

		cy.realPress("ArrowDown");

		checkFocus(5, 0);
	});

	it("should handle F2/F7/Enter/Tab/Up/Down", () => {
		mountTable();

		cy.get("[ui5-table-header-row],[ui5-table-row]")
			.as("rows");

		cy.get("#growing")
			.as("growing");

		const checkFocus = (rowIndex: number, cellIndex: number) => {
			cy.get("@rows")
				.eq(rowIndex)
				.find("[ui5-table-header-cell],[ui5-table-cell]")
				.eq(cellIndex)
				.should("be.focused");
		};

		cy.get("@rows")
			.eq(1)
			.realClick({ x: 1, y: 1 });

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("F2");

		cy.get("@rows")
			.eq(1)
			.find("input")
			.should("be.focused");

		cy.realPress("F2");

		checkFocus(1, 1);

		cy.realPress("F2");

		cy.get("@rows")
			.eq(1)
			.find("input")
			.should("be.focused");

		cy.realPress("F7");

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("F7");

		cy.get("@rows")
			.eq(1)
			.find("input")
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("@rows")
			.eq(1)
			.find("input")
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get("@rows")
			.eq(1)
			.find("input")
			.should("be.focused");

		cy.realPress("F2");

		cy.realPress("ArrowUp");

		checkFocus(0, 1);

		cy.realPress("F2");

		checkFocus(0, 1);

		cy.realPress("ArrowLeft");

		checkFocus(0, 0);

		cy.realPress("Enter");

		cy.get("@rows")
			.eq(0)
			.find("a")
			.should("be.focused");

		cy.realPress("ArrowDown");

		checkFocus(1, 0);

		cy.realPress("Tab");

		cy.get("#after")
			.should("be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("@rows")
			.eq(2)
			.should("be.focused");

		cy.realPress("F7");

		cy.get("@rows")
			.eq(2)
			.find("input")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("@rows")
			.eq(2)
			.find("button")
			.should("be.focused");

		cy.realPress("F7");

		cy.get("@rows")
			.eq(2)
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("F7");

		cy.get("@rows")
			.eq(1)
			.find("button")
			.should("be.focused");

		cy.realPress("ArrowUp");

		checkFocus(0, 2);

		cy.realPress("F7");

		cy.get("@rows")
			.eq(0)
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("F7");

		checkFocus(1, 2);

		cy.realPress("F7");

		cy.get("@rows")
			.eq(1)
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("@rows")
			.eq(2)
			.should("be.focused");

		cy.realPress("F7");

		checkFocus(2, 2);

		cy.realPress(["Shift", "Tab"]);

		cy.get("#before")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("@rows")
			.eq(2)
			.should("be.focused");
	});

	it("should should work correctly for interactive rows", () => {
		mountTable();

		cy.get("[ui5-table]")
			.then($table => {
				$table.get(0).addEventListener("ui5-row-click", cy.stub().as("rowClicked"));
			});

		cy.get("#interactive-row")
			.realClick({ x: 1, y: 1 });

		cy.get("@rowClicked").should("have.been.calledOnce");

		cy.realPress("Enter");

		cy.get("@rowClicked").should("have.been.calledTwice");

		cy.get("#notinteractive-row")
			.realClick({ x: 1, y: 1 });

		cy.get("@rowClicked").should("have.been.calledTwice");

		cy.get("#row2-button")
			.realClick();

		cy.get("@rowClicked").should("have.been.calledTwice");

		cy.realPress("Enter");

		cy.get("@rowClicked").should("have.been.calledTwice");

		cy.realPress("F7");

		cy.get("#interactive-row")
			.should("be.focused");

		cy.realPress("Space");

		cy.get("@rowClicked").should("have.been.calledTwice");

		cy.realPress("Enter");

		cy.get("@rowClicked").should("have.been.calledThrice");
	});
});

describe("Table - Keyboard Navigation with Fixed Headers", () => {
	it("scrollable container - focused row should always be below the header", () => {
		cy.mount(html`
			<div style="height:300px; overflow:auto;">
				<ui5-bar style="position: sticky; top: 0; z-index: 2; height: 50px;"></ui5-bar>
				<ui5-table id="table0" overflow-mode="Popin" sticky-top="50px" accessible-name-ref="title" no-data-text="No data found">
					<ui5-table-header-row sticky slot="headerRow">
						<ui5-table-header-cell id="colA" min-width="300px"><span>ColumnA</span></ui5-table-header-cell>
						<ui5-table-header-cell id="colB" min-width="200px">Column B</ui5-table-header-cell>
						<ui5-table-header-cell id="colC" min-width="200px">Column C</ui5-table-header-cell>
						<ui5-table-header-cell id="colD" min-width="150px">Column D</ui5-table-header-cell>
					</ui5-table-header-row>
					<ui5-table-row id="row-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-2"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-3"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-4"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-5"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-6"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-7"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-8"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-9"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-10"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-11"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-12"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-13"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-14"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-15"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-16"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-17"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-18"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-19"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-20"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					<ui5-table-row id="row-21"> <ui5-table-cell>A</ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				</ui5-table>
			</div>
		`);

		cy.get("#row-21")
			.as("lastRow")
			.scrollIntoView();

		cy.get("@lastRow")
			.realClick({ x: 1, y: 1 });

		cy.get("@lastRow")
			.should("be.focused");

		cy.get("[ui5-table-header-row]")
			.as("headerRow");

		// Scroll to the top one by one
		for (let i = 20; i > 0; i--) {
			cy.realPress("ArrowUp");

			cy.get(`#row-${i}`)
				.as("row")
				.should("be.focused");

			cy.get("@headerRow")
				.should("be.visible");

			cy.get("@headerRow")
				.then($headerRow => {
					cy.get("@row")
						.then($row => {
							expect($row[0].getBoundingClientRect().y).to.be.gt($headerRow[0].getBoundingClientRect().y);
						});
				});
		}
	});

	it("scrollable table - focused row should always be below the header", () => {
		cy.mount(html`
		<ui5-table id="table1" overflow-mode="Popin" sticky-top="0" accessible-name-ref="title" no-data-text="No data found" style="height: 300px; overflow: auto;">
			<ui5-table-header-row sticky slot="headerRow">
				<ui5-table-header-cell id="colA" min-width="300px"><span>ColumnA</span></ui5-table-header-cell>
				<ui5-table-header-cell id="colB" min-width="200px">Column B</ui5-table-header-cell>
				<ui5-table-header-cell id="colC" min-width="200px">Column C</ui5-table-header-cell>
				<ui5-table-header-cell id="colD" min-width="150px">Column D</ui5-table-header-cell>
			</ui5-table-header-row>
			<ui5-table-row id="row-1-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-2-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-3-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-4-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-5-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-6-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-7-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-8-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-9-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-10-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-11-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-12-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-13-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-14-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-15-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-16-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-17-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-18-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-19-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-20-1"> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
			<ui5-table-row id="row-21-1"> <ui5-table-cell>A</ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
		</ui5-table>
		`);

		cy.get("#row-21-1")
			.as("lastRow")
			.scrollIntoView();

		cy.get("@lastRow")
			.realClick({ x: 1, y: 1 });

		cy.get("@lastRow")
			.should("be.focused");

		cy.get("[ui5-table-header-row]")
			.as("headerRow");

		// Scroll to the top one by one
		for (let i = 20; i > 0; i--) {
			cy.realPress("ArrowUp");

			cy.get(`#row-${i}-1`)
				.as("row")
				.should("be.focused");

			cy.get("@headerRow")
				.should("be.visible");

			cy.get("@headerRow")
				.then($headerRow => {
					cy.get("@row")
						.then($row => {
							expect($row[0].getBoundingClientRect().y).to.be.gt($headerRow[0].getBoundingClientRect().y);
						});
				});
		}
	});

	it("body as scroll container - focused row should always be below the header", () => {
		cy.mount(html`
		<ui5-table id="table1" overflow-mode="Popin" sticky-top="0" accessible-name-ref="title" no-data-text="No data found" style="height: 300px; overflow: auto;">
			<ui5-table-header-row sticky slot="headerRow">
				<ui5-table-header-cell id="colA" min-width="300px"><span>ColumnA</span></ui5-table-header-cell>
				<ui5-table-header-cell id="colB" min-width="200px">Column B</ui5-table-header-cell>
				<ui5-table-header-cell id="colC" min-width="200px">Column C</ui5-table-header-cell>
				<ui5-table-header-cell id="colD" min-width="150px">Column D</ui5-table-header-cell>
			</ui5-table-header-row>
			${Array.from({ length: 100 }).map((row, index) => html`
			<ui5-table-row id="${`row-${index + 1}-2`}">
				<ui5-table-cell><ui5-label><b>Notebook Basic ${index + 1}</b><br>HT-100${index + 1}</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>Technocom</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>32 x 21 x 4 cm</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label style="color: #2b7c2b"><b>3.7</b> KG</ui5-label></ui5-table-cell>
				<ui5-table-cell style="text-align: end;"><ui5-label style="text-align: end;"><b>29</b> EUR</ui5-label></ui5-table-cell>
			</ui5-table-row>
			`)}
		</ui5-table>
		`);

		cy.get("#row-100-2")
			.as("lastRow")
			.scrollIntoView();

		cy.get("@lastRow")
			.realClick({ x: 1, y: 1 });

		cy.get("@lastRow")
			.should("be.focused");

		cy.get("[ui5-table-header-row]")
			.as("headerRow");

		// Scroll to the top one by one
		for (let i = 99; i > 0; i--) {
			cy.realPress("ArrowUp");

			cy.get(`#row-${i}-2`)
				.as("row")
				.should("be.focused");

			cy.get("@headerRow")
				.should("be.visible");

			cy.get("@headerRow")
				.then($headerRow => {
					cy.get("@row")
						.then($row => {
							expect($row[0].getBoundingClientRect().y).to.be.gt($headerRow[0].getBoundingClientRect().y);
						});
				});
		}
	});
});
