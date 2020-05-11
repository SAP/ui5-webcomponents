import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { isLeft, isRight } from "@ui5/webcomponents-base/dist/Keys.js";
import ListItem from "./ListItem.js";
import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/icons/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/icons/navigation-down-arrow.js";

// Template
import TreeListItemTemplate from "./generated/templates/TreeListItemTemplate.lit.js";

// Styles
import treeListItemCss from "./generated/themes/TreeListItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-tree",
	properties: /** @lends sap.ui.webcomponents.main.TreeListItem.prototype */ {

		/**
		 * Defines the indentation of the tree list item. Level 1 represents a top level tree node.
		 *
		 * @type {Integer}
		 * @public
		 * @defaultValue 1
		 */
		level: {
			type: Integer,
			defaultValue: 1,
		},

		/**
		 * If set, an icon will be displayed before the text, representing the tree item.
		 *
		 * @public
		 * @type {String}
		 * @defaultValue ""
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines whether the tree node is expanded or collapsed.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		expanded: {
			type: Boolean,
		},

		/**
		 * Defines whether the tree node has children. Nodes with children will have an expand/collapse button.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hasChildren: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.TreeListItem.prototype */ {
		/**
		 * Defines the text of the <code>ui5-li-tree</code>.
		 * <br><br>
		 * <b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	events: {

		/**
		 * Fired when the tree item is expanded or collapsed.
		 * @event
		 * @param {HTMLElement} item the toggled item.
		 * @public
		 */
		toggle: {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the user drills down into the tree hierarchy by pressing the right arrow on the tree node.
		 * @event
		 * @param {HTMLElement} item the item on which right arrow was pressed.
		 * @public
		 */
		stepIn: {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the user goes up the tree hierarchy by pressing the left arrow on the tree node.
		 * @event
		 * @param {HTMLElement} item the item on which left arrow was pressed.
		 * @public
		 */
		stepOut: {
			detail: {
				item: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 * The <code>ui5-li-tree</code> represents a node in a tree structure, shown as a <code>ui5-list</code>.
 * <br>
 * <i>Note:</i> Do not use <code>ui5-li-tree</code> directly in your apps. Use <code>ui5-tree-item</code> instead, as it can be nested inside a <code>ui5-tree</code>.
 * On the other hand, <code>ui5-li-tree</code> can only be slotted inside a <code>ui5-list</code>, being a list item. It may be useful if you want to build a custom tree component, for example.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TreeListItem
 * @extends ListItem
 * @tagname ui5-li-tree
 * @public
 */
class TreeListItem extends ListItem {
	static get render() {
		return litRender;
	}

	static get template() {
		return TreeListItemTemplate;
	}

	static get styles() {
		return [ListItem.styles, treeListItemCss];
	}

	static get metadata() {
		return metadata;
	}

	static async onDefine() {
		await Icon.define();
	}

	get styles() {
		const indent = this.level * 0.5;

		return {
			toggleBox: {
				"padding-left": `${indent}rem`,
			},
		};
	}

	get hasParent() {
		return this.level > 1;
	}

	get _toggleIconName() {
		return this.expanded ? "navigation-down-arrow" : "navigation-right-arrow";
	}

	_toggleClick(event) {
		event.stopPropagation();
		this.fireEvent("toggle", { item: this });
	}

	_onkeydown(event) {
		super._onkeydown(event);

		if (this.hasChildren && isRight(event)) {
			if (!this.expanded) {
				this.fireEvent("toggle", { item: this });
			} else {
				this.fireEvent("stepIn", { item: this });
			}
		}

		if (isLeft(event)) {
			if (this.expanded) {
				this.fireEvent("toggle", { item: this });
			} else if (this.hasParent) {
				this.fireEvent("stepOut", { item: this });
			}
		}
	}
}

TreeListItem.define();

export default TreeListItem;
