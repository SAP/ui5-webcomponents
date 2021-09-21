const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Dialog general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Dialog.html`);
	});

	it("tests dialog toggling", async () => {
		const btnOpenDialog = await browser.$("#btnOpenDialog");
		const btnCloseDialog= await browser.$("#btnCloseDialog");

		await btnOpenDialog.click();

		const dialog = await browser.$("#dialog");

		assert.ok(await dialog.isDisplayedInViewport(), "Dialog is opened.");

		await btnCloseDialog.click();
		assert.notOk(await dialog.isDisplayedInViewport(), "Dialog is closed.");
	});

	it("tests popover in dialog", async () => {
		const btnOpenDialog = await browser.$("#btnOpenDialog");
		const select = await browser.$("#mySelect");

		await btnOpenDialog.click();
		await select.click();

		const dialogZIndex = parseInt((await browser.$("#dialog").getCSSProperty("z-index")).value);
		const popoverZIndex = parseInt((await browser.$(`.${await select.getProperty("_id")}`).shadow$("ui5-responsive-popover").getCSSProperty("z-index")).value);

		assert.ok(popoverZIndex > dialogZIndex, "Popover is above dialog.");
	});

	it("tests dialog lifecycle", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DialogLifecycle.html`);

		let staticAreaItem = await browser.$("ui5-static-area>ui5-static-area-item");
		assert.notOk(await staticAreaItem.isExisting(), "No static area item.");

		const openDialogButton = await browser.$("#openDialogButton");
		await openDialogButton.click();

		staticAreaItem = await browser.$("ui5-static-area>ui5-static-area-item");
		assert.ok(await staticAreaItem.isExisting(), "Static area item exists.");

		const closeDialogButton = await browser.$("#closeDialogButton");
		await closeDialogButton.click();

		/* To be returned when renderFinished correctly awaits for disconnectedCallback to be fired and processed
		staticAreaItem = await browser.$("ui5-static-area>ui5-static-area-item");
		assert.notOk(await staticAreaItem.isExisting(), "No static area item.");
		 */
	});

	it("draggable - mouse support", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Dialog.html`);

		// Setup
		const openDraggableDialogButton = await browser.$("#draggable-open");
		await openDraggableDialogButton.click();

		// Assert
		const dialog = await browser.$("#draggable-dialog");
		const topBeforeDragging = parseInt((await dialog.getCSSProperty("top")).value);
		const leftBeforeDragging = parseInt((await dialog.getCSSProperty("left")).value);

		const header = await browser.$("#draggable-dialog").shadow$(".ui5-popup-header-root");

		// Act
		await header.dragAndDrop({ x: -50, y: -50 });

		// Assert
		const topAfterDragging = parseInt((await dialog.getCSSProperty("top")).value);
		const leftAfterDragging = parseInt((await dialog.getCSSProperty("left")).value);
		assert.notStrictEqual(topBeforeDragging, topAfterDragging, "top position has changed");
		assert.notStrictEqual(leftBeforeDragging, leftAfterDragging, "left position has changed");

		const closeDraggableDialogButton = await browser.$("#draggable-close");

		// Act
		await closeDraggableDialogButton.click();
		await openDraggableDialogButton.click();

		// Assert
		const topAfterReopening = parseInt((await dialog.getCSSProperty("top")).value);
		const leftAfterReopening = parseInt((await dialog.getCSSProperty("left")).value);
		assert.strictEqual(topBeforeDragging, topAfterReopening, "top position has been reset back to initial");
		assert.strictEqual(leftBeforeDragging, leftAfterReopening, "left position has been reset back to initial");

		// Clean-up
		await closeDraggableDialogButton.click();
	});

	it("draggable - keyboard support", async () => {
		// Setup
		const openDraggableDialogButton = await browser.$("#draggable-open");
		await openDraggableDialogButton.click();

		const dialog = await browser.$("#draggable-dialog");
		const initialTop = parseInt((await dialog.getCSSProperty("top")).value);
		const initialLeft = parseInt((await dialog.getCSSProperty("left")).value);

		// Act
		await browser.keys("ArrowUp");

		// Assert
		let topAfterDragging = parseInt((await dialog.getCSSProperty("top")).value);
		let leftAfterDragging = parseInt((await dialog.getCSSProperty("left")).value);
		assert.notStrictEqual(initialTop, topAfterDragging, "top position has changed after ArrowUp");
		assert.strictEqual(initialLeft, leftAfterDragging, "left position has not changed after ArrowUp");

		// Setup
		const topBeforeDraggingSecondTime = parseInt((await dialog.getCSSProperty("top")).value);
		const leftBeforeDraggingSecondTime = parseInt((await dialog.getCSSProperty("left")).value);

		// Act
		await browser.keys("ArrowLeft");

		// Assert
		topAfterDragging = parseInt((await dialog.getCSSProperty("top")).value);
		leftAfterDragging = parseInt((await dialog.getCSSProperty("left")).value);
		assert.strictEqual(topBeforeDraggingSecondTime, topAfterDragging, "top position has not changed after ArrowLeft");
		assert.notStrictEqual(leftBeforeDraggingSecondTime, leftAfterDragging, "left position has changed after ArrowLeft");

		const closeDraggableDialogButton = await browser.$("#draggable-close");

		// Act
		await closeDraggableDialogButton.click();
		await openDraggableDialogButton.click();

		// Assert
		const topAfterReopening = parseInt((await dialog.getCSSProperty("top")).value);
		const leftAfterReopening = parseInt((await dialog.getCSSProperty("left")).value);

		assert.strictEqual(initialTop, topAfterReopening, "top position has been reset back to initial");
		assert.strictEqual(initialLeft, leftAfterReopening, "left position has been reset back to initial");

		// Clean-up
		await closeDraggableDialogButton.click();
	});

	it("resizable - mouse support", async () => {
		// Setup
		const openResizableDialogButton = await browser.$("#resizable-open");
		await openResizableDialogButton.click();

		const dialog = await browser.$("#resizable-dialog");
		const widthBeforeResizing = parseInt((await dialog.getCSSProperty("width")).value);
		const heightBeforeResizing = parseInt((await dialog.getCSSProperty("height")).value);
		const topBeforeResizing = parseInt((await dialog.getCSSProperty("top")).value);
		const leftBeforeResizing = parseInt((await dialog.getCSSProperty("left")).value);

		const handle = await browser.$("#resizable-dialog").shadow$(".ui5-popup-resize-handle");

		// Act
		await handle.dragAndDrop({ x: 50, y: 50});

		// Assert
		const widthAfterResizing = parseInt((await dialog.getCSSProperty("width")).value);
		const heightAfterResizing = parseInt((await dialog.getCSSProperty("height")).value);
		const topAfterResizing = parseInt((await dialog.getCSSProperty("top")).value);
		const leftAfterResizing = parseInt((await dialog.getCSSProperty("left")).value);

		assert.notStrictEqual(widthBeforeResizing, widthAfterResizing, "width has changed");
		assert.notStrictEqual(heightBeforeResizing, heightAfterResizing, "height has changed");
		assert.strictEqual(topBeforeResizing, topAfterResizing, "top position has not changed");
		assert.strictEqual(leftBeforeResizing, leftAfterResizing, "left position has not changed");

		const closeResizableDialogButton = await browser.$("#resizable-close");

		// Act
		await closeResizableDialogButton.click();
		await openResizableDialogButton.click();

		// Assert
		const widthAfterReopening = parseInt((await dialog.getCSSProperty("width")).value);
		const heightAfterReopening = parseInt((await dialog.getCSSProperty("height")).value);
		const topAfterReopening = parseInt((await dialog.getCSSProperty("top")).value);
		const leftAfterReopening = parseInt((await dialog.getCSSProperty("left")).value);

		assert.strictEqual(widthBeforeResizing, widthAfterReopening, "width has been reset back to initial");
		assert.strictEqual(heightBeforeResizing, heightAfterReopening, "height has been reset back to initial");
		assert.strictEqual(topBeforeResizing, topAfterReopening, "top position has been reset back to initial");
		assert.strictEqual(leftBeforeResizing, leftAfterReopening, "left position has been reset back to initial");

		// Clean-up
		await closeResizableDialogButton.click();
	});

	it("resizable - keyboard support", async () => {
		// Setup
		const openResizableDialogButton = await browser.$("#resizable-open");
		await openResizableDialogButton.click();

		const dialog = await browser.$("#resizable-dialog");
		const initialWidth = parseInt((await dialog.getCSSProperty("width")).value);
		const initialHeight = parseInt((await dialog.getCSSProperty("height")).value);
		const initialTop = parseInt((await dialog.getCSSProperty("top")).value);
		const initialLeft = parseInt((await dialog.getCSSProperty("left")).value);

		// Act
		await browser.keys(["Shift", "ArrowDown"]);

		// Assert
		const widthAfterResizing = parseInt((await dialog.getCSSProperty("width")).value);
		const heightAfterResizing = parseInt((await dialog.getCSSProperty("height")).value);
		const topAfterResizing = parseInt((await dialog.getCSSProperty("top")).value);
		const leftAfterResizing = parseInt((await dialog.getCSSProperty("left")).value);

		assert.strictEqual(initialWidth, widthAfterResizing, "width has not changed after Shift+ArrowDown");
		assert.notStrictEqual(initialHeight, heightAfterResizing, "height has changed after Shift+ArrowDown");
		assert.strictEqual(initialTop, topAfterResizing, "top position has not changed after Shift+ArrowDown");
		assert.strictEqual(initialLeft, leftAfterResizing, "left position has not changed after Shift+ArrowDown");

		// Act
		await browser.keys(["Shift", "ArrowRight"]);

		// Assert
		const widthAfterResizingSecondTime = parseInt((await dialog.getCSSProperty("width")).value);
		const heightAfterResizingSecondTime = parseInt((await dialog.getCSSProperty("height")).value);
		const topAfterResizingSecondTime = parseInt((await dialog.getCSSProperty("top")).value);
		const leftAfterResizingSecondTime = parseInt((await dialog.getCSSProperty("left")).value);

		assert.notStrictEqual(widthAfterResizing, widthAfterResizingSecondTime, "width has changed after Shift+ArrowRight");
		assert.strictEqual(heightAfterResizing, heightAfterResizingSecondTime, "height has not changed after Shift+ArrowRight")
		assert.strictEqual(topAfterResizing, topAfterResizingSecondTime, "top position has not changed after Shift+ArrowRight");
		assert.strictEqual(leftAfterResizing, leftAfterResizingSecondTime, "left position has not changed after Shift+ArrowRight");

		const closeResizableDialogButton = await browser.$("#resizable-close");

		// Act
		await closeResizableDialogButton.click();
		await openResizableDialogButton.click();

		// Assert
		const widthAfterReopening = parseInt((await dialog.getCSSProperty("width")).value);
		const heightAfterReopening = parseInt((await dialog.getCSSProperty("height")).value);
		const topAfterReopening = parseInt((await dialog.getCSSProperty("top")).value);
		const leftAfterReopening = parseInt((await dialog.getCSSProperty("left")).value);

		assert.strictEqual(initialWidth, widthAfterReopening, "width has been reset back to initial");
		assert.strictEqual(initialHeight, heightAfterReopening, "height has been reset back to initial");
		assert.strictEqual(initialTop, topAfterReopening, "top position has been reset back to initial");
		assert.strictEqual(initialLeft, leftAfterReopening, "left position has been reset back to initial");

		// Clean-up
		await closeResizableDialogButton.click();
	});

	it("initial focus after dynamic dialog creation", async () => {
		const openDynamicDialog = await browser.$("#dynamic-open");
		await openDynamicDialog.click();

		const closeButton = await browser.$("#dynamic-dialog-close-button");

		await browser.pause(500);

		const activeElement = await browser.$(await browser.getActiveElement());
		assert.strictEqual(await activeElement.getProperty("id"), await closeButton.getProperty("id"), "the active element is the close button");

		await closeButton.click();
	});

	it("test dialog overlay when dialog isn't open", async () => {
		const isBlockLayerHidden = await browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialog");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.ok(isBlockLayerHidden, "the block layer is hidden");
	});
});


describe("Acc", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Dialog.html`);
	});

	it("tests aria-labelledby and aria-label", async () => {
		const dialog = await browser.$("ui5-dialog");
		await dialog.removeAttribute("accessible-name");
		assert.ok(await dialog.shadow$(".ui5-popup-root").getAttribute("aria-labelledby"), "dialog has aria-labelledby.");
		assert.notOk(await dialog.shadow$(".ui5-popup-root").getAttribute("aria-label"), "dialog does not have aria-label.");

		await dialog.setAttribute("accessible-name", "text");
		assert.notOk(await dialog.shadow$(".ui5-popup-root").getAttribute("aria-labelledby"), "dialog does not have aria-labelledby.");
		assert.ok(await dialog.shadow$(".ui5-popup-root").getAttribute("aria-label"), "dialog has aria-label.");
	});

	it("tests aria-labelledby for slot header", async () => {
		const openDraggableDialog = await browser.$("#draggable-open");
		await openDraggableDialog.click();

		const dialog = await browser.$("#draggable-dialog");
		const accName = "Draggable" ;

		assert.strictEqual(await dialog.getAttribute("accessible-name"), accName, "dialog has correct attribute set");
		assert.strictEqual(await dialog.shadow$(".ui5-popup-root").getAttribute("aria-label"), accName, "dialog has aria-label.");
	});
});

describe("Page scrolling", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Dialog.html`);
	});

	it("tests that page scrolling is blocked and restored", async () => {
		await browser.$("#cbScrollable").click();
		const offsetHeightBefore = await browser.$("body").getProperty("offsetHeight");

		await browser.$("#btnOpenDialog").click();

		assert.isBelow(await browser.$("body").getProperty("offsetHeight"), offsetHeightBefore, "Body scrolling is blocked");

		await browser.$("#btnCloseDialog").click();

		assert.strictEqual(await browser.$("body").getProperty("offsetHeight"), offsetHeightBefore, "Body scrolling is restored");
		await browser.$("#cbScrollable").click();
	});

	it("test page scrolling is restored after close with ESC", async () => {
		await browser.$("#cbScrollable").click();
		const offsetHeightBefore = await browser.$("body").getProperty("offsetHeight");

		await browser.$("#btnOpenDialog").click();
		await browser.keys("Escape");
		assert.strictEqual(await browser.$("body").getProperty("offsetHeight"), offsetHeightBefore, "Body scrolling is restored");

		await browser.$("#cbScrollable").click();
	});

	it("tests multiple dialogs page scrolling", async () => {
		const preventButtonBefore = await browser.$("#prevent");

		await browser.setWindowSize(400, 400);
		await preventButtonBefore.scrollIntoView();

		const offsetBefore = await preventButtonBefore.getLocation('y');

		await preventButtonBefore.click();

		await browser.keys("Escape");
		const confirmButton = await browser.$("#yes");
		await confirmButton.click();

		await browser.setTimeout({ script: 5000 });
		const offsetAfter = await preventButtonBefore.getLocation('y');

		assert.strictEqual(offsetBefore,  offsetAfter, "No vertical page scrolling when multiple dialogs are closed");
	});
});
