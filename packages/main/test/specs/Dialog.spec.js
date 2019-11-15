const assert = require('assert');

const waitForAnimation = () => {
	browser.setTimeout({
		'pageLoad': 1000,
		'script': 600
	});

	// Execute code which takes a long time
	browser.executeAsync((done) => {
		setTimeout(done, 590);
	});
}

describe("Dialog general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Dialog.html");

	it("opens and closes a dialog", () => {
		const btnOpenDialog = $("#btnOpenDialog");
		const btnCloseDialog = $("#btnCloseDialog");
		const dialog = browser.$("#dialog");
		const dialogContent = dialog.shadow$(".ui5-popup-root");

		btnOpenDialog.click();

		assert.ok(dialogContent.isDisplayedInViewport(), "Dialog is opened.");
		assert.ok(dialog.getProperty("opened"), "Dialog is opened.");

		btnCloseDialog.click();

		waitForAnimation();

		assert.ok(!dialogContent.isDisplayedInViewport(), "Dialog is closed.");
		assert.ok(!dialog.getProperty("opened"), "Dialog is closed.");
	});

	it("checks focus trapping inside a dialog", () => {
		const btnOpenDialog = $("#btnOpenDialog");
		const btnCloseDialog = $("#btnCloseDialog");
		const headerButton = $("#header-button");
		const textArea = $("#area");

		btnOpenDialog.click();

		waitForAnimation();

		assert.ok(headerButton.isFocused(), "Header button is focused");

		browser.keys("Tab");
		assert.ok(textArea.isFocused(), "Header button is focused");

		browser.keys("Tab");
		assert.ok(btnCloseDialog.isFocused(), "Header button is focused");

		browser.keys("Tab");

		assert.ok(headerButton.isFocused(), "Header button is focused");

		browser.keys(["Shift", "Tab"]);

		assert.ok(btnCloseDialog.isFocused(), "Header button is focused");

		btnCloseDialog.click();
	});

	it("closes dialog with escape", () => {
		const messageBtn = $("#message");
		const messageDialog = $("#msg-dialog").shadow$(".ui5-popup-root")

		messageBtn.click();

		assert.ok(messageDialog.isDisplayedInViewport(), "Dialog is open")

		browser.keys(["Escape"]);

		waitForAnimation();

		assert.ok(!messageDialog.isDisplayedInViewport(), "Dialog is closed")

	});

	it("checks if close is prevented", () => {
		const preventBtn = $("#prevent");
		const preventDialog = $("#prevent-dialog");
		const closeDialogs = $("#yes");

		preventBtn.click();

		browser.keys(["Escape"]);

		waitForAnimation();

		assert.ok(preventDialog.isDisplayedInViewport(), "Dialog is still open");

		closeDialogs.click();

		waitForAnimation();

		assert.ok(!preventDialog.isDisplayedInViewport(), "Dialog is still open");
	});
});
