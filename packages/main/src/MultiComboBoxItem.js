import ComboBoxItem from "./ComboBoxItem.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-mcb-item",
	properties: /** @lends sap.ui.webc.main.MultiComboBoxItem.prototype */ {
		/**
		 * Defines the selected state of the component.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		selected: { type: Boolean },
	},
};

/**
 * @class
 * The <code>ui5-mcb-item</code> represents the item for a <code>ui5-multi-combobox</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.MultiComboBoxItem
 * @extends sap.ui.webc.main.ComboBoxItem
 * @tagname ui5-mcb-item
 * @implements sap.ui.webc.main.IMultiComboBoxItem
 * @public
 */
class MultiComboBoxItem extends ComboBoxItem {
	static get metadata() {
		return metadata;
	}

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}
}

MultiComboBoxItem.define();

export default MultiComboBoxItem;
