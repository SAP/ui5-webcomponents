import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
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
}

SuggestionItemGroup.define();

export default SuggestionItemGroup;
