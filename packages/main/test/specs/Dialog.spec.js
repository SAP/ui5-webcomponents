const assert = require('assert');

describe("Dialog general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Dialog.html");

	it("tests dialog toggling", () => {
		const btnOpenDialog = $("#btnOpenDialog");
		const btnCloseDialog= $("#btnCloseDialog");

		btnOpenDialog.click();

		const dialog = browser.findElementDeep("ui5-dialog >>> .ui5-dialog-wrapper");
		assert.ok(dialog.isDisplayedInViewport(), "Dialog is opened.");

		btnCloseDialog.click();
		assert.ok(!dialog.isDisplayedInViewport(), "Dialog is closed.");
	});
});