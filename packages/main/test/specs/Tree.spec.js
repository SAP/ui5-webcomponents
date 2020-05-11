const assert = require("chai").assert;

describe("Tree general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Tree.html");

	it("Tree is rendered", () => {
		const treeRoot = browser.$("#tree").shadow$(".ui5-tree-root");

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
	});

});
