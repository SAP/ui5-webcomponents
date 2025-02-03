import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableSelection from "../../src/TableSelection.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import Label from "../../src/Label.js";
import Input from "../../src/Input.js";
import Bar from "../../src/Bar.js";
import Title from "../../src/Title.js";
import Slider from "../../src/Slider.js";

// Porting Table.spec.js (wdio tests) to cypress tests
const ROLE_COLUMN_HEADER = "columnheader";

describe("Table - Rendering", () => {
	it("tests if table is rendered", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell><span>ColumnB</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
				</TableRow>
			</Table>
		);

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
		cy.mount(
			<Table id="table" overflowMode="Popin">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA" minWidth="300px"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
					<TableHeaderCell id="colC" minWidth="200px">Column C</TableHeaderCell>
					<TableHeaderCell id="colD" minWidth="150px" popinText="Column ?">Column D</TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		);
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
			// eslint-disable-next-line cypress/no-unnecessary-waiting, no-loop-func
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

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		cy.get("ui5-table").then($table => {
			let popinCellCount = 0;
			let validPopinTextCount = 0;
			const table = $table[0] as Table;
			// eslint-disable-next-line no-restricted-syntax
			for (const row of table.rows) {
				// eslint-disable-next-line no-restricted-syntax
				for (const cell of row.cells) {
					if (cell._popin) {
						popinCellCount++;
						const popinText = cell._headerCell.popinText || cell._headerCell.textContent;
						if (cell.shadowRoot!.textContent === `${popinText}:`) {
							validPopinTextCount++;
						}
					}
				}
			}
			return popinCellCount && popinCellCount === validPopinTextCount;
		}).should("be.true");
	});
});

describe("Table - Horizontal alignment of cells", () => {
	function check(id: string, index: number, alignment: string) {
		cy.get(id)
			.should("have.css", "justify-content", alignment)
			.and($el => {
				const style = $el.attr("style");
				const variable = style?.match(/justify-content: ([^;]+)/)?.[1] ?? "";
				expect(variable).to.equal(`var(--horizontal-align-default-${index})`);
			});

		cy.get("ui5-table-row")
			.get(`ui5-table-cell:nth-of-type(${index})`)
			.should("have.css", "justify-content", alignment);
	}

	beforeEach(() => {
		cy.mount(
			<Table id="table" overflowMode="Popin" style={{ width: "1120px" }}>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="productCol" width="300px"><span>Product</span></TableHeaderCell>
					<TableHeaderCell id="supplierCol" horizontalAlign="Center" width="200px">Supplier</TableHeaderCell>
					<TableHeaderCell id="dimensionsCol" horizontalAlign="Right" width="300px">Dimensions</TableHeaderCell>
					<TableHeaderCell id="weightCol" width="100px">Weight</TableHeaderCell>
					<TableHeaderCell id="priceCol" width="220px">Price</TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label><b>Notebook Basic 15</b><br></br>HT-1000</Label></TableCell>
					<TableCell><Label>Very Best Screens</Label></TableCell>
					<TableCell><Label>30 x 18 x 3 cm</Label></TableCell>
					<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.2</b> KG</Label></TableCell>
					<TableCell><Label><b>956</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow>
					<TableCell><Label><b>Notebook Basic 17</b><br></br>HT-1001</Label></TableCell>
					<TableCell><Label>Smartcards</Label></TableCell>
					<TableCell><Label>29 x 17 x 3.1 cm</Label></TableCell>
					<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.5</b> KG</Label></TableCell>
					<TableCell><Label><b>1249</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow>
					<TableCell><Label><b>Notebook Basic 18</b><br></br>HT-1002</Label></TableCell>
					<TableCell><Label>Technocom</Label></TableCell>
					<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
					<TableCell><Label style={{ color: "#2b7c2b" }}><b>3.7</b> KG</Label></TableCell>
					<TableCell><Label><b>29</b> EUR</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table]")
			.should("be.visible");
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
			.invoke("attr", "horizontal-align", "End");

		cy.get("#supplierCol")
			.should("have.attr", "horizontal-align", "End");

		check("#supplierCol", 2, "end");
	});

	it("single cell alignment does not affect other cells and is not affected by header cell alignment", () => {
		check("#supplierCol", 2, "center");

		cy.get("ui5-table-row:nth-of-type(2) > ui5-table-cell:nth-child(2)")
			.invoke("attr", "horizontal-align", "Start");

		cy.get("ui5-table-row:nth-of-type(2) > ui5-table-cell:nth-child(2)")
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
			.invoke("attr", "horizontal-align", "End");

		cy.get("#supplierCol")
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
		cy.mount(
			<div style={{ height: "300px", overflow: "auto" }}>
				<Bar
					id="toolbar"
					design="Header"
					style={{
						position: "sticky",
						top: 0,
						"z-index": 2,
						height: "50px"
					}}>
					<Title tabindex={0} level="H3" id="title" slot="startContent">My Selectable Products (3)</Title>
					<Slider id="slider" min={0} max={100} step={1} value={100} labelInterval={0}></Slider>
				</Bar>
				<Table id="table0" overflowMode="Popin" stickyTop="50px" accessibleNameRef="title" noDataText="No data found">
					<TableHeaderRow sticky slot="headerRow">
						<TableHeaderCell id="colA" minWidth="300px"><span>ColumnA</span></TableHeaderCell>
						<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
						<TableHeaderCell id="colC" minWidth="200px">Column C</TableHeaderCell>
						<TableHeaderCell id="colD" minWidth="150px">Column D</TableHeaderCell>
					</TableHeaderRow>
					${Array.from({ length: 20 }).map((val, index) =>
						<TableRow id={`row-${index + 1}`}><TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					)}
				</Table>
			</div>
		);

		check(50, "#row-20");
	});

	it("fixed header with table being scrollable", () => {
		cy.mount(
			<Table id="table" overflowMode="Popin" stickyTop="0" accessibleNameRef="title" noDataText="No data found" style={{ height: "300px", overflow: "auto" }}>
				<TableHeaderRow sticky slot="headerRow">
					<TableHeaderCell id="colA" minWidth="300px"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
					<TableHeaderCell id="colC" minWidth="200px">Column C</TableHeaderCell>
					<TableHeaderCell id="colD" minWidth="150px">Column D</TableHeaderCell>
				</TableHeaderRow>
				${Array.from({ length: 20 }).map((val, index) =>
					<TableRow id={`row-${index + 1}`}><TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				)}
			</Table>
		);

		check(0, "#row-20");
	});

	it("fixed header with body being scroll container", () => {
		cy.mount(
			<>
				<Bar
					id="toolbar2"
					design="Header"
					style={{
						position: "sticky",
						top: 0,
						"z-index": 2,
						height: "50px"
					}}>
					<Title tabindex={0} level="H3" id="title" slot="startContent">My Selectable Products (3)</Title>
					<Slider id="slider" min={0} max={100} step={1} value={100} labelInterval={0}></Slider>
				</Bar>
				<Table id="table" overflowMode="Popin" stickyTop="50px" accessibleNameRef="title" noDataText="No data found">
					<TableHeaderRow sticky slot="headerRow">
						<TableHeaderCell id="colA" minWidth="300px"><span>ColumnA</span></TableHeaderCell>
						<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
						<TableHeaderCell id="colC" minWidth="200px">Column C</TableHeaderCell>
						<TableHeaderCell id="colD" minWidth="150px">Column D</TableHeaderCell>
					</TableHeaderRow>
					${Array.from({ length: 100 }).map((val, index) =>
						<TableRow id={`row-${index + 1}`}><TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					)}
				</Table>
			</>
		);

		check(50, "#row-100");
	});
});

describe("Table - Horizontal Scrolling", () => {
	beforeEach(() => {
		cy.mount(
			<Table id="table" overflowMode="Scroll" stickyTop="0px" style={{ width: "300px", overflow: "auto" }} accessibleNameRef="title">
				<TableSelection id="selection" selected="0 2" slot="features"></TableSelection>
				<TableHeaderRow slot="headerRow" sticky>
					<TableHeaderCell id="produtCol" width="200px"><span>Product</span></TableHeaderCell>
					<TableHeaderCell id="supplierCol" width="200px">Supplier</TableHeaderCell>
					<TableHeaderCell id="dimensionsCol" width="200px">Dimensions</TableHeaderCell>
					<TableHeaderCell id="weightCol" width="200px">Weight</TableHeaderCell>
					<TableHeaderCell id="priceCol" width="200px">Price</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="firstRow" navigated={true} key="0">
					<TableCell><Label><b>Notebook Basic 15</b><br /><a href="#">HT-1000</a></Label></TableCell>
					<TableCell><Label>Very Best Screens</Label></TableCell>
					<TableCell><Label>30 x 18 x 3 cm</Label></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>4.2</b> KG</Label></TableCell>
					<TableCell id="lastCell"><Label><b>956</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow key="1">
					<TableCell><Label><b>Notebook Basic 16</b><br /><a href="#">HT-1001</a></Label></TableCell>
					<TableCell><Label>Smartcards</Label></TableCell>
					<TableCell><Input value="29 x 17 x 3.1 cm" accessibleNameRef="dimensionsCol"></Input></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>4.5</b> KG</Label></TableCell>
					<TableCell><Label><b>1249</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow key="2" interactive>
					<TableCell><Label><b>Notebook Basic 17</b><br /><a href="#">HT-1002</a></Label></TableCell>
					<TableCell><Label>Technocom</Label></TableCell>
					<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>3.7</b> KG</Label></TableCell>
					<TableCell><Label><b>29</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow key="3">
					<TableCell><Label><b>Notebook Basic 18</b><br /><a href="#">HT-1003</a></Label></TableCell>
					<TableCell><Label>Technocom</Label></TableCell>
					<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>3.7</b> KG</Label></TableCell>
					<TableCell><Label><b>29</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow key="4">
					<TableCell><Label><b>Notebook Basic 19</b><br /><a href="#">HT-1004</a></Label></TableCell>
					<TableCell><Label>Technocom</Label></TableCell>
					<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>3.7</b> KG</Label></TableCell>
					<TableCell><Label><b>29</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow key="5">
					<TableCell><Label><b>Notebook Basic 20</b><br /><a href="#">HT-1005</a></Label></TableCell>
					<TableCell><Label>Technocom</Label></TableCell>
					<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>3.7</b> KG</Label></TableCell>
					<TableCell><Label><b>29</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow key="6" interactive>
					<TableCell><Label><b>Notebook Basic 21</b><br /><a href="#">HT-1006</a></Label></TableCell>
					<TableCell><Label>Technocom</Label></TableCell>
					<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>3.7</b> KG</Label></TableCell>
					<TableCell><Label><b>29</b> EUR</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table]")
			.should("be.visible");
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
			.and($selectionCell => {
				const selectionRect = $selectionCell[0].getBoundingClientRect();
				expect(selectionRect.left).to.be.eq(0);
			});

		cy.get("#table")
			.shadow()
			.find("#table")
			.should($table => {
				const leftOffset = $table[0].scrollLeft;
				expect(leftOffset).to.be.greaterThan(0);
			});
	});
});

describe("Table - Navigated Rows", () => {
	it("Navigated cell is rendered", () => {
		cy.mount(
			<Table id="table1">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA"><span>ColumnA</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1" navigated={true}>
					<TableCell><Label>Cell A</Label></TableCell>
				</TableRow>
				<TableRow id="row2">
					<TableCell><Label>Cell A</Label></TableCell>
				</TableRow>
			</Table>
		);

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
					.should($navigated1 => {
						const nav1BG = getComputedStyle($navigated1[0]).backgroundColor;
						const nav2BG = getComputedStyle($navigated2[0]).backgroundColor;
						expect(nav1BG).to.not.be.eq(nav2BG);
					});
			});

		cy.get("#table1")
			.shadow()
			.find("#table")
			.should($table => {
				const gridTemplateColumns = $table[0].style.gridTemplateColumns;
				// eslint-disable-next-line no-unused-expressions
				expect(gridTemplateColumns.endsWith("table_navigated_cell_width)")).to.be.true;
			});
	});
});
