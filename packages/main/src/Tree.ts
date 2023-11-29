import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import TreeItem from "./TreeItem.js";
import TreeItemCustom from "./TreeItemCustom.js";
import TreeList from "./TreeList.js";
import ListMode from "./types/ListMode.js";
import type TreeItemBase from "./TreeItemBase.js";
import type {
	TreeItemBaseToggleEventDetail,
	TreeItemBaseStepInEventDetail,
	TreeItemBaseStepOutEventDetail,
} from "./TreeItemBase.js";
import type {
	ListItemClickEventDetail,
	ListItemDeleteEventDetail,
	ListSelectionChangeEventDetail,
} from "./List.js";
import type { ITreeItem } from "./Interfaces.js";

// Template
import TreeTemplate from "./generated/templates/TreeTemplate.lit.js";

// Styles
import TreeCss from "./generated/themes/Tree.css.js";

type TreeItemEventDetail = {
	item: TreeItemBase,
}
type TreeItemToggleEventDetail = TreeItemEventDetail;
type TreeItemMouseoverEventDetail = TreeItemEventDetail;
type TreeItemMouseoutEventDetail = TreeItemEventDetail;
type TreeItemClickEventDetail = TreeItemEventDetail;
type TreeItemDeleteEventDetail = TreeItemEventDetail;
type TreeSelectionChangeEventDetail = {
	selectedItems: Array<TreeItemBase>;
	previouslySelectedItems: Array<TreeItemBase>;
	targetItem: TreeItemBase;
}
type WalkCallback = (item: ITreeItem, level: number, index: number) => void;

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-tree</code> component provides a tree structure for displaying data in a hierarchy.
 *
 * <h3>Usage</h3>
 *
 * <h4>When to use:</h4>
 * <ul>
 * <li>To display hierarchically structured items.</li>
 * <li>To select one or more items out of a set of hierarchically structured items.</li>
 * </ul>
 *
 * <h4>When not to use:</h4>
 * <ul>
 * <li>To display items not hierarchically structured. In this case, use the List component.</li>
 * <li>To select one item from a very small number of non-hierarchical items. Select or ComboBox might be more appropriate.</li>
 * <li>The hierarchy turns out to have only two levels. In this case, use List with group items.</li>
 * </ul>
 *
 * <h3>Keyboard Handling</h3>
 *
 * The <code>ui5-tree</code> provides advanced keyboard handling.
 * The user can use the following keyboard shortcuts in order to navigate trough the tree:
 * <ul>
 * <li>[UP/DOWN] - Navigates up and down the tree items that are currently visible.</li>
 * <li>[RIGHT] - Drills down the tree by expanding the tree nodes.</li>
 * <li>[LEFT] - Goes up the tree and collapses the tree nodes.</li>
 * </ul>
 * <br>
 *
 * The user can use the following keyboard shortcuts to perform selection,
 * when the <code>mode</code> property is in use:
 * <ul>
 * <li>[SPACE] - Selects the currently focused item upon keyup.</li>
 * <li>[ENTER]  - Selects the currently focused item upon keydown.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents/dist/Tree.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/TreeItem.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.8
 */
@customElement({
	tag: "ui5-tree",
	renderer: litRender,
	styles: TreeCss,
	template: TreeTemplate,
	dependencies: [
		TreeList,
		TreeItem,
		TreeItemCustom,
	],
})
/**
 * Fired when a tree item is expanded or collapsed.
 * <i>Note:</i> You can call <code>preventDefault()</code> on the event object to suppress the event, if needed.
 * This may be handy for example if you want to dynamically load tree items upon the user expanding a node.
 * Even if you prevented the event's default behavior, you can always manually call <code>toggle()</code> on a tree item.
 *
 * @param {HTMLElement} item the toggled item.
 * @allowPreventDefault
 * @public
 */
@event("item-toggle", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})
/**
 * Fired when the mouse cursor enters the tree item borders.
 * @param {HTMLElement} item the hovered item.
 * @since 1.0.0-rc.16
 * @public
 */
@event("item-mouseover", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})
/**
 * Fired when the mouse cursor leaves the tree item borders.
 * @param {HTMLElement} item the hovered item.
 * @since 1.0.0-rc.16
 * @public
 */
@event("item-mouseout", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})
/**
 * Fired when a tree item is activated.
 *
 * @allowPreventDefault
 * @param {HTMLElement} item The clicked item.
 * @public
 */
@event("item-click", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})

/**
 * Fired when the Delete button of any tree item is pressed.
 * <br><br>
 * <b>Note:</b> A Delete button is displayed on each item,
 * when the component <code>mode</code> property is set to <code>Delete</code>.
 *
 * @param {HTMLElement} item the deleted item.
 * @public
 */
@event("item-delete", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})

/**
 * Fired when selection is changed by user interaction
 * in <code>SingleSelect</code>, <code>SingleSelectBegin</code>, <code>SingleSelectEnd</code> and <code>MultiSelect</code> modes.
 *
 * @param {Array} selectedItems An array of the selected items.
 * @param {Array} previouslySelectedItems An array of the previously selected items.
 * @param {HTMLElement} targetItem The item triggering the event.
 * @public
 */
@event("selection-change", {
	detail: {
		/**
		 * @public
		 */
		selectedItems: { type: Array },
		/**
		 * @public
		 */
		previouslySelectedItems: { type: Array },
		/**
		 * @public
		 */
		targetItem: { type: HTMLElement },
	},
})
class Tree extends UI5Element {
	/**
	 * Defines the mode of the component. Since the tree uses a <code>ui5-list</code> to display its structure,
	 * the tree modes are exactly the same as the list modes, and are all applicable.
	 *
	 * @public
	 * @default "None"
	 */
	@property({ type: ListMode, defaultValue: ListMode.None })
	mode!: `${ListMode}`;

	/**
	 * Defines the text that is displayed when the component contains no items.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	noDataText!: string;

	/**
	 * Defines the component header text.
	 * <br><br>
	 * <b>Note:</b> If the <code>header</code> slot is set, this property is ignored.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	headerText!: string;

	/**
	 * Defines the component footer text.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	footerText!: string;

	/**
	 * Defines the accessible name of the component.
	 *
	 * @default ""
	 * @public
	 * @since 1.8.0
	 */
	@property()
	accessibleName!: string;

	/**
	 * Defines the IDs of the elements that label the component.
	 *
	 * @default ""
	 * @public
	 * @since 1.8.0
	 */
	@property()
	accessibleNameRef!: string;

	/**
	 * Defines the description for the accessible role of the component.
	 * @protected
	 * @default undefined
	 * @since 1.10.0
	 */
	@property({ defaultValue: undefined, noAttribute: true })
	accessibleRoleDescription?: string;

	/**
	 * Defines the items of the component. Tree items may have other tree items as children.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-tree-item</code> for the intended design.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: Array<ITreeItem>;

	/**
	 * Defines the component header.
	 * <br><br>
	 * <b>Note:</b> When the <code>header</code> slot is set, the
	 * <code>headerText</code> property is ignored.
	 *
	 * @public
	 */
	@slot()
	header!: Array<HTMLElement>;

	onBeforeRendering() {
		this._prepareTreeItems();
	}

	onAfterRendering() {
		// Note: this is a workaround for the problem that the list cannot invalidate itself when its only physical child is a slot (and the list items are inside the slot)
		// This code should be removed once a framework-level fix is implemented
		this.shadowRoot!.querySelector<TreeList>("[ui5-tree-list]")!.onBeforeRendering();
	}

	get list() {
		return this.getDomRef() as TreeList;
	}

	get _role() {
		return "tree";
	}

	get _label() {
		return getEffectiveAriaLabelText(this);
	}

	get _hasHeader() {
		return !!this.header.length;
	}

	_onListItemStepIn(e: CustomEvent<TreeItemBaseStepInEventDetail>) {
		const treeItem = e.detail.item;
		if (treeItem.items.length > 0) {
			const firstChild = treeItem.items[0];
			const firstChildListItem = this._getListItemForTreeItem(firstChild);
			firstChildListItem && this.list.focusItem(firstChildListItem);
		}
	}

	_onListItemStepOut(e: CustomEvent<TreeItemBaseStepOutEventDetail>) {
		const treeItem = e.detail.item;
		if (treeItem.parentElement !== this) {
			const parent = treeItem.parentElement as TreeItemBase;
			const parentListItem = this._getListItemForTreeItem(parent);
			parentListItem && this.list.focusItem(parentListItem);
		}
	}

	_onListItemToggle(e: CustomEvent<TreeItemBaseToggleEventDetail>) {
		const treeItem = e.detail.item;
		const defaultPrevented = !this.fireEvent<TreeItemToggleEventDetail>("item-toggle", { item: treeItem }, true);
		if (!defaultPrevented) {
			treeItem.toggle();
		}
	}

	_onListItemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const treeItem = e.detail.item as TreeItemBase;

		if (!this.fireEvent<TreeItemClickEventDetail>("item-click", { item: treeItem }, true)) {
			e.preventDefault();
		}
	}

	_onListItemDelete(e: CustomEvent<ListItemDeleteEventDetail>) {
		const treeItem = e.detail.item as TreeItemBase;
		this.fireEvent<TreeItemDeleteEventDetail>("item-delete", { item: treeItem });
	}

	_onListItemMouseOver(e: MouseEvent) {
		const target = e.target;

		if (this._isInstanceOfTreeItemBase(target)) {
			this.fireEvent<TreeItemMouseoverEventDetail>("item-mouseover", { item: target });
		}
	}

	_onListItemMouseOut(e: MouseEvent) {
		const target = e.target;

		if (this._isInstanceOfTreeItemBase(target)) {
			this.fireEvent<TreeItemMouseoutEventDetail>("item-mouseout", { item: target });
		}
	}

	_onListSelectionChange(e: CustomEvent<ListSelectionChangeEventDetail>) {
		const previouslySelectedItems = e.detail.previouslySelectedItems as Array<TreeItemBase>;
		const selectedItems = e.detail.selectedItems as Array<TreeItemBase>;
		const targetItem = e.detail.targetItem as TreeItemBase;

		previouslySelectedItems.forEach(item => {
			item.selected = false;
		});
		selectedItems.forEach(item => {
			item.selected = true;
		});

		this.fireEvent<TreeSelectionChangeEventDetail>("selection-change", {
			previouslySelectedItems,
			selectedItems,
			targetItem,
		});
	}

	_prepareTreeItems() {
		// set level to tree items
		this.walk((item, level, index) => {
			const parent = item.parentNode;
			const ariaSetSize = (parent && parent.children.length) || this.items.length;

			item.setAttribute("level", level.toString());

			item._setsize = ariaSetSize;
			item._posinset = index + 1;
		});
	}

	/**
	 * Returns the corresponding list item for a given tree item
	 *
	 * @param item The tree item
	 * @protected
	 */
	_getListItemForTreeItem(item: TreeItemBase) {
		return this.getItems().find(listItem => listItem === item);
	}

	/**
	 * Returns the a flat array of all tree items
	 * @protected
	 * @returns array of the tree items
	 */
	getItems(): Array<TreeItemBase> {
		return this.list.getItems();
	}

	/**
	 * Focus a tree item by its index in the flat array of all tree items
	 * @protected
	 * @param index
	 */
	focusItemByIndex(index: number) {
		const item = this.getItems()[index];
		item && this.list.focusItem(item);
	}

	/**
	 * Perform Depth-First-Search walk on the tree and run a callback on each node
	 *
	 * @public
	 * @param callback function to execute on each node of the tree with 3 arguments: the node, the level and the index
	 */
	walk(callback: WalkCallback): void {
		walkTree(this, 1, callback);
	}

	_isInstanceOfTreeItemBase(object: any): object is TreeItemBase {
		return "isTreeItem" in object;
	}
}

const walkTree = (el: Tree | ITreeItem, level: number, callback: WalkCallback) => {
	(el.items).forEach((item, index) => {
		callback(item, level, index);
		if (item.items.length > 0) {
			walkTree(item, level + 1, callback);
		}
	});
};

Tree.define();

export default Tree;

export type {
	TreeItemToggleEventDetail,
	TreeItemMouseoverEventDetail,
	TreeItemMouseoutEventDetail,
	TreeItemClickEventDetail,
	TreeItemDeleteEventDetail,
	TreeSelectionChangeEventDetail,
};
