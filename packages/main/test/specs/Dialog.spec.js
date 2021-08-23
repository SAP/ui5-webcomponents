const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Dialog general interaction", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Dialog.html`);
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

		btnOpenDialog.click();
		select.click();

		const dialogZIndex = parseInt(browser.$("#dialog").getCSSProperty("z-index").value);
		const popoverZIndex = parseInt(browser.$(`.${select.getProperty("_id")}`).shadow$("ui5-responsive-popover").getCSSProperty("z-index").value);

		assert.ok(popoverZIndex > dialogZIndex, "Popover is above dialog.");
	});

	it("tests dialog lifecycle", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/DialogLifecycle.html`);

		assert.ok(!browser.$("ui5-static-area").length, "No static area.");

		const openDialogButton = browser.$("#openDialogButton");
		openDialogButton.click();

		assert.ok(browser.$("ui5-static-area>ui5-static-area-item"), "Static area item exists.");

		const closeDialogButton= browser.$("#closeDialogButton");
		closeDialogButton.click();

		assert.ok(!browser.$("ui5-static-area").length, "No static area.");
	});

	it("draggable - mouse support", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Dialog.html`);

		// Setup
		const openDraggableDialogButton = browser.$("#draggable-open");
		openDraggableDialogButton.click();

		// Assert
		const dialog = browser.$("#draggable-dialog");
		const topBeforeDragging = parseInt(dialog.getCSSProperty("top").value);
		const leftBeforeDragging = parseInt(dialog.getCSSProperty("left").value);

		const header = browser.$("#draggable-dialog").shadow$(".ui5-popup-header-root");

		// Act
		header.dragAndDrop({ x: -50, y: -50 });

		// Assert
		const topAfterDragging = parseInt(dialog.getCSSProperty("top").value);
		const leftAfterDragging = parseInt(dialog.getCSSProperty("left").value);
		assert.notStrictEqual(topBeforeDragging, topAfterDragging, "top position has changed");
		assert.notStrictEqual(leftBeforeDragging, leftAfterDragging, "left position has changed");

		const closeDraggableDialogButton = browser.$("#draggable-close");

		// Act
		closeDraggableDialogButton.click();
		openDraggableDialogButton.click();

		// Assert
		const topAfterReopening = parseInt(dialog.getCSSProperty("top").value);
		const leftAfterReopening = parseInt(dialog.getCSSProperty("left").value);
		assert.strictEqual(topBeforeDragging, topAfterReopening, "top position has been reset back to initial");
		assert.strictEqual(leftBeforeDragging, leftAfterReopening, "left position has been reset back to initial");

		// Clean-up
		closeDraggableDialogButton.click();
	});

	it("draggable - keyboard support", () => {
		// Setup
		const openDraggableDialogButton = browser.$("#draggable-open");
		openDraggableDialogButton.click();

		const dialog = browser.$("#draggable-dialog");
		const initialTop = parseInt(dialog.getCSSProperty("top").value);
		const initialLeft = parseInt(dialog.getCSSProperty("left").value);

		// Act
		browser.keys("ArrowUp");

		// Assert
		let topAfterDragging = parseInt(dialog.getCSSProperty("top").value);
		let leftAfterDragging = parseInt(dialog.getCSSProperty("left").value);
		assert.notStrictEqual(initialTop, topAfterDragging, "top position has changed after ArrowUp");
		assert.strictEqual(initialLeft, leftAfterDragging, "left position has not changed after ArrowUp");

		// Setup
		const topBeforeDraggingSecondTime = parseInt(dialog.getCSSProperty("top").value);
		const leftBeforeDraggingSecondTime = parseInt(dialog.getCSSProperty("left").value);

		// Act
		browser.keys("ArrowLeft");

		// Assert
		topAfterDragging = parseInt(dialog.getCSSProperty("top").value);
		leftAfterDragging = parseInt(dialog.getCSSProperty("left").value);
		assert.strictEqual(topBeforeDraggingSecondTime, topAfterDragging, "top position has not changed after ArrowLeft");
		assert.notStrictEqual(leftBeforeDraggingSecondTime, leftAfterDragging, "left position has changed after ArrowLeft");

		const closeDraggableDialogButton = browser.$("#draggable-close");

		// Act
		closeDraggableDialogButton.click();
		openDraggableDialogButton.click();

		// Assert
		const topAfterReopening = parseInt(dialog.getCSSProperty("top").value);
		const leftAfterReopening = parseInt(dialog.getCSSProperty("left").value);

		assert.strictEqual(initialTop, topAfterReopening, "top position has been reset back to initial");
		assert.strictEqual(initialLeft, leftAfterReopening, "left position has been reset back to initial");

		// Clean-up
		closeDraggableDialogButton.click();
	});

	it("resizable - mouse support", () => {
		// Setup
		const openResizableDialogButton = browser.$("#resizable-open");
		openResizableDialogButton.click();

		const dialog = browser.$("#resizable-dialog");
		const widthBeforeResizing = parseInt(dialog.getCSSProperty("width").value);
		const heightBeforeResizing = parseInt(dialog.getCSSProperty("height").value);
		const topBeforeResizing = parseInt(dialog.getCSSProperty("top").value);
		const leftBeforeResizing = parseInt(dialog.getCSSProperty("left").value);

		const handle = browser.$("#resizable-dialog").shadow$(".ui5-popup-resize-handle");

		// Act
		handle.dragAndDrop({ x: 50, y: 50});

		// Assert
		const widthAfterResizing = parseInt(dialog.getCSSProperty("width").value);
		const heightAfterResizing = parseInt(dialog.getCSSProperty("height").value);
		const topAfterResizing = parseInt(dialog.getCSSProperty("top").value);
		const leftAfterResizing = parseInt(dialog.getCSSProperty("left").value);

		assert.notStrictEqual(widthBeforeResizing, widthAfterResizing, "width has changed");
		assert.notStrictEqual(heightBeforeResizing, heightAfterResizing, "height has changed");
		assert.strictEqual(topBeforeResizing, topAfterResizing, "top position has not changed");
		assert.strictEqual(leftBeforeResizing, leftAfterResizing, "left position has not changed");

		const closeResizableDialogButton = browser.$("#resizable-close");

		// Act
		closeResizableDialogButton.click();
		openResizableDialogButton.click();

		// Assert
		const widthAfterReopening = parseInt(dialog.getCSSProperty("width").value);
		const heightAfterReopening = parseInt(dialog.getCSSProperty("height").value);
		const topAfterReopening = parseInt(dialog.getCSSProperty("top").value);
		const leftAfterReopening = parseInt(dialog.getCSSProperty("left").value);

		assert.strictEqual(widthBeforeResizing, widthAfterReopening, "width has been reset back to initial");
		assert.strictEqual(heightBeforeResizing, heightAfterReopening, "height has been reset back to initial");
		assert.strictEqual(topBeforeResizing, topAfterReopening, "top position has been reset back to initial");
		assert.strictEqual(leftBeforeResizing, leftAfterReopening, "left position has been reset back to initial");

		// Clean-up
		closeResizableDialogButton.click();
	});

	it("resizable - keyboard support", () => {
		// Setup
		const openResizableDialogButton = browser.$("#resizable-open");
		openResizableDialogButton.click();

		const dialog = browser.$("#resizable-dialog");
		const initialWidth = parseInt(dialog.getCSSProperty("width").value);
		const initialHeight = parseInt(dialog.getCSSProperty("height").value);
		const initialTop = parseInt(dialog.getCSSProperty("top").value);
		const initialLeft = parseInt(dialog.getCSSProperty("left").value);
	
		// Act
		browser.keys(["Shift", "ArrowDown"]);

		// Assert
		const widthAfterResizing = parseInt(dialog.getCSSProperty("width").value);
		const heightAfterResizing = parseInt(dialog.getCSSProperty("height").value);
		const topAfterResizing = parseInt(dialog.getCSSProperty("top").value);
		const leftAfterResizing = parseInt(dialog.getCSSProperty("left").value);

		assert.strictEqual(initialWidth, widthAfterResizing, "width has not changed after Shift+ArrowDown");
		assert.notStrictEqual(initialHeight, heightAfterResizing, "height has changed after Shift+ArrowDown");
		assert.strictEqual(initialTop, topAfterResizing, "top position has not changed after Shift+ArrowDown");
		assert.strictEqual(initialLeft, leftAfterResizing, "left position has not changed after Shift+ArrowDown");

		// Act
		browser.keys(["Shift", "ArrowRight"]);

		// Assert
		const widthAfterResizingSecondTime = parseInt(dialog.getCSSProperty("width").value);
		const heightAfterResizingSecondTime = parseInt(dialog.getCSSProperty("height").value);
		const topAfterResizingSecondTime = parseInt(dialog.getCSSProperty("top").value);
		const leftAfterResizingSecondTime = parseInt(dialog.getCSSProperty("left").value);
	
		assert.notStrictEqual(widthAfterResizing, widthAfterResizingSecondTime, "width has changed after Shift+ArrowRight");
		assert.strictEqual(heightAfterResizing, heightAfterResizingSecondTime, "height has not changed after Shift+ArrowRight")
		assert.strictEqual(topAfterResizing, topAfterResizingSecondTime, "top position has not changed after Shift+ArrowRight");
		assert.strictEqual(leftAfterResizing, leftAfterResizingSecondTime, "left position has not changed after Shift+ArrowRight");

		const closeResizableDialogButton = browser.$("#resizable-close");

		// Act
		closeResizableDialogButton.click();
		openResizableDialogButton.click();

		// Assert
		const widthAfterReopening = parseInt(dialog.getCSSProperty("width").value);
		const heightAfterReopening = parseInt(dialog.getCSSProperty("height").value);
		const topAfterReopening = parseInt(dialog.getCSSProperty("top").value);
		const leftAfterReopening = parseInt(dialog.getCSSProperty("left").value);

		assert.strictEqual(initialWidth, widthAfterReopening, "width has been reset back to initial");
		assert.strictEqual(initialHeight, heightAfterReopening, "height has been reset back to initial");
		assert.strictEqual(initialTop, topAfterReopening, "top position has been reset back to initial");
		assert.strictEqual(initialLeft, leftAfterReopening, "left position has been reset back to initial");

		// Clean-up
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
		browser.url(`http://localhost:${PORT}/test-resources/pages/Dialog.html`);
	});

	it("tests aria-labelledby and aria-label", () => {
		const dialog = browser.$("ui5-dialog");
		dialog.removeAttribute("accessible-name");
		assert.ok(dialog.shadow$(".ui5-popup-root").getAttribute("aria-labelledby").length, "dialog has aria-labelledby.");
		assert.ok(!dialog.shadow$(".ui5-popup-root").getAttribute("aria-label"), "dialog does not have aria-label.");

		dialog.setAttribute("accessible-name", "text");
		assert.ok(!dialog.shadow$(".ui5-popup-root").getAttribute("aria-labelledby"), "dialog does not have aria-labelledby.");
		assert.ok(dialog.shadow$(".ui5-popup-root").getAttribute("aria-label").length, "dialog has aria-label.");
	});

	it("tests aria-labelledby for slot header", () => {
		const openDraggableDialog = browser.$("#draggable-open");
		openDraggableDialog.click();

		const dialog = browser.$("#draggable-dialog");
		const accName = "Draggable" ;

		assert.strictEqual(dialog.getAttribute("accessible-name"), accName, "dialog has correct attribute set");
		assert.strictEqual(dialog.shadow$(".ui5-popup-root").getAttribute("aria-label"), accName, "dialog has aria-label.");
	});
});

describe("Multiple dialogs page scroll", () => {
		before(() => {
			browser.url(`http://localhost:${PORT}/test-resources/pages/Dialog.html`);
		});

		it("tests multiple dialogs page scrolling", () => {
			const preventButtonBefore = browser.$("#prevent");

			browser.setWindowSize(400, 400);
			preventButtonBefore.scrollIntoView();

			const offsetBefore = preventButtonBefore.getLocation('y');

			preventButtonBefore.click();

			browser.keys("Escape");
			const confirmButton = browser.$("#yes");
			confirmButton.click();

			browser.setTimeout({ script: 5000 });
    		const offsetAfter = preventButtonBefore.getLocation('y');

			assert.strictEqual(offsetBefore,  offsetAfter, "No vertical page scrolling when multiple dialogs are closed");
		});

});
