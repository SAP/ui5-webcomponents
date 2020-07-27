import ComboBoxItem from "./ComboBoxItem.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-mcb-item",
	properties: /** @lends  sap.ui.webcomponents.main.MultiComboBoxItem.prototype */ {
		/**
		 * Defines the selected state of the <code>ui5-mcb-item</code>.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		selected: { type: Boolean },
	},
};

/**
 * @class
 * The <code>ui5-cb-item</code> represents the item for a <code>ui5-multi-combobox</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.MultiComboBoxItem
 * @extends ComboBoxItem
 * @tagname ui5-mcb-item
 * @public
 */
class MultiComboBoxItem extends ComboBoxItem {
	static get metadata() {
		return metadata;
	}
}

MultiComboBoxItem.define();

export default MultiComboBoxItem;
