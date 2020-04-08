const assert = require("chai").assert;

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

	it("tests popover in dialog", () => {
		const btnOpenDialog = $("#btnOpenDialog");
		const select = $("#mySelect");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mySelect");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		btnOpenDialog.click();
		select.click();

		const dialogZIndex = parseInt(browser.$("ui5-dialog").shadow$(".ui5-dialog-root-parent").getCSSProperty('z-index').value);
		const popoverZIndex = parseInt(popover.getCSSProperty('z-index').value);

		assert.ok(popoverZIndex > dialogZIndex, "Popover is above dialog.");
	});

});
