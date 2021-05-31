import ComboBoxItem from "./ComboBoxItem.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-mcb-item",
	properties: /** @lends  sap.ui.webcomponents.main.MultiComboBoxItem.prototype */ {
		/**
		 * Defines the selected state of the component.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		selected: { type: Boolean },

		/**
		 * Defines the stable selector that you can use via getStableDomRef method.
		 * @public
		 * @type {string}
		 * @since 1.0.0-rc.11
		 */
		stableDomRef: {
			type: String,
		},
	},
};

/**
 * @class
 * The <code>ui5-mcb-item</code> represents the item for a <code>ui5-multi-combobox</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.MultiComboBoxItem
 * @extends ComboBoxItem
 * @tagname ui5-mcb-item
 * @implements sap.ui.webcomponents.main.IMultiComboBoxItem
 * @public
 */
class MultiComboBoxItem extends ComboBoxItem {
	static get metadata() {
		return metadata;
	}
}

MultiComboBoxItem.define();

export default MultiComboBoxItem;
