import { assert } from "chai";

describe("ListItemGroup Tests", () => {
	before(async () => {
		await browser.url(`test/pages/List_test_page.html`);
	});

	it("ListGroup is rendered", async () => {
		const listItemGroup = await browser.$("#list1 [ui5-li-group]");
		const listItemGroupHeader = await listItemGroup.shadow$("ui5-li-group-header");

		assert.ok(listItemGroup.isExisting(), true, "ListGroup is rendered");
		assert.ok(listItemGroupHeader.isExisting(), true, "ListGroup header is rendered");
	});

	it("ListGroup renders header-text property correctly", async () => {
		const listItemGroup = await browser.$("#list1 [ui5-li-group]");
		const listItemGroupHeader = await listItemGroup.shadow$("ui5-li-group-header");

		assert.strictEqual(await listItemGroupHeader.getText(), "New Items", "List's group header is correctly displayed");
	});

	it("ListGroup propagates focused property to header item", async () => {
		const listItemGroup = await browser.$("#list1 [ui5-li-group]");
		const listItemGroupHeader = await listItemGroup.shadow$("ui5-li-group-header");

		await listItemGroup.setProperty("focused", true);
		assert.strictEqual(await listItemGroupHeader.getProperty("focused"), true, "List's group header is focused");
		await listItemGroup.setProperty("focused", false);
	});
});

describe("List drag and drop tests", () => {
	const getDragOffset = async (draggedElement, dropTargetElement, targetPosition) => {
		const EXTRA_OFFSET = 5;
		const draggedRectangle = {
			...await draggedElement.getLocation(),
			...await draggedElement.getSize()
		};

		const dropTargetElementRectangle = {
			...await dropTargetElement.getLocation(),
			...await dropTargetElement.getSize()
		}

		const draggedElementCenter = (draggedRectangle.y + draggedRectangle.height / 2);
		const droppedElementCenter = (dropTargetElementRectangle.y + dropTargetElementRectangle.height / 2);

		let offsetToCenter = Math.round(droppedElementCenter - draggedElementCenter);

		if (targetPosition === "Before") {
			offsetToCenter -= EXTRA_OFFSET
		} else if (targetPosition === "After") {
			offsetToCenter += EXTRA_OFFSET;
		}

		return offsetToCenter;
	};

	const compareItemsOrder = async (listId, expectedItems) => {
		const listItems = await browser.$$(`#${listId} > *`);
		const results = await Promise.all(expectedItems.map((item, i) => item.isEqual(listItems[i])));

		return results.every(value => value);
	}

	before(async () => {
		await browser.url(`test/pages/ListItemGroupDragAndDrop.html`);
	});

	it("Moving item After another", async () => {
		const [firstItem, secondItem, thirdItem] = await browser.$$("#listDnd1 [ui5-li]");

		let dragOffset = await getDragOffset(firstItem, secondItem, "After");
		await firstItem.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd1", [secondItem, firstItem, thirdItem]), "Items order has changed");

		dragOffset = await getDragOffset(firstItem, thirdItem, "After");
		await firstItem.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd1", [secondItem, thirdItem, firstItem]), "Items order has changed");
	});

	it("Moving item Before another", async () => {
		const [secondItem, thirdItem, firstItem] = await browser.$$("#listDnd1 [ui5-li]");

		let dragOffset = await getDragOffset(firstItem, thirdItem, "Before");
		await firstItem.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd1", [secondItem, firstItem, thirdItem]), "Items order has changed");

		dragOffset = await getDragOffset(firstItem, secondItem, "Before")
		await firstItem.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd1", [firstItem, secondItem, thirdItem]), "Items order has changed");
	});

	it("Moving item ON another", async () => {
		const [firstItem, secondItem, thirdItem] = await browser.$$("#listDnd2 [ui5-li]");

		await firstItem.dragAndDrop({ x: 0, y: 0 });
		assert.ok(await compareItemsOrder("listDnd2", [firstItem, secondItem, thirdItem]), "Items order has NOT changed");

		const dragOffset = await getDragOffset(firstItem, secondItem);
		await firstItem.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd2", [secondItem, thirdItem]), "Items order has changed");
		assert.ok(await secondItem.$("[ui5-li]").isEqual(firstItem), "First item is nested in second item");
	});

	it("Moving item from one list to another", async () => {
		const [listOneFirstItem, listOneSecondItem, listOneThirdItem] = await browser.$$("#listDnd1 [ui5-li]");
		const listTwoItem = await browser.$("#bg2")

		const dragOffset = await getDragOffset(listTwoItem, listOneFirstItem, "After");
		await listTwoItem.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd1", [listOneFirstItem, listTwoItem, listOneSecondItem, listOneThirdItem]), "Items order has changed");
	});

	it.skip("Moving link to list that doesn't accept it", async () => {
		const [firstItem, secondItem, thirdItem] = await browser.$$("#listDnd1 [ui5-li]");
		const link = await browser.$("#link")

		const dragOffset = await getDragOffset(link, firstItem, "After");
		await link.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd1", [firstItem, secondItem, thirdItem]), "Items order has NOT changed");
	});

	it.skip("Moving link to list that accepts it", async () => {
		const [firstItem, secondItem] = await browser.$$("#listDnd2 [ui5-li]");
		const link = await browser.$("#link")

		const dragOffset = await getDragOffset(link, secondItem, "Before");
		await link.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd2", [firstItem, link, secondItem]), "Items order has changed");
	});
});