import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import findClosestPosition from "@ui5/webcomponents-base/dist/util/dragAndDrop/findClosestPosition.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import DropIndicator from "./DropIndicator.js";
import TreeItem from "./TreeItem.js";
import type TreeItemBase from "./TreeItemBase.js";
import TreeItemCustom from "./TreeItemCustom.js";
import TreeList from "./TreeList.js";
import ListMode from "./types/ListMode.js";
import type {
	TreeItemBaseToggleEventDetail,
	TreeItemBaseStepInEventDetail,
	TreeItemBaseStepOutEventDetail,
} from "./TreeItemBase.js";
import type {
	ListItemClickEventDetail,
	ListItemDeleteEventDetail,
	ListItemFocusEventDetail,
	ListSelectionChangeEventDetail,
} from "./List.js";

// Template
import TreeTemplate from "./generated/templates/TreeTemplate.lit.js";

// Styles
import TreeCss from "./generated/themes/Tree.css.js";

type TreeMoveEventDetail = {
	source: {
		element: HTMLElement,
	},
	destination: {
		element: HTMLElement,
		placement: `${MovePlacement}`,
	}
}

type TreeItemEventDetail = {
	item: TreeItemBase,
}
type TreeItemToggleEventDetail = TreeItemEventDetail;
type TreeItemMouseoverEventDetail = TreeItemEventDetail;
type TreeItemMouseoutEventDetail = TreeItemEventDetail;
type TreeItemClickEventDetail = TreeItemEventDetail;
type TreeItemDeleteEventDetail = TreeItemEventDetail;
type TreeItemFocusEventDetail = TreeItemEventDetail;
type TreeSelectionChangeEventDetail = {
	selectedItems: Array<TreeItemBase>;
	previouslySelectedItems: Array<TreeItemBase>;
	targetItem: TreeItemBase;
}
type WalkCallback = (item: TreeItemBase, level: number, index: number) => void;

/**
 * @class
 *
 * ### Overview
 * The `ui5-tree` component provides a tree structure for displaying data in a hierarchy.
 *
 * ### Usage
 *
 * #### When to use:
 *
 * - To display hierarchically structured items.
 * - To select one or more items out of a set of hierarchically structured items.
 *
 * #### When not to use:
 *
 * - To display items not hierarchically structured. In this case, use the List component.
 * - To select one item from a very small number of non-hierarchical items. Select or ComboBox might be more appropriate.
 * - The hierarchy turns out to have only two levels. In this case, use List with group items.
 *
 * ### Keyboard Handling
 *
 * The `ui5-tree` provides advanced keyboard handling.
 * The user can use the following keyboard shortcuts in order to navigate trough the tree:
 *
 * - [Up] or [Down] - Navigates up and down the tree items that are currently visible.
 * - [Right] - Drills down the tree by expanding the tree nodes.
 * - [Left] - Goes up the tree and collapses the tree nodes.
 *
 * The user can use the following keyboard shortcuts to perform selection,
 * when the `mode` property is in use:
 *
 * - [Space] - Selects the currently focused item upon keyup.
 * - [Enter]  - Selects the currently focused item upon keydown.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Tree.js";`
 *
 * `import "@ui5/webcomponents/dist/TreeItem.js";`
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
		DropIndicator,
	],
})
/**
 * Fired when a tree item is expanded or collapsed.
 *
 * **Note:** You can call `preventDefault()` on the event object to suppress the event, if needed.
 * This may be handy for example if you want to dynamically load tree items upon the user expanding a node.
 * Even if you prevented the event's default behavior, you can always manually call `toggle()` on a tree item.
 * @param {HTMLElement} item the toggled item.
 * @allowPreventDefault
 * @public
 */
@event<TreeItemToggleEventDetail>("item-toggle", {
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
@event<TreeItemMouseoverEventDetail>("item-mouseover", {
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
@event<TreeItemMouseoutEventDetail>("item-mouseout", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})
/**
 * Fired when a tree item is activated.
 * @allowPreventDefault
 * @param {HTMLElement} item The clicked item.
 * @public
 */
@event<TreeItemClickEventDetail>("item-click", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})

/**
 * Fired when the Delete button of any tree item is pressed.
 *
 * **Note:** A Delete button is displayed on each item,
 * when the component `mode` property is set to `Delete`.
 * @param {HTMLElement} item the deleted item.
 * @public
 */
@event<TreeItemDeleteEventDetail>("item-delete", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})

/**
 * Fired when a tree item is focused.
 * @param {HTMLElement} item The focused item.
 * @private
 */
@event<TreeItemFocusEventDetail>("item-focus", {
	detail: {
		item: { type: HTMLElement },
	},
})

/**
 * Fired when selection is changed by user interaction
 * in `SingleSelect`, `SingleSelectBegin`, `SingleSelectEnd` and `MultiSelect` modes.
 * @param {Array} selectedItems An array of the selected items.
 * @param {Array} previouslySelectedItems An array of the previously selected items.
 * @param {HTMLElement} targetItem The item triggering the event.
 * @public
 */
@event<TreeSelectionChangeEventDetail>("selection-change", {
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
	 * Defines the mode of the component. Since the tree uses a `ui5-list` to display its structure,
	 * the tree modes are exactly the same as the list modes, and are all applicable.
	 * @public
	 * @default "None"
	 */
	@property({ type: ListMode, defaultValue: ListMode.None })
	mode!: `${ListMode}`;

	/**
	 * Defines the text that is displayed when the component contains no items.
	 * @default ""
	 * @public
	 */
	@property()
	noDataText!: string;

	/**
	 * Defines the component header text.
	 *
	 * **Note:** If the `header` slot is set, this property is ignored.
	 * @default ""
	 * @public
	 */
	@property()
	headerText!: string;

	/**
	 * Defines the component footer text.
	 * @default ""
	 * @public
	 */
	@property()
	footerText!: string;

	/**
	 * Defines the accessible name of the component.
	 * @default ""
	 * @public
	 * @since 1.8.0
	 */
	@property()
	accessibleName!: string;

	/**
	 * Defines the IDs of the elements that label the component.
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
	 *
	 * **Note:** Use `ui5-tree-item` for the intended design.
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: Array<TreeItemBase>;

	/**
	 * Defines the component header.
	 *
	 * **Note:** When the `header` slot is set, the
	 * `headerText` property is ignored.
	 * @public
	 */
	@slot()
	header!: Array<HTMLElement>;

	onEnterDOM() {
		DragRegistry.subscribe(this);
	}

	onExitDOM() {
		DragRegistry.unsubscribe(this);
	}

	onBeforeRendering() {
		this._prepareTreeItems();
	}

	onAfterRendering() {
		// Note: this is a workaround for the problem that the list cannot invalidate itself when its only physical child is a slot (and the list items are inside the slot)
		// This code should be removed once a framework-level fix is implemented
		this.shadowRoot!.querySelector<TreeList>("[ui5-tree-list]")!.onBeforeRendering();
	}

	get dropIndicatorDOM(): DropIndicator | null {
		return this.shadowRoot!.querySelector("[ui5-drop-indicator]");
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

	_ondragenter(e: DragEvent) {
		e.preventDefault();
	}

	_ondragleave(e: DragEvent) {
		if (e.relatedTarget instanceof Node && this.shadowRoot!.contains(e.relatedTarget)) {
			return;
		}

		this.dropIndicatorDOM!.targetReference = null;
	}

	_ondragover(e: DragEvent) {
		const draggedElement = DragRegistry.getDraggedElement();
		const allItemsTraversed: Array<TreeItemBase> = []; // use the actual items for rearranging
		const allLiNodesTraversed: Array<HTMLElement> = []; // use the only <li> nodes to determine positioning
		if (!(e.target instanceof HTMLElement) || !draggedElement) {
			return;
		}

		this.walk(item => {
			allItemsTraversed.push(item);
			allLiNodesTraversed.push(item.shadowRoot!.querySelector("li")!);
		});

		const closestPosition = findClosestPosition(
			allLiNodesTraversed,
			e.clientY,
			Orientation.Vertical,
		);

		if (!closestPosition) {
			this.dropIndicatorDOM!.targetReference = null;
			return;
		}

		let placements = closestPosition.placements;

		closestPosition.element = allItemsTraversed[allLiNodesTraversed.indexOf(closestPosition.element)];

		if (closestPosition.element === draggedElement) {
			placements = placements.filter(placement => placement !== MovePlacement.On);
		}

		const placementAccepted = placements.some(placement => {
			const closestElement = closestPosition.element;
			const beforeItemMovePrevented = !draggedElement.contains(closestElement) && !this.fireEvent<TreeMoveEventDetail>("move-over", {
				source: {
					element: draggedElement,
				},
				destination: {
					element: closestElement,
					placement,
				},
			}, true);

			if (beforeItemMovePrevented) {
				e.preventDefault();
				this.dropIndicatorDOM!.targetReference = closestElement;
				this.dropIndicatorDOM!.placement = placement;
				return true;
			}

			return false;
		});

		if (!placementAccepted) {
			this.dropIndicatorDOM!.targetReference = null;
		}
	}

	_ondrop(e: DragEvent) {
		e.preventDefault();

		const draggedElement = DragRegistry.getDraggedElement()!;
		this.fireEvent<TreeMoveEventDetail>("move", {
			source: {
				element: draggedElement,
			},
			destination: {
				element: this.dropIndicatorDOM!.targetReference!,
				placement: this.dropIndicatorDOM!.placement,
			},
		});
		draggedElement.focus();
		this.dropIndicatorDOM!.targetReference = null;
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

	_onListItemFocus(e: CustomEvent<ListItemFocusEventDetail>) {
		const treeItem = e.detail.item as TreeItemBase;
		this.fireEvent<TreeItemFocusEventDetail>("item-focus", { item: treeItem });
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

			item.forcedSetsize = ariaSetSize;
			item.forcedPosinset = index + 1;
		});
	}

	/**
	 * Returns the corresponding list item for a given tree item
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

const walkTree = (el: Tree | TreeItemBase, level: number, callback: WalkCallback) => {
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
	TreeMoveEventDetail,
	TreeItemToggleEventDetail,
	TreeItemMouseoverEventDetail,
	TreeItemMouseoutEventDetail,
	TreeItemClickEventDetail,
	TreeItemDeleteEventDetail,
	TreeItemFocusEventDetail,
	TreeSelectionChangeEventDetail,
	WalkCallback,
};
