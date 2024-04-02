import { assert } from "chai";

const ROLE_COLUMN_HEADER = "columnheader";

function checkPopinState(grid, expectedPopinState) {

}

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

		const headerRow = await grid.$("ui5-grid-header-row");
		const headerCells = await headerRow.$$("ui5-grid-header-cell");

		const testWidths = [
			{width: 850, poppedIn: []},
			{width: 700, poppedIn: ["colD"]},
			{width: 500, poppedIn: ["colD", "colC"]},
			{width: 300, poppedIn: ["colD", "colC", "colB"]},
			{width: 150, poppedIn: ["colD", "colC", "colB"]}
		];

		for (const testWidth of testWidths) {
			await grid.setProperty("style", `width: ${testWidth.width}px`);
			assert.strictEqual(await grid.getSize("width"), testWidth.width, `Grid is ${testWidth.width} wide`);

			for (const headerCell of headerCells) {
				const headerRole = await headerCell.getAttribute("role");
				const headerId = await headerCell.getAttribute("id");
				const slotName = await headerCell.getAttribute("slot");

				let expectRole = true;
				if (testWidth.poppedIn.includes(headerId)) {
					expectRole = false;
				}

				assert.strictEqual(headerRole === ROLE_COLUMN_HEADER, expectRole, `Cell has role (width: ${testWidth.width}): (${expectRole})`)
				assert.strictEqual(await headerRow.shadow$(`slot[name=${slotName}]`).isExisting(), expectRole, `Header cell ${slotName} has been rendered (width: ${testWidth.width}): ${expectRole}`);
			}
		}
	});

	it("test with one by one popping out", async () => {
		let grid = await browser.$("#grid0");
		assert.ok(grid.isExisting(), "Grid exists");

		const headerRow = await grid.$("ui5-grid-header-row");
		const headerCells = await headerRow.$$("ui5-grid-header-cell");

		const testWidths = [
			{width: 150, poppedIn: ["colD", "colC", "colB"]},
			{width: 300, poppedIn: ["colD", "colC", "colB"]},
			{width: 500, poppedIn: ["colD", "colC"]},
			{width: 700, poppedIn: ["colD"]},
			{width: 850, poppedIn: []},
		];

		for (const testWidth of testWidths) {
			await grid.setProperty("style", `width: ${testWidth.width}px`);
			assert.strictEqual(await grid.getSize("width"), testWidth.width, `Grid is ${testWidth.width} wide`);

			for (const headerCell of headerCells) {
				const headerRole = await headerCell.getAttribute("role");
				const headerId = await headerCell.getAttribute("id");
				const slotName = await headerCell.getAttribute("slot");

				let expectRole = true;
				if (testWidth.poppedIn.includes(headerId)) {
					expectRole = false;
				}

				assert.strictEqual(headerRole === ROLE_COLUMN_HEADER, expectRole, `Cell has role (width: ${testWidth.width}): (${expectRole})`)
				assert.strictEqual(await headerRow.shadow$(`slot[name=${slotName}]`).isExisting(), expectRole, `Header cell ${slotName} has been rendered (width: ${testWidth.width}): ${expectRole}`);
			}
		}
	});

	it("test with random widths", async () => {
		let grid = await browser.$("#grid0");
		assert.ok(grid.isExisting(), "Grid exists");

		const headerRow = await grid.$("ui5-grid-header-row");
		const headerCells = await headerRow.$$("ui5-grid-header-cell");

		const expectedStates = [
			{width: 500, poppedIn: ["colD", "colC", "colB"]},
			{width: 700, poppedIn: ["colD", "colC"]},
			{width: 850, poppedIn: ["colD"]},
			{width: Infinity, poppedIn: []}
		];

		const runs = 10;
		for (let i = 0; i < runs; i++) {
			const randomWidth = Math.floor(Math.random() * 1000) + 1;
			await grid.setProperty("style", `width: ${randomWidth}px`);

			const gridSize = await grid.getSize("width");
			assert.strictEqual(gridSize, randomWidth, `Grid is ${randomWidth} wide`);

			const expectedState = expectedStates.find(state => gridSize < state.width);
			for (const headerCell of headerCells) {
				const headerRole = await headerCell.getAttribute("role");
				const headerId = await headerCell.getAttribute("id");
				const slotName = await headerCell.getAttribute("slot");

				let expectRole = true;
				if (expectedState.poppedIn.includes(headerId)) {
					expectRole = false;
				}

				assert.strictEqual(headerRole === ROLE_COLUMN_HEADER, expectRole, `Cell ${headerId} has role (width: ${gridSize}): (${expectRole})`)
				assert.strictEqual(await headerRow.shadow$(`slot[name=${slotName}]`).isExisting(), expectRole, `Header cell ${slotName} has been rendered (width: ${gridSize}): ${expectRole}`);
			}
		}
	});
});
