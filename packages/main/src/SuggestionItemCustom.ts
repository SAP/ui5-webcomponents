import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { IInputSuggestionItem } from "./Input.js";
import ListItemCustom from "./ListItemCustom.js";

/**
 * @class
 * The `ui5-suggestion-item-custom` is type of suggestion item,
 * that can be used to split the `ui5-input` suggestions into groups.
 * @constructor
 * @extends ListItemCustom
 * @abstract
 * @public
 * @implements { IInputSuggestionItem }
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-suggestion-item-custom",
})
class SuggestionItemCustom extends ListItemCustom implements IInputSuggestionItem {
	/**
	 * Defines the text of the `ui5-suggestion-item-custom`.
	 * @default ""
	 * @public
	 */
	@property()
	text!: string;
}

SuggestionItemCustom.define();

export default SuggestionItemCustom;
