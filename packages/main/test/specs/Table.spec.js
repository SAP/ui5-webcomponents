const assert = require("assert");

describe("Table general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Table.html");

	it("tests width propagation to from column to cell", () => {
		const tableColumn = browser.findElementDeep("#column-1");
		const tableFirstColumnCellWrapper = browser.findElementDeep("#roll-0 >>> div div.sapMWCTableRowCellContainer");

		assert.equal(tableColumn.getProperty("width"), `${tableFirstColumnCellWrapper.getSize().width}px`, "Width of the cell should be equal to width of the corresponding column");
	});

	it("tests if column disapears when min-width is reacted (650px)", () => {
		const btn = browser.findElementDeep("#size-btn-650");
		const tableFirstColumnCellWrapper = browser.findElementDeep("#roll-0 >>> div");

		btn.click();

		const rowHTML = tableFirstColumnCellWrapper.getHTML(false);

		assert.strictEqual((rowHTML.split("sapMWCTableRowCellContainer").length - 1), 4, "Columns should be 4");
	});

	it("tests if column popins when min-width is reacted (500px)", () => {
		const btn = browser.findElementDeep("#size-btn-500");
		const tableFirstColumnCellWrapper = browser.findElementDeep("#roll-0 >>> div");

		btn.click();

		const rowHTML = tableFirstColumnCellWrapper.getHTML(false);

		assert.strictEqual((rowHTML.split("sapMWCTableRowCellContainer").length - 1), 2, "columns should be 2");
		assert.strictEqual((rowHTML.split("sapWCTablePopinRow").length - 1), 2, "popin rows should be 2");
	});

	it("tests no data is present", () => {
		const inputLiveChangeResult = browser.findElementDeep("#noData >>> span");

		assert.strictEqual(inputLiveChangeResult.getProperty("value"), "No Data", "Table show have No Data");
	});
});