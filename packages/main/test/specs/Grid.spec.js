import { assert } from "chai";

const ROLE_COLUMN_HEADER = "columnheader";

describe("Grid - Popin Mode", async () => {
	before(async () => {
		await browser.url(`test/pages/GridPopin.html`);
	});

	it("no pop-in with 'optimal' grid width", async () => {
		let grid = await browser.$("#grid0");
		assert.ok(grid.isExisting(), "Grid exists");

		assert.strictEqual(await grid.getSize("width"), 850, "Grid is 850px wide");

		const headerRow = await grid.$("ui5-grid-header-row");
		const headerCells = await headerRow.$$("ui5-grid-header-cell");
		assert.equal(headerCells.length, 4, "4 columns exist");

		for (const [index, headerCell] of headerCells.entries()) {
			assert.strictEqual(await headerCell.getAttribute("role"), ROLE_COLUMN_HEADER, "Correct role is applied");
			assert.ok(await headerRow.shadow$(`slot[name=default-${index + 1}]`).isExisting(), `Header cell ${index + 1} has been rendered`);
		}
	});

	it("test with one by one popping in", async() => {
		let grid = await browser.$("#grid0");
		assert.ok(grid.isExisting(), "Grid exists");
	});
});
