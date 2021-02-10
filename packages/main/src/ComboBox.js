import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	isBackSpace,
	isDelete,
	isShow,
	isUp,
	isDown,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import * as Filters from "./ComboBoxFilters.js";

import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_INFORMATION,
	INPUT_SUGGESTIONS_TITLE,
	ICON_ACCESSIBLE_NAME,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import ComboBoxTemplate from "./generated/templates/ComboBoxTemplate.lit.js";
import ComboBoxPopoverTemplate from "./generated/templates/ComboBoxPopoverTemplate.lit.js";

// Styles
import ComboBoxCss from "./generated/themes/ComboBox.css.js";
import ComboBoxPopoverCss from "./generated/themes/ComboBoxPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";

import ComboBoxItem from "./ComboBoxItem.js";
import Icon from "./Icon.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import BusyIndicator from "./BusyIndicator.js";
import Button from "./Button.js";
import StandardListItem from "./StandardListItem.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-combobox",
	languageAware: true,
	defaultSlot: "items",
	properties: /** @lends sap.ui.webcomponents.main.ComboBox.prototype */ {
		/**
		 * Defines the value of the <code>ui5-combobox</code>.
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
		 * Defines the "live" value of the <code>ui5-combobox</code>.
		 * <br><br>
		 * <b>Note:</b> The property is updated upon typing.
		 *
		 * <br><br>
		 * <b>Note:</b> Initially the filter value is synced with value.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		filterValue: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines a short hint intended to aid the user with data entry when the
		 * <code>ui5-combobox</code> has no value.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		placeholder: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines whether <code>ui5-combobox</code> is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-combobox</code> is completely uninteractive.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the value state of the <code>ui5-combobox</code>.
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
		 * Defines whether the <code>ui5-combobox</code> is readonly.
		 * <br><br>
		 * <b>Note:</b> A read-only <code>ui5-combobox</code> is not editable,
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
		 * Defines whether the <code>ui5-combobox</code> is required.
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
		 * Defines the filter type of the <code>ui5-combobox</code>.
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
		 * Defines the aria-label attribute for the combo box
		 * @type {String}
		 * @defaultvalue: ""
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaLabel: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Receives id(or many ids) of the elements that label the combo box
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaLabelledby: {
			type: String,
			defaultValue: "",
		},

		_iconPressed: {
			type: Boolean,
			noAttribute: true,
		},

		_tempValue: {
			type: String,
			defaultValue: "",
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
		 * Defines the <code>ui5-combobox</code> items.
		 * <br><br>
		 * Example: <br>
		 * &lt;ui5-combobox><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-li>Item #1&lt;/ui5-li><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-li>Item #2&lt;/ui5-li><br>
		 * &lt;/ui5-combobox>
		 * <br> <br>
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
			invalidateOnChildChange: true,
		},

		/**
		 * Defines the value state message that will be displayed as pop up under the <code>ui5-combobox</code>.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the <code>ui5-select</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
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
		 * @type {HTMLElement[]}
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
		 * @event sap.ui.webcomponents.main.Combobox#selection-change
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
 * It is commonly used to enable users to select one or more options from a predefined list.
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
 * @appenddocs ComboBoxItem
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
		return [ResponsivePopoverCommonCss, ValueStateMessageCss, ComboBoxPopoverCss];
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
		this._tempFilterValue = "";
		this._selectionChanged = false;
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		let domValue;

		if (this._initialRendering) {
			domValue = this.value;
			this._filteredItems = this.items;
		} else {
			domValue = this.filterValue;
		}

		if (this._autocomplete && domValue !== "") {
			const item = this._autoCompleteValue(domValue);

			if (!this._selectionChanged && (item && !item.selected)) {
				this.fireEvent("selection-change", {
					item,
				});

				this._selectionChanged = false;
			}
		} else {
			this._tempValue = domValue;
		}

		if (!this._initialRendering && this.popover && document.activeElement === this && !this._filteredItems.length) {
			this.popover.close();
		}

		this._selectMatchingItem();

		if (this._isKeyNavigation && this.responsivePopover && this.responsivePopover.opened) {
			this.focused = false;
		} else if (this.shadowRoot.activeElement) {
			this.focused = this.shadowRoot.activeElement.id === "ui5-combobox-input";
		}

		this._initialRendering = false;
		this._isKeyNavigation = false;
	}

	async onAfterRendering() {
		await this._respPopover();
		if (isPhone() && this.responsivePopover.opened) {
			// Set initial focus to the native input
			this.inner.focus();
		}

		if (this.shouldClosePopover() && !isPhone()) {
			this.responsivePopover.close(false, false, true);
		}

		this._itemFocused = false;

		this.toggleValueStatePopover(this.shouldOpenValueStateMessagePopover);
		this.storeResponsivePopoverWidth();
	}

	shouldClosePopover() {
		return this.responsivePopover.opened && !this.focused && !this._itemFocused;
	}

	_focusin(event) {
		this.focused = true;

		if (this.filterValue !== this.value) {
			this.filterValue = this.value;
		}

		!isPhone() && event.target.setSelectionRange(0, this.value.length);
	}

	_focusout() {
		this.focused = false;

		this._inputChange();
		!isPhone() && this._closeRespPopover();
	}

	_afterOpenPopover() {
		this._iconPressed = true;
		this._clearFocus();
	}

	_afterClosePopover() {
		this._iconPressed = false;
		this._filteredItems = this.items;
		this._tempFilterValue = "";

		// close device's keyboard and prevent further typing
		if (isPhone()) {
			this.blur();
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
		this.popover && this.popover.openBy(this);
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

	_input(event) {
		const { value } = event.target;

		if (event.target === this.inner) {
			// stop the native event, as the semantic "input" would be fired.
			event.stopImmediatePropagation();
		}

		this._clearFocus();
		this._tempFilterValue = value;
		this.filterValue = value;
		this.fireEvent("input");

		this._filteredItems = this._filterItems(value);

		if (isPhone()) {
			return;
		}

		if (!this._filteredItems.length) {
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

	handleArrowKeyPress(event) {
		if (this.readonly || !this._filteredItems.length) {
			return;
		}

		const isArrowDown = isDown(event);
		const isArrowUp = isUp(event);
		const currentItem = this._filteredItems.find(item => {
			return this.responsivePopover.opened ? item.focused : item.selected;
		});
		let indexOfItem = this._filteredItems.indexOf(currentItem);

		event.preventDefault();

		if ((indexOfItem === 0 && isArrowUp) || (this._filteredItems.length - 1 === indexOfItem && isArrowDown)) {
			return;
		}

		this._clearFocus();

		indexOfItem += isArrowDown ? 1 : -1;
		indexOfItem = indexOfItem < 0 ? 0 : indexOfItem;

		this._filteredItems[indexOfItem].focused = true;
		this.filterValue = this._filteredItems[indexOfItem].text;
		this._isKeyNavigation = true;
		this._itemFocused = true;
		this.fireEvent("input");

		this.fireEvent("selection-change", {
			item: this._filteredItems[indexOfItem],
		});

		this._selectionChanged = true;
	}

	_keydown(event) {
		const isArrowKey = isDown(event) || isUp(event);
		this._autocomplete = !(isBackSpace(event) || isDelete(event));

		if (isArrowKey) {
			this.handleArrowKeyPress(event);
		}

		if (isEnter(event)) {
			this._inputChange();
			this._closeRespPopover();
		}

		if (isShow(event) && !this.readonly && !this.disabled) {
			event.preventDefault();
			this._resetFilter();
			this._toggleRespPopover();
		}
	}

	_click(event) {
		if (isPhone() && !this.readonly) {
			this._openRespPopover();
		}
	}

	_closeRespPopover() {
		this.responsivePopover.close();
	}

	_openRespPopover() {
		this.responsivePopover.open(this);
	}

	_filterItems(str) {
		return (Filters[this.filter] || Filters.StartsWithPerTerm)(str, this.items);
	}

	_autoCompleteValue(current) {
		const currentValue = current;
		const matchingItems = this._startsWithMatchingItems(currentValue);
		const selectionValue = this._tempFilterValue ? this._tempFilterValue : currentValue;

		if (matchingItems.length) {
			this._tempValue = matchingItems[0] ? matchingItems[0].text : current;
		} else {
			this._tempValue = current;
		}

		if (matchingItems.length && (selectionValue !== this._tempValue)) {
			setTimeout(() => {
				this.inner.setSelectionRange(selectionValue.length, this._tempValue.length);
			}, 0);
		} else if (this._isKeyNavigation) {
			setTimeout(() => {
				this.inner.setSelectionRange(0, this._tempValue.length);
			}, 0);
		}

		if (matchingItems.length) {
			return matchingItems[0];
		}
	}

	_selectMatchingItem() {
		this._filteredItems = this._filteredItems.map(item => {
			item.selected = (item.text === this._tempValue);

			return item;
		});
	}

	_inputChange() {
		if (this.value !== this._tempValue) {
			this.value = this._tempValue;
			this.fireEvent("change");
			this.inner.setSelectionRange(this.value.length, this.value.length);
		}
	}

	_itemMousedown(event) {
		event.preventDefault();
	}

	_selectItem(event) {
		const listItem = event.detail.item;

		this._tempValue = listItem.mappedItem.text;
		this.filterValue = this._tempValue;

		if (!listItem.mappedItem.selected) {
			this.fireEvent("selection-change", {
				item: listItem.mappedItem,
			});

			this._selectionChanged = true;
		}

		this._filteredItems.map(item => {
			item.selected = (item === listItem.mappedItem);

			return item;
		});

		this._inputChange();
		this._closeRespPopover();
	}

	_onItemFocus(event) {
		this._itemFocused = true;
	}

	get _headerTitleText() {
		return this.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get _iconAccessibleNameText() {
		return this.i18nBundle.getText(ICON_ACCESSIBLE_NAME);
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
			"Success": this.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Error": this.i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": this.i18nBundle.getText(VALUE_STATE_WARNING),
			"Information": this.i18nBundle.getText(VALUE_STATE_INFORMATION),
		};
	}

	get shouldOpenValueStateMessagePopover() {
		return this.focused && this.hasValueStateText && !this._iconPressed
			&& !this.open && !this._isPhone;
	}

	get shouldDisplayDefaultValueStateMessage() {
		return !this.valueStateMessage.length && this.hasValueStateText;
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
		];
	}

	get styles() {
		return {
			popoverHeader: {
				"width": `${this.offsetWidth}px`,
			},
			suggestionPopoverHeader: {
				"display": this._listWidth === 0 ? "none" : "inline-block",
				"width": `${this._listWidth}px`,
				"padding": "0.5625rem 1rem",
			},
		};
	}

	get classes() {
		return {
			popoverValueState: {
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
