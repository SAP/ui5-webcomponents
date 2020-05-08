import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import TreeItem from "./TreeItem.js";
import List from "./List.js";
import TreeListItem from "./TreeListItem.js";

// Template
import TreeTemplate from "./generated/templates/TreeTemplate.lit.js";

// Styles
import TreeCss from "./generated/themes/Tree.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tree",
	properties: /** @lends sap.ui.webcomponents.main.Tree.prototype */ {
		_listItems: {
			type: Object,
			multiple: true,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Tree.prototype */ {
		"default": {
			type: HTMLElement,
			propertyName: "items",
		},
		header: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Tree.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-tree</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/Tree.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Tree
 * @extends UI5Element
 * @tagname ui5-tree
 * @public
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

	static async onDefine() {
		await Promise.all([
			List.define(),
			TreeListItem.define(),
			TreeItem.define(),
		]);
	}

	onBeforeRendering() {
		this._listItems = [];
		buildTree(this, 1, this._listItems);
	}

	onEnterDOM() {
		this._observer = new MutationObserver(this.onTreeStructureChange.bind(this));
		this._observer.observe(this, { attributes: true, childList: true, subtree: true });
	}

	onExitDOM() {
		this._observer.disconnect();
	}

	onTreeStructureChange() {
		this._listItems = []; // trigger onBeforeRendering by modifying the tracked property and force tree re-build
	}

	get hasChildren() {
		return this.items.length > 0;
	}
}

const buildTree = (el, level, result) => {
	el.items.forEach(item => {
		const listItem = {
			treeItem: item,
			level,
		};

		result.push(listItem);
		if (item.expanded && item.hasChildren) {
			buildTree(item, level + 1, result);
		}
	});
};

Tree.define();

export default Tree;
