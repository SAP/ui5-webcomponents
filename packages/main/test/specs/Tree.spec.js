const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Tree general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Tree.html`);
	});

	it("Tree is rendered", async () => {
		const treeRoot = await browser.$("#tree").shadow$("ui5-list");
		assert.ok(await treeRoot.isExisting(), "Tree is rendered.");
	});

	it("Tree items can be collapsed", async () => {
		const tree = await browser.$("#tree");
		const listItemsBefore = await tree.shadow$$("ui5-li-tree").length;
		const toggleButton = await tree.shadow$("ui5-li-tree[expanded]").shadow$("ui5-icon.ui5-li-tree-toggle-icon");

		await toggleButton.click();
		const listItemsAfter = await tree.shadow$$("ui5-li-tree").length;
		assert.ok(listItemsAfter < listItemsBefore, "After collapsing a node, there are less items in the list");
	});

	it("Tree items can be expanded", async () => {
		const tree = await browser.$("#tree");
		const listItemsBefore = await tree.shadow$$("ui5-li-tree").length;
		const toggleButton = await tree.shadow$("ui5-li-tree").shadow$("ui5-icon.ui5-li-tree-toggle-icon");

		await toggleButton.click();
		const listItemsAfter = await tree.shadow$$("ui5-li-tree").length;
		assert.ok(listItemsAfter > listItemsBefore, "After expanding a node, there are more items in the list");
	})

});

describe("Tree proxies properties to list", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Tree.html`);
	});

	it("Mode works", async () => {
		const tree = await browser.$("#tree");
		const list = await tree.shadow$("ui5-list");

		const modes = ["None", "SingleSelect", "SingleSelectBegin", "SingleSelectEnd", "MultiSelect", "Delete"];
		modes.forEach(async mode => {
			await tree.setAttribute("mode", mode);
			assert.ok(await list.getAttribute("mode") === mode, "Mode applied");
		});
	});

	it("headerText, footerText, noDataText work", async () => {
		const tree = await browser.$("#tree");
		const list = await tree.shadow$("ui5-list");

		await tree.setAttribute("header-text", "header text");
		await tree.setAttribute("footer-text", "footer text");
		await tree.setAttribute("no-data-text", "no data text");

		assert.ok(await list.getAttribute("header-text") === "header text", "header text applied");
		assert.ok(await list.getAttribute("footer-text") === "footer text", "footer text applied");
		assert.ok(await list.getAttribute("no-data-text") === "no data text", "no data text applied");
	})

});

describe("Tree has screen reader support", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Tree.html`);
	});

	it("List role is correct", async () => {
		const tree = await browser.$("#tree");
		const list = await tree.shadow$("ui5-list");
		assert.strictEqual(await list.shadow$("ul").getAttribute("role"), "tree", "List role is tree");
	});

	it("List item acc attributes correct", async () => {
		const tree = await browser.$("#tree");
		const listItems = await tree.shadow$$("ui5-li-tree");

		listItems.forEach(async (item, idx) => {
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

	});

});
