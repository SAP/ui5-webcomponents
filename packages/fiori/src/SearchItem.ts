import { property } from "@ui5/webcomponents-base/dist/decorators.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import SearchItemTemplate from "./SearchItemTemplate.js";
import SearchItemCss from "./generated/themes/SearchItem.css.js";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

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
 * @since
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

class SearchItem extends ListItemBase {
	@property()
	headingText = "";

	@property()
	icon?: string;

	@property()
	highlightText = "";

	@property({ type: Boolean })
	selected = false;

	@property()
	scopeName?: string;

	_markupText = "";

	_onfocusin(e: FocusEvent) {
		super._onfocusin(e);

		this.selected = true;
	}

	_onfocusout() {
		this.selected = false;
	}

	onBeforeRendering(): void {
		super.onBeforeRendering();

		// bold the matched text
		this._markupText = this.highlightText ? generateHighlightedMarkup(this.headingText, this.highlightText) : this.headingText;
	}
}

SearchItem.define();

export default SearchItem;
