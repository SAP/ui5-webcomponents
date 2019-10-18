const assert = require('assert');

describe("Dialog general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Dialog.html");

	it("tests dialog toggling", () => {
		const btnOpenDialog = $("#btnOpenDialog");
		const btnCloseDialog= $("#btnCloseDialog");

		btnOpenDialog.click();

		const dialog = browser.$("ui5-dialog").shadow$(".ui5-dialog-root");
		assert.ok(dialog.isDisplayedInViewport(), "Dialog is opened.");

		btnCloseDialog.click();
		assert.ok(!dialog.isDisplayedInViewport(), "Dialog is closed.");
	});
});
