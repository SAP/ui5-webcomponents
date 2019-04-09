import WebComponent from "@ui5/webcomponents-base/src/WebComponent";
import Function from "@ui5/webcomponents-base/src/types/Function";

/**
 * @public
 */
const metadata = {
	properties: /** @lends sap.ui.webcomponents.main.TabBase.prototype */{
		_tabIndex: {
			type: String,
			defaultValue: "-1",
		},

		_getTabContainerHeaderItemCallback: {
			type: Function,
		},
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

	getFocusDomRef() {
		let focusedDomRef = super.getFocusDomRef();

		if (this._getTabContainerHeaderItemCallback) {
			focusedDomRef = this._getTabContainerHeaderItemCallback();
		}

		return focusedDomRef;
	}

	isSeparator() {
		return false;
	}
}

export default TabBase;
