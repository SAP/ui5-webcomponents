import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SearchItemShowMoreTemplate from "./SearchItemShowMoreTemplate.js";
import SearchItemCss from "./generated/themes/SearchItem.css.js";
import SearchItemShowMoreCss from "./generated/themes/SearchItemShowMore.css.js";

/**
 * @class
 * ### Overview
 *
 *A `ui5-search-item-show-more` is a special type of ui5-list-item that acts as a button to progressively reveal additional (overflow) items within a group.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SearchItemShowMore.js";`
 *
 * @constructor
 * @extends ListItemBase
 * @public
 * @since 2.13.0
 * @experimental
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

class SearchItemShowMore extends ListItemBase {
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
