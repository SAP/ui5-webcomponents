import Label from "../../src/Label.js";
import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableSelectionSingle from "../../src/TableSelectionSingle.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";
import type TableSelectionBase from "../../src/TableSelectionBase.js";

function mountTestpage(selectionMode: string) {
	cy.mount(
		<>
			<Table id="table0" noDataText="No data found">
				{selectionMode === "Single" && (
					<TableSelectionSingle id="selection" slot="features"></TableSelectionSingle>
				)}
				{selectionMode === "Multiple" && (
					<TableSelectionMulti id="selection" slot="features"></TableSelectionMulti>
				)}
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell id="colB">Column B</TableHeaderCell>
					<TableHeaderCell id="colC">Column C</TableHeaderCell>
					<TableHeaderCell id="colD">Column D</TableHeaderCell>
				</TableHeaderRow>
				<TableRow rowKey="0">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow rowKey="1">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow rowKey="2">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow rowKey="3">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow rowKey="4">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		</>
	);

	cy.get("#table0").children("ui5-table-header-row").first().as("headerRow");
	cy.get("#table0").children("ui5-table-row").get("[row-key=\"0\"]").as("row0");
	cy.get("#table0").children("ui5-table-row").get("[row-key=\"4\"]").as("row4");
}

describe("Mode - None", () => {
	before(() => {
		mountTestpage("None");
	});

	it("selection should be not active", () => {
		cy.get("@headerRow").shadow().find("#selection-cell")
			.should("not.exist");
		cy.get("@row0").shadow().find("#selection-cell")
			.should("not.exist");
	});
});

const testConfig = {
	"Single": {
		"config": {
			"mode": "Single",
		},
		"cases": {
			"BOXES": {
				"header": {
					"exists": true,
					"checkbox": false,
				},
				"row": {
					"exists": true,
					"checkbox": true,
				},
			},
			"SPACE": {
				"space_0": "0",
				"space_4": "4",
			},
			"ARROWS_BOX": {
				"arrow_initial": "0",
				"arrow_down": "1",
				"arrow_up": "0",
			},
			"MOUSE": {
				"mouse_0": "0",
				"mouse_4": "4",
			},
			"RANGE_MOUSE": {
				"range_mouse_initial": "0",
				"range_mouse_final": "4",
				"range_mouse_edge": "0",
			},
			"RANGE_KEYBOARD": {
				"initial": "0",
				"block_1": "0",
				"block_2": "3",
			},
		},
	},
	"Multiple": {
		"config": {
			"mode": "Multiple",
		},
		"cases": {
			"BOXES": {
				"header": {
					"exists": true,
					"checkbox": true
				},
				"row": {
					"exists": true,
					"checkbox": true
				}
			},
			"SPACE": {
				"space_0": "0",
				"space_4": "0 4"
			},
			"ARROWS_BOX": {
				"arrow_initial": "0",
				"arrow_down": "0",
				"arrow_up": "0"
			},
			"MOUSE": {
				"mouse_0": "0",
				"mouse_4": "0 4"
			},
			"RANGE_MOUSE": {
				"range_mouse_initial": "0",
				"range_mouse_final": "0 1 2 3 4",
				"range_mouse_edge": "0 1 2 3 4"
			},
			"RANGE_KEYBOARD": {
				"initial": "0",
				"block_1": "0 1",
				"block_2": "0 1 3 4"
			}
		}
	}
};

// I've had to check the attribute this way because
// should("have.attr"... and similar functions always returned '' instead of the actual value
// It could be a timing issue but .wait didn't help either
function checkSelection(expectedSelected: string) {
	cy.get("#selection").then($selection => {
		const selection = $selection.get(0) as TableSelectionBase;
		expect(selection.getAttribute("selected")).to.equal(expectedSelected);

		if (selection.isMultiSelectable()) {
			const selectedRows = (selection as TableSelectionMulti).getSelectedRows();
			expect(selectedRows.map(row => selection.getRowKey(row)).join(" ")).to.equal(expectedSelected);
			const selectedAsSet = (selection as TableSelectionMulti).getSelectedAsSet();
			expect([...selectedAsSet].join(" ")).to.equal(expectedSelected);
		} else {
			const selectedRow = (selection as TableSelectionSingle).getSelectedRow();
			expect(selectedRow!.rowKey).to.equal(expectedSelected);
			expect(selectedRow).to.equal(selection.getRowByKey(expectedSelected));
		}
	});
}

Object.entries(testConfig).forEach(([mode, testConfigEntry]) => {
	describe(`Mode - ${mode}`, () => {
		beforeEach(() => {
			mountTestpage(testConfigEntry.config.mode);
		});

		it("Correct boxes are shown", () => {
			cy.get("@headerRow").shadow().find("#selection-cell")
				.should(testConfigEntry.cases.BOXES.header.exists ? "exist" : "not.exist");
			cy.get("@row0").shadow().find("#selection-cell")
				.should(testConfigEntry.cases.BOXES.row.exists ? "exist" : "not.exist");

			cy.get("@headerRow").shadow().find("#selection-component")
				.should(testConfigEntry.cases.BOXES.header.checkbox ? "exist" : "not.exist");
			cy.get("@row0").shadow().find("#selection-component")
				.should(testConfigEntry.cases.BOXES.row.checkbox ? "exist" : "not.exist");
		});

		it("select row via SPACE", () => {
			cy.get("@row0").realClick({ position: "left" });
			cy.get("@row0").realPress("Space");
			checkSelection(testConfigEntry.cases.SPACE.space_0);

			cy.get("@row4").realClick();
			cy.get("@row4").realPress("Space");
			checkSelection(testConfigEntry.cases.SPACE.space_4);
		});

		it("select row via arrows (radio focus)", () => {
			cy.get("@row0").shadow().find("#selection-component").realClick();
			checkSelection(testConfigEntry.cases.ARROWS_BOX.arrow_initial);

			cy.realPress("ArrowDown");
			checkSelection(testConfigEntry.cases.ARROWS_BOX.arrow_down);

			cy.realPress("ArrowUp");
			checkSelection(testConfigEntry.cases.ARROWS_BOX.arrow_up);
		});

		it("select row via mouse", () => {
			cy.get("@row0").shadow().find("#selection-component").realClick();
			checkSelection(testConfigEntry.cases.MOUSE.mouse_0);

			cy.get("@row4").shadow().find("#selection-component").realClick();
			checkSelection(testConfigEntry.cases.MOUSE.mouse_4);
		});

		it("range selection with mouse", () => {
			cy.get("@row0").shadow().find("#selection-component").realClick();
			checkSelection(testConfigEntry.cases.RANGE_MOUSE.range_mouse_initial);

			// Need to simulate keydown with SHIFT key to set range selection flag shiftKeyPressed
			// Cypress does not trigger keydown when just calling realClick with shiftKey: true
			// That is why selection of the row is not supressed, and we end up with 0 4 1 2 3
			cy.get("@row4").trigger("keydown", { bubbles: true, key: "Shift", shiftKey: true });
			cy.get("@row4").shadow().find("#selection-component").realClick({ shiftKey: true });
			checkSelection(testConfigEntry.cases.RANGE_MOUSE.range_mouse_final);

			cy.get("@row4").trigger("keydown", { bubbles: true, key: "Shift", shiftKey: true });
			cy.get("@row0").shadow().find("#selection-component").realClick();
			checkSelection(testConfigEntry.cases.RANGE_MOUSE.range_mouse_edge);
		});

		it("range selection with keyboard", () => {
			cy.get("@row0").realClick({ position: "center" });
			cy.get("@row0").realPress("Space");
			checkSelection(testConfigEntry.cases.RANGE_KEYBOARD.initial);

			cy.realPress(["Shift", "ArrowDown", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp"]);
			checkSelection(testConfigEntry.cases.RANGE_KEYBOARD.block_1);

			cy.realPress(["ArrowDown", "ArrowDown", "Space"]);
			cy.realPress(["Shift", "ArrowDown"]);
			checkSelection(testConfigEntry.cases.RANGE_KEYBOARD.block_2);
		});
	});
});

describe("TableSelectionMulti", () => {
	it("updates the header row checkbox when rows are added or removed", () => {
		cy.mount(
			<Table id="table1">
				<TableSelectionMulti id="selection" selected="1 2" slot="features"></TableSelectionMulti>
				<TableHeaderRow id="headerRow" slot="headerRow">
					<TableHeaderCell>ColumnA</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1" rowKey="1">
					<TableCell><Label>Cell A</Label></TableCell>
				</TableRow>
				<TableRow id="row2" rowKey="2">
					<TableCell><Label>Cell A</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("#headerRow").shadow().find("#selection-cell").as("headerRowSelectionCell");
		cy.get("@headerRowSelectionCell").find("#selection-component").as("headerRowCheckBox");
		cy.get("@headerRowCheckBox").should("have.attr", "checked");
		cy.get("#table1").then($table => {
			$table.append(
				`<ui5-table-row id="row3" row-key="3">
					<ui5-table-cell>Cell A</ui5-table-cell>
					<ui5-table-cell>Cell B</ui5-table-cell>
				</ui5-table-row>`
			);
		});
		cy.get("@headerRowCheckBox").should("not.have.attr", "checked");
		cy.get("#row3").invoke("remove");
		cy.get("@headerRowCheckBox").should("have.attr", "checked");
		cy.get("#row2").invoke("remove");
		cy.get("#row1").invoke("remove");
		cy.get("@headerRowCheckBox").should("not.have.attr", "checked");
	});
});
