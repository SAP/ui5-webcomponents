import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";

import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import SuggestionListItem from "./SuggestionListItem.js";
import ListItemType from "./types/ListItemType.js";
import type { IInputSuggestionItem } from "./Input.js";

/**
 * @class
 * The `ui5-suggestion-item` represents the suggestion item of the `ui5-input`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @implements { IInputSuggestionItem }
 * @public
 */
@customElement({
	tag: "ui5-suggestion-item",
	dependencies: [SuggestionListItem],
})
class SuggestionItem extends UI5Element implements IInputSuggestionItem {
	/**
	 * Defines the text of the component.
	 * @default ""
	 * @public
	 */
	@property()
	text = "";

	/**
	 * Defines the visual indication and behavior of the item.
	 * Available options are `Active` (by default), `Inactive` and `Detail`.
	 *
	 * **Note:** When set to `Active`, the item will provide visual response upon press and hover,
	 * while when `Inactive` or `Detail` - will not.
	 * @default "Active"
	 * @public
	 * @since 1.0.0-rc.8
	*/
	@property()
	type: `${ListItemType}` = "Active";

	/**
	 * Defines the description displayed right under the item text, if such is present.
	 * @default undefined
	 * @public
	 */
	@property()
	description?: string;

	/**
	 * Defines the `icon` source URI.
	 *
	 * **Note:**
	 * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
	 * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines whether the `icon` should be displayed in the beginning of the item or in the end.
	 *
	 * **Note:** If `image` is set, the `icon` would be displayed after the `image`.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	iconEnd = false;

	/**
	 * Defines the `image` source URI.
	 *
	 * **Note:** The `image` would be displayed in the beginning of the item.
	 * @default undefined
	 * @public
	 */
	@property()
	image?: string;

	/**
	 * Defines the `additionalText`, displayed in the end of the item.
	 * @default undefined
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property()
	additionalText?: string;

	/**
	 * Defines the state of the `additionalText`.
	 * @default "None"
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property()
	additionalTextState: `${ValueState}` = "None";

	get groupItem() {
		return false;
	}
}

SuggestionItem.define();

export default SuggestionItem;
