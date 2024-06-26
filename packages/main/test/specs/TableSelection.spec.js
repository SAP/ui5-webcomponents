import { assert } from "chai";

const Keys = {
	SHIFT: '\uE008',
} 

async function changeMode(mode) {
	await browser.execute((mode) => {
		const selection = document.getElementById("selection");
		selection.mode = mode;
	}, mode);
}

async function clearSelection() {
	await browser.execute(() => {
		const selection = document.getElementById("selection");
		selection.selected = "";
	});
}

describe("Mode - None", async () => {
	before(async () => {
		await browser.url("test/pages/TableSelection.html");
		await changeMode("None");
	});

	it("selection should be not active", async () => {
		const table = await browser.$("#table0");
		const headerRow = await table.$("ui5-table-header-row");
		const row = await table.$('ui5-table-row[key="0"]');
		const selection = await browser.$("#selection");

		assert.ok(await table.isExisting(), "Table exists");
		assert.ok(await headerRow.isExisting(), "Header row exists");
		assert.ok(await row.isExisting(), "Row exists");

		assert.equal(await selection.getProperty("mode"), "None", "Selection mode is none");
		assert.notOk(await headerRow.shadow$("#selection-cell").isExisting(), "Selection checkbox does not exist");
		assert.notOk(await row.shadow$("#selection-cell").isExisting(), "Selection checkbox does not exist");
	});
})

const testConfig = {
	"Single": {
		"config": {
			"mode": "Single",
		},
		"cases": {
			"BOXES": {
				"header": {
					"exists": true,
					"checkbox": false
				},
				"row": {
					"exists": true,
					"checkbox": true
				}
			},
			"SPACE": {
				"space_0": "0",
				"space_4": "4"
			},
			"ARROWS_BOX": {
				"arrow_initial": "0",
				"arrow_down": "1",
				"arrow_up": "0"
			},
			"MOUSE": {
				"mouse_0": "0",
				"mouse_4": "4"
			},
			"RANGE_MOUSE": {
				"range_mouse_initial": "0",
				"range_mouse_final": "4",
				"range_mouse_edge": "0"
			},
			"RANGE_KEYBOARD": {
				"initial": "0",
				"block_1": "0",
				"block_2": "6"
			}
		}
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
				"block_1": "0 1 2 3 4",
				"block_2": "0 1 2 3 4 6 7 8 9"
			}
		}
	}
};

Object.entries(testConfig).forEach(([mode, testConfig]) => {
	describe(`Mode - ${mode}`, async () => {
		before(async () => {
			await browser.url("test/pages/TableSelection.html");
			await changeMode(testConfig.config.mode);
		});

		beforeEach(async () => {
			await clearSelection();
		});

		it("Correct boxes are shown", async () => {
			const table = await browser.$("#table0");
			const headerRow = await table.$("ui5-table-header-row");
			const row = await table.$('ui5-table-row[key="0"]');

			assert.ok(await table.isExisting(), "Table exists");
			assert.ok(await headerRow.isExisting(), "Header row exists");
			assert.ok(await row.isExisting(), "Row exists");

			assert.equal(await headerRow.shadow$("#selection-cell").isExisting(), testConfig.cases.BOXES.header.exists, "Header row selection cell is rendered");
			assert.equal(await row.shadow$("#selection-cell").isExisting(), testConfig.cases.BOXES.row.exists, "Row selection cell is rendered");

			assert.equal(await headerRow.shadow$("#selection-component").isExisting(), testConfig.cases.BOXES.header.checkbox, "Header row checkbox is rendered");
			assert.equal(await row.shadow$("#selection-component").isExisting(), testConfig.cases.BOXES.row.checkbox, "Row checkbox is rendered");
		});

		it("select row via SPACE", async () => {
			const table = await browser.$("#table0");
			const selection = await browser.$("#selection");
			const row0 = await table.$('ui5-table-row[key="0"]');
			const row4 = await table.$('ui5-table-row[key="4"]');

			await row0.click();
			await row0.keys("Space");

			let selected = await selection.getProperty("selected");
			assert.equal(selected, testConfig.cases.SPACE.space_0, `Rows with keys ${testConfig.cases.SPACE.space_0} selected`);

			await row4.click();
			await row4.keys("Space");
			selected = await selection.getProperty("selected");
			assert.equal(selected, testConfig.cases.SPACE.space_4, `Rows with keys ${testConfig.cases.SPACE.space_4} selected`);
		});

		it("select row via arrows (radio focus)", async () => {
			const table = await browser.$("#table0");
			const selection = await browser.$("#selection");
			const row0 = await table.$('ui5-table-row[key="0"]');

			const checkbox0 = await row0.shadow$("#selection-component");
			await checkbox0.click();

			let selected = await selection.getProperty("selected");
			assert.equal(selected, testConfig.cases.ARROWS_BOX.arrow_initial, `Rows with keys ${testConfig.cases.ARROWS_BOX.arrow_initial} selected`);

			await browser.keys("ArrowDown");
			selected = await selection.getProperty("selected");
			assert.equal(selected, testConfig.cases.ARROWS_BOX.arrow_down, `Rows with keys ${testConfig.cases.ARROWS_BOX.arrow_down} selected`);

			await browser.keys("ArrowUp");
			selected = await selection.getProperty("selected");
			assert.equal(selected, testConfig.cases.ARROWS_BOX.arrow_up, `Rows with keys ${testConfig.cases.ARROWS_BOX.arrow_up} selected`);
		});

		it("select row via mouse", async () => {
			const table = await browser.$("#table0");
			const selection = await browser.$("#selection");
			const row0 = await table.$('ui5-table-row[key="0"]');
			const row4 = await table.$('ui5-table-row[key="4"]');

			const checkbox0 = await row0.shadow$("#selection-component");
			await checkbox0.click();

			let selected = await selection.getProperty("selected");
			assert.equal(selected, testConfig.cases.MOUSE.mouse_0, `Rows with keys ${testConfig.cases.MOUSE.mouse_0} selected`);

			const checkbox4 = await row4.shadow$("#selection-component");
			await checkbox4.click();

			selected = await selection.getProperty("selected");
			assert.equal(selected, testConfig.cases.MOUSE.mouse_4, `Rows with keys ${testConfig.cases.MOUSE.mouse_4} selected`);
		});

		it("range selection with mouse", async () => {
			const table = await browser.$("#table0");
			const selection = await browser.$("#selection");
			const row0 = await table.$('ui5-table-row[key="0"]');
			const row4 = await table.$('ui5-table-row[key="4"]');

			const checkbox0 = await row0.shadow$("#selection-component");
			const checkbox4 = await row4.shadow$("#selection-component");
			await checkbox0.click();

			let selected = await selection.getProperty("selected");
			assert.equal(selected, testConfig.cases.RANGE_MOUSE.range_mouse_initial, `Rows with keys ${testConfig.cases.RANGE_MOUSE.range_mouse_initial} selected`);

			await browser.performActions([{
				type: "key",
				id: "keyboard1",
				actions: [{ type: "keyDown", value: Keys.SHIFT }],
			}]);
			await checkbox4.click();

			selected = await selection.getProperty("selected");
			assert.equal(selected, testConfig.cases.RANGE_MOUSE.range_mouse_final, `Rows with keys ${testConfig.cases.RANGE_MOUSE.range_mouse_final} selected`);

			await browser.performActions([{
				type: "key",
				id: "keyboard2",
				actions: [{ type: "keyDown", value: Keys.SHIFT }],
			}]);
			await checkbox0.click();

			await browser.releaseActions();
			selected = await selection.getProperty("selected");
			assert.equal(selected, testConfig.cases.RANGE_MOUSE.range_mouse_edge, `Rows with keys ${testConfig.cases.RANGE_MOUSE.range_mouse_edge} selected`);
		});

		it("range selection with keyboard", async () => {
			const table = await browser.$("#table0");
			const selection = await browser.$("#selection");
			const row0 = await table.$('ui5-table-row[key="0"]');

			await row0.click();
			await row0.keys("Space");

			let selected = await selection.getProperty("selected");
			assert.equal(selected, testConfig.cases.RANGE_KEYBOARD.initial, `Rows with keys ${testConfig.cases.RANGE_MOUSE.initial} selected`);

			await browser.keys(["Shift", "ArrowDown", "ArrowDown", "ArrowDown", "ArrowDown", "ArrowDown", "ArrowUp"]);

			selected = await selection.getProperty("selected");
			assert.equal(selected, testConfig.cases.RANGE_KEYBOARD.block_1, `Rows with keys ${testConfig.cases.RANGE_KEYBOARD.block_1} selected`);

			await browser.keys("ArrowDown");
			await browser.keys("ArrowDown");

			await browser.keys("Space");
			await browser.keys(["Shift", "ArrowDown", "ArrowDown", "ArrowDown"]);

			selected = await selection.getProperty("selected");
			assert.equal(selected, testConfig.cases.RANGE_KEYBOARD.block_2, `Rows with keys ${testConfig.cases.RANGE_KEYBOARD.block_2} selected`);
		});
	});
});