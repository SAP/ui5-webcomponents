const assert = require("chai").assert;

describe("Tree general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Tree.html");
	});

	it("Tree is rendered", () => {
		const treeRoot = browser.$("#tree").shadow$("ui5-list");
		assert.ok(treeRoot.isExisting(), "Tree is rendered.");
	});

	it("Tree items can be collapsed", () => {
		const tree = browser.$("#tree");
		const listItemsBefore = tree.shadow$$("ui5-li-tree").length;
		const toggleButton = tree.shadow$("ui5-li-tree[expanded]").shadow$("ui5-icon.ui5-li-tree-toggle-icon");

		toggleButton.click();
		const listItemsAfter = tree.shadow$$("ui5-li-tree").length;
		assert.ok(listItemsAfter < listItemsBefore, "After collapsing a node, there are less items in the list");
	});

	it("Tree items can be expanded", () => {
		const tree = browser.$("#tree");
		const listItemsBefore = tree.shadow$$("ui5-li-tree").length;
		const toggleButton = tree.shadow$("ui5-li-tree").shadow$("ui5-icon.ui5-li-tree-toggle-icon");

		toggleButton.click();
		const listItemsAfter = tree.shadow$$("ui5-li-tree").length;
		assert.ok(listItemsAfter > listItemsBefore, "After expanding a node, there are more items in the list");
	})

});

describe("Tree proxies properties to list", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Tree.html");
	});

	it("Mode works", () => {
		const tree = browser.$("#tree");
		const list = tree.shadow$("ui5-list");

		const modes = ["None", "SingleSelect", "SingleSelectBegin", "SingleSelectEnd", "MultiSelect", "Delete"];
		modes.forEach(mode => {
			tree.setAttribute("mode", mode);
			assert.ok(list.getAttribute("mode") === mode, "Mode applied");
		});
	});

	it("headerText, footerText, noDataText work", () => {
		const tree = browser.$("#tree");
		const list = tree.shadow$("ui5-list");

		tree.setAttribute("header-text", "header text");
		tree.setAttribute("footer-text", "footer text");
		tree.setAttribute("no-data-text", "no data text");

		assert.ok(list.getAttribute("header-text") === "header text", "header text applied");
		assert.ok(list.getAttribute("footer-text") === "footer text", "footer text applied");
		assert.ok(list.getAttribute("no-data-text") === "no data text", "no data text applied");
	})

});

describe("Tree has screen reader support", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Tree.html");
	});

	it("List role is correct", () => {
		const tree = browser.$("#tree");
		const list = tree.shadow$("ui5-list");
		assert.ok(list.shadow$("ul").getAttribute("role") === "tree", "List role is tree");
	});

	it("List item acc attributes correct", () => {
		const tree = browser.$("#tree");
		const listItems = tree.shadow$$("ui5-li-tree");

		listItems.forEach((item, idx) => {
			const li = item.shadow$("li");
			const itemExpandable = item.getProperty("showToggleButton");
			const itemExpanded = item.getProperty("expanded");
			const liAriaExpanded = li.getAttribute("aria-expanded");

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

			assert.ok(li.getAttribute("role") === "treeitem", "List item role is correct");
			assert.ok(li.getAttribute("aria-level") === item.getAttribute("level"), "aria level is correct");
			assert.equal(liAriaExpanded, ariaExpandedValues[itemExpandable][itemExpanded],
				"aria-expanded is correct.");
		});

	});

});
