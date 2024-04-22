import { assert } from 'chai';

// Test Module description: Growing with Button
describe('Grid - Growing with Button', async () => {
	beforeEach(async () => {
		await browser.url(`test/pages/GridGrowing.html`);
	});

	// Test Case: Check if the Growing Button is rendered
	it('Check if the Growing Button is rendered', async () => {
		let grid = await browser.$("#grid0");
		assert.ok(grid.isExisting(), "Grid exists");

		// retrieve the gridgrowing component which is not in the shadow dom of the grid
		const gridGrowing = await browser.$("#growing");
		assert.ok(gridGrowing.isExisting(), "Grid Growing exists");

		// The Growing Button is located inside of the grid. You can see the structure in the Grid.hbs file.
		// It has a dedicated row with id "growing-button-row"
		// Inside of that row, there is a cell with id "growing-button-cell".
		const growingButtonRow = await grid.$("#growing-button-row");
		assert.ok(growingButtonRow.isExisting(), "Growing Button Row exists");

		const growingButtonCell = await grid.$("#growing-button-cell");
		assert.ok(growingButtonCell.isExisting(), "Growing Button Cell exists");

		const growingButton = await gridGrowing.shadow$("#growing-button");
		assert.ok(growingButton.isExisting(), "Growing Button exists");
	});

	// Test Case: Check if the Growing Button is rendered with the correct growing-text and growing-sub-text
	it('Check if the Growing Button is rendered with the correct text', async () => {
		const gridGrowing = await browser.$("#growing");

		// Check the growing-text. The text is in growingButton. It's a direct child of the growing-button as seen in the GridGrowing.hbs file
		const growingText = await gridGrowing.shadow$("#growing-text");
		assert.ok(growingText.isExisting(), "Growing Text exists");
		assert.strictEqual(await growingText.getText(), "Load More", "Growing Text is correct");

		// Check the growing-sub-text. The text is in growingButton. It's a direct child of the growing-button as seen in the GridGrowing.hbs file
		const growingSubText = await gridGrowing.shadow$("#growing-subtext");
		assert.ok(growingSubText.isExisting(), "Growing Sub Text exists");
		assert.strictEqual(await growingSubText.getText(), "More Items Loading...", "Growing Sub Text is correct");
	});

	// Test Case: Changing the growing-text and growing-sub-text should result in the correct text
	it('Changing the growing-text and growing-sub-text should result in the correct text', async () => {
		const gridGrowing = await browser.$("#growing");

		// Change the growing-text
		await gridGrowing.setAttribute("growing-text", "Load More Items");

		const growingText = await gridGrowing.shadow$("#growing-text");
		assert.strictEqual(await growingText.getText(), "Load More Items", "Growing Text is correct");

		// Change the growing-sub-text
		await gridGrowing.setAttribute("growing-sub-text", "More Items Loading... Please Wait");
		const growingSubText = await gridGrowing.shadow$("#growing-subtext");
		assert.strictEqual(await growingSubText.getText(), "More Items Loading... Please Wait", "Growing Sub Text is correct");
	});

	// Test Case: Check if the load-more event is dispatched when the Growing Button is triggered (Click, Enter, Space)
	it('Check if the load-more event is dispatched when the Growing Button is clicked', async () => {
		let gridGrowing = await browser.$("#growing");

		// The input field is used to count the number of times the load-more event is dispatched
		const loadMoreCounter = await browser.$("#load-more-counter");

		// Click the Growing Button
		let growingButton = await gridGrowing.shadow$("#growing-button");
		await growingButton.click();

		// Check if the load-more event is dispatched
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "1", "The load-more event is dispatched");

		await browser.execute((button) => {
			button.focus();
		}, gridGrowing);

		// Press the Enter key
		await browser.keys("Enter");
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "2", "The load-more event is dispatched");

		await browser.execute((button) => {
			button.focus();
		}, gridGrowing);

		// Press the Space key
		await browser.keys("Space");
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "3", "The load-more event is dispatched");
	});

	// Test Case: Check if the focus is set on the first newly added row after the load-more event is dispatched
	it('Check if the focus is set on the first newly added row after the load-more event is dispatched', async () => {
		let gridGrowing = await browser.$("#growing");

		// The input field is used to count the number of times the load-more event is dispatched
		const loadMoreCounter = await browser.$("#load-more-counter");

		// Click the Growing Button
		let growingButton = await gridGrowing.shadow$("#growing-button");
		await growingButton.click();

		// Check if the load-more event is dispatched
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "1", "The load-more event is dispatched");

		// Check if the focus is set on the first newly added row
		const firstNewRow = await browser.$("#row-6");
		assert.ok(await firstNewRow.isFocused(), "Focus is set on the first newly added row");
	});

	// Test Case: If no rows are added, focus the first item in the grid
	it('If no rows are added, focus the growing button', async () => {
		await browser.execute(() => {
			const grid = document.getElementById("grid0");
			grid._skipRowCreation = true;
		});

		let gridGrowing = await browser.$("#growing");

		// The input field is used to count the number of times the load-more event is dispatched
		const loadMoreCounter = await browser.$("#load-more-counter");

		// Click the Growing Button
		let growingButton = await gridGrowing.shadow$("#growing-button");
		await growingButton.click();

		// Check if the load-more event is dispatched
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "1", "The load-more event is dispatched");

		assert.ok(await gridGrowing.isFocused(), "Focus is set on the growing button");
	});

	// Test Case: If no rows are added and the last row has been removed (e.g. replaced rows), the growing button should be focused
	it('If no rows are added and the previous rows do not exist, the growing button in the grid should be focused', async () => {
		await browser.execute(() => {
			const grid = document.getElementById("grid0");
			grid._removeRows = true;
		});

		let gridGrowing = await browser.$("#growing");

		// The input field is used to count the number of times the load-more event is dispatched
		const loadMoreCounter = await browser.$("#load-more-counter");

		// Click the Growing Button
		let growingButton = await gridGrowing.shadow$("#growing-button");
		await growingButton.click();

		// Check if the load-more event is dispatched
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "1", "The load-more event is dispatched");

		// Check if the focus is set on the growing button shadow dom
		assert.ok(await gridGrowing.isFocused(), "Focus is set on the growing button");
	});

	// Test Case: If rows are added and popin is visible, the popin should also be visible for the new rows
	it('If rows are added and popin is visible, the popin should also be visible for the new rows', async () => {
		// setup: resize the grid to a smaller width so that popin is visible
		await browser.execute(() => {
			const grid = document.getElementById("grid0");
			grid.style.width = "500px";
		});

		let gridGrowing = await browser.$("#growing");

		// The input field is used to count the number of times the load-more event is dispatched
		const loadMoreCounter = await browser.$("#load-more-counter");

		const firstRow = await browser.$("#row-1");
		const popinFirst = await firstRow.shadow$("#popin-cell");

		// Check if the popin is visible
		assert.ok(popinFirst.isExisting(), "Popin of first row is visible");

		// Click the Growing Button
		let growingButton = await gridGrowing.shadow$("#growing-button");
		await growingButton.click();

		// Check if the load-more event is dispatched
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "1", "The load-more event is dispatched");

		// Check if the popin is visible for the new rows
		const firstNewRow = await browser.$("#row-6");
		const popin = await firstNewRow.shadow$("#popin-cell");

		// Check if the popin is visible
		assert.ok(popin.isExisting(), "Popin of new row is visible");
	});
});

// Test Module description: Growing with Scroll
describe('Grid - Growing with Scroll', async () => {
	before(async () => {
		await browser.url(`test/pages/GridGrowing.html`);

		const grid = await browser.$("#grid0");
		await grid.setProperty("style", `height: 200px; overflow: auto;`);

		const gridGrowing = await browser.$("#growing");
		await gridGrowing.setAttribute("type", "Scroll");
	});

	// Test Case: Check if grid is scrollable (overflow-y: auto)
	it('Check if grid is scrollable', async () => {
		let grid = await browser.$("#grid0");
		assert.ok(grid.isExisting(), "Grid exists");

		const gridGrowing = await browser.$("#growing");
		assert.equal(await gridGrowing.getAttribute("type"), "Scroll", "Growing is of type Scroll");

		// Check if div with ID "grid" has overflow-y: auto
		const innerGrid = await grid.shadow$("#grid");
		assert.ok(innerGrid.isExisting(), "Inner Grid exists");
		const overflowY = await innerGrid.getCSSProperty("overflow-y");
		assert.strictEqual(overflowY.value, "visible", "Grid is scrollable");
	});

	// Test Case: Check if the load-more event is dispatched when the Grid is scrolled to the bottom
	it('Check if the load-more event is dispatched when the Grid is scrolled to the bottom', async () => {
		// The input field is used to count the number of times the load-more event is dispatched
		const loadMoreCounter = await browser.$("#load-more-counter");

		// Scroll to the bottom of the grid
		const endRow = await browser.$("#grid0").shadow$("#table-end-row");
		await endRow.scrollIntoView();

		// Check if the load-more event is dispatched
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "1", "The load-more event is dispatched");

		await endRow.scrollIntoView();
		assert.strictEqual(await loadMoreCounter.getProperty("value"), "2", "The load-more event is dispatched");
	});
});