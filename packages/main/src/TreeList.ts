import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import List from "./List.js";
import { ITreeItem } from "./Interfaces.js";

@customElement("ui5-tree-list")

class TreeList extends List {
	/*
	 * @override
	 */
	getItems(includeCollapsed = false): Array<ITreeItem> {
		const slottedItems = this.getSlottedNodes<ITreeItem>("items");
		const flatItems: Array<ITreeItem> = [];

		flattenTree(slottedItems, flatItems, includeCollapsed);

		return flatItems;
	}

	getItemsForProcessing(): Array<ITreeItem> {
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
const flattenTree = (items: Array<ITreeItem>, result: Array<ITreeItem>, includeCollapsed = false) => {
	items.forEach(item => {
		result.push(item);

		if ((item.expanded || includeCollapsed) && item.items) {
			flattenTree(item.items, result, includeCollapsed);
		}
	});
};

TreeList.define();

export default TreeList;
