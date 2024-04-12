import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

import ListItemType from "./types/ListItemType.js";
import type { IInputSuggestionItem } from "./Input.js";
import SuggestionItemTemplate from "./generated/templates/SuggestionItemTemplate.lit.js";
import ListItemBase from "./ListItemBase.js";

/**
 * @class
 * The `ui5-suggestion-item` represents the suggestion item of the `ui5-input`.
 * @constructor
 * @extends ListItemBase
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
	text!: string

	/**
	 * Defines the visual indication and behavior of the item.
	 * Available options are `Active` (by default), `Inactive` and `Detail`.
	 *
	 * **Note:** When set to `Active`, the item will provide visual response upon press and hover,
	 * while when `Inactive` or `Detail` - will not.
	 * @default "Active"
	 * @protected
	 * @since 1.0.0-rc.8
	*/
	@property({ type: ListItemType, defaultValue: ListItemType.Active })
	type!: `${ListItemType}`

	/**
	 * Defines the `additionalText`, displayed in the end of the item.
	 * @default ""
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property()
	additionalText!: string

	/**
	 * Defines the text of the component.
	 * @default ""
	 * @public
	 */
	@property({ type: Boolean, defaultValue: false })
	groupItem!: boolean

	/**
	 * Indicates whether the item is focssed
	 * @protected
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	 * Indicates whether the item is selected
	 * @protected
	 */
	@property({ type: Boolean })
	selected!: boolean;
}

SuggestionItem.define();

export default SuggestionItem;
