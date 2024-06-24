import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import type { IInputSuggestionItemSelectable } from "./Input.js";
import ListItemBase from "./ListItemBase.js";

// Template
import SuggestionItemCustomTemplate from "./generated/templates/SuggestionItemCustomTemplate.lit.js";

/**
 * @class
 * The `ui5-suggestion-item-custom` is type of suggestion item,
 * that can be used to place suggestion items with custom content in the input.
 * The text property is considered only for autocomplete.
 * In case the user needs highlighting functionality, check "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js"
 *
 * @constructor
 * @extends ListItemBase
 * @public
 * @implements { IInputSuggestionItemSelectable }
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-suggestion-item-custom",
	template: SuggestionItemCustomTemplate,
})
class SuggestionItemCustom extends ListItemBase implements IInputSuggestionItemSelectable {
	/**
	 * Defines the text of the `ui5-suggestion-item-custom`.
	 * NOTE: The text property is considered only for autocomplete.
	 * @default ""
	 * @public
	 */
	@property()
	text = "";

	/**
	 * Defines the content of the component.
	 *
	 * @public
	 */
	@slot({ type: Node, "default": true, invalidateOnChildChange: true })
	content!: Array<Node>;
}

SuggestionItemCustom.define();

export default SuggestionItemCustom;
