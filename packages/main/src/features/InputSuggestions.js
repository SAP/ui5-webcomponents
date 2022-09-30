import { registerFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import encodeXML from "@ui5/webcomponents-base/dist/sap/base/security/encodeXML.js";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js";
import List from "../List.js";
import ResponsivePopover from "../ResponsivePopover.js";
import SuggestionItem from "../SuggestionItem.js";
import SuggestionGroupItem from "../SuggestionGroupItem.js";
import Button from "../Button.js";
import Icon from "../Icon.js";
import Popover from "../Popover.js";
import GroupHeaderListItem from "../GroupHeaderListItem.js";
import SuggestionListItem from "../SuggestionListItem.js";

import {
	LIST_ITEM_POSITION,
} from "../generated/i18n/i18n-defaults.js";
/**
 * A class to manage the <code>Input</code suggestion items.
 *
 * @class
 * @private
 * @author SAP SE
 */
class Suggestions {
	constructor(component, slotName, highlight, handleFocus) {
		// The component, that the suggestion would plug into.
		this.component = component;

		// Defines the items` slot name.
		this.slotName = slotName;

		// Defines, if the focus will be moved via the arrow keys.
		this.handleFocus = handleFocus;

		// Defines, if the suggestions should highlight.
		this.highlight = highlight;

		// Press and Focus handlers
		this.fnOnSuggestionItemPress = this.onItemPress.bind(this);
		this.fnOnSuggestionItemFocus = this.onItemFocused.bind(this);
		this.fnOnSuggestionItemMouseOver = this.onItemMouseOver.bind(this);
		this.fnOnSuggestionItemMouseOut = this.onItemMouseOut.bind(this);

		this._getSuggestionPopover();

		// An integer value to store the currently selected item position,
		// that changes due to user interaction.
		this.selectedItemIndex = null;

		this.accInfo = {};
	}

	/* Public methods */
	defaultSlotProperties(hightlightValue) {
		const inputSuggestionItems = this._getComponent().suggestionItems;
		const highlight = this.highlight && !!hightlightValue;
		const suggestions = [];

		inputSuggestionItems.map((suggestion, idx) => {
			const text = highlight ? this.getHighlightedText(suggestion, hightlightValue) : this.getRowText(suggestion);
			const description = highlight ? this.getHighlightedDesc(suggestion, hightlightValue) : this.getRowDesc(suggestion);

			return suggestions.push({
				text,
				description,
				image: suggestion.image || undefined,
				icon: suggestion.icon || undefined,
				type: suggestion.type || undefined,
				additionalText: suggestion.additionalText || undefined,
				additionalTextState: suggestion.additionalTextState,
				groupItem: suggestion.groupItem,
				key: idx,
			});
		});

		return suggestions;
	}

	onUp(event) {
		event.preventDefault();
		this._handleItemNavigation(false /* forward */);
		return true;
	}

	onDown(event) {
		event.preventDefault();
		this._handleItemNavigation(true /* forward */);
		return true;
	}

	onSpace(event) {
		if (this._isItemOnTarget()) {
			event.preventDefault();
			this.onItemSelected(null, true /* keyboardUsed */);
			return true;
		}
		return false;
	}

	onEnter(event) {
		if (this._isGroupOrInactiveItem) {
			event.preventDefault();
			return false;
		}

		if (this._isItemOnTarget()) {
			this.onItemSelected(null, true /* keyboardUsed */);
			return true;
		}

		return false;
	}

	onPageUp(event) {
		event.preventDefault();

		const isItemIndexValid = this.selectedItemIndex - 10 > -1;

		if (this._hasValueState && !isItemIndexValid) {
			this._focusValueState();
			return true;
		}

		this._moveItemSelection(this.selectedItemIndex,
			isItemIndexValid ? this.selectedItemIndex -= 10 : this.selectedItemIndex = 0);
		return true;
	}

	onPageDown(event) {
		event.preventDefault();

		const items = this._getItems();
		const lastItemIndex = items.length - 1;
		const isItemIndexValid = this.selectedItemIndex + 10 <= lastItemIndex;

		if (this._hasValueState && !items) {
			this._focusValueState();
			return true;
		}

		this._moveItemSelection(this.selectedItemIndex,
			isItemIndexValid ? this.selectedItemIndex += 10 : this.selectedItemIndex = lastItemIndex);
		return true;
	}

	onHome(event) {
		event.preventDefault();

		if (this._hasValueState) {
			this._focusValueState();
			return true;
		}

		this._moveItemSelection(this.selectedItemIndex, this.selectedItemIndex = 0);
		return true;
	}

	onEnd(event) {
		event.preventDefault();

		const lastItemIndex = this._getItems().length - 1;

		if (this._hasValueState && !lastItemIndex) {
			this._focusValueState();
			return true;
		}

		this._moveItemSelection(this.selectedItemIndex, this.selectedItemIndex = lastItemIndex);
		return true;
	}

	onTab(event) {
		if (this._isItemOnTarget()) {
			this.onItemSelected(null, true);
			return true;
		}
		return false;
	}

	toggle(bToggle, { preventFocusRestore }) {
		const toggle = bToggle !== undefined ? bToggle : !this.isOpened();

		if (toggle) {
			this.open();
		} else {
			this.close(preventFocusRestore);
		}
	}

	async _isScrollable() {
		const sc = await this._getScrollContainer();
		return sc.offsetHeight < sc.scrollHeight;
	}

	async open() {
		this._getComponent().open = true;
		this._beforeOpen();

		this.responsivePopover.showAt(this._getComponent());
	}

	async close(preventFocusRestore = false) {
		const selectedItem = this._getItems() && this._getItems()[this.selectedItemIndex];

		this._getComponent().open = false;
		this.responsivePopover = await this._getSuggestionPopover();
		this.responsivePopover.close(false, false, preventFocusRestore);

		if (selectedItem && selectedItem.focused) {
			selectedItem.focused = false;
		}
	}

	updateSelectedItemPosition(pos) {
		this.selectedItemIndex = pos;
	}

	/* Interface methods */
	onItemFocused() {
		this._getComponent().onItemFocused();
	}

	onItemMouseOver(event) {
		this._getComponent().onItemMouseOver(event);
	}

	onItemMouseOut(event) {
		this._getComponent().onItemMouseOut(event);
	}

	onItemSelected(selectedItem, keyboardUsed) {
		const allItems = this._getItems();
		const item = selectedItem || allItems[this.selectedItemIndex];

		this.selectedItemIndex = allItems.indexOf(item);

		this.accInfo = {
			currentPos: this.selectedItemIndex + 1,
			listSize: allItems.length,
			itemText: this._getRealItems()[this.selectedItemIndex].description,
		};

		// If the item is "Inactive", prevent selection with SPACE or ENTER
		// to have consistency with the way "Inactive" items behave in the ui5-list
		if (item.type === "Inactive" || item.group) {
			return;
		}

		this._getComponent().onItemSelected(this._getRealItems()[this.selectedItemIndex], keyboardUsed);
		item.selected = false;
		item.focused = false;
		this._getComponent().open = false;
	}

	onItemPreviewed(item) {
		this._getComponent().onItemPreviewed(item);
	}

	/* Private methods */
	onItemPress(event) {
		let pressedItem;
		const isPressEvent = event.type === "ui5-item-click";

		// Only use the press event if the item is already selected, in all other cases we are listening for 'ui5-selection-change' from the list
		// Also we have to check if the selection-change is fired by the list's 'item-click' event handling, to avoid double handling on our side
		if ((isPressEvent && !event.detail.item.selected) || (this._handledPress && !isPressEvent)) {
			return;
		}

		if (isPressEvent && event.detail.item.selected) {
			pressedItem = event.detail.item;
			this._handledPress = true;
		} else {
			pressedItem = event.detail.selectedItems[0];
		}

		this.onItemSelected(pressedItem, false /* keyboardUsed */);
	}

	_beforeOpen() {
		this._attachItemsListeners();
		this._attachPopupListeners();
	}

	async _attachItemsListeners() {
		const list = await this._getList();
		list.removeEventListener("ui5-item-click", this.fnOnSuggestionItemPress);
		list.addEventListener("ui5-item-click", this.fnOnSuggestionItemPress);
		list.removeEventListener("ui5-selection-change", this.fnOnSuggestionItemPress);
		list.addEventListener("ui5-selection-change", this.fnOnSuggestionItemPress);
		list.removeEventListener("ui5-item-focused", this.fnOnSuggestionItemFocus);
		list.addEventListener("ui5-item-focused", this.fnOnSuggestionItemFocus);
		list.removeEventListener("mouseover", this.fnOnSuggestionItemMouseOver);
		list.addEventListener("mouseover", this.fnOnSuggestionItemMouseOver);
		list.removeEventListener("mouseout", this.fnOnSuggestionItemMouseOut);
		list.addEventListener("mouseout", this.fnOnSuggestionItemMouseOut);
	}

	_attachPopupListeners() {
		if (!this.handleFocus) {
			return;
		}

		if (!this.attachedAfterOpened) {
			this._getSuggestionPopover.addEventListener("ui5-after-open", this._onOpen.bind(this));
			this.attachedAfterOpened = true;
		}

		if (!this.attachedAfterClose) {
			this._getSuggestionPopover.addEventListener("ui5-after-close", this._onClose.bind(this));
			this.attachedAfterClose = true;
		}
	}

	_onOpen() {
		this._applyFocus();
		this._getComponent().onOpen();
	}

	_onClose() {
		this._getComponent().onClose();
		this._handledPress = false;
	}

	_applyFocus() {
		if (this.selectedItemIndex) {
			this._getItems()[this.selectedItemIndex].focus();
		}
	}

	_isItemOnTarget() {
		return this.isOpened() && this.selectedItemIndex !== null && this.selectedItemIndex !== -1 && !this._isGroupOrInactiveItem;
	}

	get _isGroupOrInactiveItem() {
		const items = this._getItems();

		if (!items || !items[this.selectedItemIndex]) {
			return false;
		}

		return (items[this.selectedItemIndex].group || items[this.selectedItemIndex].type === "Inactive");
	}

	isOpened() {
		return !!(this.responsivePopover && this.responsivePopover.opened);
	}

	_handleItemNavigation(forward) {
		if (!this._getItems().length) {
			return;
		}

		if (forward) {
			this._selectNextItem();
		} else {
			this._selectPreviousItem();
		}
	}

	_selectNextItem() {
		const itemsCount = this._getItems().length;
		const previousSelectedIdx = this.selectedItemIndex;

		if (this._hasValueState && previousSelectedIdx === null && !this.component._isValueStateFocused) {
			this._focusValueState();
			return;
		}

		if ((previousSelectedIdx === null && !this._hasValueState) || this.component._isValueStateFocused) {
			this._clearValueStateFocus();
			--this.selectedItemIndex;
		}

		if (previousSelectedIdx !== null && previousSelectedIdx + 1 > itemsCount - 1) {
			return;
		}

		this._moveItemSelection(previousSelectedIdx, ++this.selectedItemIndex);
	}

	_selectPreviousItem() {
		const items = this._getItems();
		const previousSelectedIdx = this.selectedItemIndex;

		if (this._hasValueState && previousSelectedIdx === 0 && !this.component._isValueStateFocused) {
			this.component.hasSuggestionItemSelected = false;
			this.component._isValueStateFocused = true;
			this.selectedItemIndex = null;

			items[0].focused = false;
			items[0].selected = false;

			return;
		}

		if (this.component._isValueStateFocused) {
			this.component.focused = true;
			this.component._isValueStateFocused = false;
			this.selectedItemIndex = null;

			return;
		}

		if (previousSelectedIdx === -1 || previousSelectedIdx === null) {
			return;
		}

		if (previousSelectedIdx - 1 < 0) {
			items[previousSelectedIdx].selected = false;
			items[previousSelectedIdx].focused = false;

			this.component.focused = true;
			this.component.hasSuggestionItemSelected = false;
			this.selectedItemIndex -= 1;
			return;
		}

		this._moveItemSelection(previousSelectedIdx, --this.selectedItemIndex);
	}

	_moveItemSelection(previousIdx, nextIdx) {
		const items = this._getItems();
		const currentItem = items[nextIdx];
		const previousItem = items[previousIdx];

		if (!currentItem) {
			return;
		}

		this.component.focused = false;
		this._clearValueStateFocus();

		this.accInfo = {
			currentPos: nextIdx + 1,
			listSize: items.length,
			itemText: this._getRealItems()[items.indexOf(currentItem)].description,
		};

		if (previousItem) {
			previousItem.selected = false;
			previousItem.focused = false;
		}

		if (currentItem) {
			currentItem.focused = true;

			if (currentItem.type === "Active") {
				currentItem.selected = true;
			}

			if (this.handleFocus) {
				currentItem.focus();
			}
		}

		this.component.hasSuggestionItemSelected = true;
		this.onItemPreviewed(currentItem);

		if (!this._isItemIntoView(currentItem)) {
			this._scrollItemIntoView(currentItem);
		}
	}

	_deselectItems() {
		const items = this._getItems();
		items.forEach(item => {
			item.selected = false;
			item.focused = false;
		});
	}

	_clearItemFocus() {
		const focusedItem = this._getItems().find(item => item.focused);

		if (focusedItem) {
			focusedItem.focused = false;
		}
	}

	_isItemIntoView(item) {
		const rectItem = item.getDomRef().getBoundingClientRect();
		const rectInput = this._getComponent().getDomRef().getBoundingClientRect();
		const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

		return (rectItem.top + Suggestions.SCROLL_STEP <= windowHeight) && (rectItem.top >= rectInput.top);
	}

	async _scrollItemIntoView(item) {
		const pos = item.getDomRef().offsetTop;
		const scrollContainer = await this._getScrollContainer();
		scrollContainer.scrollTop = pos;
	}

	async _getScrollContainer() {
		if (!this._scrollContainer) {
			await this._getSuggestionPopover();
			this._scrollContainer = this.responsivePopover.shadowRoot.querySelector(".ui5-popup-content");
		}

		return this._scrollContainer;
	}

	_getItems() {
		return !!this.responsivePopover && [...this.responsivePopover.querySelector("[ui5-list]").children];
	}

	_getComponent() {
		return this.component;
	}

	async _getList() {
		this.responsivePopover = await this._getSuggestionPopover();
		return this.responsivePopover.querySelector("[ui5-list]");
	}

	async _getListWidth() {
		const list = await this._getList();
		return list.offsetWidth;
	}

	_getRealItems() {
		return this._getComponent().getSlottedNodes(this.slotName);
	}

	async _getSuggestionPopover() {
		if (this.responsivePopover) {
			return this.responsivePopover;
		}

		const staticAreaItem = await this._getComponent().getStaticAreaItemDomRef();
		this.responsivePopover = staticAreaItem.querySelector("[ui5-responsive-popover]");
		return this.responsivePopover;
	}

	get itemSelectionAnnounce() {
		const itemPositionText = Suggestions.i18nBundle.getText(LIST_ITEM_POSITION, this.accInfo.currentPos, this.accInfo.listSize);

		return `${this.accInfo.itemText} ${itemPositionText}`;
	}

	getRowText(suggestion) {
		return this.sanitizeText(suggestion.text || suggestion.textContent);
	}

	getRowDesc(suggestion) {
		if (suggestion.description) {
			return this.sanitizeText(suggestion.description);
		}
	}

	getHighlightedText(suggestion, input) {
		const text = suggestion.text || suggestion.textContent;
		return this.hightlightInput(text, input);
	}

	getHighlightedDesc(suggestion, input) {
		const text = suggestion.description || "";
		return this.hightlightInput(text, input);
	}

	hightlightInput(text, input) {
		return generateHighlightedMarkup(text, input);
	}

	sanitizeText(text) {
		return encodeXML(text);
	}

	get _hasValueState() {
		return this.component.hasValueStateMessage;
	}

	_focusValueState() {
		const items = this._getItems();

		this.component._isValueStateFocused = true;
		this.component.focused = false;
		this.component.hasSuggestionItemSelected = false;
		this.selectedItemIndex = null;
		this.component.value = this.component.valueBeforeAutoComplete;

		items && this._scrollItemIntoView(items[0]);
		this._deselectItems();
	}

	_clearValueStateFocus() {
		this.component._isValueStateFocused = false;
	}

	static get dependencies() {
		return [
			SuggestionItem,
			SuggestionGroupItem,
			ResponsivePopover,
			List,
			SuggestionListItem,
			GroupHeaderListItem,
			Button,
			Icon,
			Popover,
		];
	}

	static async init() {
		Suggestions.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Suggestions.SCROLL_STEP = 60;

// Add suggestions support to the global features registry so that Input.js can use it
registerFeature("InputSuggestions", Suggestions);

export default Suggestions;
