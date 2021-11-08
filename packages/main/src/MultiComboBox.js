import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import {
	isShow,
	isDown,
	isUp,
	isBackSpace,
	isSpace,
	isLeft,
	isRight,
	isEscape,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import { isIE, isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/multiselect-all.js";
import "@ui5/webcomponents-icons/dist/not-editable.js";
import MultiComboBoxItem from "./MultiComboBoxItem.js";
import Tokenizer from "./Tokenizer.js";
import Token from "./Token.js";
import Icon from "./Icon.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import StandardListItem from "./StandardListItem.js";
import ToggleButton from "./ToggleButton.js";
import * as Filters from "./ComboBoxFilters.js";
import Button from "./Button.js";

import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_INFORMATION,
	INPUT_SUGGESTIONS_TITLE,
	SELECT_OPTIONS,
	MULTICOMBOBOX_DIALOG_OK_BUTTON,
	VALUE_STATE_ERROR_ALREADY_SELECTED,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import MultiComboBoxTemplate from "./generated/templates/MultiComboBoxTemplate.lit.js";
import MultiComboBoxPopoverTemplate from "./generated/templates/MultiComboBoxPopoverTemplate.lit.js";

// Styles
import styles from "./generated/themes/MultiComboBox.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import SuggestionsCss from "./generated/themes/Suggestions.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-multi-combobox",
	languageAware: true,
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.MultiComboBox.prototype */ {
		/**
		 * Defines the component items.
		 *
		 * @type {sap.ui.webcomponents.main.IMultiComboBoxItem[]}
		 * @slot items
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
			invalidateOnChildChange: true,
		},

		/**
		* Defines the icon to be displayed in the component.
		*
		* @type {sap.ui.webcomponents.main.IIcon}
		* @slot
		* @public
		* @since 1.0.0-rc.9
		*/
		icon: {
			type: HTMLElement,
		},

		/**
		 * Defines the value state message that will be displayed as pop up under the component.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the component is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * @type {HTMLElement[]}
		 * @since 1.0.0-rc.9
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.MultiComboBox.prototype */ {
		/**
		 * Defines the value of the component.
		 * <br><br>
		 * <b>Note:</b> The property is updated upon typing.
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
		 * Defines if the user input will be prevented, if no matching item has been found
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		allowCustomValues: {
			type: Boolean,
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
		 * @since 1.0.0-rc.5
		 */
		required: {
			type: Boolean,
		},

		/**
		 * Defines the filter type of the component.
		 * Available options are: <code>StartsWithPerTerm</code>, <code>StartsWith</code>, <code>Contains</code> and <code>None</code>.
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
		 * Indicates whether the dropdown is open. True if the dropdown is open, false otherwise.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @readonly
		 * @since 1.0.0-rc.5
		 * @public
		 */
		open: {
			type: Boolean,
		},

		_filteredItems: {
			type: Object,
		},

		filterSelected: {
			type: Boolean,
		},

		focused: {
			type: Boolean,
		},

		_tokenizerFocused: {
			type: Boolean,
		},

		_iconPressed: {
			type: Boolean,
			noAttribute: true,
		},

		_inputWidth: {
			type: Integer,
			noAttribute: true,
		},

		_listWidth: {
			type: Integer,
			defaultValue: 0,
			noAttribute: true,
		},

		_performingSelectionTwice: {
			type: Boolean,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.MultiComboBox.prototype */ {
		/**
		 * Fired when the input operation has finished by pressing Enter or on focusout.
		 *
		 * @event
		 * @public
		 */
		change: {},

		/**
		 * Fired when the value of the component changes at each keystroke.
		 *
		 * @event
		 * @public
		 */
		input: {},

		/**
		 * Fired when the dropdown is opened or closed.
		 *
		 * @event sap.ui.webcomponents.main.MultiComboBox#open-change
		 * @since 1.0.0-rc.5
		 * @public
		 */
		"open-change": {},

		/**
		 * Fired when selection is changed by user interaction
		 * in <code>SingleSelect</code> and <code>MultiSelect</code> modes.
		 *
		 * @event sap.ui.webcomponents.main.MultiComboBox#selection-change
		 * @param {Array} items an array of the selected items.
		 * @public
		 */
		"selection-change": {
			detail: {
				items: { type: Array },
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-multi-combobox</code> component consists of a list box with items and a text field allowing the user to either type a value directly into the text field, or choose from the list of existing items.
 *
 * The drop-down list is used for selecting and filtering values, it enables users to select one or more options from a predefined list. The control provides an editable input field to filter the list, and a dropdown arrow to expand/collapse the list of available options.
 * The options in the list have checkboxes that permit multi-selection. Entered values are displayed as tokens.
 * <h3>Structure</h3>
 * The <code>ui5-multi-combobox</code> consists of the following elements:
 * <ul>
 * <li> Tokenizer - a list of tokens with selected options.
 * <li> Input field - displays the selected option/s as token/s. Users can type to filter the list.
 * <li> Drop-down arrow - expands\collapses the option list.</li>
 * <li> Option list - the list of available options.</li>
 * </ul>
 * <h3>Keyboard Handling</h3>
 *
 * The <code>ui5-multi-combobox</code> provides advanced keyboard handling.
 *
 * <h4>Picker</h4>
 * If the <code>ui5-multi-combobox</code> is focused,
 * you can open or close the drop-down by pressing <code>F4</code>, <code>ALT+UP</code> or <code>ALT+DOWN</code> keys.
 * Once the drop-down is opened, you can use the <code>UP</code> and <code>DOWN</code> arrow keys
 * to navigate through the available options and select one by pressing the <code>Space</code> or <code>Enter</code> keys.
 * <br>
 *
 * <h4>Tokens</h4>
 * <ul>
 * <li> Left/Right arrow keys - moves the focus selection form the currently focused token to the previous/next one (if available). </li>
 * <li> Delete -  deletes the token and focuses the previous token. </li>
 * <li> Backspace -  deletes the token and focus the next token. </li>
 * </ul>
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-multi-combobox</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>token-{index} - Used to style each token(where <code>token-0</code> corresponds to the first item)</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/MultiComboBox";</code>
 *
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.MultiComboBox
 * @extends UI5Element
 * @tagname ui5-multi-combobox
 * @public
 * @appenddocs MultiComboBoxItem
 * @since 0.11.0
 */
class MultiComboBox extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return MultiComboBoxTemplate;
	}

	static get staticAreaTemplate() {
		return MultiComboBoxPopoverTemplate;
	}

	static get styles() {
		return styles;
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, ValueStateMessageCss, SuggestionsCss];
	}

	static get dependencies() {
		return [
			MultiComboBoxItem,
			Tokenizer,
			Token,
			Icon,
			ResponsivePopover,
			Popover,
			List,
			StandardListItem,
			ToggleButton,
			Button,
		];
	}

	constructor() {
		super();

		this._filteredItems = [];
		this.selectedValues = [];
		this._inputLastValue = "";
		this._valueBeforeOpen = "";
		this._deleting = false;
		this._validationTimeout = null;
		this._handleResizeBound = this._handleResize.bind(this);
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResizeBound);
	}

	_handleResize() {
		this._inputWidth = this.offsetWidth;
	}

	_inputChange() {
		this.fireEvent("change");
	}

	togglePopover() {
		this.allItemsPopover.toggle(this);
	}

	_showFilteredItems() {
		this.filterSelected = true;
		this._showMorePressed = true;

		this.togglePopover();
	}

	filterSelectedItems(event) {
		this.filterSelected = event.target.pressed;
		this.selectedItems = this._filteredItems.filter(item => item.selected);
	}

	get _showAllItemsButtonPressed() {
		return this.filterSelected;
	}

	get _inputDom() {
		return this.shadowRoot.querySelector("#ui5-multi-combobox-input");
	}

	_inputLiveChange(event) {
		const input = event.target;
		const value = input.value;
		const filteredItems = this._filterItems(value);
		const oldValueState = this.valueState;

		if (this.filterSelected) {
			this.filterSelected = false;
		}

		/* skip calling change event when an input with a placeholder is focused on IE
			- value of the host and the internal input should be differnt in case of actual input
			- input is called when a key is pressed => keyup should not be called yet
		*/
		const skipFiring = (this._inputDom.value === this.value) && isIE() && !this._keyDown && !!this.placeholder;

		if (skipFiring) {
			event.preventDefault();

			return;
		}

		if (this._validationTimeout) {
			input.value = this._inputLastValue;
			return;
		}

		if (!filteredItems.length && value && !this.allowCustomValues) {
			input.value = this._inputLastValue;
			this.valueState = "Error";

			this._resetValueState(oldValueState);

			return;
		}

		this._inputLastValue = input.value;
		this.value = input.value;
		this._filteredItems = filteredItems;

		if (!isPhone()) {
			if (filteredItems.length === 0) {
				this.allItemsPopover.close();
			} else {
				this.allItemsPopover.showAt(this);
			}
		}

		this.fireEvent("input");
	}

	_tokenDelete(event) {
		const token = event.detail.ref;
		const deletingItem = this.items.find(item => item._id === token.getAttribute("data-ui5-id"));

		deletingItem.selected = false;
		this._deleting = true;

		this.fireSelectionChange();
	}

	get _getPlaceholder() {
		if (this._tokenizer && this._tokenizer.tokens.length) {
			return "";
		}

		return this.placeholder;
	}

	_handleLeft() {
		const cursorPosition = this.getDomRef().querySelector(`input`).selectionStart;

		if (cursorPosition === 0) {
			this._tokenizer._focusLastToken();
		}
	}

	_tokenizerFocusOut(event) {
		this._tokenizerFocused = false;

		const tokensCount = this._tokenizer.tokens.length - 1;

		if (!event.relatedTarget || event.relatedTarget.localName !== "ui5-token") {
			this._tokenizer.tokens.forEach(token => { token.selected = false; });
			this._tokenizer.scrollToStart();
		}

		if (tokensCount === 0 && this._deleting) {
			setTimeout(() => {
				if (!isPhone()) {
					this.shadowRoot.querySelector("input").focus();
				}

				this._deleting = false;
			}, 0);
		}
	}

	_tokenizerFocusIn() {
		this._tokenizerFocused = true;
		this.focused = false;
	}

	_onkeyup() {
		this._keyDown = false;
	}

	async _onkeydown(event) {
		if (isLeft(event)) {
			this._handleLeft(event);
		}

		if (isShow(event) && !this.readonly && !this.disabled) {
			event.preventDefault();
			this.togglePopover();
		}

		if (this.open && (isUp(event) || isDown(event))) {
			this._handleArrowNavigation(event);
		}

		if (isBackSpace(event) && event.target.value === "") {
			event.preventDefault();

			this._tokenizer._focusLastToken();
		}

		// Reset value on ESC
		if (isEscape(event) && (!this.allowCustomValues || (!this.open && this.allowCustomValues))) {
			this.value = this._lastValue;
		}

		if (isEnter(event)) {
			this.handleEnter();
		}

		this._keyDown = true;
	}

	_onValueStateKeydown(event) {
		const isArrowDown = isDown(event);
		const isArrowUp = isUp(event);

		event.preventDefault();

		if (isArrowDown) {
			this._handleArrowDown(event);
		}

		if (isArrowUp) {
			this._inputDom.focus();
		}
	}

	_onItemKeydown(event) {
		const isFirstItem = this.list.items[0] === event.target;

		event.preventDefault();

		if (!isUp(event) || !isFirstItem) {
			return;
		}

		if (this.valueStateHeader) {
			this.valueStateHeader.focus();
			return;
		}

		this._inputDom.focus();
	}

	async _handleArrowNavigation(event) {
		const isArrowDown = isDown(event);
		const hasSuggestions = this.allItemsPopover.opened && this.items.length;

		event.preventDefault();

		if (this.hasValueStateMessage && !this.valueStateHeader) {
			await this._setValueStateHeader();
		}

		if (isArrowDown && this.focused && this.valueStateHeader) {
			this.valueStateHeader.focus();
			return;
		}

		if (isArrowDown && this.focused && hasSuggestions) {
			this._handleArrowDown(event);
		}
	}

	_handleArrowDown(event) {
		const firstListItem = this.list.items[0];

		this.list._itemNavigation.setCurrentItem(firstListItem);
		firstListItem.focus();
	}

	handleEnter() {
		const lowerCaseValue = this.value.toLowerCase();
		const matchingItem = this.items.find(item => item.text.toLowerCase() === lowerCaseValue);
		const oldValueState = this.valueState;

		if (matchingItem) {
			if (matchingItem.selected) {
				if (this._validationTimeout) {
					return;
				}

				this.valueState = "Error";
				this._performingSelectionTwice = true;
				this._resetValueState(oldValueState, () => {
					this._performingSelectionTwice = false;
				});
			} else {
				matchingItem.selected = true;
				this.value = "";
				this.fireSelectionChange();
			}

			this.allItemsPopover.close();
		}
	}

	_resetValueState(valueState, callback) {
		this._validationTimeout = setTimeout(() => {
			this.valueState = valueState;
			this._validationTimeout = null;

			callback && callback();
		}, 2000);
	}

	_onTokenizerKeydown(event) {
		if (isRight(event)) {
			const lastTokenIndex = this._tokenizer.tokens.length - 1;

			if (this._tokenizer.tokens[lastTokenIndex] === document.activeElement.shadowRoot.activeElement) {
				setTimeout(() => {
					this.shadowRoot.querySelector("input").focus();
				}, 0);
			}
		}
	}

	_filterItems(str) {
		return (Filters[this.filter] || Filters.StartsWithPerTerm)(str, this.items);
	}

	_afterOpenPicker() {
		this._toggle();

		if (!isPhone()) {
			this._innerInput.focus();
		} else {
			this.allItemsPopover.focus();
		}
	}

	_toggle() {
		this.open = !this.open;
		this.fireEvent("open-change");
	}

	_getSelectedItems() {
		// Angular 2 way data binding
		this.selectedValues = this.items.filter(item => item.selected);
		return this.selectedValues;
	}

	_listSelectionChange(event) {
		// sync list items and cb items
		this.syncItems(event.target.items);

		// don't call selection change right after selection as user can cancel it on phone
		if (!isPhone()) {
			this.fireSelectionChange();
		}

		if (!event.detail.selectionComponentPressed && !isSpace(event.detail)) {
			this.allItemsPopover.close();
			this.value = "";

			// if the item (not checkbox) is clicked, call the selection change
			if (isPhone()) {
				this.fireSelectionChange();
			}

			this.fireEvent("input");
		}
	}

	syncItems(listItems) {
		listItems.forEach(item => {
			this.items.forEach(mcbItem => {
				if (mcbItem._id === item.getAttribute("data-ui5-token-id")) {
					mcbItem.selected = item.selected;
				}
			});
		});
	}

	fireSelectionChange() {
		this.fireEvent("selection-change", { items: this._getSelectedItems() });
		// Angular 2 way data binding
		this.fireEvent("value-changed");
	}

	async _getRespPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.allItemsPopover = staticAreaItem.querySelector(`.ui5-multi-combobox-all-items-responsive-popover`);
	}

	async _getList() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.list = staticAreaItem.querySelector(".ui5-multi-combobox-all-items-list");
	}

	_click(event) {
		if (isPhone() && !this.readonly && !this._showMorePressed && !this._deleting) {
			this.allItemsPopover.showAt(this);
		}

		this._showMorePressed = false;
	}

	_afterClosePicker() {
		// close device's keyboard and prevent further typing
		if (isPhone()) {
			this.blur();
		}

		this._toggle();

		this._iconPressed = false;
		this.filterSelected = false;
	}

	_beforeOpen() {
		this._itemsBeforeOpen = this.items.map(item => {
			return {
				ref: item,
				selected: item.selected,
			};
		});

		this._valueBeforeOpen = this.value;

		if (this.filterSelected) {
			this.selectedItems = this._filteredItems.filter(item => item.selected);
		}
	}

	onBeforeRendering() {
		const input = this.shadowRoot.querySelector("input");
		this._inputLastValue = this.value;

		if (input && !input.value) {
			this._filteredItems = this.items;
		}

		this.items.forEach(item => {
			item._getRealDomRef = () => this.allItemsPopover.querySelector(`*[data-ui5-stable=${item.stableDomRef}]`);
		});

		const filteredItems = this._filterItems(this.value);
		this._filteredItems = filteredItems;
	}

	async onAfterRendering() {
		await this._getRespPopover();
		await this._getList();

		this.toggle(this.shouldDisplayOnlyValueStateMessage);
		this.storeResponsivePopoverWidth();

		this._deleting = false;
	}

	get _isPhone() {
		return isPhone();
	}

	_onIconMousedown() {
		this._iconPressed = true;
	}

	storeResponsivePopoverWidth() {
		if (this.open && !this._listWidth) {
			this._listWidth = this.list.offsetWidth;
		}
	}

	toggle(isToggled) {
		if (isToggled && !this.open) {
			this.openPopover();
		} else {
			this.closePopover();
		}
	}

	handleCancel() {
		this._itemsBeforeOpen.forEach(item => {
			item.ref.selected = item.selected;
		});

		this.togglePopover();

		this.value = this._valueBeforeOpen;
	}

	handleOK() {
		if (isPhone()) {
			this.fireSelectionChange();
		}

		this.togglePopover();
	}

	async openPopover() {
		const popover = await this._getPopover();

		if (popover) {
			popover.showAt(this);
		}
	}

	_forwardFocusToInner() {
		this._innerInput.focus();
	}

	async closePopover() {
		const popover = await this._getPopover();

		popover && popover.close();
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector("[ui5-popover]");
	}

	async _getResponsivePopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector("[ui5-responsive-popover]");
	}

	async _setValueStateHeader() {
		const responsivePopover = await this._getResponsivePopover();
		this.valueStateHeader = responsivePopover.querySelector("div.ui5-responsive-popover-header.ui5-valuestatemessage-root");
	}

	get _tokenizer() {
		return this.shadowRoot.querySelector("[ui5-tokenizer]");
	}

	inputFocusIn() {
		if (!isPhone()) {
			this.focused = true;
		} else {
			this._innerInput.blur();
		}

		this._lastValue = this.value;
	}

	inputFocusOut(event) {
		if (!this.shadowRoot.contains(event.relatedTarget) && !this._deleting) {
			this.focused = false;

			// remove the value if user focus out the input and focus is not going in the popover
			if (!isPhone() && !this.allowCustomValues && (this.staticAreaItem !== event.relatedTarget)) {
				this.value = "";
			}
		}
	}

	_readonlyIconClick() {
		this._inputDom.focus();
	}

	get editable() {
		return !this.readonly;
	}

	get _isFocusInside() {
		return !isPhone() && (this.focused || this._tokenizerFocused);
	}

	get selectedItemsListMode() {
		return this.readonly ? "None" : "MultiSelect";
	}

	get _listItemsType() {
		return this.readonly ? "Inactive" : "Active";
	}

	get hasValueState() {
		return this.valueState !== ValueState.None;
	}

	get hasValueStateMessage() {
		return this.hasValueState && this.valueState !== ValueState.Success;
	}

	get valueStateText() {
		let key = this.valueState;

		if (this._performingSelectionTwice) {
			key = "Error_Selection";
		}

		return this.valueStateTextMappings[key];
	}

	get valueStateTextId() {
		return this.hasValueState ? `${this._id}-valueStateDesc` : undefined;
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
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

	get _tokensCountText() {
		if (!this._tokenizer) {
			return;
		}
		return this._tokenizer._tokensCountText();
	}

	get _tokensCountTextId() {
		return `${this._id}-hiddenText-nMore`;
	}

	get ariaDescribedByText() {
		return this.valueStateTextId ? `${this._tokensCountTextId} ${this.valueStateTextId}` : `${this._tokensCountTextId}`;
	}

	get shouldDisplayDefaultValueStateMessage() {
		return !this.valueStateMessage.length && this.hasValueStateMessage;
	}

	get shouldDisplayOnlyValueStateMessage() {
		return this.focused && this.hasValueStateMessage && !this._iconPressed;
	}

	get valueStateTextMappings() {
		return {
			"Success": MultiComboBox.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Error": MultiComboBox.i18nBundle.getText(VALUE_STATE_ERROR),
			"Error_Selection": MultiComboBox.i18nBundle.getText(VALUE_STATE_ERROR_ALREADY_SELECTED),
			"Warning": MultiComboBox.i18nBundle.getText(VALUE_STATE_WARNING),
			"Information": MultiComboBox.i18nBundle.getText(VALUE_STATE_INFORMATION),
		};
	}

	get _innerInput() {
		if (isPhone()) {
			if (this.allItemsPopover.opened) {
				return this.allItemsPopover.querySelector("input");
			}
		}

		return this.getDomRef().querySelector("#ui5-multi-combobox-input");
	}

	get _headerTitleText() {
		return MultiComboBox.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get _iconAccessibleNameText() {
		return MultiComboBox.i18nBundle.getText(SELECT_OPTIONS);
	}

	get _dialogOkButton() {
		return MultiComboBox.i18nBundle.getText(MULTICOMBOBOX_DIALOG_OK_BUTTON);
	}

	get _tokenizerExpanded() {
		return (this._isFocusInside || this.open) && !this.readonly;
	}

	get classes() {
		return {
			popover: {
				"ui5-multi-combobox-all-items-responsive-popover": true,
				"ui5-suggestions-popover": !this.isPhone,
				"ui5-suggestions-popover-with-value-state-header": !this.isPhone && this.hasValueStateMessage,
			},
			popoverValueState: {
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage-header": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Success,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Error,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Warning,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}

	get styles() {
		return {
			popoverValueStateMessage: {
				"width": `${this._listWidth}px`,
				"display": this._listWidth === 0 ? "none" : "inline-block",
			},
			popoverHeader: {
				"max-width": isPhone() ? "100%" : `${this._inputWidth}px`,
			},
		};
	}

	static async onDefine() {
		MultiComboBox.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

MultiComboBox.define();

export default MultiComboBox;
