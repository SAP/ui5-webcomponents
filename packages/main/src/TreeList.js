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
	getItems() {
		const slottedItems = this.getSlottedNodes("items");
		const flatItems = [];

		flattenTree(slottedItems, flatItems);

		return flatItems;
	}
}

/*
 * Converts a tree structure into a flat array
 *
 * @param {Array} treeItems
 * @param {Array} result
 */
const flattenTree = (items, result) => {
	items.forEach(item => {
		result.push(item);

		if (item.expanded && item.items) {
			flattenTree(item.items, result);
		}
	});
};

TreeList.define();

export default TreeList;
