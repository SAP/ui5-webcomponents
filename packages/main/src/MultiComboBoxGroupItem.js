import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import GroupHeaderListItem from "./GroupHeaderListItem.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-mcb-group-item",
	properties: /** @lends sap.ui.webcomponents.main.MultiComboBoxGroupItem.prototype */ {
		/**
		 * Defines the text of the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		text: {
			type: String,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.MultiComboBoxGroupItem.prototype */ {
	},
	events: /** @lends sap.ui.webcomponents.main.MultiComboBoxGroupItem.prototype */ {
	},
};

/**
 * @class
 * The <code>ui5-mcb-group-item</code> is type of suggestion item,
 * that can be used to split the <code>ui5-multi-combobox</code> suggestions into groups.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.MultiComboBoxGroupItem
 * @extends UI5Element
 * @tagname ui5-mcb-group-item
 * @public
 * @implements sap.ui.webcomponents.main.IMultiComboBoxItem
 * @since 1.4.0
 */
class MultiComboBoxGroupItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get dependencies() {
		return [
			GroupHeaderListItem,
		];
	}

	/**
	 * Used to avoid tag name checks
	 * @protected
	 */
	get isGroupItem() {
		return true;
	}

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}
}

MultiComboBoxGroupItem.define();

export default MultiComboBoxGroupItem;
