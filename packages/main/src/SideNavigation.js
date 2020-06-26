import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import SideNavigationTemplate from "./generated/templates/SideNavigationTemplate.lit.js";

// Styles
import SideNavigationCss from "./generated/themes/SideNavigation.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-side-navigation",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.SideNavigation.prototype */ {
		//
	},
	slots: /** @lends sap.ui.webcomponents.main.SideNavigation.prototype */ {
		"default": {
			propertyName: "items",
			type: HTMLElement,
		},

		bottomItems: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.SideNavigation.prototype */ {
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
 * For the <code>ui5-side-navigation</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/SideNavigation.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SideNavigation
 * @extends UI5Element
 * @tagname ui5-side-navigation
 * @public
 */
class SideNavigation extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return SideNavigationCss;
	}

	static get template() {
		return SideNavigationTemplate;
	}

	static async onDefine() {

	}
}

SideNavigation.define();

export default SideNavigation;
