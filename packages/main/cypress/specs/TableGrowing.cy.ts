import { html } from "lit";

import "../../src/Table.js";
import "../../src/TableHeaderRow.js";
import "../../src/TableCell.js";
import "../../src/TableRow.js";
import "../../src/TableGrowing.js";

import type TableGrowing from "../../src/TableGrowing.js";

describe("TableGrowing - Button", () => {
	function mountTable() {
		cy.mount(html`
			<ui5-table id="table">
				<ui5-table-growing slot="features"></ui5-table-growing>
				<ui5-table-header-row slot="headerRow">
					<ui5-table-header-cell><span>ColumnA</span></ui5-table-header-cell>
				</ui5-table-header-row>
				<ui5-table-row>
					<ui5-table-cell><ui5-label>Cell A</ui5-label></ui5-table-cell>
				</ui5-table-row>
			</ui5-table>
		`);
	}
	describe("Rendering", () => {
		it("tests button is rendered", () => {
			mountTable();

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#growing-button")
				.should("exist")
				.should("have.attr", "role", "button")
				.should("have.attr", "aria-labelledby", "growing-text growing-subtext");

			cy.get("[ui5-table")
				.shadow()
				.find("#growing-row")
				.should("exist");

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#growing-text")
				.should("have.text", "More");
		});

		it("tests correct custom texts are rendered", () => {
			const growingText = "My Custom Growing Text",
				growingSubtext = "My Custom Growing Subtext";
			cy.mount(html`
				<ui5-table>
					<ui5-table-growing slot="features" growing-text="${growingText}" growing-sub-text="${growingSubtext}"/>
					<ui5-table-header-row slot="headerRow">
						<ui5-table-header-cell><span>ColumnA</span></ui5-table-header-cell>
					</ui5-table-header-row>
					<ui5-table-row>
						<ui5-table-cell><ui5-label>Cell A</ui5-label></ui5-table-cell>
					</ui5-table-row>
				</ui5-table>
			`);

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#growing-button")
				.should("exist")
				.should("have.attr", "role", "button")
				.should("have.attr", "aria-labelledby", "growing-text growing-subtext");

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#growing-text")
				.should("have.text", growingText);

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#growing-subtext")
				.should("have.text", growingSubtext);
		});

		it("tests diabled state", () => {
			cy.mount(html`
				<ui5-table>
					<ui5-table-growing slot="features" disabled></ui5-table-growing>
					<ui5-table-header-row slot="headerRow">
						<ui5-table-header-cell><span>ColumnA</span></ui5-table-header-cell>
					</ui5-table-header-row>
					<ui5-table-row>
						<ui5-table-cell><ui5-label>Cell A</ui5-label></ui5-table-cell>
					</ui5-table-row>
				</ui5-table>
			`);

			cy.get("[ui5-table]")
				.shadow()
				.find("#growing-row")
				.should("not.exist");

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#growing-button")
				.should("not.exist");
		});

		it("tests dynamically setting disabled state", () => {
			mountTable();

			cy.get("[ui5-table]")
				.shadow()
				.find("#growing-row")
				.should("exist");

			cy.get<TableGrowing>("[ui5-table-growing]")
				.then(table => { table.get(0).disabled = true; });

			cy.get("[ui5-table]")
				.shadow()
				.find("#growing-row")
				.should("not.exist");
		});

		it("tests growing button not shown when no data", () => {
			cy.mount(html`
				<ui5-table>
					<ui5-table-growing slot="features"></ui5-table-growing>
					<ui5-table-header-row slot="headerRow">
						<ui5-table-header-cell><span>ColumnA</span></ui5-table-header-cell>
					</ui5-table-header-row>
				</ui5-table>
			`);

			cy.get("[ui5-table]")
				.shadow()
				.find("#growing-row")
				.should("not.exist");
		});
	});

	describe("Event & Focus", () => {
		it("tests loadMore event fired upon pressing button", () => {
			mountTable();

			cy.get<TableGrowing>("[ui5-table-growing]")
				.then(tableGrowing => tableGrowing.get(0).addEventListener("load-more", cy.stub().as("loadMore")))
				.click();

			cy.get("@loadMore")
				.should("have.been.calledOnce");
		});

		it("tests focus is set to first newly added row", () => {
			mountTable();

			cy.get<TableGrowing>("[ui5-table-growing]")
				.then(tableGrowing => {
					tableGrowing.get(0).addEventListener("load-more", () => {
						const table = document.getElementById("table");
						const row = document.createElement("ui5-table-row");
						row.id = "new-row";
						row.innerHTML = "<ui5-table-cell><ui5-label>Cell B</ui5-label></ui5-table-cell>";
						table!.appendChild(row);
					});
				})
				.click();

			cy.get("[ui5-table]")
				.children("ui5-table-row")
				.should("have.length", 2);

			cy.get("#new-row")
				.should("exist")
				.should("have.focus");
		});

		it("tests focus is set to growing button when no new rows are added", () => {
			mountTable();

			cy.get<TableGrowing>("[ui5-table-growing]")
				.click();

			cy.get("[ui5-table-growing]")
				.should("have.focus");
		});
	});
});

describe("TableGrowing - Scroll", () => {
	function mountTable(rowCount: number = 10, overflow = false) {
		cy.mount(html`
			<div style="height: 200px; ${overflow ? "overflow: auto" : ""}">
			<ui5-table id="table">
				<ui5-table-growing slot="features" type="Scroll"></ui5-table-growing>
				<ui5-table-header-row slot="headerRow">
					<ui5-table-header-cell><span>ColumnA</span></ui5-table-header-cell>
				</ui5-table-header-row>
				${Array.from({ length: rowCount }).map(() => html`
					<ui5-table-row>
						<ui5-table-cell><ui5-label>Cell A</ui5-label></ui5-table-cell>
					</ui5-table-row>
				`)}
			</ui5-table>
			</div>
		`);
	}

	describe("Rendering", () => {
		it("tests no button shown, when scrollable", () => {
			mountTable(10, true);

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#growing-button")
				.should("not.exist");

			cy.get("[ui5-table]")
				.shadow()
				.find("#growing-row")
				.should("not.exist");
		});

		it("tests button shown when not scrollable", () => {
			mountTable(1, false);

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#growing-button")
				.should("exist");

			cy.get("[ui5-table]")
				.shadow()
				.find("#growing-row")
				.should("exist");
		});

		it("tests button not shown when not scrollable and disabled", () => {
			mountTable(1, true);

			cy.get<TableGrowing>("[ui5-table-growing]")
				.then(tableGrowing => { tableGrowing.get(0).disabled = true; });

			cy.get("[ui5-table]")
				.shadow()
				.find("#growing-row")
				.should("not.exist");

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#growing-button")
				.should("not.exist");
		});
	});

	describe("Event", () => {
		it("tests loadMore event fire upon scrolling to table end", () => {
			mountTable(10, true);

			cy.get<TableGrowing>("[ui5-table-growing]")
				.then(tableGrowing => tableGrowing.get(0).addEventListener("load-more", cy.stub().as("loadMore")));

			cy.get("[ui5-table-row]:last-child")
				.scrollIntoView();

			cy.get("@loadMore")
				.should("have.been.calledOnce");
		});

		it("tests button fires load-more, button vanishes, scroll to end fires load-more", () => {
			mountTable(1, true);

			cy.get<TableGrowing>("[ui5-table-growing]")
				.then(tableGrowing => {
					tableGrowing.get(0).addEventListener("load-more", () => {
						const table = document.getElementById("table");
						Array.from({ length: 10 }).forEach(() => {
							const row = document.createElement("ui5-table-row");
							row.innerHTML = "<ui5-table-cell><ui5-label>Cell B</ui5-label></ui5-table-cell>";
							table!.appendChild(row);
						});
					});
					tableGrowing.get(0).addEventListener("load-more", cy.stub().as("loadMore"));
				})
				.click();

			cy.get("@loadMore")
				.should("have.been.calledOnce");

			cy.get("[ui5-table]")
				.children("ui5-table-row")
				.should("have.length", 11);

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#growing-button")
				.should("not.exist");

			cy.get("[ui5-table]")
				.shadow()
				.find("#growing-row")
				.should("not.exist");

			for (let i = 2; i <= 6; i++) {
				cy.get("[ui5-table]")
					.shadow()
					.find("#table-end-row")
					.scrollIntoView();

				cy.get("@loadMore")
					.should("have.callCount", i);

				cy.get("[ui5-table]")
					.children("ui5-table-row")
					.should("have.length", 1 + 10 * i);
			}
		});

		it("tests load-more not fired when disabled", () => {
			mountTable(11, true);

			cy.get<TableGrowing>("[ui5-table-growing]")
				.then(tableGrowing => {
					tableGrowing.get(0).disabled = true;
					tableGrowing.get(0).addEventListener("load-more", cy.stub().as("loadMore"));
				});

			cy.get("[ui5-table-row]:last-child")
				.scrollIntoView();

			cy.get("[ui5-table]")
				.children("ui5-table-row")
				.should("have.length", 11);

			cy.get("@loadMore")
				.should("not.have.been.called");
		});
	});
});
