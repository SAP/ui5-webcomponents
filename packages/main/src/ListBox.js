import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ListBoxTemplate from "./generated/templates/ListBoxTemplate.lit.js";

// Styles
import ListBoxCss from "./generated/themes/ListBox.css.js";

const SCROLL_STEP = 60;

/**
 * @public
 */
const metadata = {
	tag: "ui5-listbox",
	properties: /** @lends sap.ui.webcomponents.main.ListBox.prototype */ {
		//
	},
	slots: /** @lends sap.ui.webcomponents.main.ListBox.prototype */ {

		/**
		 * Defines the Items of the ListBox.
		 *
		 * @type {HTMLElement[]}
		 * @slot content
		 * @public
		 */
		 "default": {
			propertyName: "items",
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.ListBox.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-list-box</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/ListBox.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ListBox
 * @extends UI5Element
 * @tagname ui5-list-box
 * @public
 */
class ListBox extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ListBoxCss;
	}

	static get template() {
		return ListBoxTemplate;
	}

	static get dependencies() {
		return [];
	}

	open(target) {
		this.style.setProperty("_ui5_listbox_list_width", this._getListWidth());
		this.getDomRef().showAt(target);
	}

	// Input Suggestions method implementation

	defaultSlotProperties() {
		const items = this._getItems() || [];

		return items.map((item, idx) => {
			return {
				text: item.text,
				description: "",
				image: undefined,
				icon: undefined,
				type: undefined,
				additionalText: undefined,
				additionalTextState: undefined,
				groupItem: undefined,
				key: idx,
			};
		});
	}

	isOpened() {
		return this.getDomRef().opened;
	}

	toggle(bToggle, { preventFocusRestore, target }) {
		const toggle = bToggle !== undefined ? bToggle : !this.isOpened();

		if (toggle) {
			this.open(target);
		} else {
			this.close(preventFocusRestore);
		}
	}

	close() {
		this.getDomRef().close();
	}

	_getListWidth() {
		return 120;
	}

	_deselectItems() {
		const items = this._getItems() || [];

		items.forEach(item => {
			item.selected = false;
			item.focused = false;
		});
	}

	_getItems() {
		return Array.from(this.children);
	}

	_clearItemFocus() {
		const focusedItem = this._getItems().find(item => item.focused);

		if (focusedItem) {
			focusedItem.focused = false;
		}
	}

	updateSelectedItemPosition(pos) {
		this.selectedItemIndex = pos;
	}

	// KBH

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

	_clearValueStateFocus() {
		this.component._isValueStateFocused = false;
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

	_getRealItems() {
		return this._getItems();
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

	_isItemOnTarget() {
		return this.isOpened() && this.selectedItemIndex !== null && this.selectedItemIndex !== -1 && !this._isGroupOrInactiveItem;
	}

	_isItemIntoView(item) {
		const rectItem = item.getDomRef().getBoundingClientRect();
		const rectInput = this._getComponent().getDomRef().getBoundingClientRect();
		const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

		return (rectItem.top + SCROLL_STEP <= windowHeight) && (rectItem.top >= rectInput.top);
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

	onItemPreviewed(item) {
		this._getComponent().onItemPreviewed(item);
	}

	_getComponent() {
		return this.component;
	}
}

ListBox.define();

export default ListBox;
