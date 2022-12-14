const assert = require("chai").assert;

describe("Dialog general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Dialog.html`);
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

	it("tests dialog toggling with 'open' attribute", async () => {
		const btnOpenDialog = await browser.$("#btnOpenDialogWithAttr");
		const btnCloseDialog= await browser.$("#btnCloseWithAttr");

		await btnOpenDialog.click();

		const dialog = await browser.$("#dlgAttr");

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
		await browser.url(`test/pages/DialogLifecycle.html`);

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

	it("dialog repositions after screen resize", async () => {
		await browser.url(`test/pages/Dialog.html`);

		// Setup
		const openDialogButton = await browser.$("#btnOpenDialogWithAttr");
		await openDialogButton.click();

		const dialog = await browser.$("#dlgAttr");
		const topBeforeScreenResize = parseInt((await dialog.getCSSProperty("top")).value);
		const leftBeforeScreenResize = parseInt((await dialog.getCSSProperty("left")).value);

		const {
			height: oldScreenHeight,
			width: oldScreenWidth
		} = await browser.getWindowSize();

		// Act
		await browser.setWindowSize(2000, 2000);

		// Assert
		const topAfterScreenResize = parseInt((await dialog.getCSSProperty("top")).value);
		const leftAfterScreenResize = parseInt((await dialog.getCSSProperty("left")).value);

		assert.notStrictEqual(topBeforeScreenResize, topAfterScreenResize, "dialog's top has changed after screen resize")
		assert.notStrictEqual(leftBeforeScreenResize, leftAfterScreenResize, "dialog's left has changed after screen resize")

		// Clean-up
		await browser.keys("Escape");
		await browser.setWindowSize(oldScreenWidth, oldScreenHeight);
	});

	it("draggable - mouse support", async () => {

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

		await browser.waitUntil(async () => {
			const activeElement = await browser.$(await browser.getActiveElement());
			return await activeElement.getProperty("id") === await closeButton.getProperty("id");
		}, {
			timeout: 500,
			timeoutMsg: "the active element must be the close button"
		});

		await closeButton.click();
	});

	it("tests that ENTER on list item that opens Dialog doesn't trigger click event inside the focused element of the Dialog", async () => {
		const dialog = await browser.$("#listContainerDialogId");
		const listContainerItem = await browser.$("#listContainerItemId");
		await listContainerItem.scrollIntoView();
		await listContainerItem.click();

		assert.ok(await dialog.isDisplayedInViewport(), "Dialog remains open");

		await browser.keys("Escape");
		assert.notOk(await dialog.isDisplayedInViewport(), "Dialog is closed");


		await browser.keys("ArrowDown");
		await browser.keys("Enter");

		assert.ok(await dialog.isDisplayedInViewport(), "Dialog remains open");

		await browser.keys("Escape");
		assert.notOk(await dialog.isDisplayedInViewport(), "Dialog is closed");
	});
});


describe("Acc", () => {
	before(async () => {
		await browser.url(`test/pages/Dialog.html`);
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

	it("tests accessible-name-ref", async () => {
		const dialog = await browser.$("#dialog-acc-name-ref");
		const expectedText = await browser.$("#label-acc-name-ref").getText();

		assert.strictEqual(await dialog.shadow$(".ui5-popup-root").getAttribute("aria-label"), expectedText, "aria-label should be the text of the label.");
	});
});

// describe("Page scrolling", () => {
// 	before(async () => {
// 		await browser.url(`test/pages/Dialog.html`);
// 	});
//
// 	it("tests that page scrolling is blocked and restored", async () => {
// 		await browser.$("#btnOpenDialog").click();
// 		let pageOverflow = await browser.execute("return window.getComputedStyle(document.documentElement).overflow;");
//
// 		assert.strictEqual(pageOverflow, "hidden", "Page scrolling is blocked");
//
// 		await browser.$("#btnCloseDialog").click();
// 		pageOverflow = await browser.execute("return window.getComputedStyle(document.documentElement).overflow;");
//
// 		assert.strictEqual(pageOverflow, "visible", "Page scrolling is restored");
// 	});
//
// 	it("tests that page scrolling position is preserved", async () => {
// 		// scroll position might change slightly when the scrollbars hide and then appear again
// 		const SCROLLBAR_DELTA = 20;
// 		await browser.$("#cbScrollable").click();
// 		const scrolledButton = await $("#scrolledBtn");
// 		await scrolledButton.scrollIntoView();
// 		const scrollLeftBefore = await browser.$("html").getProperty("scrollLeft");
// 		const scrollTopBefore = await browser.$("html").getProperty("scrollTop");
// 		await scrolledButton.click();
//
// 		assert.strictEqual(await browser.$("html").getProperty("scrollLeft"), scrollLeftBefore, "Horizontal page scroll position is preserved");
// 		assert.approximately(await browser.$("html").getProperty("scrollTop"), scrollTopBefore, SCROLLBAR_DELTA, "Vertical page scroll position is preserved");
//
// 		await browser.keys("Escape");
//
// 		assert.strictEqual(await browser.$("html").getProperty("scrollLeft"), scrollLeftBefore, "Horizontal page scroll position is preserved");
// 		assert.approximately(await browser.$("html").getProperty("scrollTop"), scrollTopBefore, SCROLLBAR_DELTA, "Vertical page scroll position is preserved");
//
// 		await browser.$("#cbScrollable").click();
// 	});
//
// 	it("tests that page scrolling is blocked and restored after multiple show() of same dialog", async () => {
// 		await browser.$("#multiple-show").click();
// 		let pageOverflow = await browser.execute("return window.getComputedStyle(document.documentElement).overflow;");
//
// 		assert.strictEqual(pageOverflow, "hidden", "Page scrolling is blocked");
//
// 		await browser.$("#btnCloseDialog").click();
// 		pageOverflow = await browser.execute("return window.getComputedStyle(document.documentElement).overflow;");
//
// 		assert.strictEqual(pageOverflow, "visible", "Page scrolling is restored");
// 	});
//
// 	it("test page scrolling is restored after close with ESC", async () => {
// 		await browser.$("#cbScrollable").click();
// 		const scrollHeightBefore = await browser.$("html").getProperty("scrollHeight");
//
// 		await browser.$("#btnOpenDialog").click();
// 		await browser.keys("Escape");
// 		assert.strictEqual(await browser.$("html").getProperty("scrollHeight"), scrollHeightBefore, "Body scrolling is restored");
//
// 		await browser.$("#cbScrollable").click();
// 	});
//
// 	it("tests multiple dialogs page scrolling", async () => {
// 		const preventButtonBefore = await browser.$("#prevent");
//
// 		await browser.setWindowSize(400, 400);
// 		await preventButtonBefore.scrollIntoView();
//
// 		const offsetBefore = await preventButtonBefore.getLocation('y');
//
// 		await preventButtonBefore.click();
//
// 		await browser.keys("Escape");
// 		const confirmButton = await browser.$("#yes");
// 		await confirmButton.click();
//
// 		await browser.setTimeout({ script: 5000 });
// 		const offsetAfter = await preventButtonBefore.getLocation('y');
//
// 		assert.strictEqual(offsetBefore,  offsetAfter, "No vertical page scrolling when multiple dialogs are closed");
// 	});
// });
//
// describe("Responsive paddings", () => {
// 	before(async () => {
// 		await browser.url(`test/pages/Dialog.html`);
// 	});
//
// 	it("tests responsive paddings", async () => {
// 		const openDialog = await browser.$("#btnOpenDialog");
// 		await openDialog.click();
//
// 		const expectedPadding = "16px";
// 		const dialog = await browser.$("#dialog");
//
// 		// content
// 		const actualContentPadding = await dialog.shadow$(".ui5-popup-content").getCSSProperty("padding-left");
//
// 		// header
// 		const actualHeaderPadding = await dialog.shadow$(".ui5-popup-header-root").getCSSProperty("padding-left");
//
// 		// footer
// 		const actualFooterPadding = await dialog.shadow$(".ui5-popup-footer-root").getCSSProperty("padding-left");
//
// 		assert.strictEqual(actualContentPadding.value, expectedPadding, "dialog has correct padding set on the content");
// 		assert.strictEqual(actualHeaderPadding.value, expectedPadding, "dialog has correct padding set on the header");
// 		assert.strictEqual(actualFooterPadding.value, expectedPadding, "dialog has correct padding set on the footer");
//
// 		await browser.$("#btnCloseDialog").click();
// 	});
//
// 	it("tests removing of responsive paddings for the content", async () => {
// 		const openDialog = await browser.$("#btnOpenDialogNoPaddings");
// 		await openDialog.click();
//
// 		const expectedPadding = "16px";
// 		const expectedContentPadding = "0px";
// 		const dialog = await browser.$("#dialogNoPaddings");
//
// 		// content
// 		const actualContentPadding = await dialog.shadow$(".ui5-popup-content").getCSSProperty("padding-left");
//
// 		// header
// 		const actualHeaderPadding = await dialog.shadow$(".ui5-popup-header-root").getCSSProperty("padding-left");
//
// 		// footer
// 		const actualFooterPadding = await dialog.shadow$(".ui5-popup-footer-root").getCSSProperty("padding-left");
//
// 		assert.strictEqual(actualContentPadding.value, expectedContentPadding, "dialog has correct padding set on the content");
// 		assert.strictEqual(actualHeaderPadding.value, expectedPadding, "dialog has correct padding set on the header");
// 		assert.strictEqual(actualFooterPadding.value, expectedPadding, "dialog has correct padding set on the footer");
//
// 		await browser.$("#btnCloseDialogNoPaddings").click();
// 	});
// });

describe("Dialog States", () => {
	before(async () => {
		await browser.url(`test/pages/Dialog.html`);
	});

	it("tests error state dialog accessibility role", async () => {
		const openDialog = await browser.$("#btn-error-state");
		await openDialog.click();

		assert.strictEqual(await browser.$("#dialog-error-state").shadow$(".ui5-popup-root").getProperty("role"), "alertdialog", "error dialog has correct role");

		await browser.keys("Escape");
	});

	it("tests information state dialog accessibility role", async () => {
		const openDialog = await browser.$("#btn-info-state");
		await openDialog.click();

		assert.strictEqual(await browser.$("#dialog-info-state").shadow$(".ui5-popup-root").getProperty("role"), "dialog", "information dialog has correct role");

		await browser.keys("Escape");
	});

	it("tests success state dialog accessibility role", async () => {
		const openDialog = await browser.$("#btn-success-state");
		await openDialog.click();

		assert.strictEqual(await browser.$("#dialog-success-state").shadow$(".ui5-popup-root").getProperty("role"), "dialog", "success dialog has correct role");

		await browser.keys("Escape");
	});

	it("tests warning state dialog accessibility role", async () => {
		const openDialog = await browser.$("#btn-warn-state");
		await openDialog.click();

		assert.strictEqual(await browser.$("#dialog-warn-state").shadow$(".ui5-popup-root").getProperty("role"), "alertdialog", "warning dialog has correct role");

		await browser.keys("Escape");
	});
});

describe("Block layers", () => {
	before(async () => {
		await browser.url(`test/pages/Dialog.html`);
	});

	it("test dialog overlay when dialog isn't open", async () => {
		const isBlockLayerHidden = await browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialog");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.ok(isBlockLayerHidden, "the block layer is hidden");
	});

	it("test dialog overlay when dialog is open", async () => {
		await browser.$("#dialogOverDialogBtn").click();

		const isBlockLayerHidden = await browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialogOverDialog1");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.notOk(isBlockLayerHidden, "the block layer is visible");

		await browser.keys("Escape");
	});

	it("test dialog over dialog", async () => {
		await browser.$("#dialogOverDialogBtn").click();
		await browser.$("#dialogOverDialog1Btn").click();

		let isBlockLayerHidden = await browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialogOverDialog1");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.ok(isBlockLayerHidden, "the block layer is hidden");

		isBlockLayerHidden = await browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialogOverDialog2");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.notOk(isBlockLayerHidden, "the block layer is visible");

		await browser.keys("Escape");

		isBlockLayerHidden = await browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialogOverDialog1");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.notOk(isBlockLayerHidden, "the block layer is visible");

		await browser.keys("Escape");

		isBlockLayerHidden = await browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialogOverDialog1");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.ok(isBlockLayerHidden, "the block layer is hidden");
	});
});