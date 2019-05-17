import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import List from "./List.js";
import Popover from "./Popover.js";
import StandardListItem from "./StandardListItem.js"; // ensure <ui5-li> is loaded
import CustomListItem from "./CustomListItem.js"; // ensure <ui5-li-custom> is loaded

(function noTreeShaked() {
	`${StandardListItem}${CustomListItem}`; //eslint-disable-line
}());

/**
 * A class to manage the <code>Input</code suggestion items.
 *
 * @class
 * @private
 * @author SAP SE
 */
class Suggestions {
	constructor(component, slotName, handleFocus) {
		// The component, that the suggestion would plug into.
		this.component = component;

		// Defines the items` slot name.
		this.slotName = slotName;

		// Defines, if the focus will be moved via the arrow keys.
		this.handleFocus = handleFocus;

		// Press and Focus handlers
		this.fnOnSuggestionItemPress = this.onItemPress.bind(this);
		this.fnOnSuggestionItemFocus = this.onItemFocused.bind(this);

		// An integer value to store the currently selected item position,
		// that changes due to user interaction.
		this.selectedItemIndex = null;
	}

	/* Public methods */
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

	toggle(bToggle) {
		const toggle = bToggle !== undefined ? bToggle : !this.isOpened();

		if (toggle) {
			this.open();
		} else {
			this.close();
		}
	}

	open() {
		this._beforeOpen();
		this._getPopover().openBy(this._getComponent());
	}

	close() {
		this._getPopover().close();
	}

	updateSelectedItemPosition(pos) {
		this.selectedItemIndex = pos;
	}

	/* Interface methods */
	onItemFocused() {
		this._getComponent().onItemFocused();
	}

	onItemSelected(selectedItem, keyboardUsed) {
		const item = selectedItem || this._getItems()[this.selectedItemIndex];

		this.selectedItemIndex = this._getItems().indexOf(item);

		this._getComponent().onItemSelected(item, keyboardUsed);
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

	_attachItemsListeners() {
		const list = this._getList();
		list.removeEventListener("ui5-itemPress", this.fnOnSuggestionItemPress);
		list.addEventListener("ui5-itemPress", this.fnOnSuggestionItemPress);
		list.removeEventListener("ui5-itemFocused", this.fnOnSuggestionItemFocus);
		list.addEventListener("ui5-itemFocused", this.fnOnSuggestionItemFocus);
	}

	_attachPopupListeners() {
		if (!this.handleFocus) {
			return;
		}

		if (!this.attachedAfterOpened) {
			this._getPopover().addEventListener("ui5-afterOpen", this._onOpen.bind(this));
			this.attachedAfterOpened = true;
		}

		if (!this.attachedAfterClose) {
			this._getPopover().addEventListener("ui5-afterClose", this._onClose.bind(this));
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
		const popover = this._getPopover();
		return !!(popover && popover._isOpen);
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

	_isItemIntoView(item) {
		const rectItem = item.getDomRef().getBoundingClientRect();
		const rectInput = this._getComponent().getDomRef().getBoundingClientRect();
		const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

		return (rectItem.top <= windowHeight) && (rectItem.top >= rectInput.top);
	}

	_scrollItemIntoView(item) {
		const pos = item.getDomRef().offsetTop - Suggestions.SCROLL_STEP;
		this._getScrollContainer().scrollTop = pos;
	}

	_getScrollContainer() {
		if (!this._scrollContainer) {
			const popover = this._getPopover();
			this._scrollContainer = popover.getDomRef().querySelector(".sapMPopupContent");
		}

		return this._scrollContainer;
	}

	_getItems() {
		return this._getComponent().getSlottedNodes(this.slotName);
	}

	_getComponent() {
		return this.component;
	}

	_getList() {
		return this._getComponent().shadowRoot.querySelector("ui5-list");
	}

	_getPopover() {
		return this._getComponent().shadowRoot.querySelector("ui5-popover");
	}
}

Suggestions.SCROLL_STEP = 48;

// The List and Popover components would be rendered
// by the issuer component`s template.
Bootstrap.boot().then(() => {
	List.define();
	Popover.define();
});

export default Suggestions;
