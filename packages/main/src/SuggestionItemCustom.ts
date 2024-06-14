import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { IInputSuggestionItemSelectable } from "./Input.js";
import ListItemCustom from "./ListItemCustom.js";

/**
 * @class
 * The `ui5-suggestion-item-custom` is type of suggestion item,
 * that can be used to place suggestion items with custom content in the input.
 * The text property is considered only for autocomplete.
 * In case the user needs highlighting functionality, check "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js"
 *
 * @constructor
 * @extends ListItemCustom
 * @public
 * @implements { IInputSuggestionItem }
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-suggestion-item-custom",
})
class SuggestionItemCustom extends ListItemCustom implements IInputSuggestionItemSelectable {
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
