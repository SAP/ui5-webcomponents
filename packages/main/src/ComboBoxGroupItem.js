import SuggestionItem from "./SuggestionGroupItem";

/**
 * @public
 */
const metadata = {
	tag: "ui5-cb-group-item",
	properties: /** @lends  sap.ui.webcomponents.main.SuggestionGroupItem.prototype */ {
		/**
		 * Defines the text of the <code>ui5-suggestion-group-item</code>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		name: {
			type: String,
		},
	},
	slots: /** @lends  sap.ui.webcomponents.main.SuggestionGroupItem.prototype */ {
	},
	events: /** @lends  sap.ui.webcomponents.main.SuggestionGroupItem.prototype */ {
	},
};

/**
 * @class
 * The <code>ui5-combobox-group-item</code> is type of suggestion item,
 * that can be used to split the <code>ui5-input</code> suggestions into groups.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ComboBoxGroupItem
 * @extends UI5Element
 * @tagname ui5-cb-group-item
 * @implements sap.ui.webcomponents.main.ISuggestionGroupItem
 * @public
 * @since 1.0.0-rc.15
 */
class ComboBoxGroupItem extends SuggestionItem {
	static get metadata() {
		return metadata;
	}

	static get dependencies() {
		return [
			SuggestionItem,
		];
	}

	/**
	 * Indicates the "grouping" nature of the component
	 * to avoid tag name checks tag name to diferenciate from the standard suggestion item.
	 * @protected
	 */
	get groupItem() {
		return true;
	}
}

ComboBoxGroupItem.define();

export default ComboBoxGroupItem;
