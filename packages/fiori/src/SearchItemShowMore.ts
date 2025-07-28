import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SearchItemShowMoreTemplate from "./SearchItemShowMoreTemplate.js";
import SearchItemCss from "./generated/themes/SearchItem.css.js";
import SearchItemShowMoreCss from "./generated/themes/SearchItemShowMore.css.js";
import SearchItem from "./SearchItem.js";

/**
 * @class
 * A suggestion item that acts as a "show more" button.
 * @constructor
 * @extends SearchItem
 * @public
 */
@customElement({
	tag: "ui5-search-item-show-more",
	renderer: jsxRenderer,
	template: SearchItemShowMoreTemplate,
	styles: [
		ListItemBase.styles,
		SearchItemCss,
		SearchItemShowMoreCss,
	],
})

class SearchItemShowMore extends SearchItem {
	/**
	 * Defines the heading text of the search item.
	 * @public
	 * @default undefined
	 */
	@property()
	text?: string;
}

SearchItemShowMore.define();

export default SearchItemShowMore;
