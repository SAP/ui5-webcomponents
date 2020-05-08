import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
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
		level: {
			type: Integer,
		},
		icon: {
			type: String,
		},
		expanded: {
			type: Boolean,
		},

		_showToggle: {
			type: Boolean,
		},

		hasTitle: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.TreeListItem.prototype */ {
		/**
		 * Defines the text of the <code>ui5-li</code>.
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
		toggle: {},
	},
};

/**
 * @class
 * The <code>ui5-li-tree</code> represents a node in a tree structure, shown as a <code>ui5-list</code>.
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

	onBeforeRendering(...params) {
		super.onBeforeRendering(...params);
		this.hasTitle = !!this.textContent;
	}

	get styles() {
		const indent = this.level * 0.5;

		return {
			toggleBox: {
				"padding-left": `${indent}rem`,
			},
		};
	}

	get _toggleIcon() {
		return this.expanded ? "navigation-down-arrow" : "navigation-right-arrow";
	}

	_toggleClick(event) {
		event.stopPropagation();
		this.fireEvent("toggle", { item: this });
	}
}

TreeListItem.define();

export default TreeListItem;
