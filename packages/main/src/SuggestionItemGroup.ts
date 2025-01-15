import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import type SuggestionListItem from "./SuggestionListItem.js";
import ListItemGroup from "./ListItemGroup.js";

/**
 * @class
 * The `ui5-suggestion-item-group` is type of suggestion item,
 * that can be used to split the `ui5-input` suggestions into groups.
 * @constructor
 * @extends ListItemGroup
 * @public
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-suggestion-item-group",
})
class SuggestionItemGroup extends ListItemGroup {
	/**
	 * Defines the items of the <code>ui5-suggestion-item-group</code>.
	 * @public
	 */
	@slot({
		"default": true,
		invalidateOnChildChange: true,
		type: HTMLElement,
	})
	items!: Array<SuggestionListItem>;
}

SuggestionItemGroup.define();

export default SuggestionItemGroup;
