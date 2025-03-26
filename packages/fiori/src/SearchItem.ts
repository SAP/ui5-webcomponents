import { property } from "@ui5/webcomponents-base/dist/decorators.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import SearchItemTemplate from "./SearchItemTemplate.js";
import SearchItemCss from "./generated/themes/SearchItem.css.js";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";

/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search-item` is a list item, used for displaying search suggestions
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/fiori/dist/SearchItem.js";`
 *
 * @constructor
 * @extends ListItemBase
 * @public
 * @since 2.9.0
 * @experimental
 */
@customElement({
	tag: "ui5-search-item",
	languageAware: true,
	renderer: jsxRenderer,
	template: SearchItemTemplate,
	styles: [
		ListItemBase.styles,
		SearchItemCss,
	],
})

/**
 * Fired when delete button is pressed.
 *
 * @public
 */
@event("delete")

class SearchItem extends ListItemBase {
	eventDetails!: ListItemBase["eventDetails"] & {
		"delete": void,
	};
	/**
	 * Defines the heading text of the search item.
	 * @public
	 */
	@property()
	headingText = "";

	/**
	 * Defines the icon name of the search item.
	 * @public
	 */
	@property()
	icon = "";

	/**
	 * Defines whether the search item is selected.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines the scope of the search item
	 * @default false
	 * @public
	 */
	@property()
	scopeName?: string;

	@property()
	highlightText = "";

	_markupText = "";

	_onfocusin(e: FocusEvent) {
		super._onfocusin(e);

		this.selected = true;
	}

	_onfocusout() {
		this.selected = false;
	}

	_onDeleteButtonClick() {
		this.fireDecoratorEvent("delete");
	}

	onBeforeRendering(): void {
		super.onBeforeRendering();

		// bold the matched text
		this._markupText = this.highlightText ? generateHighlightedMarkup(this.headingText, this.highlightText) : this.headingText;
	}
}

SearchItem.define();

export default SearchItem;
