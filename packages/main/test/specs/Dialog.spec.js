const assert = require("chai").assert;

describe("Dialog general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Dialog.html");

	it("tests dialog toggling", () => {
		const btnOpenDialog = $("#btnOpenDialog");
		const btnCloseDialog= $("#btnCloseDialog");

		btnOpenDialog.click();

		const dialog = browser.$("#dialog");

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

		const dialogZIndex = parseInt(browser.$("#dialog").getCSSProperty('z-index').value);
		const popoverZIndex = parseInt(browser.$(`.${select.getProperty("_id")}`).shadow$("ui5-responsive-popover").getCSSProperty('z-index').value);

		assert.ok(popoverZIndex > dialogZIndex, "Popover is above dialog.");
	});
});


describe("Acc", () => {
	browser.url("http://localhost:8080/test-resources/pages/Dialog.html");

	it("tests aria-labelledby and aria-label", () => {
		const dialog = browser.$("ui5-dialog");
		dialog.removeAttribute("aria-label");
		assert.ok(dialog.shadow$(".ui5-popup-root").getAttribute("aria-labelledby").length, "dialog has aria-labelledby.");
		assert.ok(!dialog.shadow$(".ui5-popup-root").getAttribute("aria-label"), "dialog does not have aria-label.");

		dialog.setAttribute("aria-label", "text");
		assert.ok(!dialog.shadow$(".ui5-popup-root").getAttribute("aria-labelledby"), "dialog does not have aria-labelledby.");
		assert.ok(dialog.shadow$(".ui5-popup-root").getAttribute("aria-label").length, "dialog has aria-label.");
	});
});
