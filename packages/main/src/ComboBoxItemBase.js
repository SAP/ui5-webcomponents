import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @public
 */
const metadata = {
	properties: /** @lends  sap.ui.webcomponents.main.ComboBoxItemBase.prototype */ {
	},
};

/**
 * @class
 * Base combobox item class
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ComboBoxItemBase
 * @extends UI5Element
 * @implements sap.ui.webcomponents.main.IComboBoxItem
 * @public
 */
class ComboBoxItemBase extends UI5Element {
	static get metadata() {
		return metadata;
	}

	/**
	 * Used to avoid tag name checks
	 * @protected
	 * @abstract
	 */
	get isGroupItem() {
		return undefined;
	}

	/**
	 * @abstract
	 */
	get effectiveText() {
		return undefined;
	}
}

export default ComboBoxItemBase;
