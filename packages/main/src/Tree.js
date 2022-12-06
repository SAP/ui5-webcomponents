import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import TreeItem from "./TreeItem.js";
import TreeItemCustom from "./TreeItemCustom.js";
import TreeList from "./TreeList.js";
import ListMode from "./types/ListMode.js";

// Template
import TreeTemplate from "./generated/templates/TreeTemplate.lit.js";

// Styles
import TreeCss from "./generated/themes/Tree.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tree",
	properties: /** @lends sap.ui.webc.main.Tree.prototype */ {
		/**
		 * Defines the mode of the component. Since the tree uses a <code>ui5-list</code> to display its structure,
		 * the tree modes are exactly the same as the list modes, and are all applicable.
		 *
		 * <br><br>
		 * <b>Note:</b>
		 *
		 * <ul>
		 * <li><code>None</code></li>
		 * <li><code>SingleSelect</code></li>
		 * <li><code>SingleSelectBegin</code></li>
		 * <li><code>SingleSelectEnd</code></li>
		 * <li><code>MultiSelect</code></li>
		 * <li><code>Delete</code></li>
		 * </ul>
		 *
		 * @public
		 * @type {sap.ui.webc.main.types.ListMode}
		 * @defaultValue "None"
		 */
		mode: {
			type: ListMode,
			defaultValue: ListMode.None,
		},

		/**
		 * Defines the text that is displayed when the component contains no items.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		noDataText: {
			type: String,
		},

		/**
		 * Defines the component header text.
		 * <br><br>
		 * <b>Note:</b> If the <code>header</code> slot is set, this property is ignored.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		headerText: {
			type: String,
		},

		/**
		 * Defines the component footer text.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		footerText: {
			type: String,
		},

		/**
		 * Defines the accessible name of the component.
		 *
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 * @since 1.8.0
		 */
		 accessibleName: {
			type: String,
		},

		/**
		 * Defines the IDs of the elements that label the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.8.0
		 */
		accessibleNameRef: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the description for the accessible role of the component.
		 * @protected
		 * @type {string}
		 * @defaultvalue undefined
		 * @since 1.10.0
		 */

		 accessibleRoleDescription: {
			type: String,
			defaultValue: undefined,
			noAttribute: true,
		},

		/**
		 * An array, containing a flat structure of list items to render
		 *
		 * @private
		 */
		_listItems: {
			type: Object,
			multiple: true,
		},

		/**
		 * Shows the toggle button at the end, rather than at the beginning of the items
		 *
		 * @protected
		 * @since 1.0.0-rc.8
		 */
		_toggleButtonEnd: {
			type: Boolean,
		},

		/**
		 * Represents the tree in a very minimal state - icons only with no text and no toggle buttons
		 *
		 * @protected
		 * @since 1.0.0-rc.8
		 */
		_minimal: {
			type: Boolean,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webc.main.Tree.prototype */ {

		/**
		 * Defines the items of the component. Tree items may have other tree items as children.
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-tree-item</code> for the intended design.
		 *
		 * @type {sap.ui.webc.main.ITreeItem[]}
		 * @slot items
		 * @public
		 */
		"default": {
			type: HTMLElement,
			propertyName: "items",
			invalidateOnChildChange: true,
		},

		/**
		 * Defines the component header.
		 * <br><br>
		 * <b>Note:</b> When the <code>header</code> slot is set, the
		 * <code>headerText</code> property is ignored.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		header: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webc.main.Tree.prototype */ {

		/**
		 * Fired when a tree item is expanded or collapsed.
		 * <i>Note:</i> You can call <code>preventDefault()</code> on the event object to suppress the event, if needed.
		 * This may be handy for example if you want to dynamically load tree items upon the user expanding a node.
		 * Even if you prevented the event's default behavior, you can always manually call <code>toggle()</code> on a tree item.
		 *
		 * @event sap.ui.webc.main.Tree#item-toggle
		 * @param {HTMLElement} item the toggled item.
		 * @allowPreventDefault
		 * @public
		 */
		"item-toggle": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the mouse cursor enters the tree item borders.
		 * @event sap.ui.webc.main.Tree#item-mouseover
		 * @param {HTMLElement} item the hovered item.
		 * @since 1.0.0-rc.16
		 * @public
		 */
		"item-mouseover": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the mouse cursor leaves the tree item borders.
		 * @event sap.ui.webc.main.Tree#item-mouseout
		 * @param {HTMLElement} item the hovered item.
		 * @since 1.0.0-rc.16
		 * @public
		 */
		"item-mouseout": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when a tree item is activated.
		 *
		 * @event sap.ui.webc.main.Tree#item-click
		 * @allowPreventDefault
		 * @param {HTMLElement} item The clicked item.
		 * @public
		 */
		"item-click": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the Delete button of any tree item is pressed.
		 * <br><br>
		 * <b>Note:</b> A Delete button is displayed on each item,
		 * when the component <code>mode</code> property is set to <code>Delete</code>.
		 *
		 * @event sap.ui.webc.main.Tree#item-delete
		 * @param {HTMLElement} item the deleted item.
		 * @public
		 */
		"item-delete": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when selection is changed by user interaction
		 * in <code>SingleSelect</code>, <code>SingleSelectBegin</code>, <code>SingleSelectEnd</code> and <code>MultiSelect</code> modes.
		 *
		 * @event sap.ui.webc.main.Tree#selection-change
		 * @param {Array} selectedItems An array of the selected items.
		 * @param {Array} previouslySelectedItems An array of the previously selected items.
		 * @param {HTMLElement} targetItem The item triggering the event.
		 * @public
		 */
		"selection-change": {
			detail: {
				selectedItems: { type: Array },
				previouslySelectedItems: { type: Array },
				targetItem: { type: HTMLElement },
			},
		},
	},
};

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
 * <li>To display items not hierarchically strcutured. In this case, use the List component.</li>
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
 * @author SAP SE
 * @alias sap.ui.webc.main.Tree
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-tree
 * @appenddocs TreeItem
 * @public
 * @since 1.0.0-rc.8
 */
class Tree extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return TreeCss;
	}

	static get template() {
		return TreeTemplate;
	}

	static get dependencies() {
		return [
			TreeList,
			TreeItem,
			TreeItemCustom,
		];
	}

	onBeforeRendering() {
		this._prepareTreeItems();
	}

	get list() {
		return this.getDomRef();
	}

	get _role() {
		return this._minimal ? "menubar" : "tree";
	}

	get _label() {
		return getEffectiveAriaLabelText(this);
	}

	_onListItemStepIn(event) {
		const treeItem = event.detail.item;
		if (treeItem.items.length > 0) {
			const firstChild = treeItem.items[0];
			const firstChildListItem = this._getListItemForTreeItem(firstChild);
			firstChildListItem && this.list.focusItem(firstChildListItem);
		}
	}

	_onListItemStepOut(event) {
		const treeItem = event.detail.item;
		if (treeItem.parentElement !== this) {
			const parent = treeItem.parentElement;
			const parentListItem = this._getListItemForTreeItem(parent);
			parentListItem && this.list.focusItem(parentListItem);
		}
	}

	_onListItemToggle(event) {
		const treeItem = event.detail.item;
		const defaultPrevented = !this.fireEvent("item-toggle", { item: treeItem }, true);
		if (!defaultPrevented) {
			treeItem.toggle();
		}
	}

	_onListItemClick(event) {
		const treeItem = event.detail.item;

		if (!this.fireEvent("item-click", { item: treeItem }, true)) {
			event.preventDefault();
		}
	}

	_onListItemDelete(event) {
		const treeItem = event.detail.item;
		this.fireEvent("item-delete", { item: treeItem });
	}

	_onListItemMouseOver(event) {
		const target = event.target;

		if (target.isTreeItem) {
			this.fireEvent("item-mouseover", { item: target });
		}
	}

	_onListItemMouseOut(event) {
		const target = event.target;

		if (target.isTreeItem) {
			this.fireEvent("item-mouseout", { item: target });
		}
	}

	_onListSelectionChange(event) {
		const previouslySelectedItems = event.detail.previouslySelectedItems;
		const selectedItems = event.detail.selectedItems;
		const targetItem = event.detail.targetItem;

		previouslySelectedItems.forEach(item => {
			item.selected = false;
		});
		selectedItems.forEach(item => {
			item.selected = true;
		});

		this.fireEvent("selection-change", {
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

			item.setAttribute("level", level);

			item._toggleButtonEnd = this._toggleButtonEnd;
			item._minimal = this._minimal;
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
	_getListItemForTreeItem(item) {
		return this.getItems().find(listItem => listItem === item);
	}

	/**
	 * Returns the a flat array of all tree items
	 * @protected
	 * @returns {Array}
	 */
	getItems() {
		return this.list.getItems();
	}

	/**
	 * Focus a tree item by its index in the flat array of all tree items
	 * @protected
	 * @param index
	 */
	focusItemByIndex(index) {
		const item = this.getItems()[index];
		item && this.list.focusItem(item);
	}

	/**
	 * Perform Depth-First-Search walk on the tree and run a callback on each node
	 *
	 * @public
	 * @param {function} callback function to execute on each node of the tree with 3 arguments: the node, the level and the index
	 */
	walk(callback) {
		walkTree(this, 1, callback);
	}
}

const walkTree = (el, level, callback) => {
	el.items.forEach((item, index) => {
		callback(item, level, index);
		if (item.items.length > 0) {
			walkTree(item, level + 1, callback);
		}
	});
};

Tree.define();

export default Tree;
