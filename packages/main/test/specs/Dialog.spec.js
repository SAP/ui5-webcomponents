const assert = require("chai").assert;

describe("Dialog general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Dialog.html");
	});

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

		const dialogZIndex = parseInt(browser.$("#dialog").getCSSProperty("z-index").value);
		const popoverZIndex = parseInt(browser.$(`.${select.getProperty("_id")}`).shadow$("ui5-responsive-popover").getCSSProperty("z-index").value);

		assert.ok(popoverZIndex > dialogZIndex, "Popover is above dialog.");
	});

	it("tests dialog lifecycle", () => {
		browser.url("http://localhost:8080/test-resources/pages/DialogLifecycle.html");

		assert.ok(!browser.$("ui5-static-area").length, "No static area.");

		const openDialogButton = browser.$("#openDialogButton");
		openDialogButton.click();

		assert.ok(browser.$("ui5-static-area>ui5-static-area-item"), "Static area item exists.");

		const closeDialogButton= browser.$("#closeDialogButton");
		closeDialogButton.click();

		assert.ok(!browser.$("ui5-static-area").length, "No static area.");
	});

	it("draggable", () => {
		browser.url("http://localhost:8080/test-resources/pages/Dialog.html");

		const openDraggableDialogButton = browser.$("#draggable-open");
		openDraggableDialogButton.click();

		const dialog = browser.$("#draggable-dialog");
		const topBeforeDragging = parseInt(dialog.getCSSProperty("top").value);
		const leftBeforeDragging = parseInt(dialog.getCSSProperty("left").value);

		const header = browser.$("#draggable-dialog").shadow$(".ui5-popup-header-root");

		header.dragAndDrop({ x: -200, y: -200 });

		const topAfterDragging = parseInt(dialog.getCSSProperty("top").value);
		const leftAfterDragging = parseInt(dialog.getCSSProperty("left").value);

		assert.notStrictEqual(topBeforeDragging, topAfterDragging, "top position has changed");
		assert.notStrictEqual(leftBeforeDragging, leftAfterDragging, "left position has changed");

		const closeDraggableDialogButton = browser.$("#draggable-close");
		closeDraggableDialogButton.click();

		openDraggableDialogButton.click();

		const topAfterReopening = parseInt(dialog.getCSSProperty("top").value);
		const leftAfterReopening = parseInt(dialog.getCSSProperty("left").value);

		assert.strictEqual(topBeforeDragging, topAfterReopening, "top position has been reset back to initial");
		assert.strictEqual(leftBeforeDragging, leftAfterReopening, "left position has been reset back to initial");

		closeDraggableDialogButton.click();
	});

	it("resizable", () => {
		const openResizableDialogButton = browser.$("#resizable-open");
		openResizableDialogButton.click();

		const dialog = browser.$("#resizable-dialog");
		const widthBeforeResizing = parseInt(dialog.getCSSProperty("width").value);
		const heightBeforeResizing = parseInt(dialog.getCSSProperty("height").value);

		const handle = browser.$("#resizable-dialog").shadow$(".ui5-popup-resize-handle");

		handle.dragAndDrop({ x: 200, y: 200});

		const widthAfterResizing = parseInt(dialog.getCSSProperty("width").value);
		const heightAfterResizing = parseInt(dialog.getCSSProperty("height").value);

		assert.notStrictEqual(widthBeforeResizing, widthAfterResizing, "width has changed");
		assert.notStrictEqual(heightBeforeResizing, heightAfterResizing, "height has changed");

		const closeResizableDialogButton = browser.$("#resizable-close");
		closeResizableDialogButton.click();

		openResizableDialogButton.click();

		const widthAfterReopening = parseInt(dialog.getCSSProperty("width").value);
		const heightAfterReopening = parseInt(dialog.getCSSProperty("height").value);

		assert.strictEqual(widthBeforeResizing, widthAfterReopening, "width has been reset back to initial");
		assert.strictEqual(heightBeforeResizing, heightAfterReopening, "height has been reset back to initial");

		closeResizableDialogButton.click();
	});

	it("initial focus after dynamic dialog creation", () => {
		const openDynamicDialog = browser.$("#dynamic-open");
		openDynamicDialog.click();

		const closeButton = browser.$("#dynamic-dialog-close-button");

		browser.pause(500);

		const activeElement = $(browser.getActiveElement());
		assert.strictEqual(activeElement.getProperty("id"), closeButton.getProperty("id"), "the active element is the close button");

		closeButton.click();
	});

	it("test dialog overlay when dialog isn't open", () => {
		const isBlockLayerHidden = browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialog");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.ok(isBlockLayerHidden, "the block layer is hidden");
	});
});


describe("Acc", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Dialog.html");
	});

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
