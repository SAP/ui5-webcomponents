import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import SearchPopupMode from "@ui5/webcomponents/dist/types/SearchPopupMode.js";
import type Popover from "@ui5/webcomponents/dist/Popover.js";
import type List from "@ui5/webcomponents/dist/List.js";
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
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";

import SearchTemplate from "./SearchTemplate.js";
import SearchCss from "./generated/themes/Search.css.js";
import SearchField from "./SearchField.js";
import { StartsWith, StartsWithPerTerm } from "@ui5/webcomponents/dist/Filters.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type SearchItem from "./SearchItem.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type Button from "@ui5/webcomponents/dist/Button.js";

interface ISearchSuggestionItem extends UI5Element {
	selected: boolean;
	headingText: string;
	items?: ISearchSuggestionItem[];
}

type SearchEventDetails = {
	item?: ISearchSuggestionItem;
}

/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search` is an input with suggestions, used for user search.
 *
 * The `ui5-search` consists of several elements parts:
 * - Scope - displays a select in the beggining of the component, used for filtering results by their scope.
 * - Input field - for user input value
 * - Clear button - gives the possibility for deleting the entered value
 * - Search button - a primary button for performing search, when the user has entered a search term
 * - Expand/Collapse button - when there is no search term, the search button behaves as an expand/collapse button for the `ui5-search` component
 * - Suggestions - a list with available search suggestions
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/fiori/dist/Search.js";`
 *
 * @constructor
 * @extends SearchField
 * @public
 * @since 2.9.0
 * @experimental
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
})

/**
 * Fired when load more button is pressed.
 *
 * @public
 */
@event("popup-action-press")

/**
 * Fired when the popup is opened.
 *
 * @public
 */
@event("open")

/**
 * Fired when the popup is closed.
 *
 * @public
 */
@event("close")

class Search extends SearchField {
	eventDetails!: SearchField["eventDetails"] & {
		search: SearchEventDetails,
		"popup-action-press": void,
		"open": void,
		"close": void,
	};
	/**
	 * Defines the visualisation mode of the search component.
	 *
	 * @default "List"
	 * @public
	 */
	@property()
	popupMode: `${SearchPopupMode}` = "List";

	/**
	 * Defines whether the value will be autcompleted to match an item.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	noTypeahead = false;

	/**
	 * Defines the header text to be placed in the search suggestions popup.
	 * @public
	 */
	@property()
	headerText = "";

	/**
	 * Defines the subheader text to be placed in the search suggestions popup.
	 * @public
	 */
	@property()
	subheaderText = "";

	/**
	 * Defines whether the popup footer action button is shown.
	 * Note: The footer action button is displayed only when the `popupMode` is set to `List`.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showPopupAction = false;

	/**
	 * Defines the popup footer action button text.
	 * @public
	 */
	@property()
	popupActionText = "";

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

	/**
	 * Indicates whether the items picker is open.
	 * @public
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Defines the inner stored value of the component.
	 *
	 * **Note:** The property is updated upon typing.
	 * @default ""
	 * @private
	 */
	@property({ noAttribute: true })
	_innerValue = "";

	/**
	 * Based on the key pressed, determines if the autocomplete should be performed.
	 * @private
	 */
	_shouldAutocomplete?: boolean;

	/**
	 * Determines whether a text selection should be performed.
	 * @private
	 */
	_performTextSelection?: boolean;

	/**
	 * Determines whether the picker should open on user input. In some cases we need to close the picker,
	 * (press on an item, or pressing Esc), but still focus the input. In this case we need to open the picker on input.
	 * @private
	 */
	_openPickerOnInput?: boolean;

	/**
	 * Holds the typed value from the user.
	 * @private
	 */
	_typedInValue: string;

	/**
	 * True if the first matching item is matched by starts with per term, rather than by starts with.
	 * @private
	 */
	_matchedPerTerm: boolean;

	/**
	 * Holds the currently proposed item which will be selected if the user presses Enter.
	 * @private
	 */
	_proposedItem?: ISearchSuggestionItem;

	constructor() {
		super();

		// The typed in value.
		this._typedInValue = "";
		this._matchedPerTerm = false;
		this._openPickerOnInput = false;
	}

	onBeforeRendering() {
		super.onBeforeRendering();

		const innerInput = this.nativeInput;
		const autoCompletedChars = innerInput && (innerInput.selectionEnd! - innerInput.selectionStart!);

		// If there is already a selection the autocomplete has already been performed
		if (this._shouldAutocomplete && !autoCompletedChars) {
			const item = this._getFirstMatchingItem(this.value);
			this._proposedItem = item;

			if (item) {
				this._handleTypeAhead(item);
				this._deselectItems();
				item.selected = true;
			} else {
				this._typedInValue = this.value;
			}
		} else {
			this._typedInValue = this.value;
		}

		this._flattenItems.forEach(item => {
			(item as SearchItem).highlightText = this._typedInValue;
		});

		this._shouldAutocomplete = false;
	}

	onAfterRendering(): void {
		const innerInput = this.nativeInput!;

		if (this._performTextSelection && innerInput.value !== this._innerValue) {
			innerInput.value = this._innerValue;
		}

		if (this._performTextSelection && this._typedInValue.length && this.value.length) {
			innerInput.setSelectionRange(this._typedInValue.length, this.value.length);
		}

		this._performTextSelection = false;

		this.style.setProperty("--search_width", `${this.getBoundingClientRect().width}px`);
	}

	_handleTypeAhead(item: ISearchSuggestionItem) {
		const originalValue = item.headingText || "";
		let displayValue = originalValue;

		if (!originalValue.toLowerCase().startsWith(this.value.toLowerCase())) {
			this._matchedPerTerm = true;
			displayValue = `${this.value} - ${originalValue}`;
		} else {
			this._matchedPerTerm = false;
		}

		this._typedInValue = this.value;
		this._innerValue = displayValue;
		this._performTextSelection = true;
		this.value = displayValue;
	}

	_startsWithMatchingItems(str: string): Array<ISearchSuggestionItem> {
		return StartsWith(str, this._flattenItems.filter(item => !this._isGroupItem(item)), "headingText");
	}

	_startsWithPerTermMatchingItems(str: string): Array<ISearchSuggestionItem> {
		return StartsWithPerTerm(str, this._flattenItems.filter(item => !this._isGroupItem(item)), "headingText");
	}

	_isGroupItem(item: ISearchSuggestionItem) {
		return item.hasAttribute("ui5-search-item-group");
	}

	_deselectItems() {
		this._flattenItems.forEach(item => {
			item.selected = false;
		});
	}

	async _handleDown(e: KeyboardEvent) {
		if (this.open) {
			e.preventDefault();
			await this._handleArrowDown();
		}
	}

	async _handleArrowDown() {
		const firstListItem = this._getItemsList()?.getSlottedNodes<ISearchSuggestionItem>("items")[0];
		const focusRef = firstListItem && this._isGroupItem(firstListItem) ? firstListItem.getFocusDomRef() : firstListItem;

		if (this.open) {
			this._deselectItems();
			firstListItem && focusRef && this._getItemsList()?._itemNavigation.setCurrentItem(focusRef);
			this.value = this._typedInValue || this.value;
			this._innerValue = this.value;

			// wait item navigation to apply correct tabindex
			await renderFinished();
			firstListItem?.focus();
		}
	}

	_handleRight(e: KeyboardEvent) {
		if (this._matchedPerTerm) {
			e.preventDefault();
			this.value = this._typedInValue;
			this._innerValue = this._typedInValue;
			this._proposedItem = undefined;
		}
	}

	_handleEnter() {
		const prevented = !this.fireDecoratorEvent("search", { item: this._proposedItem });

		if (prevented) {
			return;
		}

		const innerInput = this.nativeInput!;
		if (this._matchedPerTerm) {
			this.value = this._proposedItem?.headingText || this.value;
			this._innerValue = this.value;
			this._typedInValue = this.value;
			this._matchedPerTerm = false;
		}

		innerInput.setSelectionRange(this.value.length, this.value.length);
		this.open = false;
		this._openPickerOnInput = true;
	}

	_handleSearchEvent() {
		this.fireDecoratorEvent("search", { item: this._proposedItem });
	}

	_handleEscape() {
		this.value = this._typedInValue || this.value;
		this._innerValue = this.value;

		this._openPickerOnInput = true;
	}

	_handleInput(e: InputEvent) {
		super._handleInput(e);

		if (!this._openPickerOnInput) {
			return;
		}

		this.open = true;
		this._openPickerOnInput = false;
	}

	_onFooterButtonKeyDown(e: KeyboardEvent) {
		if (isUp(e)) {
			this._flattenItems[this._flattenItems.length - 1].focus();
		}
		if (isTabPrevious(e)) {
			this._getItemsList().focus();
		}
	}

	_onItemKeydown(e: KeyboardEvent) {
		const isFirstItem = this._flattenItems[0] === e.target;
		const isLastItem = this._flattenItems[this._flattenItems.length - 1] === e.target;
		const isArrowUp = isUp(e);
		const isArrowDown = isDown(e);
		const isTab = isTabNext(e);

		e.preventDefault();

		if (isFirstItem && isArrowUp) {
			this.nativeInput?.focus();
			this._shouldAutocomplete = true;
		}

		if ((isLastItem && isArrowDown) || isTab) {
			this._getFooterButton()?.focus();
		}
	}

	_onItemClick(e: CustomEvent) {
		const item = e.detail.item as ISearchSuggestionItem;
		const prevented = !this.fireDecoratorEvent("search", { item });

		if (prevented) {
			return;
		}

		this.value = item.headingText;
		this._innerValue = this.value;
		this._typedInValue = this.value;
		this.open = false;
		this._openPickerOnInput = true;
		this.focus();
	}

	_onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);
		this._shouldAutocomplete = !this.noTypeahead
			&& !(isBackSpace(e) || isDelete(e) || isEscape(e) || isUp(e) || isDown(e) || isTabNext(e) || isEnter(e) || isPageUp(e) || isPageDown(e) || isHome(e) || isEnd(e) || isEscape(e));

		if (isRight(e)) {
			this._handleRight(e);
		}

		if (isDown(e)) {
			this._handleDown(e);
		}

		if (isEscape(e)) {
			this._handleEscape();
		}
	}

	_onfocusin() {
		super._onfocusin();

		if (this._openPickerOnInput) {
			return;
		}

		// prevent opening of empty picker on List Mode
		if (this.popupMode === SearchPopupMode.List && !this.items.length) {
			return;
		}

		this.open = true;
	}

	_onfocusout() {
		super._onfocusout();
		if (this._matchedPerTerm) {
			this.value = this._typedInValue;
			this._innerValue = this._typedInValue;
		}
		this._matchedPerTerm = false;
	}

	_onFocusOutSearch() {
		if (!this.matches(":focus-within")) {
			this.open = false;
		}
	}

	_handleClose() {
		this.open = false;
		this.fireDecoratorEvent("close");
	}

	_handleOpen() {
		this.fireDecoratorEvent("open");
	}

	_onFooterButtonClick() {
		this.fireDecoratorEvent("popup-action-press");
	}

	_getFirstMatchingItem(current: string): ISearchSuggestionItem | undefined {
		if (!this._flattenItems.length || !current) {
			return;
		}

		const startsWithMatches = this._startsWithMatchingItems(current);
		const partialMatches = this._startsWithPerTermMatchingItems(current);

		if (!startsWithMatches.length) {
			return partialMatches[0] ?? undefined;
		}

		if (!partialMatches.length) {
			return startsWithMatches[0];
		}

		return this._flattenItems.indexOf(startsWithMatches[0]) <= this._flattenItems.indexOf(partialMatches[0])
			? startsWithMatches[0]
			: partialMatches[0];
	}

	_getPicker() {
		return this.shadowRoot!.querySelector<Popover>("[ui5-responsive-popover]")!;
	}

	_getItemsList(): List {
		return this._getPicker().querySelector(".ui5-search-list") as List;
	}

	_getFooterButton(): Button {
		return this._getPicker().querySelector(".ui5-search-footer-button") as Button;
	}

	get _flattenItems(): Array<ISearchSuggestionItem> {
		return this.getSlottedNodes<ISearchSuggestionItem>("items").flatMap(item => {
			return this._isGroupItem(item) ? [item, ...item.items!] : [item];
		});
	}

	get nativeInput() {
		const domRef = this.getDomRef();

		return domRef ? domRef.querySelector<HTMLInputElement>(`input`) : null;
	}

	get _showIllustration() {
		return !!this.illustration && this.popupMode === SearchPopupMode.Illustration;
	}

	get _showLoading() {
		return this.popupMode === SearchPopupMode.Loading;
	}

	get _showHeader() {
		return !!this.headerText;
	}

	get _showFooter() {
		return !!this.showPopupAction && this.popupMode === SearchPopupMode.List;
	}
}

Search.define();

export default Search;
