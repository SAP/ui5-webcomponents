import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import SearchPopupMode from "@ui5/webcomponents/dist/types/SearchPopupMode.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import List from "@ui5/webcomponents/dist/List.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import {
	isUp,
	isDown,
	isEnter,
	isBackSpace,
	isDelete,
	isEscape,
	isTabNext,
	isPageUp,
	isPageDown,
	isHome,
	isEnd,
} from "@ui5/webcomponents-base/dist/Keys.js";

import SearchTemplate from "./generated/templates/SearchTemplate.lit.js";
import SearchCss from "./generated/themes/Search.css.js";
import SearchField from "./SearchField.js";
import { StartsWith } from "@ui5/webcomponents/dist/Filters.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type SearchItem from "./SearchItem.js";

interface ISearchSuggestionItem extends UI5Element {
	headingText: string;
	items?: ISearchSuggestionItem[];
}

/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search` is an input field, used for user search.
 *
 * The `ui5-search` consists of several elements parts:
 * - Scope - displays a select in the beggining of the component, used for filtering results by their scope.
 * - Input field - for user input value
 * - Clear button - gives the possibility for deleting the entered value
 * - Search button - a primary button for performing search, when the user has entered a search term
 * - Expand/Collapse button - when there is no search term, the search button behaves as an expand/collapse button for the `ui5-search` component
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/fiori/dist/Search.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 * @experimental This component is availabe since 2.0 under an experimental flag and its API and behaviour are subject to change.
 */
@customElement({
	tag: "ui5-search",
	languageAware: true,
	renderer: litRender,
	template: SearchTemplate,
	styles: [
		SearchField.styles,
		SearchCss,
	],
	dependencies: [
		Button,
		Icon,
		Select,
		Option,
		Popover,
		List,
		BusyIndicator,
		Title,
		Text,
	],
})

/**
 * Fired when load more button is pressed.
 *
 * @public
 * @since 2.4.0
 */
@event("load-more")

class Search extends SearchField {
	eventDetails!: SearchField["eventDetails"] & {
		"load-more": void,
	}
	/**
	 * Defines the visualisation mode of the search component.
	 *
	 * @default "List"
	 * @public
	 */
	@property()
	popupMode: `${SearchPopupMode}` = "List";

	/**
	 * Defines whether the value will be autcompleted to match an item
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	noTypeahead = false;

	@property()
	headerText?: string;

	@property()
	subheaderText?: string;

	@property({ type: Boolean })
	showMore = false;

	@property()
	moreButtonText?: string;

	/**
	 * Indicates whether the items picker is open.
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_open = false;

	/**
	 * Defines the inner stored value of the component.
	 *
	 * **Note:** The property is updated upon typing. In some special cases the old value is kept (e.g. deleting the value after the dot in a float)
	 * @default ""
	 * @private
	 */
	@property({ noAttribute: true })
	_innerValue = "";

	/**
	 * Defines the Search suggestion items.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	items!: Array<SearchItem>;

	/**
	 * Defines the illustrated message to be shown in the popup.
	 *
	 * @public
	 */
	@slot()
	illustration!: HTMLElement;

	_shouldAutocomplete?: boolean;
	_performTextSelection?: boolean;
	typedInValue: string;

	constructor() {
		super();

		// The typed in value.
		this.typedInValue = "";
	}

	onBeforeRendering() {
		const innerInput = this.nativeInput;
		const autoCompletedChars = innerInput && (innerInput.selectionEnd! - innerInput.selectionStart!);

		// Typehead causes issues on Android devices, so we disable it for now
		// If there is already a selection the autocomplete has already been performed
		if (this._shouldAutocomplete && !autoCompletedChars) {
			const item = this._getFirstMatchingItem(this.value);

			if (item) {
				this._handleTypeAhead(item);
			} else {
				this.typedInValue = this.value;
			}
		} else {
			this.typedInValue = this.value;
		}

		this.items.forEach(item => {
			item.highlightText = this.typedInValue;
		});

		this._shouldAutocomplete = false;
	}

	get _flattenItems(): Array<ISearchSuggestionItem> {
		return this.getSlottedNodes<ISearchSuggestionItem>("items").flatMap(item => {
			return this._isGroupItem(item) ? [item, ...item.items!] : [item];
		});
	}

	_getFirstMatchingItem(current: string): ISearchSuggestionItem | undefined {
		if (!this._flattenItems.length) {
			return;
		}

		const matchingItems = this._startsWithMatchingItems(current).filter(item => !this._isGroupItem(item));

		if (matchingItems.length) {
			return matchingItems[0];
		}
	}

	_handleTypeAhead(item: ISearchSuggestionItem) {
		const value = item.headingText ? item.headingText : "";

		this.typedInValue = this.value;
		this._innerValue = value;
		this.value = value;
		this._performTextSelection = true;
	}

	_startsWithMatchingItems(str: string): Array<ISearchSuggestionItem> {
		return StartsWith(str, this._flattenItems, "headingText");
	}

	_isGroupItem(item: ISearchSuggestionItem) {
		return item.hasAttribute("ui5-search-item-group");
	}

	_onkeydown(e: KeyboardEvent) {
		this._shouldAutocomplete = !this.noTypeahead &&
			!(isBackSpace(e) || isDelete(e) || isEscape(e) || isUp(e) || isDown(e) || isTabNext(e) || isEnter(e) || isPageUp(e) || isPageDown(e) || isHome(e) || isEnd(e) || isEscape(e));
	}

	/**
	 * Returns a reference to the native input element
	 * @protected
	 */
	get nativeInput() {
		const domRef = this.getDomRef();

		return domRef ? domRef.querySelector<HTMLInputElement>(`input`) : null;
	}

	onAfterRendering(): void {
		const innerInput = this.nativeInput!;

		if (this._performTextSelection) {
			// this is required to syncronize lit-html input's value and user's input
			// lit-html does not sync its stored value for the value property when the user is typing
			if (innerInput.value !== this._innerValue) {
				innerInput.value = this._innerValue;
			}

			if (this.typedInValue.length && this.value.length) {
				innerInput.setSelectionRange(this.typedInValue.length, this.value.length);
			}
		}

		this._performTextSelection = false;

		this.style.setProperty("--search_width", `${this.getBoundingClientRect().width}px`);
	}

	_onfocusin() {
		super._onfocusin();
		this._open = true;
	}

	_onfocusout() {
		super._onfocusout();

		if (!this.matches(":focus-within")) {
			this._open = false;
		}
	}

	_handleSearchIconFocusOut() {
		this._open = false;
	}

	_handleClose() {
		this._open = false;
	}

	_handleMore() {
		this.fireDecoratorEvent("load-more");
	}

	get _showIllustration() {
		return !!this.illustration && this.popupMode === SearchPopupMode.Illustration;
	}

	get _showLoading() {
		return this.popupMode === SearchPopupMode.Loading;
	}

	get _showHeader() {
		// can we show subheader only?
		return !!this.headerText;
	}

	get _effectiveGrowing() {
		return this.showMore ? "Button" : "None";
	}
}

Search.define();

export default Search;
