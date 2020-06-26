import ListItem from "./ListItem.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import SideNavigationItemTemplate from "./generated/templates/SideNavigationItemTemplate.lit.js";

// Styles
import SideNavigationItemCss from "./generated/themes/SideNavigationItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-side-navigation-item",
	properties: /** @lends sap.ui.webcomponents.main.SideNavigationItem.prototype */ {
		text: {
			type: String,
		},

		icon: {
			type: String,
		},

		expandable: {
			type: Boolean,
		},

		expanded: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.SideNavigationItem.prototype */ {
		"default": {
			propertyName: "items",
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.SideNavigationItem.prototype */ {
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
 * For the <code>ui5-side-navigation-item</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/SideNavigationItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SideNavigationItem
 * @extends ListItem
 * @tagname ui5-side-navigation-item
 * @public
 */
class SideNavigationItem extends ListItem {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return SideNavigationItemCss;
	}

	static get template() {
		return SideNavigationItemTemplate;
	}

	static async onDefine() {

	}

	toggleExpanded() {
		this.expanded = !this.expanded;
	}

	get aclas() {
		return {
			content: {
				"ui5-sni-content": true,
				"ui5-sni-padding": !this.icon,
			},
			children: {
				"ui5-sni-children": true,
				"ui5-sni-children-shown": this.expanded,
			}
		};
	}

	get getActiveIcon() {
		if (!this.expandable) {
			return undefined;
		}

		return this.expanded ? "navigation-down-arrow" : "navigation-right-arrow";
	}
}

SideNavigationItem.define();

export default SideNavigationItem;
