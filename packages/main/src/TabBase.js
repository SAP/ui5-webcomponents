import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";

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
 * @extends sap.ui.webcomponents.base.UI5Element
 * @public
 */
class TabBase extends UI5Element {
	static get metadata() {
		return metadata;
	}

	isSeparator() {
		return false;
	}
}

export default TabBase;
