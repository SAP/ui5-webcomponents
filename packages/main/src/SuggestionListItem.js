import StandardListItem from "./StandardListItem.js";
import SuggestionListItemTemplate from "./generated/templates/SuggestionListItemTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-suggestion-item",
};

/**
 * @class
 * The <code>ui5-li-suggestion-item</code> represents the suggestion item in the <code>ui5-input</code>
 * suggestion popover.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SuggestionListItem
 * @extends UI5Element
 */
class SuggestionListItem extends StandardListItem {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return SuggestionListItemTemplate;
	}
}

SuggestionListItem.define();

export default SuggestionListItem;
