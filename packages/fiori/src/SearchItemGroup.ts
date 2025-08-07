import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ListItemGroup from "@ui5/webcomponents/dist/ListItemGroup.js";
import type ListItemGroupHeader from "@ui5/webcomponents/dist/ListItemGroupHeader.js";
import SearchItemGroupCss from "./generated/themes/SearchItemGroup.css.js";
import ListBoxItemGroupTemplate from "@ui5/webcomponents/dist/ListBoxItemGroupTemplate.js";

/**
 * @class
 * The `ui5-search-item-group` is type of suggestion item,
 * that can be used to split the `ui5-search-item` suggestions into groups.
 * @constructor
 * @extends ListItemGroup
 * @public
 * @since 2.9.0
 * @experimental
 */
@customElement({
	tag: "ui5-search-item-group",
	styles: [
		ListItemGroup.styles,
		SearchItemGroupCss,
	],
	template: ListBoxItemGroupTemplate,
})
class SearchItemGroup extends ListItemGroup {
	get isGroupItem(): boolean {
		return true;
	}
}

SearchItemGroup.define();

export default SearchItemGroup;
