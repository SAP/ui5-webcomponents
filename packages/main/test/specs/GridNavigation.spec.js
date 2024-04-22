import { assert } from "chai";

describe("Grid - Keyboard Navigation", async () => {
	before(async () => {
		await browser.url("test/pages/GridNavigation.html");
	});

	it("should navigate on rows", async () => {
		const grid = await browser.$("#grid0");
		const rows = await grid.$$("ui5-grid-header-row,ui5-grid-row");
		const growing = await browser.$("#growing");
		const rowsLength = rows.length;

		await rows[1].click();
		assert.ok(await rows[1].isFocused(), `Click: Row 1 is focused.`);

		await browser.keys("ArrowLeft");
		assert.ok(await rows[1].isFocused(), `ArrowLeft: Row 1 is still focused.`);

		await browser.keys("ArrowUp");
		assert.ok(await rows[0].isFocused(), `ArrowUp: Row 0 is focused.`);

		await browser.keys("ArrowUp");
		assert.ok(await rows[0].isFocused(), `ArrowUp: Row 0 is still focused.`);

		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");
		assert.ok(await rows[2].isFocused(), `ArrowDown: Row 2 is focused.`);

		await browser.keys("PageDown");
		assert.ok(await rows[22].isFocused(), `PageDown: Row 22 is focused.`);

		await browser.keys("PageDown");
		assert.ok(await rows[25].isFocused(), `PageDown: Row 25 is focused.`);

		await browser.keys("PageDown");
		assert.ok(await growing.isFocused(), `PageDown: Growing button is focused.`);

		await browser.keys("PageUp");
		assert.ok(await rows[6].isFocused(), `PageUp: Row 6 is focused.`);

		await browser.keys("PageUp");
		assert.ok(await rows[1].isFocused(), `PageUp: Row 1 is focused.`);

		await browser.keys("PageUp");
		assert.ok(await rows[0].isFocused(), `PageUp: Row 0 is focused.`);

		await browser.keys("End");
		assert.ok(await rows[25].isFocused(), `End: Row 25 is focused.`);

		await browser.keys("End");
		assert.ok(await growing.isFocused(), `End: Growing button is focused.`);

		await browser.keys("Home");
		assert.ok(await rows[1].isFocused(), `Home: Row 1 is focused.`);

		await browser.keys("Home");
		assert.ok(await rows[0].isFocused(), `Home: Row 0 is focused.`);
	});

	it("should navigate on cells", async () => {
		const grid = await browser.$("#grid0");
		const rows = await grid.$$("ui5-grid-header-row,ui5-grid-row");
		const growing = await browser.$("#growing");

		const rowCells = [];
		for (const row of rows) {
			const cells = await row.$$("ui5-grid-header-cell,ui5-grid-cell");
			rowCells.push(cells);
		}

		const getCell = (rowIndex, cellIndex) => {
			return rowCells[rowIndex][cellIndex];
		}

		await rows[1].click();
		assert.ok(await rows[1].isFocused(), `Click: Row 1 is focused.`);

		await browser.keys("ArrowRight");
		assert.ok(await getCell(1, 0).isFocused(), `ArrowRight: Row1 Cell0 is focused.`);

		await browser.keys("ArrowLeft");
		assert.ok(await rows[1].isFocused(), `ArrowLeft: Row1 is focused.`);

		await browser.keys("ArrowRight");
		await browser.keys("ArrowRight");
		assert.ok(await getCell(1, 1).isFocused(), `ArrowRight: Row1 Cell1 is focused.`);

		await browser.keys("Home");
		assert.ok(await getCell(1, 0).isFocused(), `Home: Row1 Cell0 is focused.`);

		await browser.keys("End");
		assert.ok(await getCell(1, 3).isFocused(), `End: Row1 Cell3 is focused.`);

		await browser.keys("ArrowRight");
		assert.ok(await getCell(1, 3).isFocused(), `ArrowRight: Row1 Cell3 is still focused.`);

		await browser.keys("End");
		assert.ok(await rows[1].isFocused(), `End: Row1 is focused.`);

		await browser.keys("End");
		assert.ok(await rows[25].isFocused(), `End: Row25 is focused.`);

		await browser.keys("ArrowRight");
		await browser.keys("ArrowRight");
		await browser.keys("ArrowRight");
		assert.ok(await getCell(25, 2).isFocused(), `ArrowRight: Row25 Cell2 is focused.`);

		await browser.keys("PageUp");
		assert.ok(await getCell(5, 0).isFocused(), `PageUp: Row5 Cell0 is focused.`);

		await browser.keys("PageUp");
		assert.ok(await getCell(1, 0).isFocused(), `PageUp: Row1 Cell0 is focused.`);

		await browser.keys("PageUp");
		assert.ok(await getCell(0, 0).isFocused(), `PageUp: Row0 Cell0 is focused.`);

		await browser.keys("PageDown");
		assert.ok(await getCell(20, 0).isFocused(), `PageDown: Row20 Cell0 is focused.`);

		await browser.keys("PageDown");
		assert.ok(await getCell(25, 0).isFocused(), `PageDown: Row25 Cell0 is focused.`);

		await browser.keys("PageDown");
		assert.ok(await growing.isFocused(), `PageDown: Growing button is focused.`);

		await browser.keys("Home");
		assert.ok(await rows[1].isFocused(), `Home: Row1 is focused.`);

		await browser.keys("Home");
		assert.ok(await rows[0].isFocused(), `Home: Row0 is focused.`);

		for (let i = 0; i < 4; i++) {
			await browser.keys("ArrowDown");
			await browser.keys("ArrowRight");
			assert.ok(await getCell(i + 1, i).isFocused(), `ArrowDown-ArrowRight: Row${i + 1} Cell${i} is focused.`);
		}

		assert.ok(await getCell(4, 3).isFocused(), `Row4 Cell3 was focused.`);

		await browser.keys("ArrowDown");
		assert.ok(await getCell(5, 0).isFocused(), `ArrowDown: Row5 Cell0 is focused.`);
	});

	it("should handle F2/F7/Enter/Tab/Up/Down", async () => {
		const grid = await browser.$("#grid0");
		const rows = await grid.$$("ui5-grid-header-row,ui5-grid-row");
		const row0Link = await grid.$("#row0-link");
		const row1Input = await grid.$("#row1-input");
		const row1Button = await grid.$("#row1-button");
		const row2Input = await grid.$("#row2-input");
		const row2Button = await grid.$("#row2-button");
		const beforeGrid = await browser.$("#before-grid1");
		const afterGrid = await browser.$("#after-grid1");

		const rowCells = [];
		for (const row of rows) {
			const cells = await row.$$("ui5-grid-header-cell,ui5-grid-cell");
			rowCells.push(cells);
		}

		const getCell = (rowIndex, cellIndex) => {
			return rowCells[rowIndex][cellIndex];
		}

		await rows[1].click();
		assert.ok(await rows[1].isFocused(), `Click: Row 1 is focused.`);

		await browser.keys("F2");
		assert.ok(await row1Input.isFocused(), `F2: Row1 Input is focused.`);

		await browser.keys("F2");
		assert.ok(await getCell(1, 1).isFocused(), `F2: Row1 Cell1 is focused.`);

		await browser.keys("F2");
		assert.ok(await row1Input.isFocused(), `F2: Row1 Input is focused again.`);

		await browser.keys("F7");
		assert.ok(await rows[1].isFocused(), `F7: Row1 is focused.`);

		await browser.keys("F7");
		assert.ok(await row1Input.isFocused(), `F7: Row1 Input is focused.`);

		await browser.keys("ArrowDown");
		assert.ok(await row1Input.isFocused(), `ArrowDown: Row1 Input is still focused.`);

		await browser.keys("ArrowUp");
		assert.ok(await row1Input.isFocused(), `ArrowUp: Row1 Input is still focused.`);

		await browser.keys("F2");
		await browser.keys("ArrowUp");
		assert.ok(await getCell(0, 1).isFocused(), `F2-ArrowUp: Row0 Cell1 is focused.`);

		await browser.keys("F2");
		assert.ok(await getCell(0, 1).isFocused(), `F2: Row0 Cell1 is still focused.`);

		await browser.keys("ArrowLeft");
		assert.ok(await getCell(0, 0).isFocused(), `ArrowLeft: Row0 Cell0 is focused.`);

		await browser.keys("Return" /* Enter */);
		assert.ok(await row0Link.isFocused(), `Enter: Row0 Link is focused.`);

		await browser.keys("ArrowDown");
		assert.ok(await getCell(1, 0).isFocused(), `ArrowDown: Row1 Cell0 is focused.`);

		await browser.keys("Tab");
		assert.ok(await afterGrid.isFocused(), `Tab: After grid is focused.`);

		await browser.keys(["Shift", "Tab"]);
		assert.ok(await rows[1].isFocused(), `ShiftTab: Row1 is focused.`);

		await browser.keys("ArrowDown");
		assert.ok(await rows[2].isFocused(), `ArrowDown: Row2 is focused.`);

		await browser.keys("F7");
		assert.ok(await row2Input.isFocused(), `F7: Row2 Input is focused.`);

		await browser.keys("Tab");
		assert.ok(await row2Button.isFocused(), `Tab: Row2 Button is focused.`);

		await browser.keys("F7");
		assert.ok(await rows[2].isFocused(), `F7: Row2 is focused.`);

		await browser.keys("ArrowUp");
		assert.ok(await rows[1].isFocused(), `ArrowUp: Row1 is focused.`);

		await browser.keys("F7");
		assert.ok(await row1Button.isFocused(), `F7: Row1 Button is focused.`);

		await browser.keys("ArrowUp");
		assert.ok(await getCell(0, 2).isFocused(), `ArrowUp: Row0 Cell2 is focused.`);

		await browser.keys("F7");
		assert.ok(await rows[0].isFocused(), `F7: Row0 is focused.`);

		await browser.keys("ArrowDown");
		assert.ok(await rows[1].isFocused(), `ArrowDown: Row1 is focused.`);

		await browser.keys("F7");
		assert.ok(await getCell(1, 2).isFocused(), `F7: Row1 Cell2 is focused.`);

		await browser.keys("F7");
		assert.ok(await rows[1].isFocused(), `F7: Row1 is focused.`);

		await browser.keys("ArrowDown");
		assert.ok(await rows[2].isFocused(), `ArrowDown: Row2 is focused.`);

		await browser.keys("F7");
		assert.ok(await getCell(2, 2).isFocused(), `F7: Row2 Cell2 is focused.`);

		await browser.keys(["Shift", "Tab"]);
		assert.ok(await beforeGrid.isFocused(), `ShiftTab: Before grid is focused.`);

		await browser.keys("Tab");
		assert.ok(await rows[2].isFocused(), `Tab: Row2 is focused.`);
	});
});

describe("Grid - Keyboard Navigation with Fixed Headers", async() => {
	before(async() => {
		await browser.url("test/pages/GridFixedHeader.html");
	});

	it("scrollable container - focused row should always be below the header", async() => {
		const grid = await browser.$("#grid0");
		const lastRow = await browser.$("#row-21");

		await lastRow.scrollIntoView();
		await lastRow.click();
		assert.ok(await lastRow.isFocused(), `Click: Row 21 (last row) is focused.`);

		const headerRow = await grid.$("ui5-grid-header-row");

		// Scroll to the top one by one
		for (let i = 20; i > 0; i--) {
			const row = await browser.$(`#row-${i}`);
			await browser.keys("ArrowUp");

			const headerRowLocation = await headerRow.getLocation("y");
			const rowLocation = await row.getLocation("y");
			assert.ok(await row.isFocused(), `ArrowUp: Row ${i} is focused.`);
			assert.ok(await headerRow.isDisplayedInViewport(), `ArrowUp: Header is still displayed in the viewport.`);
			assert.isAbove(rowLocation, headerRowLocation, `ArrowUp: Row ${i} is below the header.`);
		}
	});

	it("scrollable table - focused row should always be below the header", async() => {
		const grid = await browser.$("#grid1");
		const lastRow = await browser.$("#row-21-1");

		await lastRow.scrollIntoView();
		await lastRow.click();
		assert.ok(await lastRow.isFocused(), `Click: Row 21 (last row) is focused.`);

		const headerRow = await grid.$("ui5-grid-header-row");

		// Scroll to the top one by one
		for (let i = 20; i > 0; i--) {
			const row = await browser.$(`#row-${i}-1`);
			await browser.keys("ArrowUp");

			const headerRowLocation = await headerRow.getLocation("y");
			const rowLocation = await row.getLocation("y");
			assert.ok(await row.isFocused(), `ArrowUp: Row ${i} is focused.`);
			assert.ok(await headerRow.isDisplayedInViewport(), `ArrowUp: Header is still displayed in the viewport.`);
			assert.isAbove(rowLocation, headerRowLocation, `ArrowUp: Row ${i} is below the header.`);
		}
	});

	it("body as scroll container - focused row should always be below the header", async() => {
		const grid = await browser.$("#grid2");
		const lastRow = await browser.$("#row-100-2");

		await lastRow.scrollIntoView();
		await lastRow.click();
		assert.ok(await lastRow.isFocused(), `Click: Row 100 (last row) is focused.`);

		const headerRow = await grid.$("ui5-grid-header-row");

		// Scroll to the top one by one
		for (let i = 99; i > 0; i--) {
			const row = await browser.$(`#row-${i}-2`);
			await browser.keys("ArrowUp");

			const headerRowLocation = await headerRow.getLocation("y");
			const rowLocation = await row.getLocation("y");
			assert.ok(await row.isFocused(), `ArrowUp: Row ${i} is focused.`);
			assert.ok(await headerRow.isDisplayedInViewport(), `ArrowUp: Header is still displayed in the viewport.`);
			assert.isAbove(rowLocation, headerRowLocation, `ArrowUp: Row ${i} is below the header.`);
		}
	});
});