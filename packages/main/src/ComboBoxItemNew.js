import ComboBoxItemBase from "./ComboBoxItemBase.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-cb-item-new",
	properties: /** @lends  sap.ui.webcomponents.main.ComboBoxItem.prototype */ {
		/**
		 * Defines the text of the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		name: { type: String },

		/**
		 * Defines the text of the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		surname: { type: String },

		icon: { type: String },

		colorScheme: {
			type: String,
			defaultValue: "1",
		},
	},
};

/**
 * @class
 * The <code>ui5-cb-item</code> represents the item for a <code>ui5-combobox</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ComboBoxItemNew
 * @extends UI5Element
 * @tagname ui5-cb-item-new
 * @implements sap.ui.webcomponents.main.IComboBoxItem
 * @public
 */
class ComboBoxItemNew extends ComboBoxItemBase {
	static get metadata() {
		return metadata;
	}

	get effectiveText() {
		return `${this.name} ${this.surname}`;
	}
}

ComboBoxItemNew.define();

export default ComboBoxItemNew;
