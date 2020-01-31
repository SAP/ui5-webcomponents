const assert = require("chai").assert;

describe("Table general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Table.html");

	it("tests if column disapears when min-width is reacted (650px)", () => {
		const btn = browser.$("#size-btn-650");
		const headerTableRow = browser.$("#tbl").shadow$("thead tr");

		btn.click();
		browser.pause(300);

		assert.strictEqual((headerTableRow.getHTML(false).split("</slot>").length - 1), 4, "Columns should be 4");
	});

	it("tests if column popins when min-width is reacted (500px)", () => {
		const btn = browser.$("#size-btn-500");
		const headerTableRow = browser.$("#tbl").shadow$("thead tr");
		const popinRows = browser.$("#roll-0").shadow$$(".ui5-table-popin-row");

		btn.click();
		browser.pause(300);
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
		browser.pause(300);

		assert.strictEqual(tableLabel.getHTML(false), "Number of poppedColumns: 2", "popinChange should be fired and columns should be 4");
	});
});
