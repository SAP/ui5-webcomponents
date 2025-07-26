import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SearchItemShowMoreTemplate from "./SearchItemShowMoreTemplate.js";
import SearchItemCss from "./generated/themes/SearchItem.css.js";
import SearchItemShowMoreCss from "./generated/themes/SearchItemShowMore.css.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import SearchItem from "./SearchItem.js";

/**
 * @class
 * A suggestion item that acts as a "show more" button or group separator.
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

/* could be removed */
@event("show-more")

class SearchItemShowMore extends SearchItem {
	eventDetails!: SearchItem["eventDetails"] & {
		"show-more": void,
	};
	/**
	 * Defines the heading text of the search item.
	 * @public
	 */

	@property()
	text?: string;

	/* could be removed */
	_onclick() {
		this.fireDecoratorEvent("show-more");
	}

	/* could be removed */
	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e) || isSpace(e)) {
			this.fireDecoratorEvent("show-more");
		}
	}
}

SearchItemShowMore.define();

export default SearchItemShowMore;
