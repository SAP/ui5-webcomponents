import { assert } from "chai";
import tabContainer from "../pageobjects/TabContainerTestPage.js";

describe("Drag and drop tests", () => {
	const getDragOffset = async (draggedElement, dropTargetElement, targetPosition) => {
		const OFFSET = 5;
		const draggedRectangle = {
			...await draggedElement.getLocation(),
			...await draggedElement.getSize()
		};

		const dropTargetElementRectangle = {
			...await dropTargetElement.getLocation(),
			...await dropTargetElement.getSize()
		};

		const draggedElementXCenter = draggedRectangle.x + draggedRectangle.width / 2;
		const draggedElementYCenter = draggedRectangle.y + draggedRectangle.height / 2;

		let dropTargetX;
		let dropTargetY;

		if (targetPosition === "Before") {
			dropTargetX = dropTargetElementRectangle.x + OFFSET;
			dropTargetY = dropTargetElementRectangle.y + OFFSET;
		} else if (targetPosition === "After") {
			dropTargetX = dropTargetElementRectangle.x + dropTargetElementRectangle.width - OFFSET;
			dropTargetY = dropTargetElementRectangle.y + dropTargetElementRectangle.height - OFFSET;
		} else { // "On"
			dropTargetX = dropTargetElementRectangle.x + dropTargetElementRectangle.width / 2;
			dropTargetY = dropTargetElementRectangle.y + dropTargetElementRectangle.height / 2;
		}

		const offsetToX = Math.round(dropTargetX - draggedElementXCenter);
		const offsetToY = Math.round(dropTargetY - draggedElementYCenter);

		return {
			x: offsetToX,
			y: offsetToY
		};
	};

	const moveElementById = (items, id1, id2, targetPosition) => {
		const findAndExecute = (items, matcher, cb) => {
			const index = items.findIndex(matcher);

			if (index !== -1) {
				cb(items, index);
				return;
			}

			items.forEach(item => {
				if (!item.isSeparator) {
					findAndExecute(item.items, matcher, cb);
				}
			});
		}

		let movedItem;

		// remove the item
		findAndExecute(
			items,
			(item) => item.id === id1,
			(items, index) => [movedItem] = items.splice(index, 1)
		);

		// insert the item at new place
		findAndExecute(
			items,
			(item) => item.id === id2,
			(items, index) => {
				if (targetPosition === "Before") {
					items.splice(index, 0, movedItem);
				} else if (targetPosition === "After") {
					items.splice(index + 1, 0, movedItem);
				} else { // On
					items[index].items.unshift(movedItem);
				}
			}
		);

		return items;
	};

	const dragAndDropInStrip = async (stripItemToDrag, stripDropTarget, placement) => {
		const dragOffset = await getDragOffset(stripItemToDrag, stripDropTarget, placement);

		await stripItemToDrag.dragAndDrop({ x: dragOffset.x, y: 0 });
	}

	const dragAndDropInPopover = async (popoverItemToDrag, popoverDropTarget, placement) => {
		const dragOffset = await getDragOffset(popoverItemToDrag, popoverDropTarget, placement);

		await popoverItemToDrag.dragAndDrop({ x: 0, y: dragOffset.y });
	}

	before(async () => {
		await browser.url(`test/pages/TabContainerDragAndDrop.html`);
		await browser.setWindowSize(1024, 1000);
	});

	it("Moving item After another", async () => {
		await browser.$("#tabContainerDnd")
		await tabContainer.getStartOverflow("tabContainerDnd")
		await tabContainer.getEndOverflow("tabContainerDnd")
		let displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainerDnd");
		let draggedStripItem = displayedStripItems[0];
		let dropTargetStripItem = displayedStripItems[1];
		let currentOrder = await tabContainer.getItemsIds("tabContainerDnd");

		await dragAndDropInStrip(draggedStripItem, dropTargetStripItem, "After");
		let expectedOrder = moveElementById(currentOrder, await tabContainer.getRealTabId(draggedStripItem), await tabContainer.getRealTabId(dropTargetStripItem), "After");
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");

		displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainerDnd");
		draggedStripItem = displayedStripItems[1];
		dropTargetStripItem = displayedStripItems[displayedStripItems.length - 1];
		await dragAndDropInStrip(draggedStripItem, dropTargetStripItem, "After");
		expectedOrder = moveElementById(currentOrder, await tabContainer.getRealTabId(draggedStripItem), await tabContainer.getRealTabId(dropTargetStripItem), "After");
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");
	});

	it("Moving item Before another", async () => {
		let displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainerDnd");
		let draggedStripItem = displayedStripItems[displayedStripItems.length - 1];
		let dropTargetStripItem = displayedStripItems[displayedStripItems.length - 2];
		let currentOrder = await tabContainer.getItemsIds("tabContainerDnd");

		await dragAndDropInStrip(draggedStripItem, dropTargetStripItem, "Before");
		let expectedOrder = moveElementById(currentOrder, await tabContainer.getRealTabId(draggedStripItem), await tabContainer.getRealTabId(dropTargetStripItem), "Before");
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");

		displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainerDnd");
		draggedStripItem = displayedStripItems[displayedStripItems.length - 1];
		dropTargetStripItem = displayedStripItems[0];
		await dragAndDropInStrip(draggedStripItem, dropTargetStripItem, "Before");
		expectedOrder = moveElementById(expectedOrder, await tabContainer.getRealTabId(draggedStripItem), await tabContainer.getRealTabId(dropTargetStripItem), "Before");
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");
	});

	it ("Moving item On another", async () => {
		let displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainerDnd");
		let draggedStripItem = displayedStripItems[5];
		let draggedStripItemId = await tabContainer.getRealTabId(draggedStripItem);
		let dropTargetStripItem = displayedStripItems[6];
		let currentOrder = await tabContainer.getItemsIds("tabContainerDnd");

		await dragAndDropInStrip(draggedStripItem, draggedStripItem, "On");
		let expectedOrder = currentOrder;
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has NOT changed");

		await dragAndDropInStrip(draggedStripItem, dropTargetStripItem, "On");
		expectedOrder = moveElementById(currentOrder, draggedStripItemId, await tabContainer.getRealTabId(dropTargetStripItem), "On");
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");
	});

	it("Moving item After another in end overflow popover", async () => {
		await tabContainer.getEndOverflow("tabContainerDnd").click();

		let displayedPopoverItems = await tabContainer.getCurrentPopoverItems("tabContainerDnd");
		let draggedPopoverItem = displayedPopoverItems[0];
		let dropTargetPopoverItem = displayedPopoverItems[2];
		let currentOrder = await tabContainer.getItemsIds("tabContainerDnd");

		await dragAndDropInPopover(draggedPopoverItem, dropTargetPopoverItem, "After");
		let expectedOrder = moveElementById(currentOrder, await tabContainer.getRealTabId(draggedPopoverItem), await tabContainer.getRealTabId(dropTargetPopoverItem), "After");
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");

		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");
	});

	it("Moving item Before another in end overflow popover", async () => {
		let displayedPopoverItems = await tabContainer.getCurrentPopoverItems("tabContainerDnd");
		let draggedPopoverItem = displayedPopoverItems[2];
		let dropTargetPopoverItem = displayedPopoverItems[1];
		let currentOrder = await tabContainer.getItemsIds("tabContainerDnd");

		await dragAndDropInPopover(draggedPopoverItem, dropTargetPopoverItem, "Before");

		let expectedOrder = moveElementById(currentOrder, await tabContainer.getRealTabId(draggedPopoverItem), await tabContainer.getRealTabId(dropTargetPopoverItem), "Before");
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");
	});

	it("Moving item On another in end overflow popover", async () => {
		let displayedPopoverItems = await tabContainer.getCurrentPopoverItems("tabContainerDnd");
		let draggedPopoverItem = displayedPopoverItems[3];
		let dropTargetPopoverItem = displayedPopoverItems[4];
		let currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		console.error("POPOVER", await tabContainer.getRealTabId(draggedPopoverItem), "asd:", await tabContainer.getRealTabId(dropTargetPopoverItem))

		await dragAndDropInPopover(draggedPopoverItem, dropTargetPopoverItem, "On");
		let expectedOrder = moveElementById(currentOrder, await tabContainer.getRealTabId(draggedPopoverItem), await tabContainer.getRealTabId(dropTargetPopoverItem), "On");
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");

		await dragAndDropInPopover(dropTargetPopoverItem, draggedPopoverItem, "On");
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has NOT changed when attempted to drag item on top of a child item");

		// close the popover
		await tabContainer.getEndOverflow("tabContainerDnd").click();
	});
});

describe("Keyboard drag and drop tests", () => {
	before(async () => {
		await browser.url(`test/pages/TabContainerDragAndDrop.html`);
		await browser.setWindowSize(1024, 1000);
	});

	it("Moving strip items", async () => {
		assert.notOk(await browser.$("#tabOne").previousElement().isExisting(), "TabOne is the first tab");

		await browser.$("#tabContainerDnd").shadow$(".ui5-tab-strip-item").click();

		await browser.keys(["Control", "ArrowRight"]);
		assert.strictEqual(await browser.$("#tabOne").previousElement().getAttribute("id"), "tabTwo", "TabOne is after tabTwo");

		await browser.keys(["Control", "ArrowDown"]);
		assert.strictEqual(await browser.$("#tabOne").previousElement().getAttribute("id"), "tabThree", "TabOne is after tabThree");

		await browser.keys(["Control", "ArrowLeft"]);
		assert.strictEqual(await browser.$("#tabOne").previousElement().getAttribute("id"), "tabTwo", "TabOne is after tabTwo");

		await browser.keys(["Control", "ArrowUp"]);
		assert.notOk(await browser.$("#tabOne").previousElement().isExisting(), "TabOne is the first tab");
	});

	it("Moving sub items", async () => {
		await browser.$("#tabContainerDnd").shadow$(".ui5-tab-strip-item:nth-child(3) [ui5-button]").click();

		assert.notOk(await browser.$("#tabThree1").previousElement().isExisting(), "tabThree1 is the first tab");

		await browser.keys(["Control", "ArrowDown"]);
		assert.strictEqual(await browser.$("#tabThree1").previousElement().getAttribute("id"), "tabThree2", "tabThree1 is after tabThree2");

		await browser.keys(["Control", "ArrowUp"]);
		assert.notOk(await browser.$("#tabThree1").previousElement().isExisting(), "tabThree1 is the first tab");

		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");
		assert.notOk(await browser.$("#tabThree21").previousElement().isExisting(), "tabThree21 is the first tab");

		await browser.keys(["Control", "ArrowDown"]);
		assert.strictEqual(await browser.$("#tabThree21").previousElement().getAttribute("id"), "tabThree22", "tabThree21 is after tabThree22");

		await browser.keys(["Control", "ArrowDown"]);
		assert.strictEqual(await browser.$("#tabThree21").previousElement().getAttribute("id"), "tabThree22", "tabThree21 is after tabThree22");

		await browser.keys(["Control", "ArrowUp"]);
		assert.notOk(await browser.$("#tabThree21").previousElement().isExisting(), "tabThree21 is the first tab");
	});
});