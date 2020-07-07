import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import TreeListItem from "./TreeListItem.js";

import SideNavigationSubItemTemplate from "./generated/templates/SideNavigationSubItemTemplate.lit.js";

// Styles
import SideNavigationSubItemCss from "./generated/themes/SideNavigationSubItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-side-navigation-sub-item",
	properties: /** @lends sap.ui.webcomponents.main.SideNavigationSubItem.prototype */ {
		//
	},
	slots: /** @lends sap.ui.webcomponents.main.SideNavigationSubItem.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.SideNavigationSubItem.prototype */ {
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
 * For the <code>ui5-side-navigation-sub-item</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/SideNavigationSubItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SideNavigationSubItem
 * @extends UI5Element
 * @tagname ui5-side-navigation-sub-item
 * @public
 */
class SideNavigationSubItem extends TreeListItem {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return SideNavigationSubItemCss;
	}

	static get template() {
		// return SideNavigationSubItemTemplate;
	}

	static async onDefine() {

	}

	constructor() {
		super();

		this.level = 2;
	}
}

SideNavigationSubItem.define();

export default SideNavigationSubItem;
