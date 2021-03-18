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
});
