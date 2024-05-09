import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ListItemGroupHeader from "./ListItemGroupHeader.js";
import type { IInputSuggestionItem } from "./Input.js";

/**
 * @class
 * The `ui5-suggestion-group-item` is type of suggestion item,
 * that can be used to split the `ui5-input` suggestions into groups.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @implements { IInputSuggestionItem }
 * @since 1.0.0-rc.15
 */
@customElement({
	tag: "ui5-suggestion-group-item",
	dependencies: [ListItemGroupHeader],
})
class SuggestionGroupItem extends UI5Element implements IInputSuggestionItem {
	/**
	 * Defines the text of the `ui5-suggestion-group-item`.
	 * @default ""
	 * @public
	 */
	@property()
	text = "";

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
