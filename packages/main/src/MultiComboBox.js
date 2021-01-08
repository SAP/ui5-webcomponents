import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import {
	isShow,
	isDown,
	isBackSpace,
	isSpace,
	isLeft,
	isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import { isIE, isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/multiselect-all.js";
import MultiComboBoxItem from "./MultiComboBoxItem.js";
import Tokenizer from "./Tokenizer.js";
import Token from "./Token.js";
import Icon from "./Icon.js";
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
	TOKENIZER_ARIA_CONTAIN_TOKEN,
	TOKENIZER_ARIA_CONTAIN_ONE_TOKEN,
	TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS,
	INPUT_SUGGESTIONS_TITLE,
	ICON_ACCESSIBLE_NAME,
	MULTICOMBOBOX_DIALOG_OK_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import MultiComboBoxTemplate from "./generated/templates/MultiComboBoxTemplate.lit.js";
import MultiComboBoxPopoverTemplate from "./generated/templates/MultiComboBoxPopoverTemplate.lit.js";

// Styles
import styles from "./generated/themes/MultiComboBox.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-multi-combobox",
	languageAware: true,
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.MultiComboBox.prototype */ {
		/**
		 * Defines the <code>ui5-multi-combobox</code> items.
		 * <br><br>
		 * Example: <br>
		 * &lt;ui5-multi-combobox><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-li>Item #1&lt;/ui5-li><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-li>Item #2&lt;/ui5-li><br>
		 * &lt;/ui5-multi-combobox>
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
		* Defines the icon to be displayed in the <code>ui5-multi-combobox</code>.
		*
		* @type {HTMLElement[]}
		* @slot
		* @public
		* @since 1.0.0-rc.9
		*/
	   icon: {
		   type: HTMLElement,
	   },

		/**
		 * Defines the value state message that will be displayed as pop up under the <code>ui5-multi-combobox</code>.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the <code>ui5-multi-combobox</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
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
		 * Defines the value of the <code>ui5-multi-combobox</code>.
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
		 * <code>ui5-multi-combobox</code> has no value.
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
		 * Defines whether <code>ui5-multi-combobox</code> is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-multi-combobox</code> is completely noninteractive.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the value state of the <code>ui5-multi-combobox</code>.
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
		 * Defines whether the <code>ui5-multi-combobox</code> is read-only.
		 * <br><br>
		 * <b>Note:</b> A read-only <code>ui5-multi-combobox</code> is not editable,
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
		 * Defines whether the <code>ui5-multi-combobox</code> is required.
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
		 * Defines the filter type of the <code>ui5-multi-combobox</code>.
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
		 * Fired when the value of the <code>ui5-multi-combobox</code> changes at each keystroke.
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
 * The <code>ui5-multi-combobox</code> component provides a list box with items and a text field allowing the user to either type a value directly into the control, or choose from the list of existing items.
 *
 * It is a drop-down list for selecting and filtering values, commonly used to enable users to select one or more options from a predefined list. The control provides an editable input field to filter the list, and a dropdown arrow of available options.
 * The select options in the list have checkboxes that permit multi-selection. Entered values are displayed as tokens.
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
 * In the context of <code>ui5-multi-combobox</code>, you can provide a custom stable DOM ref for:
 * <ul>
 * <li>Every <code>ui5-mcb-item</code> that you provide.
 * Example: <code><ui5-mcb-item stable-dom-ref="item1"></ui5-mcb-item></code></li>
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
		return [ResponsivePopoverCommonCss, ValueStateMessageCss];
	}

	static get dependencies() {
		return [
			MultiComboBoxItem,
			Tokenizer,
			Token,
			Icon,
			ResponsivePopover,
			List,
			StandardListItem,
			ToggleButton,
			Button,
		];
	}

	constructor() {
		super();

		this._filteredItems = [];
		this._inputLastValue = "";
		this._deleting = false;
		this._validationTimeout = null;
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
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

	_showMorePopover() {
		this.filterSelected = true;
		this._toggleRespPopover();
	}

	togglePopover() {
		this._toggleRespPopover();

		if (!isPhone()) {
			this._inputDom.focus();
		}
	}

	filterSelectedItems(event) {
		if (this.allItemsSelected) {
			this.filterSelected = true;
			return;
		}

		this.filterSelected = event.target.pressed;
	}

	get _showAllItemsButtonPressed() {
		return this.filterSelected || this.allItemsSelected;
	}

	get allItemsSelected() {
		return this.items.length === this.selectedValues.length;
	}

	get _inputDom() {
		return this.shadowRoot.querySelector("#ui5-multi-combobox-input");
	}

	_inputLiveChange(event) {
		const input = event.target;
		const value = input.value;
		const filteredItems = this._filterItems(value);
		const oldValueState = this.valueState;

		/* skip calling change event when an input with a placeholder is focused on IE
			- value of the host and the internal input should be differnt in case of actual input
			- input is called when a key is pressed => keyup should not be called yet
		*/
		const skipFiring = (this._inputDom.value === this.value) && isIE && !this._keyDown && !!this.placeholder;

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

			this._validationTimeout = setTimeout(() => {
				this.valueState = oldValueState;
				this._validationTimeout = null;
			}, 2000);

			return;
		}


		this._inputLastValue = input.value;
		this.value = input.value;
		this._filteredItems = filteredItems;

		if (!isPhone()) {
			if (filteredItems.length === 0) {
				this.allItemsPopover.close();
			} else {
				this.allItemsPopover.open(this);
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

	_handleLeft() {
		const cursorPosition = this.getDomRef().querySelector(`input`).selectionStart;

		if (cursorPosition === 0) {
			this._focusLastToken();
		}
	}

	_focusLastToken() {
		const lastTokenIndex = this._tokenizer.tokens.length - 1;

		if (lastTokenIndex < 0) {
			return;
		}

		this._tokenizer.tokens[lastTokenIndex].focus();
		this._tokenizer._itemNav.currentIndex = lastTokenIndex;
	}

	_tokenizerFocusOut(event) {
		this._tokenizerFocused = false;

		const tokenizer = this.shadowRoot.querySelector("[ui5-tokenizer]");
		const tokensCount = tokenizer.tokens.length - 1;

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
			this._toggleRespPopover();
		}

		if (isDown(event) && this.allItemsPopover.opened && this.items.length) {
			event.preventDefault();
			await this._getList();
			this.list._itemNavigation.current = 0;
			this.list.items[0].focus();
		}

		if (isBackSpace(event) && event.target.value === "") {
			event.preventDefault();

			this._focusLastToken();
		}

		this._keyDown = true;
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

	_toggle() {
		this.open = !this.open;
		this.fireEvent("open-change");

		if (!this.open) {
			this._afterClosePopover();
		}
	}

	_getSelectedItems() {
		// Angular 2 way data binding
		this.selectedValues = this.items.filter(item => item.selected);
		return this.selectedValues;
	}

	_listSelectionChange(event) {
		event.target.items.forEach(item => {
			this.items.forEach(mcbItem => {
				if (mcbItem._id === item.getAttribute("data-ui5-token-id")) {
					mcbItem.selected = item.selected;
				}
			});
		});

		this.fireSelectionChange();

		if (!event.detail.selectionComponentPressed && !isSpace(event.detail)) {
			this.allItemsPopover.close();
			this.value = "";
			this.fireEvent("input");
		}
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

	_toggleRespPopover() {
		this.allItemsPopover.toggle(this);
	}

	_click(event) {
		if (isPhone() && !this.readonly && !this._showMorePressed) {
			this.allItemsPopover.open(this);
		}

		this._showMorePressed = false;
	}

	_afterClosePopover() {
		// close device's keyboard and prevent further typing
		if (isPhone()) {
			this.blur();
		}

		this._iconPressed = false;
		this.filterSelected = false;
	}

	onBeforeRendering() {
		const input = this.shadowRoot.querySelector("input");
		this._inputLastValue = this.value;

		if (input && !input.value) {
			this._filteredItems = this.items;
		}

		const filteredItems = this._filterItems(this.value);
		this._filteredItems = filteredItems;
	}

	async onAfterRendering() {
		await this._getRespPopover();
		await this._getList();

		this.toggle(this.shouldDisplayOnlyValueStateMessage);
		this.storeResponsivePopoverWidth();
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

	async openPopover() {
		const popover = await this._getPopover();

		if (popover) {
			popover.openBy(this);
		}
	}

	async closePopover() {
		const popover = await this._getPopover();

		popover && popover.close();
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector("[ui5-popover]");
	}

	get _tokenizer() {
		return this.shadowRoot.querySelector("[ui5-tokenizer]");
	}

	get nMoreCountText() {
		const iTokenCount = this._getSelectedItems().length;

		if (iTokenCount === 0) {
			return this.i18nBundle.getText(TOKENIZER_ARIA_CONTAIN_TOKEN);
		}

		if (iTokenCount === 1) {
			return this.i18nBundle.getText(TOKENIZER_ARIA_CONTAIN_ONE_TOKEN);
		}

		return this.i18nBundle.getText(TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS, iTokenCount);
	}

	inputFocusIn() {
		if (!isPhone()) {
			this.focused = true;
		}
	}

	inputFocusOut(event) {
		if (!this.shadowRoot.contains(event.relatedTarget) && !this._deleting) {
			this.focused = false;
		}
	}

	get editable() {
		return !this.readonly;
	}

	get _isFocusInside() {
		return this.focused || this._tokenizerFocused;
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
		return this.valueStateTextMappings[this.valueState];
	}

	get valueStateTextId() {
		return this.hasValueState ? `${this._id}-valueStateDesc` : undefined;
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	get shouldDisplayDefaultValueStateMessage() {
		return !this.valueStateMessage.length && this.hasValueStateMessage;
	}

	get shouldDisplayOnlyValueStateMessage() {
		return this.focused && this.hasValueStateMessage && !this._iconPressed;
	}

	get valueStateTextMappings() {
		return {
			"Success": this.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Error": this.i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": this.i18nBundle.getText(VALUE_STATE_WARNING),
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
		return this.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get _iconAccessibleNameText() {
		return this.i18nBundle.getText(ICON_ACCESSIBLE_NAME);
	}

	get _dialogOkButton() {
		return this.i18nBundle.getText(MULTICOMBOBOX_DIALOG_OK_BUTTON);
	}

	get _tokenizerExpanded() {
		return (this._isFocusInside || this.open) && !this.readonly;
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

	get styles() {
		return {
			popoverValueStateMessage: {
				"width": `${this._listWidth}px`,
				"min-height": "2.5rem",
				"padding": "0.5625rem 1rem",
				"display": this._listWidth === 0 ? "none" : "inline-block",
			},
			popoverHeader: {
				"width": `${this._inputWidth}px`,
			},
		};
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}
}

MultiComboBox.define();

export default MultiComboBox;
