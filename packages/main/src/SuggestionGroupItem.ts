import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import GroupHeaderListItem from "./GroupHeaderListItem.js";

/**
 * @class
 * The <code>ui5-suggestion-group-item</code> is type of suggestion item,
 * that can be used to split the <code>ui5-input</code> suggestions into groups.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.SuggestionGroupItem
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-suggestion-group-item
 * @implements sap.ui.webc.main.IInputSuggestionItem
 * @public
 * @since 1.0.0-rc.15
 */
@customElement("ui5-suggestion-group-item")
class SuggestionGroupItem extends UI5Element {
	/**
	 * Defines the text of the <code>ui5-suggestion-group-item</code>.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.SuggestionGroupItem.prototype.text
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	text!: string;

	static get dependencies() {
		return [
			GroupHeaderListItem,
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

SuggestionGroupItem.define();

export default SuggestionGroupItem;
