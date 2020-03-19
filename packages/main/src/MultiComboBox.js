import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import {
	isShow, isDown, isBackSpace, isSpace,
} from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-down.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { isIE, isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Tokenizer from "./Tokenizer.js";
import Token from "./Token.js";
import Icon from "./Icon.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import StandardListItem from "./StandardListItem.js";
import ToggleButton from "./ToggleButton.js";
import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	TOKENIZER_ARIA_CONTAIN_TOKEN,
	TOKENIZER_ARIA_CONTAIN_ONE_TOKEN,
	TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS,
	INPUT_SUGGESTIONS_TITLE,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import MultiComboBoxTemplate from "./generated/templates/MultiComboBoxTemplate.lit.js";
import MultiComboBoxPopoverTemplate from "./generated/templates/MultiComboBoxPopoverTemplate.lit.js";

// Styles
import styles from "./generated/themes/MultiComboBox.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-multi-combobox",
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
			listenFor: { include: ["*"] },
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
		 * Available options are: <code>None</code>, <code>Success</code>, <code>Warning</code>, and <code>Error</code>.
		 *
		 * @type {string}
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

		/**
		 * Indicates whether the input is focssed
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		_filteredItems: {
			type: Object,
		},

		_iconPressed: {
			type: Boolean,
			noAttribute: true,
		},

		/**
		 * Indicates whether the tokenizer is expanded or collapsed(shows the n more label)
		 * @private
		 */
		expandedTokenizer: {
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
		 * Fired when the value of the <code>ui5-multi-combobox</code> changes at each keystroke.
		 *
		 * @event
		 * @public
		 */
		input: {},

		/**
		 * Fired when the dropdown is opened or closed.
		 *
		 * @event
		 * @since 1.0.0-rc.5
		 * @public
		 */
		openChange: {},

		/**
		 * Fired when selection is changed by user interaction
		 * in <code>SingleSelect</code> and <code>MultiSelect</code> modes.
		 *
		 * @event
		 * @param {Array} items an array of the selected items.
		 * @public
		 */
		selectionChange: {
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
		return ResponsivePopoverCommonCss;
	}

	constructor() {
		super();

		this._filteredItems = [];
		this._inputLastValue = "";
		this._deleting = false;
		this._validationTimeout = null;
		this._selectedItemsPopoverOpened = false;
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	_inputChange() {
		this.fireEvent("change");
	}

	_showMorePopover() {
		if (this.readonly) {
			return;
		}

		this._showMorePressed = true;
		this._selectedItemsPopoverOpened = true;
		this._toggleRespPopover(true);
	}

	_showAllItemsPopover() {
		this._selectedItemsPopoverOpened = false;
		this._toggleRespPopover(false);

		this._inputDom.focus();
	}

	_closeMorePopover() {
		this.selectedItemsPopover.close();
	}

	_closeAllItemsPopover() {
		this.allItemsPopover.close();
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
				this.updateStaticAreaItemContentDensity();
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

		this.fireEvent("selectionChange", { items: this._getSelectedItems() });
	}

	_tokenizerFocusOut() {
		const tokenizer = this.shadowRoot.querySelector("ui5-tokenizer");
		const tokensCount = tokenizer.tokens.length - 1;

		tokenizer.tokens.forEach(token => { token.selected = false; });

		if (tokensCount === 0 && this._deleting) {
			setTimeout(() => {
				this.shadowRoot.querySelector("input").focus();
				this._deleting = false;
			}, 0);
		}
	}

	_onkeyup() {
		this._keyDown = false;
	}

	async _onkeydown(event) {
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

			const lastTokenIndex = this._tokenizer.tokens.length - 1;

			if (lastTokenIndex < 0) {
				return;
			}

			this._tokenizer.tokens[lastTokenIndex].focus();
			this._tokenizer._itemNav.currentIndex = lastTokenIndex;
		}

		this._keyDown = true;
	}

	_filterItems(value) {
		return this.items.filter(item => {
			return item.text && item.text.toLowerCase().startsWith(value.toLowerCase());
		});
	}

	_toggleIcon() {
		this._iconPressed = !this._iconPressed;
		this.open = this._iconPressed;

		this.fireEvent("openChange");

		if (!this._iconPressed) {
			this._afterClosePopover();
		}
	}

	_getSelectedItems() {
		return this.items.filter(item => item.selected);
	}

	_listSelectionChange(event) {
		event.target.items.forEach(item => {
			this.items.forEach(mcbItem => {
				if (mcbItem._id === item.getAttribute("data-ui5-token-id")) {
					mcbItem.selected = item.selected;
				}
			});
		});

		this.fireEvent("selectionChange", { items: this._getSelectedItems() });

		if (!event.detail.selectionComponentPressed && !isSpace(event.detail)) {
			this.allItemsPopover.close();
			this.value = "";
			this.fireEvent("input");
		}
	}

	async _getRespPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.selectedItemsPopover = staticAreaItem.querySelector(`.ui5-multi-combobox-selected-items-responsive-popover`);
		this.allItemsPopover = staticAreaItem.querySelector(`.ui5-multi-combobox-all-items-responsive-popover`);
	}

	async _getList() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.list = staticAreaItem.querySelector(".ui5-multi-combobox-all-items-list");
	}

	_toggleRespPopover(isMorePopover) {
		this.updateStaticAreaItemContentDensity();

		if (this.allItemsPopover && this.allItemsPopover.opened) {
			return this.allItemsPopover.close();
		}

		this.selectedItemsPopover && this.selectedItemsPopover.close();

		this.allItemsPopover && this.allItemsPopover.open(this);
	}

	_focusin() {
		this.focused = true;
	}

	_focusout() {
		this.focused = false;
	}

	_click(event) {
		if (isPhone() && !this.readonly && !this._showMorePressed) {
			this.updateStaticAreaItemContentDensity();
			this.allItemsPopover.open(this);
		}

		this._showMorePressed = false;
	}

	_afterClosePopover() {
		// close device's keyboard and prevent further typing
		if (isPhone()) {
			this.blur();
		}
	}

	_toggleButtonPress(event) {
		if (this._selectedItemsPopoverOpened) {
			event.target.pressed = true;
			this._showAllItemsPopover();
		} else {
			event.target.pressed = false;
			this._showMorePopover();
		}
	}

	onBeforeRendering() {
		this._inputLastValue = this.value;

		const hasSelectedItem = this.items.some(item => item.selected);

		if (this.getDomRef() && !hasSelectedItem) {
			const morePopover = this.selectedItemsPopover;

			morePopover && morePopover.close();
		}

		const input = this.shadowRoot.querySelector("input");

		if (input && !input.value) {
			this._filteredItems = this.items;
		}

		const filteredItems = this._filterItems(this.value);
		this._filteredItems = filteredItems;
	}

	async onAfterRendering() {
		await this._getRespPopover();
		if (this.open && !this.allItemsPopover.opened) {
			this.updateStaticAreaItemContentDensity();
			this.allItemsPopover.open(this);
			// Set initial focus to the native input
			this._innerInput.focus();
		}
	}

	get valueStateTextMappings() {
		return {
			"Success": this.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Error": this.i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": this.i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	get _tokenizer() {
		return this.shadowRoot.querySelector("ui5-tokenizer");
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

	rootFocusIn() {
		this.expandedTokenizer = true;
	}

	rootFocusOut(event) {
		if (!this.shadowRoot.contains(event.relatedTarget) && !this._deleting) {
			this.expandedTokenizer = false;
		}
	}

	get editable() {
		return !this.readonly;
	}

	get dir() {
		return getRTL() ? "rtl" : "ltr";
	}

	get selectedItemsListMode() {
		return this.readonly ? "None" : "MultiSelect";
	}

	get hasValueState() {
		return this.valueState !== ValueState.None;
	}

	get valueStateText() {
		return this.valueStateTextMappings[this.valueState];
	}

	get _innerInput() {
		if (isPhone()) {
			if (this.allItemsPopover.opened) {
				return this.allItemsPopover.querySelector("input");
			}

			return this.selectedItemsPopover.querySelector("input");
		}

		return this.getDomRef().querySelector("#ui5-multi-combobox-input");
	}

	get _headerTitleText() {
		return this.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	static async onDefine() {
		await Promise.all([
			Tokenizer.define(),
			Token.define(),
			Icon.define(),
			ResponsivePopover.define(),
			List.define(),
			StandardListItem.define(),
			ToggleButton,
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}
}

MultiComboBox.define();

export default MultiComboBox;
