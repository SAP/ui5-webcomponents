import Label from "../../src/Label.js";
import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableSelectionMode from "../../src/types/TableSelectionMode.js";
import TableSelection from "../../src/TableSelection.js";

function mountTestpage(selectionMode: TableSelectionMode) {
	cy.mount(
		<>
			<Table id="table0" noDataText="No data found">
				<TableSelection id="selection" slot="features" mode={selectionMode}></TableSelection>
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
		mountTestpage(TableSelectionMode.None);
	});

	it("selection should be not active", () => {
		cy.get("#selection").should("have.attr", "mode", TableSelectionMode.None);
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
function checkSelection(rowIndex: string) {
	cy.get("#selection").then(sel => {
		expect(sel.get(0).getAttribute("selected")).to.equal(rowIndex);
	});
}

Object.entries(testConfig).forEach(([mode, testConfigEntry]) => {
	describe(`Mode - ${mode}`, () => {
		beforeEach(() => {
			mountTestpage(testConfigEntry.config.mode as TableSelectionMode);
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
			cy.get("#selection").should("have.attr", "mode", testConfigEntry.config.mode);
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
