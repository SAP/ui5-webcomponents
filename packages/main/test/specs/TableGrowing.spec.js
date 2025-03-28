import { assert } from 'chai';

// Test Module description: Growing with Button
describe('Table - Growing with Button', async () => {
	beforeEach(async () => {
		await browser.url(`test/pages/TableGrowing.html`);
	});

	// Test Case: Check if the Growing Button is rendered
	it('Check if the Growing Button is rendered', async () => {
		let table = await browser.$("#table0");
		assert.ok(table.isExisting(), "Table exists");

		// retrieve the tablegrowing component which is not in the shadow dom of the table
		const tableGrowing = await browser.$("#growing");
		assert.ok(tableGrowing.isExisting(), "Table Growing exists");

		// The Growing Button is located inside of the table. You can see the structure in the Table.hbs file.
		// It has a dedicated row with id "growing-row"
		// Inside of that row, there is a cell with id "growing-cell".
		const growingButtonRow = await table.shadow$("#growing-row");
		assert.ok(await growingButtonRow.isExisting(), "Growing Button Row exists");

		const growingButtonCell = await table.shadow$("#growing-cell");
		assert.ok(await growingButtonCell.isExisting(), "Growing Button Cell exists");

		const growingButton = await tableGrowing.shadow$("#growing-button");
		assert.ok(await growingButton.isExisting(), "Growing Button exists");
	});

	// Test Case: Check if the Growing Button is rendered with the correct text and growing-sub-text
	it('Check if the Growing Button is rendered with the correct text', async () => {
		const tableGrowing = await browser.$("#growing");

		// Check the text. The text is in growingButton. It's a direct child of the growing-button as seen in the TableGrowing.hbs file
		const growingText = await tableGrowing.shadow$("#text");
		assert.ok(growingText.isExisting(), "Growing Text exists");
		assert.strictEqual(await growingText.getText(), "Load More", "Growing Text is correct");

		// Check the growing-sub-text. The text is in growingButton. It's a direct child of the growing-button as seen in the TableGrowing.hbs file
		const growingSubText = await tableGrowing.shadow$("#subtext");
		assert.ok(await growingSubText.isExisting(), "Growing Sub Text exists");
		assert.strictEqual(await growingSubText.getText(), "More Items Loading...", "Growing Sub Text is correct");
	});

	// Test Case: Changing the text and growing-sub-text should result in the correct text
	it('Changing the text and growing-sub-text should result in the correct text', async () => {
		const tableGrowing = await browser.$("#growing");

		// Change the text
		await tableGrowing.setAttribute("text", "Load More Items");

		const growingText = await tableGrowing.shadow$("#text");
		assert.strictEqual(await growingText.getText(), "Load More Items", "Growing Text is correct");

		// Change the growing-sub-text
		await tableGrowing.setAttribute("growing-sub-text", "More Items Loading... Please Wait");
		const growingSubText = await tableGrowing.shadow$("#subtext");
		assert.strictEqual(await growingSubText.getText(), "More Items Loading... Please Wait", "Growing Sub Text is correct");
	});

	// Test Case: Check if the load-more event is dispatched when the Growing Button is triggered (Click, Enter, Space)
	it('Check if the load-more event is dispatched when the Growing Button is clicked', async () => {
		let tableGrowing = await browser.$("#growing");

		// The input field is used to count the number of times the load-more event is dispatched
		const loadMoreCounter = await browser.$("#load-more-counter");

		// Click the Growing Button
		let growingButton = await tableGrowing.shadow$("#growing-button");
		await growingButton.click();

		// Check if the load-more event is dispatched
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "1", "The load-more event is dispatched");

		await browser.execute((button) => {
			button.focus();
		}, tableGrowing);

		// Press the Enter key
		await browser.keys("Enter");
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "2", "The load-more event is dispatched");

		await browser.execute((button) => {
			button.focus();
		}, tableGrowing);

		// Press the Space key
		await browser.keys("Space");
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "3", "The load-more event is dispatched");
	});

	// Test Case: Check if the focus is set on the first newly added row after the load-more event is dispatched
	it('Check if the focus is set on the first newly added row after the load-more event is dispatched', async () => {
		let tableGrowing = await browser.$("#growing");

		// The input field is used to count the number of times the load-more event is dispatched
		const loadMoreCounter = await browser.$("#load-more-counter");

		// Click the Growing Button
		let growingButton = await tableGrowing.shadow$("#growing-button");
		await growingButton.click();

		// Check if the load-more event is dispatched
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "1", "The load-more event is dispatched");

		// Check if the focus is set on the first newly added row
		const firstNewRow = await browser.$("#row-6");
		assert.ok(await firstNewRow.isFocused(), "Focus is set on the first newly added row");
	});

	// Test Case: If no rows are added, focus the first item in the table
	it('If no rows are added, focus the growing button', async () => {
		await browser.execute(() => {
			const table = document.getElementById("table0");
			table._skipRowCreation = true;
		});

		let tableGrowing = await browser.$("#growing");

		// The input field is used to count the number of times the load-more event is dispatched
		const loadMoreCounter = await browser.$("#load-more-counter");

		// Click the Growing Button
		let growingButton = await tableGrowing.shadow$("#growing-button");
		await growingButton.click();

		// Check if the load-more event is dispatched
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "1", "The load-more event is dispatched");

		assert.ok(await tableGrowing.isFocused(), "Focus is set on the growing button");
	});

	// Test Case: If no rows are added and the last row has been removed (e.g. replaced rows), the growing button should be focused
	it('If no rows are added and the previous rows do not exist, the growing button in the table should be focused', async () => {
		await browser.execute(() => {
			const table = document.getElementById("table0");
			table._removeRows = true;
		});

		let tableGrowing = await browser.$("#growing");

		// The input field is used to count the number of times the load-more event is dispatched
		const loadMoreCounter = await browser.$("#load-more-counter");

		// Click the Growing Button
		let growingButton = await tableGrowing.shadow$("#growing-button");
		await growingButton.click();

		// Check if the load-more event is dispatched
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "1", "The load-more event is dispatched");

		// Check if the focus is set on the growing button shadow dom
		assert.ok(await tableGrowing.isFocused(), "Focus is set on the growing button");
	});

	// Test Case: If rows are added and popin is visible, the popin should also be visible for the new rows
	it('If rows are added and popin is visible, the popin should also be visible for the new rows', async () => {
		// setup: resize the table to a smaller width so that popin is visible
		await browser.execute(() => {
			const table = document.getElementById("table0");
			table.style.width = "500px";
		});

		let tableGrowing = await browser.$("#growing");

		// The input field is used to count the number of times the load-more event is dispatched
		const loadMoreCounter = await browser.$("#load-more-counter");

		const firstRow = await browser.$("#row-1");
		const popinFirst = await firstRow.shadow$("#popin-cell");

		// Check if the popin is visible
		assert.ok(await popinFirst.isExisting(), "Popin of first row is visible");

		// Click the Growing Button
		let growingButton = await tableGrowing.shadow$("#growing-button");
		await growingButton.click();

		// Check if the load-more event is dispatched
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "1", "The load-more event is dispatched");

		// Check if the popin is visible for the new rows
		const firstNewRow = await browser.$("#row-6");
		const popin = await firstNewRow.shadow$("#popin-cell");

		// Check if the popin is visible
		assert.ok(await popin.isExisting(), "Popin of new row is visible");
	});
});

// Test Module description: Growing with Scroll
describe('Table - Growing with Scroll', async () => {
	before(async () => {
		await browser.url(`test/pages/TableGrowing.html`);

		const table = await browser.$("#table0");
		await table.setProperty("style", `height: 200px; overflow: auto;`);

		const tableGrowing = await browser.$("#growing");
		await tableGrowing.setAttribute("mode", "Scroll");
	});

	// Test Case: Check if table is scrollable (overflow-y: auto)
	it('Check if table is scrollable', async () => {
		let table = await browser.$("#table0");
		assert.ok(await table.isExisting(), "Table exists");

		const tableGrowing = await browser.$("#growing");
		assert.equal(await tableGrowing.getAttribute("mode"), "Scroll", "Growing is of mode Scroll");

		// Check if div with ID "table" has overflow-y: auto
		const innerTable = await table.shadow$("#table");
		assert.ok(await innerTable.isExisting(), "Inner Table exists");
		const overflowY = await innerTable.getCSSProperty("overflow-y");
		assert.strictEqual(overflowY.value, "visible", "Table is scrollable");
	});

	// Test Case: Check if the load-more event is dispatched when the Table is scrolled to the bottom
	it('Check if the load-more event is dispatched when the Table is scrolled to the bottom', async () => {
		// The input field is used to count the number of times the load-more event is dispatched
		const loadMoreCounter = await browser.$("#load-more-counter");

		// Scroll to the bottom of the table
		const endRow = await browser.$("#table0").shadow$("#table-end-row");
		await endRow.scrollIntoView();

		// Check if the load-more event is dispatched
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "1", "The load-more event is dispatched");

		await endRow.scrollIntoView();
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "2", "The load-more event is dispatched");
	});
});
