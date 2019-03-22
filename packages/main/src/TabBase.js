import WebComponent from "@ui5/webcomponents-base/src/WebComponent";

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
}

export default TabBase;
