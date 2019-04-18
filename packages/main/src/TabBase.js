import WebComponent from "@ui5/webcomponents-base/src/WebComponent.js";

/**
 * @public
 */
const metadata = {
	properties: /** @lends sap.ui.webcomponents.main.TabBase.prototype */{
	},
	events: /** @lends sap.ui.webcomponents.main.TabBase.prototype */ {
	},
};

/**
 * @class
 * Represents a base class for all tabs inside a TabContainer.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TabBase
 * @extends sap.ui.webcomponents.base.WebComponent
 * @public
 */
class TabBase extends WebComponent {
	static get metadata() {
		return metadata;
	}

	isSeparator() {
		return false;
	}
}

export default TabBase;
