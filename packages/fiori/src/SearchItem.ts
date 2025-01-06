import { property, slot } from "@ui5/webcomponents-base/dist/decorators.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";

import SearchItemTemplate from "./generated/templates/SearchItemTemplate.lit.js";
// import SearchItemTemplate from "./generated/templates/SearchItemTemplate.js";
import SearchItemCss from "./generated/themes/SearchItem.css.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js";
// import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

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
 * @since 2.0.0
 * @experimental This component is availabe since 2.0 under an experimental flag and its API and behaviour are subject to change.
 */
@customElement({
	tag: "ui5-search-item",
	languageAware: true,
	renderer: litRender,
	template: SearchItemTemplate,
	styles: [
		ListItemBase.styles,
		SearchItemCss,
	],
	dependencies: [
		Button,
		Icon,
		Select,
		Option,
		Tag,
	],
})

class SearchItem extends ListItemBase {
	@property()
	headingText = "";

	@property()
	subheadingText?: string;

	@property()
	additionalText?: string;

	@property()
	additionalTextState: `${ValueState}` = "None";

	@property()
	icon?: string;

	@property()
	highlightText = "";

	@property({ type: Boolean })
	selected = false;

	@property()
	scopeName?: string;

	@slot()
	avatar!: Array<HTMLElement>;

	_markupText = "";

	get _hasAvatar(): boolean {
		return !!this.avatar.length;
	}

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
