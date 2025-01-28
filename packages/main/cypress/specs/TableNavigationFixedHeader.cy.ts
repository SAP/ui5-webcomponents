import { html } from "lit";

import "../../src/Table.js";
import "../../src/TableHeaderRow.js";
import "../../src/TableHeaderCell.js";
import "../../src/TableRow.js";
import "../../src/TableCell.js";
import "../../src/TableGrowing.js";
import "../../src/Bar.js";
import "../../src/Title.js";
import "../../src/Slider.js";

describe("Table - Keyboard Navigation with Fixed Headers", () => {
	beforeEach(() => {
		cy.mount(html`
			<div style="height:300px; overflow:auto;">
				<ui5-bar id="toolbar" design="Header" accessible-name-ref="title" style="position: sticky; top: 0; z-index: 2; height: 50px;">
				<ui5-title tabindsex="0" level="H3" id="title" slot="startContent">My Selectable Products (3)</ui5-title>
				<ui5-slider id="slider" min="0" max="100" step="1" value="100"
					label-interval="0"></ui5-slider>
				</ui5-bar>
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


			<ui5-bar id="toolbar2" design="Header" accessible-name-ref="title" style="position: sticky; top: 0; z-index: 2; height: 50px;">
				<ui5-title tabindsex="0" level="H3" id="title" slot="startContent">My Selectable Products (3)</ui5-title>
				<ui5-slider id="slider" min="0" max="100" step="1" value="100"
					label-interval="0"></ui5-slider>
			</ui5-bar>
			<ui5-table id="table2" overflow-mode="Popin" sticky-top="50px" accessible-name-ref="title" no-data-text="No data found">
				<ui5-table-header-row sticky slot="headerRow">
					<ui5-table-header-cell id="colA" min-width="300px"><span>ColumnA</span></ui5-table-header-cell>
					<ui5-table-header-cell id="colB" min-width="200px">Column B</ui5-table-header-cell>
					<ui5-table-header-cell id="colC" min-width="200px">Column C</ui5-table-header-cell>
					<ui5-table-header-cell id="colD" min-width="150px">Column D</ui5-table-header-cell>
				</ui5-table-header-row>
			</ui5-table>
		`);

		cy.document().then(doc => {
			const table = doc.getElementById("table2");
			for (let i = 0; i < 100; i++) {
				const newRow = doc.createElement("ui5-table-row");
				newRow.id = `row-${i + 1}-2`;
				newRow.innerHTML = `
					<ui5-table-cell><ui5-label><b>Notebook Basic ${18 + i}</b><br>HT-100${2 + i}</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Technocom</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>32 x 21 x 4 cm</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label style="color: #2b7c2b"><b>3.7</b> KG</ui5-label></ui5-table-cell>
					<ui5-table-cell style="text-align: end;"><ui5-label style="text-align: end;"><b>29</b> EUR</ui5-label></ui5-table-cell>
				`;
				table?.appendChild(newRow);
			}
		});
	});

	function isDisplayedInsideViewport(element: string) {
		cy.get(element).then($el => {
			const el = $el[0];
			const rect = el.getBoundingClientRect();

			expect(rect.top).to.be.at.least(0);
			expect(rect.left).to.be.at.least(0);
			expect(rect.bottom).to.be.lessThan(Cypress.config("viewportHeight"));
			expect(rect.right).to.be.lessThan(Cypress.config("viewportWidth"));
		});
	}

	it("scrollable container - focused row should always be below the header", () => {
		cy.get("#table0").children("ui5-table-row").as("rows");
		cy.get("#table0").children("ui5-table-header-row").as("headerRow");
		cy.get("@rows").get("#row-21").as("lastRow");

		cy.get("@lastRow").scrollIntoView();
		cy.get("@lastRow").click("left");
		cy.get("@lastRow").should("be.focused");

		for (let i = 20; i > 0; i--) {
			cy.realPress("{uparrow}");
			cy.get("@rows").get(`#row-${i}`).should("be.focused");

			isDisplayedInsideViewport("@headerRow");

			cy.get("@headerRow").then($headerRow => {
				cy.get("@rows").get(`#row-${i}`).then($row => {
					const headerRowBottom = $headerRow[0].getBoundingClientRect().bottom;
					const focusedRowTop = $row[0].getBoundingClientRect().top;

					expect(focusedRowTop).to.be.at.least(headerRowBottom);
				});
			});
		}
	});

	it("scrollable table - focused row should always be below the header", () => {
		cy.get("#table1").children("ui5-table-row").as("rows");
		cy.get("#table1").children("ui5-table-header-row").as("headerRow");
		cy.get("@rows").get("#row-21-1").as("lastRow");

		cy.get("@lastRow").scrollIntoView();
		cy.get("@lastRow").click("left");
		cy.get("@lastRow").should("be.focused");

		for (let i = 20; i > 0; i--) {
			cy.realPress("{uparrow}");
			cy.get("@rows").get(`#row-${i}-1`).should("be.focused");

			isDisplayedInsideViewport("@headerRow");

			cy.get("@headerRow").then($headerRow => {
				cy.get("@rows").get(`#row-${i}-1`).then($row => {
					const headerRowBottom = $headerRow[0].getBoundingClientRect().bottom;
					const focusedRowTop = $row[0].getBoundingClientRect().top;

					expect(focusedRowTop).to.be.at.least(headerRowBottom);
				});
			});
		}
	});

	it("body as scroll container - focused row should always be below the header", () => {
		cy.get("#table2").children("ui5-table-row").as("rows");
		cy.get("#table2").children("ui5-table-header-row").as("headerRow");
		cy.get("@rows").get("#row-100-2").as("lastRow");

		cy.get("@lastRow").scrollIntoView();
		cy.get("@lastRow").click("left");
		cy.get("@lastRow").should("be.focused");

		for (let i = 99; i > 0; i--) {
			cy.realPress("{uparrow}");
			cy.get("@rows").get(`#row-${i}-2`).should("be.focused");

			isDisplayedInsideViewport("@headerRow");

			cy.get("@headerRow").then($headerRow => {
				cy.get("@rows").get(`#row-${i}-2`).then($row => {
					const headerRowBottom = $headerRow[0].getBoundingClientRect().bottom;
					const focusedRowTop = $row[0].getBoundingClientRect().top;

					expect(focusedRowTop).to.be.at.least(headerRowBottom);
				});
			});
		}
	});
});
