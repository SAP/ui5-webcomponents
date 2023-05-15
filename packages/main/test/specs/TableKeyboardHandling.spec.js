import { assert } from "chai";

describe("Table keyboard interaction", async () => {
	it("Tab/Shift+Tab", async () => {
		await browser.url(`test/pages/TableSelection.html`);

		const table = await browser.$("#multi");

		const firstRow = await browser.$("#firstRowMultiSelect");
		const buttonInFirstRow = await firstRow.$("#button2");
		const firstRowCheckBox = await firstRow.shadow$("ui5-checkbox");

		const secondRow = await browser.$("#secondRowMultiSelect");
		const buttonInSecondRow = await secondRow.$("#button3");

		const precedingElementInTabIndex = await browser.$("#selectionChangeSSPreviousRowField");
		const nextElementInTabIndex = await browser.$("#rowClickMSCountField");

		// Act
		await precedingElementInTabIndex.click();
		await browser.keys("Tab");

		// Assert
		assert.ok(await firstRow.isFocused(), "First row's root should be focused on initial table focusin");
		assert.notOk(await buttonInFirstRow.isFocused(), "The button nested in the first row should not be focused on initial table focusin");

		// Act
		await browser.keys("Tab");

		// Assert
		assert.ok(await buttonInFirstRow.isFocused(), "The button nested in the first row should be focused");
		assert.notOk(await firstRow.isFocused(), "First row's root not be focused when a nested element is in focus");
		assert.notOk(await firstRowCheckBox.isFocused(), "The first row's checkbox is excluded from the tab chain");

		// Act
		await browser.keys("Tab");

		// Assert
		assert.ok(await nextElementInTabIndex.isFocused(), "The element after the table is focused on Tab over the last focusable element");
		assert.notOk(await secondRow.isFocused(), "The second row should not be focused");
		assert.notOk(await buttonInSecondRow.isFocused(), "The second row's button should not be focused");

		// Act
		await browser.keys(["Shift", "Tab"]);

		// Assert
		assert.ok(await buttonInFirstRow.isFocused(), "The previously focused button in the table should be focused");
		assert.notOk(await nextElementInTabIndex.isFocused(), "The element after the table should lose focus");

		// Act
		await browser.keys(["Shift", "Tab"]);

		// Assert
		assert.ok(await firstRow.isFocused(), "The first row's root should be focused");
		assert.notOk(await buttonInFirstRow.isFocused(), "The previously focused nested button should lose focus");

		// Act
		await browser.keys(["Shift", "Tab"]);

		// Assert
		assert.ok(await precedingElementInTabIndex.isFocused(), "The element before the table should be focused");
		assert.notOk(await firstRow.isFocused(), "The first row should lose focus");
	});

	it("F7", async () => {
		await browser.url(`test/pages/TableSelection.html`);

		const table = await browser.$("#multi");

		const firstRow = await browser.$("#firstRowMultiSelect");
		const buttonInFirstRow = await firstRow.$("#button2");

		const firstCellFirstRowLabel = await browser.$("#firstCellFirstRowMSLabel");

		// Act
		await firstCellFirstRowLabel.click();
		await browser.keys("Tab");
		await browser.keys("F7");

		// Assert
		assert.ok(await firstRow.isFocused(), "The first row's root should be in focus");
		assert.notOk(await buttonInFirstRow.isFocused(), "The button nested in the first row should lose focus");

		// Act
		await browser.keys("F7");

		// Assert
		assert.ok(await buttonInFirstRow.isFocused(), "The button nested in the first row should be focused");
		assert.notOk(await firstRow.isFocused(), "First row's root should lose focus");
	});

	it("Ctrl + A", async () => {
		await browser.url(`test/pages/TableSelection.html`);

		const table = await browser.$("#multi");
		const firstRow = await browser.$("#firstRowMultiSelect");
		const firstRowCheckBox = await firstRow.shadow$("ui5-checkbox");
		const secondRow = await browser.$("#secondRowMultiSelect");
		const thirdRow = await browser.$("#thirdRowMultiSelect");
		const forthRow = await browser.$("#forthRowMultiSelect");
		const selectAllCheckBox = await table.shadow$("thead ui5-checkbox");

		const firstCellFirstRowLabel = await browser.$("#firstCellFirstRowMSLabel");

		// Act
		await firstCellFirstRowLabel.click();

		// Assert
		assert.notOk(await firstRow.getAttribute("selected"), "The first row is not selected");
		assert.notOk(await firstRowCheckBox.getProperty("checked"), "The first row's checkbox is not checked");
		assert.notOk(await secondRow.getAttribute("selected"), "The second row is not selected");
		assert.notOk(await thirdRow.getAttribute("selected"), "The third row is not selected");
		assert.notOk(await forthRow.getAttribute("selected"), "The forth row is not selected");
		assert.notOk(await selectAllCheckBox.getProperty("checked"), "Select all checkbox is not checked");

		// Act
		await browser.keys(["Control", "a"]);

		// Assert
		assert.ok(await firstRow.getAttribute("selected"), "The first row is selected");
		assert.ok(await firstRowCheckBox.getProperty("checked"), "The first row's checkbox is checked");
		assert.ok(await secondRow.getAttribute("selected"), "The second row is selected");
		assert.ok(await thirdRow.getAttribute("selected"), "The third row is selected");
		assert.ok(await forthRow.getAttribute("selected"), "The forth row is selected");
		assert.ok(await selectAllCheckBox.getProperty("checked"), "Select all checkbox is checked");
	});

	it("Alt + Up/Down", async () => {
		await browser.url(`test/pages/TableGrowingWithButton.html`);

		const table = await browser.$("#tbl");
		const tableHeader = await table.shadow$(".ui5-table-header-row");
		const firstRow = await table.$("ui5-table-row");
		const secondRow = await table.$$("ui5-table-row")[1];
		const moreButton = await table.shadow$('[id$="growingButton"]');

		const firstCellFirstRowLabel = await firstRow.$("ui5-label");

		// Act
		await firstCellFirstRowLabel.waitForClickable({ timeout: 1600 });
		await firstCellFirstRowLabel.click();

		// Assert
		assert.ok(await firstRow.isFocused(), "The first row is initially focused");

		// [Alt] + [Up]
		await browser.keys(["Alt", "ArrowUp"]);

		// Assert
		assert.ok(await tableHeader.isFocusedDeep(), "Focus should move from first row to header");
		assert.notOk(await firstRow.isFocused(), "The first row should not be focused");

		// Act
		await browser.keys(["Alt", "ArrowUp"]);

		// Assert
		assert.ok(await moreButton.isFocusedDeep(), "Focus should move from header to More button");
		assert.notOk(await tableHeader.isFocusedDeep(), "The header should not be focused");

		// Act
		await browser.keys(["Alt", "ArrowUp"]);

		// Assert
		assert.ok(await firstRow.isFocused(), "Focus should move from More button to last focused row");
		assert.notOk(await moreButton.isFocusedDeep(), "The More button should not be focused");

		// [Alt] + [Down]
		await browser.keys("ArrowDown");

		// Assert
		assert.ok(await secondRow.isFocused(), "The second row is initially focused");

		await browser.keys(["Alt", "ArrowDown"]);

		// Assert
		assert.ok(await moreButton.isFocusedDeep(), "Focus should move from second row to More button");
		assert.notOk(await secondRow.isFocused(), "The second row should not be focused");

		// Act
		await browser.keys(["Alt", "ArrowDown"]);

		// Assert
		assert.ok(await tableHeader.isFocusedDeep(), "Focus should move More button to header");
		assert.notOk(await moreButton.isFocusedDeep(), "The More button should not be focused");

		// Act
		await browser.keys(["Alt", "ArrowDown"]);

		// Assert
		assert.ok(await secondRow.isFocused(), "Focus should move from header to last focused row");
		assert.notOk(await tableHeader.isFocusedDeep(), "The header should not be focused");
	});

	it("SHIFT + UP/DOWN", async () => {
		await browser.url(`test/pages/TableSelection.html`);

		const table = await browser.$("#multi");
		const firstRow = await browser.$("#firstRowMultiSelect");
		const firstRowCheckBox = await firstRow.shadow$("ui5-checkbox");
		const secondRow = await browser.$("#secondRowMultiSelect");
		const thirdRow = await browser.$("#thirdRowMultiSelect");

		await firstRowCheckBox.click();
		await browser.keys(["Shift", "ArrowDown"]);

		assert.strictEqual(await firstRow.getProperty("selected"), true, "The first row is selected");
		assert.strictEqual(await secondRow.getProperty("selected"), true, "The second row is selected");

		await browser.keys("ArrowDown");
		await browser.keys(["Shift", "ArrowUp"]);
		await browser.keys(["Shift", "ArrowUp"]);

		assert.strictEqual(await firstRow.getProperty("selected"), false, "The first row is unselected");
		assert.strictEqual(await secondRow.getProperty("selected"), false, "The second row is unselected");

		await firstRowCheckBox.click();
		await browser.keys(["Shift", "ArrowDown"]);
		await browser.keys(["Shift", "ArrowDown"]);

		await firstRowCheckBox.click();
		await browser.keys(["Shift", "ArrowDown"]);
		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");
		await browser.keys(["Shift", "ArrowUp"]);

		assert.strictEqual(await secondRow.getProperty("selected"), false, "The second row is unselected");
		assert.strictEqual(await thirdRow.getProperty("selected"), false, "The third row is unselected");
	});

	it("CTRL + HOME/END", async () => {
		await browser.url(`test/pages/TableSelection.html`);

		const table = await browser.$("#multi");
		const tableHeader = await table.shadow$(".ui5-table-header-row");
		const firstRow = await browser.$("#firstRowMultiSelect");

		const firstRowCheckBox = await firstRow.shadow$("ui5-checkbox");
		const secondRow = await browser.$("#secondRowMultiSelect");
		const fourthRow = await browser.$("#forthRowMultiSelect");

		await firstRowCheckBox.click();
		await browser.keys(["Control", "Home"]);

		assert.strictEqual(await tableHeader.getAttribute("tabindex"), "0", "The header is focused");

		await browser.keys(["Control", "End"]);

		assert.strictEqual(await fourthRow.getAttribute("_tab-index"), "0", "The last row is focused");
	});

	it("SHIFT + HOME/END", async () => {
		await browser.url(`test/pages/TableSelection.html`);

		const table = await browser.$("#multi");
		const firstRow = await browser.$("#firstRowMultiSelect");
		const headerFirstLabel = await table.$("ui5-table-column");
		const headerFirstLabelDOM = await headerFirstLabel.shadow$("th");

		const secondRow = await browser.$("#secondRowMultiSelect");
		const thirdRow = await browser.$("#thirdRowMultiSelect");
		const fourthRow = await browser.$("#forthRowMultiSelect");

		await headerFirstLabelDOM.click();
		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");
		await browser.keys(["Shift", "Home"]);

		assert.strictEqual(await firstRow.getProperty("selected"), true, "The first row is selected");
		assert.strictEqual(await secondRow.getProperty("selected"), true, "The second row is selected");

		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");

		await browser.keys(["Shift", "End"]);

		assert.strictEqual(await thirdRow.getProperty("selected"), true, "The third row is selected");
		assert.strictEqual(await fourthRow.getProperty("selected"), true, "The fourth row is selected");
	});
});
