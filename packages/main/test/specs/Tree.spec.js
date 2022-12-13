const assert = require("chai").assert;

async function getItemsCount(selector) {
	const items = await getItems(selector);
    return items.length;
}

async function getItems(selector) {
    const listItems = await browser.$$(`${selector} [ui5-tree-item]`);

	const promises = listItems.map(async (item) => {
		const isDisplayed = await item.isDisplayedInViewport();
		return isDisplayed ? item : null;
	},);

	const items = await Promise.all(promises);

	return items.filter((item) => item);
}

describe("Tree general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Tree.html`);
	});

	it("Tree is rendered", async () => {
		const treeRoot = await browser.$("#tree").shadow$("ui5-tree-list");
		assert.ok(await treeRoot.isExisting(), "Tree is rendered.");
	});

	it("Tree items can be collapsed", async () => {
		const listItemsBefore = await getItemsCount("#tree");
		const toggleButton = await browser.$(">>>#tree ui5-tree-item[expanded] ui5-icon.ui5-li-tree-toggle-icon");

		await toggleButton.click();
		const listItemsAfter = await getItemsCount("#tree");
		assert.isBelow(listItemsAfter, listItemsBefore, "After collapsing a node, there are less items in the list");
	});

	it("Tree items can be expanded", async () => {
		const listItemsBefore = await getItemsCount("#tree");
		const toggleButton = await browser.$(">>>#tree ui5-tree-item ui5-icon.ui5-li-tree-toggle-icon");

		await toggleButton.click();
		const listItemsAfter = await getItemsCount("#tree");
		assert.isAbove(listItemsAfter, listItemsBefore, "After expanding a node, there are more items in the list");
	})

});

describe("Tree proxies properties to list", () => {
	before(async () => {
		await browser.url(`test/pages/Tree.html`);
	});

	it("Mouseover/mouseout events", async () => {
		const treeItems = await browser.$$(">>>#tree ui5-tree-item .ui5-li-root-tree");
		const inputMouseover = await browser.$("#mouseover-counter");
		const inputMouseout = await browser.$("#mouseout-counter");

		await treeItems[0].moveTo();

		assert.strictEqual(await inputMouseover.getAttribute("value"), "1", "Mouseover event is fired when item is accessed");

		await treeItems[1].moveTo();
		assert.strictEqual(await inputMouseover.getAttribute("value"), "2", "Mouseover event is fired when other item is accessed result");
		assert.strictEqual(await inputMouseout.getAttribute("value"), "1", "Mouseout event is fired when the first item is not hovered");
	})

	it("Mode works", async () => {
		const tree = await browser.$("#tree");
		const list = await tree.shadow$("ui5-tree-list");

		const modes = ["None", "SingleSelect", "SingleSelectBegin", "SingleSelectEnd", "MultiSelect", "Delete"];
		modes.forEach(async mode => {
			await tree.setAttribute("mode", mode);
			assert.strictEqual(await list.getAttribute("mode"), mode, "Mode applied");
		});
	});

	it("headerText, footerText, noDataText work", async () => {
		const tree = await browser.$("#tree");
		const list = await tree.shadow$("ui5-tree-list");

		await tree.setAttribute("header-text", "header text");
		await tree.setAttribute("footer-text", "footer text");
		await tree.setAttribute("no-data-text", "no data text");

		assert.strictEqual(await list.getAttribute("header-text"), "header text", "header text applied");
		assert.strictEqual(await list.getAttribute("footer-text"), "footer text", "footer text applied");
		assert.strictEqual(await list.getAttribute("no-data-text"), "no data text", "no data text applied");
	})

	it("Tests the prevention of the ui5-itemClick event", async () => {
		const treeItems = await browser.$$("#preventable-click-event ui5-tree-item");
		const firstItem = treeItems[0];

		await firstItem.click();

		assert.notOk(await firstItem.getAttribute("selected"), "The first item is not selected when we prevent the click event.");
	});

	it("selectionChange event provides targetItem parameter", async () => {
		const selectionChangeTargetItemResult = await browser.$("#selectionChangeTargetItemResult");
		const listItems = await browser.$$("#treeIndeterminate ui5-tree-item");
		const firstTreeItem = await browser.$("#treeIndeterminate #item1");
		let firstTreeItemId, targetItemId;

		await listItems[0].click();

		firstTreeItemId = await firstTreeItem.getProperty("id");
		targetItemId = await selectionChangeTargetItemResult.getProperty("value");

		assert.strictEqual(targetItemId, firstTreeItemId, "targetItem parameter holds correct tree item");
	});
});

describe("Tree has screen reader support", () => {
	before(async () => {
		await browser.url(`test/pages/Tree.html`);
	});

	it("List role is correct", async () => {
		const tree = await browser.$("#tree");
		const list = await tree.shadow$("ui5-tree-list");
		assert.strictEqual(await list.shadow$("ul").getAttribute("role"), "tree", "List role is tree");
	});

	it("List item acc attributes correct", async () => {
		const listItems = await browser.$$("#tree ui5-tree-item");

		const promises = listItems.map(async (item, idx) => {
			const li = await item.shadow$("li");
			const itemExpandable = await item.getProperty("showToggleButton");
			const itemExpanded = await item.getProperty("expanded");
			const liAriaExpanded = await li.getAttribute("aria-expanded");

			const ariaExpandedValues = {
				// (1) expandable: aria-expanded can be 'true' or 'false'
				"true": {
					"true" : "true",
					"false": "false",
				},
				// (2) not expandable: aria-expanded is null - not present
				"false": {
					"true" : null,
					"false": null,
				}
			};

			assert.strictEqual(await li.getAttribute("role"), "treeitem", "List item role is correct");
			assert.strictEqual(await li.getAttribute("aria-level"), await item.getAttribute("level"), "aria level is correct");
			assert.equal(liAriaExpanded, ariaExpandedValues[itemExpandable][itemExpanded],
				"aria-expanded is correct.");
		});

		await Promise.all(promises);
	});

	it ("Tree's internal List receives aria-label from the accessibleName property", async () => {
		const tree = await browser.$("#tree");
		const list = await tree.shadow$("ui5-tree-list");
		assert.strictEqual(await list.shadow$("ul").getAttribute("aria-label"), "Tree with accessibleName", "list aria label is correct");
	});

	it ("Tree's internal List receives aria-label from the accessibleNameRef property", async () => {
		const tree = await browser.$("#preventable-click-event");
		const list = await tree.shadow$("ui5-tree-list");
		const treeLabel = await browser.$("#tree-label");
		assert.strictEqual(await list.shadow$("ul").getAttribute("aria-label"), await treeLabel.getHTML(false), "list aria label is correct");
	});

	it ("Tree list item receives aria-labelledby from the accessibleName property", async () => {
		const listTreeItem = await browser.$("#tree ui5-tree-item");
		const listItem = await listTreeItem.shadow$("li");
		const liAriaLabelledBy = await listItem.getAttribute("aria-labelledby");
		const ariaLabelText = await listItem.$(`#${liAriaLabelledBy}`).getText();

		assert.strictEqual(ariaLabelText, "Tree item with accessibleName", "aria label text is correct");
	});

});
