const assert = require("chai").assert;

describe("Table general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Table.html");
	});

	it("tests if column disapears when min-width is reacted (650px)", () => {
		const btn = browser.$("#size-btn-650");
		const headerTableRow = browser.$("#tbl").shadow$("thead tr");

		btn.click();

		assert.strictEqual((headerTableRow.getHTML(false).split("</slot>").length - 1), 4, "Columns should be 4");
	});

	it("tests if column popins when min-width is reacted (500px)", () => {
		const btn = browser.$("#size-btn-500");
		const headerTableRow = browser.$("#tbl").shadow$("thead tr");
		const popinRows = browser.$("#roll-0").shadow$$(".ui5-table-popin-row");

		btn.click();

		assert.strictEqual((headerTableRow.getHTML(false).split("</slot>").length - 1), 2, "Columns should be 4");
		assert.strictEqual($("#roll-0").shadow$$(".ui5-table-popin-row").length, 2, "popin rows should be 2");
	});

	it("tests if noData div is displayed for empty table", () => {
		const noDataRow = browser.$("#tableNoData").shadow$("div.ui5-table-no-data-row");

		assert.strictEqual(noDataRow.isExisting(), true, 'noData div is present');
	});

	it("tests if table with more columns than cells is rendered", () => {
		const tblLessCells = browser.$("#tblLessCells");
		assert.equal(tblLessCells.isExisting(), true, 'table with more columns is rendered without JS errors.');
	});

	it("tests if popinChange is fired when min-width is reacted (500px)", () => {
		let tableLabel = browser.$("#tableLabel");
		const btn = browser.$("#size-btn-500");

		btn.click();

		assert.strictEqual(tableLabel.getHTML(false), "Number of poppedColumns: 4", "popinChange should be fired and columns should be 4");
	});

	it("tests row-click is fired", () => {
		const lbl = browser.$("#testRowClickResult");
		const cellInRow1 = browser.$("#testRowClickCell1");
		const cellInRow2 = browser.$("#testRowClickCell2");
		const row1Data = "Dublin";
		const row2Data = "London";

		cellInRow1.click();
		assert.ok(lbl.getHTML().indexOf(row1Data), "Event row-click fired and intercepted.");

		cellInRow2.click();
		assert.ok(lbl.getHTML().indexOf(row2Data), "Event row-click fired and intercepted.");

		cellInRow1.keys("Space");
		assert.ok(lbl.getHTML().indexOf(row1Data), "Event row-click fired and intercepted.");

		cellInRow2.keys("Enter");
		assert.ok(lbl.getHTML().indexOf(row2Data), "Event row-click fired and intercepted.");
	});

	it("tests row aria-label value", () => {
		const row = browser.$("#roll-0").shadow$(".ui5-table-row-root");

		const EXPECTED_TEXT = "Product Notebook Basic 15HT-1000 Supplier Very Best Screens Dimensions 30 x 18 x 3 cm Weight 4.2 KG Price 956 EUR";

		assert.strictEqual(row.getAttribute("aria-label"), EXPECTED_TEXT,
			"The aria-label value is correct.");
	});

	describe("Growing Table on 'More' button press", () => {
		it("tests the 'load-more' event", () => {
			browser.url("http://localhost:8080/test-resources/pages/TableLoadMore.html");

			const inputResult = browser.$("#inputLoadMoreCounter");
			const loadMoreTrigger = browser.$("#tbl").shadow$("[load-more-inner]");

			// act
			loadMoreTrigger.click();
			// assert
			assert.strictEqual(inputResult.getProperty("value"), "1",
				"The load-more is fired.");

			// act
			loadMoreTrigger.keys("Space");
			// assert
			assert.strictEqual(inputResult.getProperty("value"), "2",
				"The load-more is fired 2nd time.");

			// act
			loadMoreTrigger.keys("Enter");
			// assert
			assert.strictEqual(inputResult.getProperty("value"), "3",
				"The load-more is fired 3rd time.");
		});
	});

	describe("Growing Table on Scroll", () => {
		it("tests the 'load-more' event", () => {
			browser.url("http://localhost:8080/test-resources/pages/TableGrowingWithScroll.html");

			const inputResult = browser.$("#inputLoadMoreCounter");
			const btnScroll = browser.$("#btnScroll");

			// act
			btnScroll.click();

			browser.pause(500);

			// assert
			assert.strictEqual(inputResult.getProperty("value"), "1",
				"The load-more is fired.");
		});
	});

	describe("Table selection modes", () => {
		it("test click over Active/Inactive row in SingleSelect mode", () => {
			browser.url("http://localhost:8080/test-resources/pages/TableSelection.html");
			const table = $("#single");
			const firstRow = $("#firstRowSingleSelect");
			const thirdRow = $("#thirdRowSingleSelect");
			const firstCellFirstRow = $("#firstCellFirstRowSS").shadow$("td");
			const firstCellThirdRow = $("#firstCellThirdRowSS").shadow$("td");
			const contentButton = $("#button1");
			const rowClickCount = $("#rowClickSSCountField");
			const selectionChangeCount = $("#selectionChangeSSCountField");
			const selectedRow = $("#selectionChangeSSSelectedValueField");
			const previouslySelectedRows = $("#selectionChangeSSPreviousRowField");

			// act
			firstCellFirstRow.click();

			// check whether the table's and row's mode property is set correctly, as well as the row type property
			assert.strictEqual(table.getAttribute("mode"), "SingleSelect", "The table's mode is SingleSelect");
			assert.strictEqual(firstRow.getAttribute("mode"), "SingleSelect", "The row's mode is SingleSelect");
			assert.strictEqual(firstRow.getAttribute("type"), "Active", "The row's type is Active");
			assert.strictEqual(thirdRow.getAttribute("type"), "Inactive", "The row's type is Inactive")

			// test row-click and selection-change events on click over an Active row
			assert.strictEqual(rowClickCount.getProperty("value"), "1", "Click over an Active row should trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "1", "Click over an Active row should trigger selection-change event");
			assert.strictEqual(selectedRow.getProperty("value"), "firstRowSingleSelect", "The first row is selected");

			// act
			firstCellThirdRow.click();

			// test row-click and selection-change events on click over an Inactive row
			assert.strictEqual(rowClickCount.getProperty("value"), "1", "Click over an Inctive row should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "2", "Click over an Inactive row should trigger selection-change event");
			assert.strictEqual(selectedRow.getProperty("value"), "thirdRowSingleSelect", "The second row is selected");
			assert.strictEqual(previouslySelectedRows.getProperty("value"), "firstRowSingleSelect", "Prevously the first row was selected");

			// act
			contentButton.click();

			// test row-click and selection-change on click over an active table cell content
			assert.strictEqual(rowClickCount.getProperty("value"), "1", "Click over an active element within a table cell should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "2", "Click over an active element within a table cell should not trigger selection-change event");
			assert.strictEqual(selectedRow.getProperty("value"), "thirdRowSingleSelect", "The selected row is not changed");
			assert.strictEqual(previouslySelectedRows.getProperty("value"), "firstRowSingleSelect", "The prevously  selected row is not changed");
		});

		it("test Space/Enter key interaction over Active/Inactive row in SingleSelect mode", () => {
			const firstRow = $("#firstRowSingleSelect");
			const secondRow = $("#secondRowSingleSelect");
			const thirdRow = $("#thirdRowSingleSelect");
			const forthRow = $("#forthRowSingleSelect");
			const contentButton = $("#button1");
			const rowClickCount = $("#rowClickSSCountField");
			const selectionChangeCount = $("#selectionChangeSSCountField");
			const selectedRow = $("#selectionChangeSSSelectedValueField");
			const previouslySelectedRows = $("#selectionChangeSSPreviousRowField");

			// act
			browser.keys(["Shift", "Tab"]);
			firstRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Active row
			assert.strictEqual(rowClickCount.getProperty("value"), "2", "Enter key over an Active row should trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "3", "Enter key over an Active row should trigger selection-change event");
			assert.strictEqual(selectedRow.getProperty("value"), "firstRowSingleSelect", "The first row is selected");

			// act
			firstRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an already selected row
			assert.strictEqual(rowClickCount.getProperty("value"), "3", "Enter key over an already selected row should trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "3", "Enter key over an already selected row should not trigger selection-change event");
			
			// act
			browser.keys("ArrowDown");
			browser.keys("ArrowDown");
			thirdRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Inactive row
			assert.strictEqual(rowClickCount.getProperty("value"), "3", "Enter key over an Inctive row should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "4", "Enter key over an Inactive row should trigger selection-change event");
			assert.strictEqual(selectedRow.getProperty("value"), "thirdRowSingleSelect", "The third row is selected");
			assert.strictEqual(previouslySelectedRows.getProperty("value"), "firstRowSingleSelect", "Prevously the first row was selected");

			// act
			thirdRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an already selected row
			assert.strictEqual(rowClickCount.getProperty("value"), "3", "Space key over an already selected row should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "4", "Space key over an already selected row should not trigger selection-change event");

			// act
			browser.keys("ArrowDown");
			forthRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Inactive row
			assert.strictEqual(rowClickCount.getProperty("value"), "3", "Space key over an Inctive row should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "5", "Space key over an Inctive row should trigger selection-change event");

			// act
			browser.keys("ArrowUp");
			browser.keys("ArrowUp");
			secondRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Active row
			assert.strictEqual(rowClickCount.getProperty("value"), "3", "Space key over an Active row should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "6", "Space key over an Active row should trigger selection-change event");
			assert.strictEqual(selectedRow.getProperty("value"), "secondRowSingleSelect", "The second row is selected");
			assert.strictEqual(previouslySelectedRows.getProperty("value"), "forthRowSingleSelect", "Prevously the forth row was selected");

			// act
			browser.keys(["Shift", "Tab"]);
			contentButton.keys("Space");

			// test row-click and selection-change on Space key over an active table cell content
			assert.strictEqual(rowClickCount.getProperty("value"), "3", "Space key over an active element within a table cell should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "6", "Space key over an active element within a table cell should not trigger selection-change event");
			assert.strictEqual(selectedRow.getProperty("value"), "secondRowSingleSelect", "The selected row is not changed");
		});

		it("test click over Active/Inactive row in MultiSelect mode", () => {
			const table = $("#multi");
			const firstRow = $("#firstRowMultiSelect");
			const thirdRow = $("#thirdRowMultiSelect");
			const firstCellFirstRow = $("#firstCellFirstRowMS").shadow$("td");
			const firstCellThirdRow = $("#firstCellThirdRowMS").shadow$("td");
			const checkBoxFirstCell = firstRow.shadow$(".ui5-multi-select-checkbox").shadow$(".ui5-checkbox-root");
			const contentButton = $("#button2");
			const rowClickCount = $("#rowClickMSCountField");
			const selectionChangeCount = $("#selectionChangeMSCountField");
			const selectedRow = $("#selectionChangeMSSelectedValueField");
			const previouslySelectedRows = $("#selectionChangeMSPreviousRowField");

			// act
			firstCellFirstRow.click();

			// check whether the table's and row's mode property is set correctly, as well as the row type property
			assert.strictEqual(table.getAttribute("mode"), "MultiSelect", "The table's mode is MultiSelect");
			assert.strictEqual(firstRow.getAttribute("mode"), "MultiSelect", "The row's mode is MultiSelect");
			assert.strictEqual(firstRow.getAttribute("type"), "Active", "The row's type is Active");
			assert.strictEqual(thirdRow.getAttribute("type"), "Inactive", "The row's type is Inactive")

			// test row-click and selection-change events over an Active row
			assert.strictEqual(rowClickCount.getProperty("value"), "1", "Click over an Active row should trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "", "Click over a row in a MultiSelect mode table should not trigger selection-change event");

			// act
			checkBoxFirstCell.click();

			// test click over the selection checkbox within each row in MultiSelect mode
			assert.strictEqual(rowClickCount.getProperty("value"), "1", "Click over the selection checkbox should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "1", "Click over the selection checkbox should trigger selection-change event");
			assert.strictEqual(selectedRow.getProperty("value"), "firstRowMultiSelect", "The first row is selected");
			assert.strictEqual(previouslySelectedRows.getProperty("value"), "", "There is no previously selected row");

			// act
			contentButton.click();

			// test row-click and selection-change on click over an active table cell content
			assert.strictEqual(rowClickCount.getProperty("value"), "1", "Click over an active element within a table cell should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "1", "Click over an active element within a table cell should not trigger selection-change event");
			assert.strictEqual(selectedRow.getProperty("value"), "firstRowMultiSelect", "The selected row is not changed");

			// act
			firstCellThirdRow.click();

			// test row-click and selection-change events over an Inactive row
			assert.strictEqual(rowClickCount.getProperty("value"), "1", "Click over an Inctive row should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "1", "Click over an Inctive row should not trigger selection-change event");
		});

		it("test Space/Enter key interaction over Active/Inactive row in MultiSelect mode", () => {
			const firstRow = $("#firstRowMultiSelect");
			const secondRow = $("#secondRowMultiSelect");
			const thirdRow = $("#thirdRowMultiSelect");
			const checkBoxFirstCell = secondRow.shadow$(".ui5-multi-select-checkbox").shadow$(".ui5-checkbox-root");
			const contentButton = $("#button2");
			const selectionChangeCount = $("#selectionChangeMSCountField");
			const rowClickCount = $("#rowClickMSCountField");
			const selectedRow = $("#selectionChangeMSSelectedValueField");
			const previouslySelectedRows = $("#selectionChangeMSPreviousRowField");

			// act
			browser.keys("ArrowUp");
			browser.keys("ArrowUp");
			firstRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Active row
			assert.strictEqual(rowClickCount.getProperty("value"), "2", "Enter key over an Active row should trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "1", "Enter key over an Active row should not trigger selection-change event");

			// act
			browser.keys("Tab");
			browser.keys("Tab");
			contentButton.keys("Enter");

			// test row-click and selection-change on Enter key over an active table cell content
			assert.strictEqual(rowClickCount.getProperty("value"), "2", "Enter key over an active element within a table cell should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "1", "Enter key over an active element within a table cell should not trigger selection-change event");

			// act
			browser.keys("Tab");
			checkBoxFirstCell.keys("Enter");

			// test Space over the selection checkbox within each row in MultiSelect mode
			assert.strictEqual(rowClickCount.getProperty("value"), "2", "Enter key over the selection checkbox should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "2", "Enter key over the selection checkbox should trigger selection-change event");
			assert.strictEqual(selectedRow.getProperty("value"), "secondRowMultiSelect", "The second row is currently selected");
			assert.strictEqual(previouslySelectedRows.getProperty("value"), "firstRowMultiSelect", "Prevously the first row was selected");

			// act
			checkBoxFirstCell.keys("Space");
			
			// test Space key over the selection checkbox of already selected row in MultiSelect mode
			assert.strictEqual(rowClickCount.getProperty("value"), "2", "Space key over the selection checkbox should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "3", "Space key over the selection checkbox of already selected row should trigger selection-change event");
			assert.strictEqual(selectedRow.getProperty("value"), "firstRowMultiSelect", "The second row is not selected");
			assert.strictEqual(previouslySelectedRows.getProperty("value"), "secondRowMultiSelect", "Prevously the second row was selected");

			// act
			browser.keys(["Shift", "Tab"]);
			secondRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Active row
			assert.strictEqual(rowClickCount.getProperty("value"), "2", "Space key over an Active row should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "4", "Space key over an Active row should trigger selection-change event");
			assert.strictEqual(selectedRow.getProperty("value"), "secondRowMultiSelect", "The second row is currently selected");
			assert.strictEqual(previouslySelectedRows.getProperty("value"), "firstRowMultiSelect", "The previously selected row is the first row");

			// act
			browser.keys("ArrowDown");
			thirdRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Inactive row
			assert.strictEqual(rowClickCount.getProperty("value"), "2", "Space key over an Inactive row should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "5", "Space key over an Inactive row should trigger selection-change event");
			assert.strictEqual(selectedRow.getProperty("value"), "thirdRowMultiSelect", "The third row is cuurently selected");
			assert.strictEqual(previouslySelectedRows.getProperty("value"), "secondRowMultiSelect", "The previously selected row is the second row");

			// act
			thirdRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an already selected row
			assert.strictEqual(rowClickCount.getProperty("value"), "2",  "Enter key over an already selected Inactive row should not trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "5",  "Enter key over an already selected row should trigger selection-change event");
		});

		it("test mouse and keyboard interaction over Active/Inactive row in Default mode", () => {
			const table = $("#default");
			const firstRow = $("#firstRowDefaultMode");
			const thirdRow = $("#thirdRowDefaultMode");
			const firstCellFirstRow = $("#firstCellFirstRowDefault").shadow$("td");
			const firstCellThirdRow = $("#firstCellThirdRowDefault").shadow$("td");
			const rowClickCount = $("#rowClickDefaultCountField");
			const selectionChangeCount = $("#selectionChangeDefaultCountField");

			// act
			firstCellFirstRow.click();

			// Check whether the table's and row's mode property is set correctly, as well as the row type property
			assert.strictEqual(table.getAttribute("mode"), "None", "The table's mode is None");
			assert.strictEqual(firstRow.getAttribute("mode"), "None", "The row's mode is None");
			assert.strictEqual(firstRow.getAttribute("type"), "Active", "The row's type is Active");
			assert.strictEqual(thirdRow.getAttribute("type"), "Inactive", "The row's type is Inactive")

			// test row-click and selection-change events on click over an Active row
			assert.strictEqual(rowClickCount.getProperty("value"), "1", "Click over an Active row should trigger row-click event");
			assert.strictEqual(selectionChangeCount.getProperty("value"), "", "Click over a row in a default mode table should not trigger selection-change event");

			// act
			firstRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Active row
			assert.strictEqual(selectionChangeCount.getProperty("value"), "", "Enter key over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(rowClickCount.getProperty("value"), "2", "Enter key over an Active row should trigger row-click event");

			// act
			firstRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Active row
			assert.strictEqual(selectionChangeCount.getProperty("value"), "", "Space key over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(rowClickCount.getProperty("value"), "2", "Space key over an Active row should not trigger row-click event");

			// act
			firstCellThirdRow.click();

			// test row-click and selection-change events on click over an Inactive row
			assert.strictEqual(selectionChangeCount.getProperty("value"), "", "Click over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(rowClickCount.getProperty("value"), "2", "Click over an Inactive row should trigger row-click event");

			// act
			thirdRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Inactive row
			assert.strictEqual(selectionChangeCount.getProperty("value"), "", "Enter key over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(rowClickCount.getProperty("value"), "2", "Enter key over an Inctive row should not trigger row-click event");

			// act
			thirdRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Inactive row
			assert.strictEqual(selectionChangeCount.getProperty("value"), "", "Space key over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(rowClickCount.getProperty("value"), "2", "Space key over an Inctive row should not trigger row-click event");
		});
	});
});
