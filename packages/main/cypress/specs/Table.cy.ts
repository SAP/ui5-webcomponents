import { html } from "lit";

import "../../src/Table.js";
import "../../src/TableHeaderRow.js";
import "../../src/TableCell.js";
import "../../src/TableRow.js";
import "../../src/TableSelection.js";
import Table from "../../src/Table.js";

// Porting Table.spec.js (wdio tests) to cypress tests
const ROLE_COLUMN_HEADER = "columnheader";

describe("Table - Rendering", () => {
	it("tests if table is rendered", () => {
		cy.mount(html`
			<ui5-table id="table">
				<ui5-table-header-row slot="headerRow">
					<ui5-table-header-cell><span>ColumnA</span></ui5-table-header-cell>
					<ui5-table-header-cell><span>ColumnB</span></ui5-table-header-cell>
				</ui5-table-header-row>
				<ui5-table-row>
					<ui5-table-cell><ui5-label>Cell A</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Cell B</ui5-label></ui5-table-cell>
				</ui5-table-row>
			</ui5-table>
		`);

		cy.get("ui5-table").should("exist");
		cy.get("ui5-table-header-row").should("exist");
		cy.get("ui5-table-row").should("exist");
		cy.get("ui5-table-header-cell").should("have.length", 2);
	});

	it("tests if initial empty table renders without errors", () => {
		cy.window().then(window => {
			window.addEventListener("unhandledrejection", cy.stub().as("rejection"));

			const table = window.document.createElement("ui5-table");
			window.document.body.appendChild(table);

			setTimeout(() => {
				const row = window.document.createElement("ui5-table-row");
				table.appendChild(row);

				cy.get("@rejection").should("not.be.called");

				table.remove();
			}, 100);
		});

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);
	});
});

describe("Table - Popin Mode", () => {
	beforeEach(() => {
		cy.mount(html`
			<ui5-table id="table" overflow-mode="Popin">
				<ui5-table-header-row slot="headerRow">
					<ui5-table-header-cell id="colA" min-width="300px"><span>ColumnA</span></ui5-table-header-cell>
					<ui5-table-header-cell id="colB" min-width="200px">Column B</ui5-table-header-cell>
					<ui5-table-header-cell id="colC" min-width="200px">Column C</ui5-table-header-cell>
					<ui5-table-header-cell id="colD" min-width="150px">Column D</ui5-table-header-cell>
				</ui5-table-header-row>
				<ui5-table-row>
					<ui5-table-cell><ui5-label>Cell A</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Cell B</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Cell C</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Cell D</ui5-label></ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row>
					<ui5-table-cell><ui5-label>Cell A</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Cell B</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Cell C</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Cell D</ui5-label></ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row>
					<ui5-table-cell><ui5-label>Cell A</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Cell B</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Cell C</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Cell D</ui5-label></ui5-table-cell>
				</ui5-table-row>
			</ui5-table>
		`);
	});

	it("no pop-in width 'optimal' table width", () => {
		cy.get("ui5-table").then($table => {
			$table.css("width", "850px");
		});

		cy.get("ui5-table")
			.should("exist")
			.should("have.attr", "overflow-mode", "Popin")
			.should("have.css", "width", "850px");
		cy.get("ui5-table-header-cell")
			.should("have.length", 4);

		cy.get("ui5-table-header-cell").each(($cell, index) => {
			cy.wrap($cell)
				.should("have.attr", "role", ROLE_COLUMN_HEADER);
			cy.get("ui5-table-header-row")
				.shadow()
				.find(`slot[name=default-${index + 1}]`)
				.should("exist");
		});
	});

	it("test with one by one popping in", () => {
		const testWidths = [
			{ width: 850, poppedIn: [] },
			{ width: 700, poppedIn: ["colD"] },
			{ width: 500, poppedIn: ["colD", "colC"] },
			{ width: 300, poppedIn: ["colD", "colC", "colB"] },
			{ width: 150, poppedIn: ["colD", "colC", "colB"] },
		];

		testWidths.forEach(({ width, poppedIn }) => {
			cy.get("ui5-table").then($table => {
				$table.css("width", `${width}px`);
			});

			cy.get("ui5-table-header-cell").each(($cell, index) => {
				const id = $cell.attr("id") ?? "";
				const shouldBePoppedIn = poppedIn.includes(id);
				const roleCondition = shouldBePoppedIn ? "not.have.attr" : "have.attr";

				cy.wrap($cell)
					.should(roleCondition, "role", ROLE_COLUMN_HEADER);
				cy.get("ui5-table-header-row")
					.shadow()
					.find(`slot[name=default-${index + 1}]`)
					.should(shouldBePoppedIn ? "not.exist" : "exist");
			});
		});
	});

	it("test with one by one popping out", () => {
		const testWidths = [
			{ width: 150, poppedIn: ["colD", "colC", "colB"] },
			{ width: 300, poppedIn: ["colD", "colC", "colB"] },
			{ width: 500, poppedIn: ["colD", "colC"] },
			{ width: 700, poppedIn: ["colD"] },
			{ width: 850, poppedIn: [] },
		];

		testWidths.forEach(({ width, poppedIn }) => {
			cy.get("ui5-table").then($table => {
				$table.css("width", `${width}px`);
			});

			cy.get("ui5-table-header-cell").each(($cell, index) => {
				const id = $cell.attr("id") ?? "";
				const shouldBePoppedIn = poppedIn.includes(id);
				const roleCondition = shouldBePoppedIn ? "not.have.attr" : "have.attr";

				cy.wrap($cell)
					.should(roleCondition, "role", ROLE_COLUMN_HEADER);
				cy.get("ui5-table-header-row")
					.shadow()
					.find(`slot[name=default-${index + 1}]`)
					.should(shouldBePoppedIn ? "not.exist" : "exist");
			});
		});
	});

	it("test with random widths", () => {
		const expectedStates = [
			{ width: 500, poppedIn: ["colD", "colC", "colB"] },
			{ width: 700, poppedIn: ["colD", "colC"] },
			{ width: 850, poppedIn: ["colD"] },
			{ width: Infinity, poppedIn: [] },
		];

		const runs = 10;
		for (let i = 0; i < runs; i++) {
			const randomWidth = Math.floor(Math.random() * 1000) + 1;
			cy.get("ui5-table").then($table => {
				$table.css("width", `${randomWidth}px`);
			});

			const expectedState = expectedStates.find(state => state.width >= randomWidth);
			cy.get("ui5-table-header-cell").each(($cell, index) => {
				const id = $cell.attr("id") ?? "";
				const shouldBePoppedIn = expectedState?.poppedIn.includes(id);
				const roleCondition = shouldBePoppedIn ? "not.have.attr" : "have.attr";

				cy.wrap($cell)
					.should(roleCondition, "role", ROLE_COLUMN_HEADER);
				cy.get("ui5-table-header-row")
					.shadow()
					.find(`slot[name=default-${index + 1}]`)
					.should(shouldBePoppedIn ? "not.exist" : "exist");
			});
		}
	});

	it("should show the popin-text in the popin area", () => {
		cy.get("ui5-table").then($table => {
			$table.css("width", "150px");
		});

		cy.get("ui5-table").then($table => {
			const table = $table[0] as Table;
			// eslint-disable-next-line no-restricted-syntax
			for (const row of table.rows) {
				// eslint-disable-next-line no-restricted-syntax
				for (const cell of row.cells) {
					if (cell._popin) {
						const popinText = cell._headerCell.popinText || cell._headerCell.textContent;
						if (cell.shadowRoot!.textContent !== `${popinText}:`) {
							return false;
						}
					}
				}
			}
			return true;
		}).should("be.true");
	});
});

describe("Table - Horizontal alignment of cells", () => {
	function check(id: string, index: number, alignment: string) {
		cy.get(id)
			.should("have.css", "justify-content", alignment)
			.invoke("attr", "style")
			.then(style => {
				const variable = style?.match(/justify-content: ([^;]+)/)?.[1] ?? "";
				expect(variable).to.equal(`var(--horizontal-align-default-${index})`);
			});
		cy.get("ui5-table-row")
			.get(`ui5-table-cell:nth-of-type(${index})`)
			.should("have.css", "justify-content", alignment);
	}

	beforeEach(() => {
		cy.mount(html`
			<ui5-table id="table" overflow-mode="Popin" style="width: 1120px;">
				<ui5-table-header-row slot="headerRow">
					<ui5-table-header-cell id="productCol" width="300px"><span>Product</span></ui5-table-header-cell>
					<ui5-table-header-cell id="supplierCol" horizontal-align="Center" width="200px">Supplier</ui5-table-header-cell>
					<ui5-table-header-cell id="dimensionsCol" horizontal-align="Right" width="300px">Dimensions</ui5-table-header-cell>
					<ui5-table-header-cell id="weightCol" width="100px">Weight</ui5-table-header-cell>
					<ui5-table-header-cell id="priceCol" width="220px">Price</ui5-table-header-cell>
				</ui5-table-header-row>
				<ui5-table-row>
					<ui5-table-cell><ui5-label><b>Notebook Basic 15</b><br>HT-1000</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Very Best Screens</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>30 x 18 x 3 cm</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label style="color: #2b7c2b"><b>4.2</b> KG</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label><b>956</b> EUR</ui5-label></ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row>
					<ui5-table-cell><ui5-label><b>Notebook Basic 17</b><br>HT-1001</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Smartcards</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>29 x 17 x 3.1 cm</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label style="color: #2b7c2b"><b>4.5</b> KG</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label><b>1249</b> EUR</ui5-label></ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row>
					<ui5-table-cell><ui5-label><b>Notebook Basic 18</b><br>HT-1002</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Technocom</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>32 x 21 x 4 cm</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label style="color: #2b7c2b"><b>3.7</b> KG</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label><b>29</b> EUR</ui5-label></ui5-table-cell>
				</ui5-table-row>
			</ui5-table>
		`);
	});

	it("default alignment when horizotal align is not set", () => {
		check("#productCol", 1, "normal");
	});

	it("alignment is set correctly during runtime", () => {
		const alignments = ["Left", "Start", "Right", "End", "Center"];

		alignments.forEach(alignment => {
			cy.get("#productCol")
				.invoke("attr", "horizontal-align", alignment)
				.should("have.attr", "horizontal-align", alignment);
			check("#productCol", 1, alignment.toLowerCase());
		});
	});

	it("alignment is normal if set to unknown value", () => {
		cy.get("#productCol")
			.invoke("attr", "horizontal-align", "UnknownValue")
			.should("have.attr", "horizontal-align", "UnknownValue");
		check("#productCol", 1, "normal");
	});

	it("alignment cells have same alignment as header cell on init time", () => {
		check("#supplierCol", 2, "center");
		check("#dimensionsCol", 3, "right");
	});

	it("cells should change alignment when changing headerCell alignment", () => {
		check("#supplierCol", 2, "center");

		cy.get("#supplierCol")
			.invoke("attr", "horizontal-align", "End")
			.should("have.attr", "horizontal-align", "End");

		check("#supplierCol", 2, "end");
	});

	it("single cell alignment does not affect other cells and is not affected by header cell alignment", () => {
		check("#supplierCol", 2, "center");

		cy.get("ui5-table-row:nth-of-type(2) > ui5-table-cell:nth-child(2)")
			.invoke("attr", "horizontal-align", "Start")
			.should("have.attr", "horizontal-align", "Start")
			.should("have.css", "justify-content", "start");

		cy.get("#supplierCol")
			.should("have.css", "justify-content", "center");

		cy.get("ui5-table-row:nth-of-type(3) > ui5-table-cell:nth-child(2)")
			.should("have.css", "justify-content", "center");

		cy.get("ui5-table-row:nth-of-type(1) > ui5-table-cell:nth-child(2)")
			.should("have.css", "justify-content", "center");

		// Change alignment of header cell => should not affect custom cell alignment
		cy.get("#supplierCol")
			.invoke("attr", "horizontal-align", "End")
			.should("have.attr", "horizontal-align", "End");

		cy.get("ui5-table-row:nth-of-type(2) > ui5-table-cell:nth-child(2)")
			.should("have.attr", "horizontal-align", "Start")
			.should("have.css", "justify-content", "start");

		cy.get("ui5-table-row:nth-of-type(3) > ui5-table-cell:nth-child(2)")
			.should("have.css", "justify-content", "end");

		cy.get("ui5-table-row:nth-of-type(1) > ui5-table-cell:nth-child(2)")
			.should("have.css", "justify-content", "end");
	});

	it("alignment with popin", () => {
		const testWidths = [
			{ width: 1120, poppedIn: [] },
			{ width: 900, poppedIn: ["priceCol"] },
			{ width: 800, poppedIn: ["priceCol", "weightCol"] },
			{ width: 500, poppedIn: ["priceCol", "weightCol", "dimensionsCol"] },
			{ width: 300, poppedIn: ["priceCol", "weightCol", "dimensionsCol", "supplierCol"] },
		];
		const alignments = {
			"productCol": "normal",
			"supplierCol": "center",
			"dimensionsCol": "right",
			"weightCol": "normal",
			"priceCol": "normal",
			"none": "",
		};

		testWidths.forEach(({ width, poppedIn }) => {
			cy.get("ui5-table").then($table => {
				$table.css("width", `${width}px`);
			});

			cy.get("ui5-table-header-cell").each(($cell, index) => {
				const id = $cell.attr("id") as keyof typeof alignments ?? "none";
				const shouldBePoppedIn = poppedIn.includes(id);

				if (shouldBePoppedIn) {
					check(`#${id}`, index + 1, "normal");
				} else {
					check(`#${id}`, index + 1, alignments[id]);
				}
			});
		});
	});
});

describe("Table - Fixed Header", () => {
	function check(topOffset: number, lastRow: string) {
		cy.get("ui5-table-header-row")
			.should("have.css", "position", "sticky")
			.should("have.css", "top", `${topOffset}px`);

		cy.get(lastRow)
			.scrollIntoView();

		cy.get("ui5-table-header-row")
			.then($header => {
				const headerRect = $header[0].getBoundingClientRect();
				expect(headerRect.top).to.be.eq(topOffset);
			});
	}

	beforeEach(() => {
		cy.window().then(window => {
			window.document.body.style.margin = "0";
			window.document.body.style.padding = "0";
		});
	});

	it("fixed header with scrollable wrapping container", () => {
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
					${Array.from({ length: 20 }).map((val, index) => html`
						<ui5-table-row id=row-${index + 1}><ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
					`)}
				</ui5-table>
			</div>
		`);

		check(50, "#row-20");
	});

	it("fixed header with table being scrollable", () => {
		cy.mount(html`
			<ui5-table id="table" overflow-mode="Popin" sticky-top="0" accessible-name-ref="title" no-data-text="No data found" style="height: 300px; overflow: auto;">
				<ui5-table-header-row sticky slot="headerRow">
					<ui5-table-header-cell id="colA" min-width="300px"><span>ColumnA</span></ui5-table-header-cell>
					<ui5-table-header-cell id="colB" min-width="200px">Column B</ui5-table-header-cell>
					<ui5-table-header-cell id="colC" min-width="200px">Column C</ui5-table-header-cell>
					<ui5-table-header-cell id="colD" min-width="150px">Column D</ui5-table-header-cell>
				</ui5-table-header-row>
				${Array.from({ length: 20 }).map((val, index) => html`
					<ui5-table-row id=row-${index + 1}><ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				`)}
			</ui5-table>
		`);

		check(0, "#row-20");
	});

	it("fixed header with body being scroll container", () => {
		cy.mount(html`
			<ui5-bar id="toolbar2" design="Header" accessible-name-ref="title" style="position: sticky; top: 0; z-index: 2; height: 50px;">
				<ui5-title tabindsex="0" level="H3" id="title" slot="startContent">My Selectable Products (3)</ui5-title>
				<ui5-slider id="slider" min="0" max="100" step="1" value="100"
					label-interval="0"></ui5-slider>
			</ui5-bar>
			<ui5-table id="table" overflow-mode="Popin" sticky-top="50px" accessible-name-ref="title" no-data-text="No data found">
				<ui5-table-header-row sticky slot="headerRow">
					<ui5-table-header-cell id="colA" min-width="300px"><span>ColumnA</span></ui5-table-header-cell>
					<ui5-table-header-cell id="colB" min-width="200px">Column B</ui5-table-header-cell>
					<ui5-table-header-cell id="colC" min-width="200px">Column C</ui5-table-header-cell>
					<ui5-table-header-cell id="colD" min-width="150px">Column D</ui5-table-header-cell>
				</ui5-table-header-row>
				${Array.from({ length: 100 }).map((val, index) => html`
					<ui5-table-row id=row-${index + 1}><ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> <ui5-table-cell></ui5-table-cell> </ui5-table-row>
				`)}
			</ui5-table>
		`);

		check(50, "#row-100");
	});
});

describe("Table - Horizontal Scrolling", () => {
	beforeEach(() => {
		cy.window().then(window => {
			window.document.body.style.margin = "0";
			window.document.body.style.padding = "0";
		});

		cy.mount(html`
			<ui5-table id="table" overflow-mode="Scroll" height="300px" sticky-top="0px" style="width: 300px; overflow: auto;" accessible-name-ref="title">
				<ui5-table-selection id="selection" selected="0 2" slot="features"></ui5-table-selection>
				<ui5-table-header-row slot="headerRow" sticky>
					<ui5-table-header-cell id="produtCol" width="200px"><span>Product</span></ui5-table-header-cell>
					<ui5-table-header-cell id="supplierCol" width="200px">Supplier</ui5-table-header-cell>
					<ui5-table-header-cell id="dimensionsCol" width="200px">Dimensions</ui5-table-header-cell>
					<ui5-table-header-cell id="weightCol" width="200px">Weight</ui5-table-header-cell>
					<ui5-table-header-cell id="priceCol" width="200px">Price</ui5-table-header-cell>
				</ui5-table-header-row>
				<ui5-table-row id="firstRow" navigated key="0">
					<ui5-table-cell><ui5-label><b>Notebook Basic 15</b><br><a href="#">HT-1000</a></ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Very Best Screens</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>30 x 18 x 3 cm</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label style="color: #2b7c2b"><b>4.2</b> KG</ui5-label></ui5-table-cell>
					<ui5-table-cell id="lastCell"><ui5-label><b>956</b> EUR</ui5-label></ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row key="1">
					<ui5-table-cell><ui5-label><b>Notebook Basic 16</b><br><a href="#">HT-1001</a></ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Smartcards</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-input value="29 x 17 x 3.1 cm" accessible-name-ref="dimensionsCol"></ui5-input></ui5-table-cell>
					<ui5-table-cell><ui5-label style="color: #2b7c2b"><b>4.5</b> KG</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label><b>1249</b> EUR</ui5-label></ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row key="2" interactive>
					<ui5-table-cell><ui5-label><b>Notebook Basic 17</b><br><a href="#">HT-1002</a></ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Technocom</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>32 x 21 x 4 cm</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label style="color: #2b7c2b"><b>3.7</b> KG</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label><b>29</b> EUR</ui5-label></ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row key="3">
					<ui5-table-cell><ui5-label><b>Notebook Basic 18</b><br><a href="#">HT-1003</a></ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Technocom</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>32 x 21 x 4 cm</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label style="color: #2b7c2b"><b>3.7</b> KG</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label><b>29</b> EUR</ui5-label></ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row key="4">
					<ui5-table-cell><ui5-label><b>Notebook Basic 19</b><br><a href="#">HT-1004</a></ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Technocom</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>32 x 21 x 4 cm</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label style="color: #2b7c2b"><b>3.7</b> KG</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label><b>29</b> EUR</ui5-label></ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row key="5">
					<ui5-table-cell><ui5-label><b>Notebook Basic 20</b><br><a href="#">HT-1005</a></ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Technocom</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>32 x 21 x 4 cm</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label style="color: #2b7c2b"><b>3.7</b> KG</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label><b>29</b> EUR</ui5-label></ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row key="6" interactive>
					<ui5-table-cell><ui5-label><b>Notebook Basic 21</b><br><a href="#">HT-1006</a></ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>Technocom</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label>32 x 21 x 4 cm</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label style="color: #2b7c2b"><b>3.7</b> KG</ui5-label></ui5-table-cell>
					<ui5-table-cell><ui5-label><b>29</b> EUR</ui5-label></ui5-table-cell>
				</ui5-table-row>
			</ui5-table>
		`);
	});

	it("navigated indidcator is fixed to the right", () => {
		cy.get("#lastCell")
			.then($lastCell => {
				$lastCell[0].scrollIntoView();
			});

		cy.get("#firstRow")
			.shadow()
			.find("#navigated-cell")
			.should("have.css", "position", "sticky")
			.should("have.css", "right", "0px");
	});

	it("selection column should be fixed to the left", () => {
		cy.get("#lastCell")
			.then($lastCell => {
				$lastCell[0].scrollIntoView();
			});

		cy.get("#firstRow")
			.shadow()
			.find("#selection-cell")
			.should("have.css", "position", "sticky")
			.then($selectionCell => {
				const selectionRect = $selectionCell[0].getBoundingClientRect();
				expect(selectionRect.left).to.be.eq(0);
			});

		cy.get("#table")
			.shadow()
			.find("#table")
			.then($table => {
				const leftOffset = $table[0].scrollLeft;
				expect(leftOffset).to.be.greaterThan(0);
			});
	});
});

describe("Table - Navigated Rows", () => {
	it("Navigated cell is rendered", () => {
		cy.mount(html`
			<ui5-table id="table1">
				<ui5-table-header-row slot="headerRow">
					<ui5-table-header-cell id="colA"><span>ColumnA</span></ui5-table-header-cell>
				</ui5-table-header-row>
				<ui5-table-row id="row1" navigated>
					<ui5-table-cell><ui5-label>Cell A</ui5-label></ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row id="row2">
					<ui5-table-cell><ui5-label>Cell A</ui5-label></ui5-table-cell>
				</ui5-table-row>
			</ui5-table>
		`);

		cy.get("#row1")
			.shadow()
			.find("#navigated-cell")
			.should("exist")
			.should("have.attr", "excluded-from-navigation", "");

		cy.get("#row2")
			.shadow()
			.find("#navigated-cell")
			.should("exist")
			.should("have.attr", "excluded-from-navigation", "");

		cy.get("#row1")
			.shadow()
			.find("#navigated")
			.as("navigated1");

		cy.get("#row2")
			.shadow()
			.find("#navigated")
			.then($navigated2 => {
				cy.get("@navigated1")
					.then($navigated1 => {
						const nav1BG = getComputedStyle($navigated1[0]).backgroundColor;
						const nav2BG = getComputedStyle($navigated2[0]).backgroundColor;
						expect(nav1BG).to.not.be.eq(nav2BG);
					});
			});

		cy.get("#table1")
			.shadow()
			.find("#table")
			.then($table => {
				const gridTemplateColumns = $table[0].style.gridTemplateColumns;
				// eslint-disable-next-line no-unused-expressions
				expect(gridTemplateColumns.endsWith("table_navigated_cell_width)")).to.be.true;
			});
	});
});
