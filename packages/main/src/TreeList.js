import List from "./List.js";

const metadata = {
	tag: "ui5-tree-list",
};

class TreeList extends List {
	static get metadata() {
		return metadata;
	}

	/*
	 * @override
	 */
	getItems(includeCollapsed = false) {
		const slottedItems = this.getSlottedNodes("items");
		const flatItems = [];

		flattenTree(slottedItems, flatItems, includeCollapsed);

		return flatItems;
	}

	getItemsForProcessing() {
		return this.getItems(true);
	}
}

/*
 * Converts a tree structure into a flat array
 *
 * @param {Array} treeItems
 * @param {Array} result
 * @param {Boolean} includeCollapsed
 */
const flattenTree = (items, result, includeCollapsed) => {
	items.forEach(item => {
		result.push(item);

		if ((item.expanded || includeCollapsed) && item.items) {
			flattenTree(item.items, result);
		}
	});
};

TreeList.define();

export default TreeList;
