const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Table general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Table.html`);
	});

	it("tests if column disapears when min-width is reacted (650px)", async () => {
		const btn = await browser.$("#size-btn-650");
		const headerTableRow = await browser.$("#tbl").shadow$("thead tr");

		await btn.click();

		assert.strictEqual((await headerTableRow.getHTML(false)).split("</slot>").length - 1, 4, "Columns should be 4");
	});

	it("tests if column popins when min-width is reacted (500px)", async () => {
		const btn = await browser.$("#size-btn-500");
		const headerTableRow = await browser.$("#tbl").shadow$("thead tr");
		const popinRows = await browser.$("#roll-0").shadow$$(".ui5-table-popin-row");

		await btn.click();

		assert.strictEqual((await headerTableRow.getHTML(false)).split("</slot>").length - 1, 2, "Columns should be 4");
		assert.strictEqual((await browser.$("#roll-0").shadow$$(".ui5-table-popin-row")).length, 2, "popin rows should be 2");
	});

	it("tests if noData div is displayed for empty table", async () => {
		const noDataRow = await browser.$("#tableNoData").shadow$("div.ui5-table-no-data-row");

		assert.ok(await noDataRow.isExisting(), 'noData div is present');
	});

	it("tests if table with more columns than cells is rendered", async () => {
		const tblLessCells = await browser.$("#tblLessCells");
		assert.ok(await tblLessCells.isExisting(), 'table with more columns is rendered without JS errors.');
	});

	it("tests if popinChange is fired when min-width is reacted (500px)", async () => {
		let tableLabel = await browser.$("#tableLabel");
		const btn = await browser.$("#size-btn-500");

		await btn.click();

		assert.strictEqual(await tableLabel.getHTML(false), "Number of poppedColumns: 4", "popinChange should be fired and columns should be 4");
	});

	it("tests row-click is fired", async () => {
		const lbl = await browser.$("#testRowClickResult");
		const cellInRow1 = await browser.$("#testRowClickCell1");
		const cellInRow2 = await browser.$("#testRowClickCell2");
		const row1Data = "Dublin";
		const row2Data = "London";

		await cellInRow1.click();
		let lblHtml = await lbl.getHTML();
		assert.ok(lblHtml.indexOf(row1Data), "Event row-click fired and intercepted.");

		await cellInRow2.click();
		lblHtml = await lbl.getHTML();
		assert.ok(lblHtml.indexOf(row2Data), "Event row-click fired and intercepted.");

		await cellInRow1.keys("Space");
		lblHtml = await lbl.getHTML();
		assert.ok(lblHtml.indexOf(row1Data), "Event row-click fired and intercepted.");

		await cellInRow2.keys("Enter");
		lblHtml = await lbl.getHTML();
		assert.ok(lblHtml.indexOf(row2Data), "Event row-click fired and intercepted.");
	});

	it("tests row aria-label value", async () => {
		const row = await browser.$("#roll-0").shadow$(".ui5-table-row-root");

		const EXPECTED_TEXT = "Product Notebook Basic 15HT-1000 Supplier Very Best Screens Dimensions 30 x 18 x 3 cm Weight 4.2 KG Price 956 EUR. 1 of 5";

		assert.strictEqual(await row.getAttribute("aria-label"), EXPECTED_TEXT,
			"The aria-label value is correct.");
	});

	describe("Growing Table on 'More' button press", () => {
		it("tests the 'load-more' event", async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/TableGrowingWithButton.html`);

			const inputResult = await browser.$("#inputLoadMoreCounter");
			const loadMoreTrigger = await browser.$("#tbl").shadow$("[growing-button-inner]");

			// act
			await loadMoreTrigger.click();
			// assert
			assert.strictEqual(await inputResult.getProperty("value"), "1",
				"The load-more is fired.");

			// act
			await loadMoreTrigger.keys("Space");
			// assert
			assert.strictEqual(await inputResult.getProperty("value"), "2",
				"The load-more is fired 2nd time.");

			// act
			await loadMoreTrigger.keys("Enter");
			// assert
			assert.strictEqual(await inputResult.getProperty("value"), "3",
				"The load-more is fired 3rd time.");
		});
	});

	describe("Growing Table on Scroll", () => {
		it("tests the 'load-more' event", async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/TableGrowingWithScroll.html`);

			const inputResult = await browser.$("#inputLoadMoreCounter");
			const btnScroll = await browser.$("#btnScroll");

			// act
			await btnScroll.click();

			await browser.waitUntil(async () => (await inputResult.getProperty("value")) === "1", {
				timeout: 1000,
				timeoutMsg: "The load-more event must be fired."
			});
		});
	});

	describe("Table selection modes", () => {
		it("test click over Active/Inactive row in SingleSelect mode", async () => {
			await browser.url("http://localhost:8080/test-resources/pages/TableSelection.html");
			const table = await browser.$("#single");
			const firstRow = await browser.$("#firstRowSingleSelect");
			const thirdRow = await browser.$("#thirdRowSingleSelect");
			const firstCellFirstRowLabel = await browser.$("#firstCellFirstRowSSLabel");
			const firstCellThirdRowLabel = await browser.$("#firstCellThirdRowSSLabel");
			const contentButton = await browser.$("#button1");
			const rowClickCount = await browser.$("#rowClickSSCountField");
			const selectionChangeCount = await browser.$("#selectionChangeSSCountField");
			const selectedRow = await browser.$("#selectionChangeSSSelectedValueField");
			const previouslySelectedRows = await browser.$("#selectionChangeSSPreviousRowField");

			// act
			await firstCellFirstRowLabel.click();

			// check whether the table's and row's mode property is set correctly, as well as the row type property
			assert.strictEqual(await table.getAttribute("mode"), "SingleSelect", "The table's mode is SingleSelect");
			assert.strictEqual(await firstRow.getAttribute("mode"), "SingleSelect", "The row's mode is SingleSelect");
			assert.strictEqual(await firstRow.getAttribute("type"), "Active", "The row's type is Active");
			assert.strictEqual(await thirdRow.getAttribute("type"), "Inactive", "The row's type is Inactive")

			// test row-click and selection-change events on click over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an Active row should trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "1", "Click over an Active row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "firstRowSingleSelect", "The first row is selected");

			// act
			await firstCellThirdRowLabel.click();

			// test row-click and selection-change events on click over an Inactive row
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an Inactive row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "2", "Click over an Inactive row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "thirdRowSingleSelect", "The second row is selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "firstRowSingleSelect", "Prevously the first row was selected");

			// act
			await contentButton.click();

			// test row-click and selection-change on click over an active table cell content
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an active element within a table cell should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "2", "Click over an active element within a table cell should not trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "thirdRowSingleSelect", "The selected row is not changed");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "firstRowSingleSelect", "The prevously  selected row is not changed");
		});

		it("test Space/Enter key interaction over Active/Inactive row in SingleSelect mode", async () => {
			const firstRow = await browser.$("#firstRowSingleSelect");
			const secondRow = await browser.$("#secondRowSingleSelect");
			const thirdRow = await browser.$("#thirdRowSingleSelect");
			const forthRow = await browser.$("#forthRowSingleSelect");
			const contentButton = await browser.$("#button1");
			const rowClickCount = await browser.$("#rowClickSSCountField");
			const selectionChangeCount = await browser.$("#selectionChangeSSCountField");
			const selectedRow = await browser.$("#selectionChangeSSSelectedValueField");
			const previouslySelectedRows = await browser.$("#selectionChangeSSPreviousRowField");

			// act
			await browser.keys(["Shift", "Tab"]);
			await firstRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Enter key over an Active row should trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "3", "Enter key over an Active row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "firstRowSingleSelect", "The first row is selected");

			// act
			await firstRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an already selected row
			assert.strictEqual(await rowClickCount.getProperty("value"), "3", "Enter key over an already selected row should trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "3", "Enter key over an already selected row should not trigger selection-change event");

			// act
			await browser.keys("ArrowDown");
			await browser.keys("ArrowDown");
			await thirdRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Inactive row
			assert.strictEqual(await rowClickCount.getProperty("value"), "3", "Enter key over an Inactive row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "4", "Enter key over an Inactive row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "thirdRowSingleSelect", "The third row is selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "firstRowSingleSelect", "Prevously the first row was selected");

			// act
			await thirdRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an already selected row
			assert.strictEqual(await rowClickCount.getProperty("value"), "3", "Space key over an already selected row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "4", "Space key over an already selected row should not trigger selection-change event");

			// act
			await browser.keys("ArrowDown");
			await forthRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Inactive row
			assert.strictEqual(await rowClickCount.getProperty("value"), "3", "Space key over an Inactive row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "5", "Space key over an Inactive row should trigger selection-change event");

			// act
			await browser.keys("ArrowUp");
			await browser.keys("ArrowUp");
			await secondRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "3", "Space key over an Active row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "6", "Space key over an Active row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "secondRowSingleSelect", "The second row is selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "forthRowSingleSelect", "Prevously the forth row was selected");

			// act
			await browser.keys(["Shift", "Tab"]);
			await contentButton.keys("Space");

			// test row-click and selection-change on Space key over an active table cell content
			assert.strictEqual(await rowClickCount.getProperty("value"), "3", "Space key over an active element within a table cell should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "6", "Space key over an active element within a table cell should not trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "secondRowSingleSelect", "The selected row is not changed");
		});

		it("test click over Active/Inactive row in MultiSelect mode", async () => {
			const table = await browser.$("#multi");
			const firstRow = await browser.$("#firstRowMultiSelect");
			const thirdRow = await browser.$("#thirdRowMultiSelect");
			const firstCellFirstRowLabel = await browser.$("#firstCellFirstRowMSLabel");
			const firstCellThirdRowLabel = await browser.$("#firstCellThirdRowMSLabel");
			const checkBoxFirstCell = await firstRow.shadow$(".ui5-multi-select-checkbox").shadow$(".ui5-checkbox-root");
			const contentButton = await browser.$("#button2");
			const rowClickCount = await browser.$("#rowClickMSCountField");
			const selectionChangeCount = await browser.$("#selectionChangeMSCountField");
			const selectedRow = await browser.$("#selectionChangeMSSelectedValueField");
			const previouslySelectedRows = await browser.$("#selectionChangeMSPreviousRowField");

			// act
			await firstCellFirstRowLabel.click();

			// check whether the table's and row's mode property is set correctly, as well as the row type property
			assert.strictEqual(await table.getAttribute("mode"), "MultiSelect", "The table's mode is MultiSelect");
			assert.strictEqual(await firstRow.getAttribute("mode"), "MultiSelect", "The row's mode is MultiSelect");
			assert.strictEqual(await firstRow.getAttribute("type"), "Active", "The row's type is Active");
			assert.strictEqual(await thirdRow.getAttribute("type"), "Inactive", "The row's type is Inactive")

			// test row-click and selection-change events over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an Active row should trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Click over a row in a MultiSelect mode table should not trigger selection-change event");

			// act
			await checkBoxFirstCell.click();

			// test click over the selection checkbox within each row in MultiSelect mode
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over the selection checkbox should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "1", "Click over the selection checkbox should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "firstRowMultiSelect", "The first row is selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "", "There is no previously selected row");

			// act
			await contentButton.click();

			// test row-click and selection-change on click over an active table cell content
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an active element within a table cell should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "1", "Click over an active element within a table cell should not trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "firstRowMultiSelect", "The selected row is not changed");

			// act
			await firstCellThirdRowLabel.click();

			// test row-click and selection-change events over an Inactive row
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an Inactive row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "1", "Click over an Inactive row should not trigger selection-change event");
		});

		it("test Space/Enter key interaction over Active/Inactive row in MultiSelect mode", async () => {
			const firstRow = await browser.$("#firstRowMultiSelect");
			const secondRow = await browser.$("#secondRowMultiSelect");
			const thirdRow = await browser.$("#thirdRowMultiSelect");
			const checkBoxFirstCell = await secondRow.shadow$(".ui5-multi-select-checkbox").shadow$(".ui5-checkbox-root");
			const contentButton = await browser.$("#button2");
			const selectionChangeCount = await browser.$("#selectionChangeMSCountField");
			const rowClickCount = await browser.$("#rowClickMSCountField");
			const selectedRow = await browser.$("#selectionChangeMSSelectedValueField");
			const previouslySelectedRows = await browser.$("#selectionChangeMSPreviousRowField");

			// act
			await browser.keys("ArrowUp");
			await browser.keys("ArrowUp");
			await firstRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Enter key over an Active row should trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "1", "Enter key over an Active row should not trigger selection-change event");

			// act
			await browser.keys("Tab");
			await browser.keys("Tab");
			await contentButton.keys("Enter");

			// test row-click and selection-change on Enter key over an active table cell content
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Enter key over an active element within a table cell should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "1", "Enter key over an active element within a table cell should not trigger selection-change event");

			// act
			await browser.keys("Tab");
			await checkBoxFirstCell.keys("Enter");

			// test Space over the selection checkbox within each row in MultiSelect mode
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Enter key over the selection checkbox should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "2", "Enter key over the selection checkbox should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "secondRowMultiSelect", "The second row is currently selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "firstRowMultiSelect", "Prevously the first row was selected");

			// act
			await checkBoxFirstCell.keys("Space");

			// test Space key over the selection checkbox of already selected row in MultiSelect mode
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Space key over the selection checkbox should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "3", "Space key over the selection checkbox of already selected row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "firstRowMultiSelect", "The second row is not selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "secondRowMultiSelect", "Prevously the second row was selected");

			// act
			await browser.keys(["Shift", "Tab"]);
			await secondRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Space key over an Active row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "4", "Space key over an Active row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "secondRowMultiSelect", "The second row is currently selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "firstRowMultiSelect", "The previously selected row is the first row");

			// act
			await browser.keys("ArrowDown");
			await thirdRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Inactive row
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Space key over an Inactive row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "5", "Space key over an Inactive row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "thirdRowMultiSelect", "The third row is cuurently selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "secondRowMultiSelect", "The previously selected row is the second row");

			// act
			await thirdRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an already selected row
			assert.strictEqual(await rowClickCount.getProperty("value"), "2",  "Enter key over an already selected Inactive row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "5",  "Enter key over an already selected row should trigger selection-change event");
		});

		it("test selectAll functionallity in MultiSelect mode", async () => {
			await browser.url("http://localhost:8080/test-resources/pages/TableSelection.html");
			const firstRow = await browser.$("#firstRowMultiSelect");
			const secondRow = await browser.$("#secondRowMultiSelect");
			const thirdRow = await browser.$("#thirdRowMultiSelect");
			const forthRow = await browser.$("#forthRowMultiSelect");
			const table = await browser.$("#multi");
			const selectAllCheckBox = await table.shadow$("thead ui5-checkbox");

			// act
			await firstRow.setProperty("selected", true);
			await secondRow.setProperty("selected", true);
			await thirdRow.setProperty("selected", true);
			await forthRow.setProperty("selected", true);

			// assert
			assert.ok(await firstRow.getAttribute("selected"), "The first row is selected");
			assert.ok(await secondRow.getAttribute("selected"), "The second row is selected");
			assert.ok(await thirdRow.getAttribute("selected"), "The third row is selected");
			assert.ok(await forthRow.getAttribute("selected"), "The forth row is selected");
			assert.ok(await selectAllCheckBox.getProperty("checked"), "Select all checkbox is checked");

			// act
			await forthRow.setProperty("selected", false);

			// assert
			assert.notOk(await forthRow.getAttribute("selected"), "The forth row is not selected");
			assert.notOk(await selectAllCheckBox.getProperty("checked"), "Select all checkbox is not checked");
		});

		it("test mouse and keyboard interaction over Active/Inactive row in Default mode", async () => {
			const table = await browser.$("#default");
			const firstRow = await browser.$("#firstRowDefaultMode");
			const thirdRow = await browser.$("#thirdRowDefaultMode");
			const firstCellFirstRowLabel = await browser.$("#firstCellFirstRowDefaultLabel");
			const firstCellThirdRowLabel = await browser.$("#firstCellThirdRowDefaultLabel");
			const rowClickCount = await browser.$("#rowClickDefaultCountField");
			const selectionChangeCount = await browser.$("#selectionChangeDefaultCountField");

			// act
			await firstCellFirstRowLabel.click();

			// Check whether the table's and row's mode property is set correctly, as well as the row type property
			assert.strictEqual(await table.getProperty("mode"), "None", "The table's mode is None");
			assert.strictEqual(await firstRow.getProperty("mode"), "None", "The row's mode is None");
			assert.strictEqual(await firstRow.getProperty("type"), "Active", "The row's type is Active");
			assert.strictEqual(await thirdRow.getProperty("type"), "Inactive", "The row's type is Inactive")

			// test row-click and selection-change events on click over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an Active row should trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Click over a row in a default mode table should not trigger selection-change event");

			// act
			await firstRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Active row
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Enter key over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Enter key over an Active row should trigger row-click event");

			// act
			await firstRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Active row
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Space key over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Space key over an Active row should not trigger row-click event");

			// act
			await firstCellThirdRowLabel.click();

			// test row-click and selection-change events on click over an Inactive row
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Click over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Click over an Inactive row should trigger row-click event");

			// act
			await thirdRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Inactive row
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Enter key over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Enter key over an Inactive row should not trigger row-click event");

			// act
			await thirdRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Inactive row
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Space key over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Space key over an Inactive row should not trigger row-click event");
		});

		it ("tests adding spaces to input fields in a row", async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/Table.html`);

			const input = await browser.$("#myInput");
			const inner = await input.shadow$("input");

			await inner.click();
			await inner.keys("a");
			await inner.keys("Space");
			await inner.keys("b");

			assert.strictEqual(await inner.getValue(), "a b", "space should be visible");
		});
	});
});
