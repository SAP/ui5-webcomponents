import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";

import type { IInputSuggestionItem } from "./Input.js";
import ListItemBase from "./ListItemBase.js";
import SuggestionItemTemplate from "./generated/templates/SuggestionItemTemplate.lit.js";

/**
 * @class
 * The `ui5-suggestion-item` represents the suggestion item of the `ui5-input`.
 * @constructor
 * @extends ListItemBase
 * @abstract
 * @implements { IInputSuggestionItem }
 * @public
 */
@customElement({
	tag: "ui5-suggestion-item",
	template: SuggestionItemTemplate,
})
class SuggestionItem extends ListItemBase implements IInputSuggestionItem {
	/**
	 * Defines the text of the component.
	 * @default ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Defines the `additionalText`, displayed in the end of the item.
	 * @default ""
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property()
	additionalText!: string;

	/**
	 * Defubes the markup text that will be displayed as suggestion.
	 * Used for highlighting the matching parts of the text.
	 *
	 * @since 2.0.0
	 * @private
	 */
	@property()
	markupText!: string;

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}
}

SuggestionItem.define();

export default SuggestionItem;
