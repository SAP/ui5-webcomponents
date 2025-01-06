import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
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
	isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";

import SearchTemplate from "./SearchTemplate.js";
import SearchCss from "./generated/themes/Search.css.js";
import SearchField from "./SearchField.js";
import { StartsWith, StartsWithPerTerm } from "@ui5/webcomponents/dist/Filters.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type SearchItem from "./SearchItem.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

interface ISearchSuggestionItem extends UI5Element {
	selected: boolean;
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
	renderer: jsxRenderer,
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
	partialMatches: boolean;

	constructor() {
		super();

		// The typed in value.
		this.typedInValue = "";
		this.partialMatches = false;
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
				item.selected = true;
			} else {
				this.typedInValue = this.value;
			}
		} else {
			this.typedInValue = this.value;
		}

		this._flattenItems.forEach(item => {
			(item as SearchItem).highlightText = this.typedInValue;
		});

		this._shouldAutocomplete = false;
	}

	get _flattenItems(): Array<ISearchSuggestionItem> {
		return this.getSlottedNodes<ISearchSuggestionItem>("items").flatMap(item => {
			return this._isGroupItem(item) ? [item, ...item.items!] : [item];
		});
	}

	_getFirstMatchingItem(current: string): ISearchSuggestionItem | undefined {
		if (!this._flattenItems.length || !current) {
			return;
		}

		const startsWithMatches = this._startsWithMatchingItems(current).filter(item => !this._isGroupItem(item));
		const partialMatches = this._startsWithPerTermMatchingItems(current).filter(item => !this._isGroupItem(item));

		if (this._flattenItems.indexOf(startsWithMatches[0]) <= this._flattenItems.indexOf(partialMatches[0])) {
			return startsWithMatches[0];
		}
		return partialMatches[0] || undefined;
	}

	_handleTypeAhead(item: ISearchSuggestionItem) {
		const originalValue = item.headingText || "";
		let displayValue = originalValue;

		if (!originalValue.toLowerCase().startsWith(this.value.toLowerCase())) {
			this.partialMatches = true;
			displayValue = `${this.value} - ${originalValue}`;
		} else {
			this.partialMatches = false;
		}

		this.typedInValue = this.value;
		this._innerValue = displayValue;
		this.value = displayValue;
		this._performTextSelection = true;
	}

	_startsWithMatchingItems(str: string): Array<ISearchSuggestionItem> {
		return StartsWith(str, this._flattenItems, "headingText");
	}

	_startsWithPerTermMatchingItems(str: string): Array<ISearchSuggestionItem> {
		return StartsWithPerTerm(str, this._flattenItems, "headingText");
	}

	_isGroupItem(item: ISearchSuggestionItem) {
		return item.hasAttribute("ui5-search-item-group");
	}

	_onkeydown(e: KeyboardEvent) {
		this._shouldAutocomplete = !this.noTypeahead
			&& !(isBackSpace(e) || isDelete(e) || isEscape(e) || isUp(e) || isDown(e) || isTabNext(e) || isEnter(e) || isPageUp(e) || isPageDown(e) || isHome(e) || isEnd(e) || isEscape(e));

		if (isRight(e)) {
			this.handleRight(e);
		}

		if (isDown(e)) {
			this.handleDown(e);
		}
	}

	async handleDown(e: KeyboardEvent) {
		if (this._open) {
			e.preventDefault();
			await this._handleArrowDown();
		}
	}

	async _handleArrowDown() {
		const firstListItem = this._getItemsList()?.getSlottedNodes<ISearchSuggestionItem>("items")[0];
		const focusRef = firstListItem?.hasAttribute("ui5-mcb-item-group") ? firstListItem.getFocusDomRef() : firstListItem;

		if (this._open) {
			firstListItem && focusRef && this._getItemsList()?._itemNavigation.setCurrentItem(focusRef);
			this.value = this.typedInValue || this.value;

			// wait item navigation to apply correct tabindex
			await renderFinished();
			firstListItem?.focus();
		}
	}

	handleRight(e: KeyboardEvent) {
		if (this.partialMatches) {
			e.preventDefault();
			this.value = this.typedInValue;
			this._innerValue = this.typedInValue;
		}
	}

	_onItemKeydown(e: KeyboardEvent) {
		const isFirstItemGroup = this._getItemsList()?.getSlottedNodes<ISearchSuggestionItem>("items")[1] === e.target && this._getItemsList()?.getSlottedNodes<ISearchSuggestionItem>("items")[0].hasAttribute("ui5-li-group");
		const isFirstItem = this._getItemsList()?.getSlottedNodes<ISearchSuggestionItem>("items")[0] === e.target || isFirstItemGroup;
		const isArrowUp = isUp(e);

		e.preventDefault();

		if (isFirstItem && isArrowUp) {
			this.nativeInput?.focus();
			this._shouldAutocomplete = true;
		}
	}

	/**
	 * Returns a reference to the native input element
	 * @protected
	 */
	get nativeInput() {
		const domRef = this.getDomRef();

		return domRef ? domRef.querySelector<HTMLInputElement>(`input`) : null;
	}

	_getPicker() {
		return this.shadowRoot!.querySelector<Popover>("[ui5-popover]")!;
	}

	_getItemsList(): List {
		return this._getPicker().querySelector(".ui5-search-list") as List;
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
