import { registerFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

import List from "../List.js";
import ResponsivePopover from "../ResponsivePopover.js";
import SuggestionItem from "../SuggestionItem.js";
import Button from "../Button.js";
import GroupHeaderListItem from "../GroupHeaderListItem.js";
import SuggestionListItem from "../SuggestionListItem.js";

import {
	LIST_ITEM_POSITION,
	LIST_ITEM_SELECTED,
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

		// An integer value to store the currently selected item position,
		// that changes due to user interaction.
		this.selectedItemIndex = null;

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");

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
				info: suggestion.info || undefined,
				infoState: suggestion.infoState,
				group: suggestion.group,
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
		if (this._isItemOnTarget()) {
			this.onItemSelected(null, true /* keyboardUsed */);
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
		this.responsivePopover = await this._respPopover();
		this._beforeOpen();

		if (this._getItems().length) {
			this.responsivePopover.open(this._getComponent());
		}
	}

	async close(preventFocusRestore = false) {
		this.responsivePopover = await this._respPopover();
		this.responsivePopover.close(false, false, preventFocusRestore);
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
			itemText: item.textContent,
		};

		// If the item is "Inactive", prevent selection with SPACE or ENTER
		// to have consistency with the way "Inactive" items behave in the ui5-list
		if (item.type === "Inactive") {
			return;
		}

		this._getComponent().onItemSelected(this._getRealItems()[this.selectedItemIndex], keyboardUsed);
		item.selected = false;
		this.close();
	}

	onItemPreviewed(item) {
		this._getComponent().onItemPreviewed(item);
	}

	/* Private methods */
	onItemPress(oEvent) {
		this.onItemSelected(oEvent.detail.item, false /* keyboardUsed */);
	}

	_beforeOpen() {
		this._attachItemsListeners();
		this._attachPopupListeners();
	}

	async _attachItemsListeners() {
		const list = await this._getList();
		list.removeEventListener("ui5-item-press", this.fnOnSuggestionItemPress);
		list.addEventListener("ui5-item-press", this.fnOnSuggestionItemPress);
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
			this._respPopover.addEventListener("ui5-after-open", this._onOpen.bind(this));
			this.attachedAfterOpened = true;
		}

		if (!this.attachedAfterClose) {
			this._respPopover.addEventListener("ui5-after-close", this._onClose.bind(this));
			this.attachedAfterClose = true;
		}
	}

	_onOpen() {
		this._applyFocus();
		this._getComponent().onOpen();
	}

	_onClose() {
		this._getComponent().onClose();
	}

	_applyFocus() {
		if (this.selectedItemIndex) {
			this._getItems()[this.selectedItemIndex].focus();
		}
	}

	_isItemOnTarget() {
		return this.isOpened() && this.selectedItemIndex !== null;
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

		if ((this.selectedItemIndex === null) || (++this.selectedItemIndex > itemsCount - 1)) {
			this.selectedItemIndex = 0;
		}

		this._moveItemSelection(previousSelectedIdx, this.selectedItemIndex);
	}

	_selectPreviousItem() {
		const itemsCount = this._getItems().length;
		const previousSelectedIdx = this.selectedItemIndex;

		if ((this.selectedItemIndex === null) || (--this.selectedItemIndex < 0)) {
			this.selectedItemIndex = itemsCount - 1;
		}

		this._moveItemSelection(previousSelectedIdx, this.selectedItemIndex);
	}

	_moveItemSelection(previousIdx, nextIdx) {
		const items = this._getItems();
		const currentItem = items[nextIdx];
		const previousItem = items[previousIdx];

		this.accInfo = {
			currentPos: nextIdx + 1,
			listSize: items.length,
			itemText: currentItem.textContent,
		};

		if (previousItem) {
			previousItem.selected = false;
		}

		if (currentItem) {
			currentItem.selected = true;

			if (this.handleFocus) {
				currentItem.focus();
			}
		}

		this.onItemPreviewed(currentItem);

		if (!this._isItemIntoView(currentItem)) {
			this._scrollItemIntoView(currentItem);
		}
	}

	_deselectItems() {
		const items = this._getItems();
		items.forEach(item => {
			item.selected = false;
		});
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
			await this._respPopover();
			this._scrollContainer = this.responsivePopover.shadowRoot.querySelector(".ui5-popup-content");
		}

		return this._scrollContainer;
	}

	_getItems() {
		return [...this.responsivePopover.querySelector("[ui5-list]").children];
	}

	_getComponent() {
		return this.component;
	}

	async _getList() {
		this.responsivePopover = await this._respPopover();
		return this.responsivePopover.querySelector("[ui5-list]");
	}

	async _getListWidth() {
		const list = await this._getList();
		return list.offsetWidth;
	}

	_getRealItems() {
		return this._getComponent().getSlottedNodes(this.slotName);
	}

	async _respPopover() {
		if (this.responsivePopover) {
			return this.responsivePopover;
		}

		const staticAreaItem = await this._getComponent().getStaticAreaItemDomRef();
		this.responsivePopover = staticAreaItem.querySelector("[ui5-responsive-popover]");
		return this.responsivePopover;
	}

	get itemSelectionAnnounce() {
		const i18nBundle = this.i18nBundle,
			itemPositionText = i18nBundle.getText(LIST_ITEM_POSITION, [this.accInfo.currentPos], [this.accInfo.listSize]),
			itemSelectionText = i18nBundle.getText(LIST_ITEM_SELECTED);

		return `${itemPositionText} ${this.accInfo.itemText} ${itemSelectionText}`;
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
		let text = suggestion.text || suggestion.textContent;
		text = this.sanitizeText(text);

		return this.hightlightInput(text, input);
	}

	getHighlightedDesc(suggestion, input) {
		let text = suggestion.description;
		text = this.sanitizeText(text);

		return this.hightlightInput(text, input);
	}

	hightlightInput(text, input) {
		if (!text) {
			return text;
		}

		const inputEscaped = input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regEx = new RegExp(inputEscaped, "ig");
		return text.replace(regEx, match => `<b>${match}</b>`);
	}

	sanitizeText(text) {
		return text && text.replace("<", "&lt");
	}

	static get dependencies() {
		return [
			SuggestionItem,
			ResponsivePopover,
			List,
			SuggestionListItem,
			GroupHeaderListItem,
			Button,
		];
	}
}

Suggestions.SCROLL_STEP = 60;

// Add suggestions support to the global features registry so that Input.js can use it
registerFeature("InputSuggestions", Suggestions);

export default Suggestions;
