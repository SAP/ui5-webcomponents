import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import List from "./List.js";
import type TreeItemBase from "./TreeItemBase.js";

@customElement("ui5-tree-list")

class TreeList extends List {
	/*
	 * @override
	 */
	getItems(includeCollapsed = false): Array<TreeItemBase> {
		const slottedItems = this.getSlottedNodes("items") as Array<TreeItemBase>;
		const flatItems: Array<TreeItemBase> = [];

		flattenTree(slottedItems, flatItems, includeCollapsed);

		return flatItems;
	}

	getItemsForProcessing(): Array<TreeItemBase> {
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
const flattenTree = (items: Array<TreeItemBase>, result: Array<TreeItemBase>, includeCollapsed = false) => {
	items.forEach(item => {
		result.push(item);

		if ((item.expanded || includeCollapsed) && item.items) {
			flattenTree(item.items, result);
		}
	});
};

TreeList.define();

export default TreeList;
