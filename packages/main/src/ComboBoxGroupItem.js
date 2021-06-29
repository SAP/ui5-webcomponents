import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import GroupHeaderListItem from "./GroupHeaderListItem.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-cb-group-item",
	properties: /** @lends  sap.ui.webcomponents.main.ComboBoxGroupItem.prototype */ {
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
		/**
		 * Indicates whether the input is focssed
		 * @private
		 */
		focused: {
			type: Boolean,
		},
	},
	slots: /** @lends  sap.ui.webcomponents.main.ComboBoxGroupItem.prototype */ {
	},
	events: /** @lends  sap.ui.webcomponents.main.ComboBoxGroupItem.prototype */ {
	},
};

/**
 * @class
 * The <code>ui5-combobox-group-item</code> is type of suggestion item,
 * that can be used to split the <code>ui5-combobox</code> suggestions into groups.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ComboBoxGroupItem
 * @extends UI5Element
 * @tagname ui5-cb-group-item
 * @public
 * @since 1.0.0-rc.15
 */
class ComboBoxGroupItem extends UI5Element {
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
}

ComboBoxGroupItem.define();

export default ComboBoxGroupItem;
