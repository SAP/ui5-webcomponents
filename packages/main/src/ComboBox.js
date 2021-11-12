import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { isPhone, isSafari } from "@ui5/webcomponents-base/dist/Device.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/not-editable.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	isBackSpace,
	isDelete,
	isShow,
	isUp,
	isDown,
	isEnter,
	isEscape,
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import * as Filters from "./ComboBoxFilters.js";

import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_INFORMATION,
	INPUT_SUGGESTIONS_TITLE,
	SELECT_OPTIONS,
	LIST_ITEM_POSITION,
	LIST_ITEM_SELECTED,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import ComboBoxTemplate from "./generated/templates/ComboBoxTemplate.lit.js";
import ComboBoxPopoverTemplate from "./generated/templates/ComboBoxPopoverTemplate.lit.js";

// Styles
import ComboBoxCss from "./generated/themes/ComboBox.css.js";
import ComboBoxPopoverCss from "./generated/themes/ComboBoxPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import SuggestionsCss from "./generated/themes/Suggestions.css.js";

import ComboBoxItem from "./ComboBoxItem.js";
import Icon from "./Icon.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import BusyIndicator from "./BusyIndicator.js";
import Button from "./Button.js";
import StandardListItem from "./StandardListItem.js";
import ComboBoxGroupItem from "./ComboBoxGroupItem.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-combobox",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.ComboBox.prototype */ {
		/**
		 * Defines the value of the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the "live" value of the component.
		 * <br><br>
		 * <b>Note:</b> If we have an item e.g. "Bulgaria", "B" is typed, "ulgaria" is typed ahead, value will be "Bulgaria", filterValue will be "B".
		 *
		 * <br><br>
		 * <b>Note:</b> Initially the filter value is synced with value.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @private
		 */
		filterValue: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines a short hint intended to aid the user with data entry when the
		 * component has no value.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		placeholder: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines whether the component is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled component is completely noninteractive.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the value state of the component.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>None</code></li>
		 * <li><code>Error</code></li>
		 * <li><code>Warning</code></li>
		 * <li><code>Success</code></li>
		 * <li><code>Information</code></li>
		 * </ul>
		 *
		 * @type {ValueState}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Defines whether the component is read-only.
		 * <br><br>
		 * <b>Note:</b> A read-only component is not editable,
		 * but still provides visual feedback upon user interaction.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		readonly: {
			type: Boolean,
		},

		/**
		 * Defines whether the component is required.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		required: {
			type: Boolean,
		},

		/**
		 * Indicates whether a loading indicator should be shown in the picker.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		loading: {
			type: Boolean,
		},

		/**
		 * Defines the filter type of the component.
		 * Available options are: <code>StartsWithPerTerm</code>, <code>StartsWith</code> and <code>Contains</code>.
		 *
		 * @type {string}
		 * @defaultvalue "StartsWithPerTerm"
		 * @public
		 */
		filter: {
			type: String,
			defaultValue: "StartsWithPerTerm",
		},

		/**
		 * Indicates whether the input is focssed
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		/**
		 * Indicates whether the visual focus is on the value state header
		 * @private
		 */
		_isValueStateFocused: {
			type: Boolean,
		},

		/**
		 * Sets the accessible aria name of the component.
		 *
		 * @type {String}
		 * @defaultvalue: ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleName: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Receives id(or many ids) of the elements that label the combo box
		 * @type {String}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleNameRef: {
			type: String,
			defaultValue: "",
		},

		_iconPressed: {
			type: Boolean,
			noAttribute: true,
		},

		_filteredItems: {
			type: Object,
		},

		_listWidth: {
			type: Integer,
			defaultValue: 0,
			noAttribute: true,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.ComboBox.prototype */ {
		/**
		 * Defines the component items.
		 *
		 * @type {sap.ui.webcomponents.main.IComboBoxItem[]}
		 * @slot items
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
			invalidateOnChildChange: true,
		},

		/**
		 * Defines the value state message that will be displayed as pop up under the component.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the <code>ui5-combobox</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * @type {HTMLElement[]}
		 * @since 1.0.0-rc.9
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},

		/**
		 * Defines the icon to be displayed in the input field.
		 *
		 * @type {sap.ui.webcomponents.main.IIcon}
		 * @slot
		 * @public
		 * @since 1.0.0-rc.9
		 */
		icon: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.ComboBox.prototype */ {
		/**
		 * Fired when the input operation has finished by pressing Enter, focusout or an item is selected.
		 *
		 * @event
		 * @public
		 */
		change: {},

		/**
		 * Fired when typing in input.
		 * <br><br>
		 * <b>Note:</b> filterValue property is updated, input is changed.
		 * @event
		 * @public
		 */
		input: {},

		/**
		 * Fired when selection is changed by user interaction
		 *
		 * @event sap.ui.webcomponents.main.ComboBox#selection-change
		 * @param {HTMLElement} item item to be selected.
		 * @public
		 */
		"selection-change": {
			detail: {
				item: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-combobox</code> component represents a drop-down menu with a list of the available options and a text input field to narrow down the options.
 *
 * It is commonly used to enable users to select an option from a predefined list.
 * <h3>Structure</h3>
 * The <code>ui5-combobox</code> consists of the following elements:
 * <ul>
 * <li> Input field - displays the selected option or a custom user entry. Users can type to narrow down the list or enter their own value.
 * <li> Drop-down arrow - expands\collapses the option list.</li>
 * <li> Option list - the list of available options.</li>
 * </ul>
 * <h3>Keyboard Handling</h3>
 *
 * The <code>ui5-combobox</code> provides advanced keyboard handling.
 *
 * <h4>Picker</h4>
 * If the <code>ui5-combobox</code> is focused,
 * you can open or close the drop-down by pressing <code>F4</code>, <code>ALT+UP</code> or <code>ALT+DOWN</code> keys.
 * <br>
 *
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/ComboBox";</code>
 *
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ComboBox
 * @extends UI5Element
 * @tagname ui5-combobox
 * @appenddocs ComboBoxItem ComboBoxGroupItem
 * @public
 * @since 1.0.0-rc.6
 */
class ComboBox extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ComboBoxCss;
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, ValueStateMessageCss, ComboBoxPopoverCss, SuggestionsCss];
	}

	static get template() {
		return ComboBoxTemplate;
	}

	static get staticAreaTemplate() {
		return ComboBoxPopoverTemplate;
	}

	constructor(props) {
		super(props);

		this._filteredItems = [];
		this._initialRendering = true;
		this._itemFocused = false;
		this._selectionChanged = false;
	}

	onBeforeRendering() {
		if (this._initialRendering) {
			this._filteredItems = this.items;
		}

		if (!this._initialRendering && this.popover && document.activeElement === this && !this._filteredItems.length) {
			this.popover.close();
		}

		this._selectMatchingItem();
		this._initialRendering = false;
	}

	async onAfterRendering() {
		await this._respPopover();
		if (isPhone() && this.responsivePopover.opened) {
			// Set initial focus to the native input
			this.inner.focus();
		}

		if (this.shouldClosePopover() && !isPhone()) {
			this.responsivePopover.close(false, false, true);
			this._clearFocus();
			this._itemFocused = false;
		}

		this.toggleValueStatePopover(this.shouldOpenValueStateMessagePopover);
		this.storeResponsivePopoverWidth();

		// Safari is quite slow and does not preserve text highlighting on control rerendering.
		// That's why we need to restore it "manually".
		if (isSafari() && this._autocomplete && this.filterValue !== this.value) {
			this.inner.setSelectionRange(
				(this._isKeyNavigation ? 0 : this.filterValue.length),
				this.value.length,
			);
		}
	}

	shouldClosePopover() {
		return this.responsivePopover.opened && !this.focused && !this._itemFocused && !this._isValueStateFocused;
	}

	_focusin(event) {
		this.focused = true;

		this._lastValue = this.value;

		this._autocomplete = false;

		!isPhone() && event.target.setSelectionRange(0, this.value.length);
	}

	_focusout(event) {
		const focusedOutToValueStateMessage = event.relatedTarget && event.relatedTarget.shadowRoot && event.relatedTarget.shadowRoot.querySelector(".ui5-valuestatemessage-root");

		this._fireChangeEvent();

		if (focusedOutToValueStateMessage) {
			event.stopImmediatePropagation();
			return;
		}

		if (!this.shadowRoot.contains(event.relatedTarget)) {
			this.focused = false;
			!isPhone() && this._closeRespPopover(event);
		}
	}

	_afterOpenPopover() {
		this._iconPressed = true;
	}

	_afterClosePopover() {
		this._iconPressed = false;
		this._filteredItems = this.items;

		// close device's keyboard and prevent further typing
		if (isPhone()) {
			this.blur();
		}

		if (this._selectionPerformed) {
			this._lastValue = this.value;
			this._selectionPerformed = false;
		}
	}

	_toggleRespPopover() {
		if (this.responsivePopover.opened) {
			this._closeRespPopover();
		} else {
			this._openRespPopover();
		}
	}

	storeResponsivePopoverWidth() {
		if (this.open && !this._listWidth) {
			this._listWidth = this.responsivePopover.offsetWidth;
		}
	}

	toggleValueStatePopover(open) {
		if (open) {
			this.openValueStatePopover();
		} else {
			this.closeValueStatePopover();
		}
	}

	async openValueStatePopover() {
		this.popover = await this._getPopover();
		this.popover && this.popover.showAt(this);
	}

	async closeValueStatePopover() {
		this.popover = await this._getPopover();
		this.popover && this.popover.close();
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector(".ui5-valuestatemessage-popover");
	}

	_resetFilter() {
		this._filteredItems = this._filterItems("");
		this._selectMatchingItem();
	}

	_arrowClick() {
		this.inner.focus();
		this._resetFilter();

		this._toggleRespPopover();
	}

	_readonlyIconClick() {
		this.inner.focus();
	}

	_input(event) {
		const { value } = event.target;

		if (event.target === this.inner) {
			// stop the native event, as the semantic "input" would be fired.
			event.stopImmediatePropagation();
			this.focused = true;
			this._isValueStateFocused = false;
		}

		this._filteredItems = this._filterItems(value);

		this.value = value;
		this.filterValue = value;

		this._clearFocus();

		// autocomplete
		if (this._autocomplete) {
			const item = this._getFirstMatchingItem(value);
			this._applyAtomicValueAndSelection(item, value, true);

			if (value !== "" && !this._selectionChanged && (item && !item.selected && !item.isGroupItem)) {
				this.fireEvent("selection-change", {
					item,
				});

				this._selectionChanged = false;
			}
		}

		this.fireEvent("input");

		if (isPhone()) {
			return;
		}

		if (!this._filteredItems.length || value === "") {
			this._closeRespPopover();
		} else {
			this._openRespPopover();
		}
	}

	_startsWithMatchingItems(str) {
		return Filters.StartsWith(str, this._filteredItems);
	}

	_clearFocus() {
		this._filteredItems.map(item => {
			item.focused = false;

			return item;
		});
	}

	async handleArrowKeyPress(event) {
		if (this.readonly || !this._filteredItems.length) {
			return;
		}

		const isOpen = this.open;
		const isArrowDown = isDown(event);
		const isArrowUp = isUp(event);
		const currentItem = this._filteredItems.find(item => {
			return isOpen ? item.focused : item.selected;
		});
		const indexOfItem = this._filteredItems.indexOf(currentItem);

		event.preventDefault();

		if ((this.focused === true && isArrowUp && isOpen) || (this._filteredItems.length - 1 === indexOfItem && isArrowDown)) {
			return;
		}

		this._isKeyNavigation = true;

		if (isArrowDown) {
			this._handleArrowDown(event, indexOfItem);
		}

		if (isArrowUp) {
			this._handleArrowUp(event, indexOfItem);
		}
	}

	_handleItemNavigation(event, indexOfItem, isForward) {
		const isOpen = this.open;
		const currentItem = this._filteredItems[indexOfItem];
		const nextItem = isForward ? this._filteredItems[indexOfItem + 1] : this._filteredItems[indexOfItem - 1];
		const isGroupItem = currentItem && currentItem.isGroupItem;

		if ((!isOpen) && ((isGroupItem && !nextItem) || (!isGroupItem && !currentItem))) {
			return;
		}

		this._clearFocus();

		if (isOpen) {
			this._itemFocused = true;
			this.value = isGroupItem ? this.filterValue : currentItem.text;
			this.focused = false;
			currentItem.focused = true;
		} else {
			this.focused = true;
			this.value = isGroupItem ? nextItem.text : currentItem.text;
			currentItem.focused = false;
		}

		this._isValueStateFocused = false;
		this._selectionChanged = true;

		if (isGroupItem && isOpen) {
			return;
		}

		this._announceSelectedItem(indexOfItem);

		// autocomplete
		const item = this._getFirstMatchingItem(this.value);
		this._applyAtomicValueAndSelection(item, "", true);

		if ((item && !item.selected)) {
			this.fireEvent("selection-change", {
				item,
			});
		}

		this.fireEvent("input");
		this._fireChangeEvent();
	}

	_handleArrowDown(event, indexOfItem) {
		const isOpen = this.open;

		if (this.focused && indexOfItem === -1 && this.hasValueStateText && isOpen) {
			this._isValueStateFocused = true;
			this.focused = false;
			return;
		}

		indexOfItem = !isOpen && this.hasValueState && indexOfItem === -1 ? 0 : indexOfItem;

		this._handleItemNavigation(event, ++indexOfItem, true /* isForward */);
	}

	_handleArrowUp(event, indexOfItem) {
		const isOpen = this.open;

		if (indexOfItem === 0 && !this.hasValueStateText) {
			this._clearFocus();
			this.focused = true;
			this._itemFocused = false;
			return;
		}

		if (indexOfItem === 0 && this.hasValueStateText && isOpen) {
			this._clearFocus();
			this._itemFocused = false;
			this._isValueStateFocused = true;
			this._filteredItems[0].selected = false;
			return;
		}

		if (this._isValueStateFocused) {
			this.focused = true;
			this._isValueStateFocused = false;
			return;
		}

		indexOfItem = !isOpen && this.hasValueState && indexOfItem === -1 ? 0 : indexOfItem;
		this._handleItemNavigation(event, --indexOfItem, false /* isForward */);
	}

	_keydown(event) {
		const isArrowKey = isDown(event) || isUp(event);
		this._autocomplete = !(isBackSpace(event) || isDelete(event));
		this._isKeyNavigation = false;

		if (isArrowKey) {
			this.handleArrowKeyPress(event);
		}

		if (isEnter(event)) {
			this._fireChangeEvent();
			this._closeRespPopover();
			this.focused = true;
		}

		if (isEscape(event)) {
			this.focused = true;
			this.value = !this.open ? this._lastValue : this.value;
			this._isValueStateFocused = false;
		}

		if ((isTabNext(event) || isTabPrevious(event)) && this.open) {
			this._closeRespPopover();
		}

		if (isShow(event) && !this.readonly && !this.disabled) {
			event.preventDefault();

			this._resetFilter();
			this._toggleRespPopover();

			const selectedItem = this._filteredItems.find(item => {
				return item.selected;
			});

			if (selectedItem && this.open) {
				this._itemFocused = true;
				selectedItem.focused = true;
				this.focused = false;
			} else {
				this.focused = true;
			}
		}
	}

	_click(event) {
		if (isPhone() && !this.readonly) {
			this._openRespPopover();
		}
	}

	_closeRespPopover(event) {
		if (isPhone() && event && event.target.classList.contains("ui5-responsive-popover-close-btn") && this._selectedItemText) {
			this.value = this._selectedItemText;
			this.filterValue = this._selectedItemText;
		}

		this._isValueStateFocused = false;
		this._clearFocus();

		this.responsivePopover.close();
	}

	_openRespPopover() {
		this.responsivePopover.showAt(this);
	}

	_filterItems(str) {
		const itemsToFilter = this.items.filter(item => !item.isGroupItem);
		const filteredItems = (Filters[this.filter] || Filters.StartsWithPerTerm)(str, itemsToFilter);

		// Return the filtered items and their group items
		return this.items.filter((item, idx, allItems) => ComboBox._groupItemFilter(item, ++idx, allItems, filteredItems) || filteredItems.indexOf(item) !== -1);
	}

	/**
	 * Returns true if the group header should be shown (if there is a filtered suggestion item for this group item)
	 *
	 * @private
	 */
	static _groupItemFilter(item, idx, allItems, filteredItems) {
		if (item.isGroupItem) {
			let groupHasFilteredItems;

			while (allItems[idx] && !allItems[idx].isGroupItem && !groupHasFilteredItems) {
				groupHasFilteredItems = filteredItems.indexOf(allItems[idx]) !== -1;
				idx++;
			}

			return groupHasFilteredItems;
		}
	}

	_getFirstMatchingItem(current) {
		const currentlyFocusedItem = this.items.find(item => item.focused === true);

		if (currentlyFocusedItem && currentlyFocusedItem.isGroupItem) {
			this.value = this.filterValue;
			return;
		}

		const matchingItems = this._startsWithMatchingItems(current).filter(item => !item.isGroupItem);

		if (matchingItems.length) {
			return matchingItems[0];
		}
	}

	_applyAtomicValueAndSelection(item, filterValue, highlightValue) {
		if (!item) {
			return;
		}

		const value = (item && item.text) || "";
		this.inner.value = value;
		if (highlightValue) {
			this.inner.setSelectionRange(filterValue.length, value.length);
		}
		this.value = value;
	}

	_selectMatchingItem() {
		const currentlyFocusedItem = this.items.find(item => item.focused);
		const shouldSelectionBeCleared = currentlyFocusedItem && currentlyFocusedItem.isGroupItem;

		this._filteredItems = this._filteredItems.map(item => {
			item.selected = !item.isGroupItem && (item.text === this.value) && !shouldSelectionBeCleared;
			return item;
		});
	}

	_fireChangeEvent() {
		if (this.value !== this._lastValue) {
			this.fireEvent("change");
			this._lastValue = this.value;
		}
	}

	_inputChange(event) {
		event.preventDefault();
	}

	_itemMousedown(event) {
		event.preventDefault();
	}

	_selectItem(event) {
		const listItem = event.detail.item;

		this._selectedItemText = listItem.mappedItem.text;
		this._selectionPerformed = true;

		const sameItemSelected = this.value === this._selectedItemText;
		const sameSelectionPerformed = this.value.toLowerCase() === this.filterValue.toLowerCase();

		if (sameItemSelected && sameSelectionPerformed) {
			return this._closeRespPopover();
		}

		this.value = this._selectedItemText;

		if (!listItem.mappedItem.selected) {
			this.fireEvent("selection-change", {
				item: listItem.mappedItem,
			});

			this._selectionChanged = true;
		}

		this._filteredItems.map(item => {
			item.selected = (item === listItem.mappedItem && !item.isGroupItem);
			return item;
		});

		this._fireChangeEvent();
		this._closeRespPopover();

		// reset selection
		this.inner.setSelectionRange(this.value.length, this.value.length);
	}

	_onItemFocus(event) {
		this._itemFocused = true;
	}

	_announceSelectedItem(indexOfItem) {
		const itemPositionText = ComboBox.i18nBundle.getText(LIST_ITEM_POSITION, indexOfItem + 1, this._filteredItems.length);
		const itemSelectionText = ComboBox.i18nBundle.getText(LIST_ITEM_SELECTED);

		announce(`${itemPositionText} ${itemSelectionText}`, "Polite");
	}

	get _headerTitleText() {
		return ComboBox.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get _iconAccessibleNameText() {
		return ComboBox.i18nBundle.getText(SELECT_OPTIONS);
	}

	get inner() {
		return isPhone() ? this.responsivePopover.querySelector(".ui5-input-inner-phone") : this.shadowRoot.querySelector("[inner-input]");
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.responsivePopover = staticAreaItem.querySelector("[ui5-responsive-popover]");
		return this.responsivePopover;
	}

	get editable() {
		return !this.readonly;
	}

	get hasValueState() {
		return this.valueState !== ValueState.None;
	}

	get hasValueStateText() {
		return this.hasValueState && this.valueState !== ValueState.Success;
	}

	get valueStateText() {
		return this.valueStateTextMappings[this.valueState];
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	get valueStateTextId() {
		return this.hasValueState ? `${this._id}-valueStateDesc` : undefined;
	}

	get valueStateTextMappings() {
		return {
			"Success": ComboBox.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Error": ComboBox.i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": ComboBox.i18nBundle.getText(VALUE_STATE_WARNING),
			"Information": ComboBox.i18nBundle.getText(VALUE_STATE_INFORMATION),
		};
	}

	get shouldOpenValueStateMessagePopover() {
		return this.focused && this.hasValueStateText && !this._iconPressed
			&& !this.open && !this._isPhone;
	}

	get shouldDisplayDefaultValueStateMessage() {
		return !this.valueStateMessage.length && this.hasValueStateText;
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateMessageIcon() {
		const iconPerValueState = {
			Error: "error",
			Warning: "alert",
			Success: "sys-enter-2",
			Information: "information",
		};

		return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
	}

	get open() {
		return this.responsivePopover ? this.responsivePopover.opened : false;
	}

	get _isPhone() {
		return isPhone();
	}

	get itemTabIndex() {
		return undefined;
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	static get dependencies() {
		return [
			ComboBoxItem,
			Icon,
			ResponsivePopover,
			List,
			BusyIndicator,
			Button,
			StandardListItem,
			Popover,
			ComboBoxGroupItem,
		];
	}

	static async onDefine() {
		ComboBox.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	get styles() {
		return {
			popoverHeader: {
				"width": `${this.offsetWidth}px`,
			},
			suggestionPopoverHeader: {
				"display": this._listWidth === 0 ? "none" : "inline-block",
				"width": `${this._listWidth}px`,
			},
		};
	}

	get classes() {
		return {
			popover: {
				"ui5-suggestions-popover": !this.isPhone,
				"ui5-suggestions-popover-with-value-state-header": !this.isPhone && this.hasValueStateText,
			},
			popoverValueState: {
				"ui5-valuestatemessage-header": true,
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Success,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Error,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Warning,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}
}

ComboBox.define();

export default ComboBox;
