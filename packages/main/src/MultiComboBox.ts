import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import type { ClassMap, Timeout } from "@ui5/webcomponents-base/dist/types.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import {
	isShow,
	isDown,
	isUp,
	isSpace,
	isSpaceCtrl,
	isSpaceShift,
	isRight,
	isHome,
	isEnd,
	isTabNext,
	isTabPrevious,
	isUpShift,
	isDownShift,
	isLeftCtrl,
	isRightCtrl,
	isUpCtrl,
	isDownCtrl,
	isHomeCtrl,
	isEndCtrl,
	isCtrlA,
	isCtrlV,
	isDeleteShift,
	isInsertShift,
	isInsertCtrl,
	isBackSpace,
	isDelete,
	isEscape,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import {
	isPhone,
	isAndroid,
} from "@ui5/webcomponents-base/dist/Device.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/multiselect-all.js";
import "@ui5/webcomponents-icons/dist/not-editable.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import MultiComboBoxItem from "./MultiComboBoxItem.js";
import MultiComboBoxGroupItem from "./MultiComboBoxGroupItem.js";
import GroupHeaderListItem from "./GroupHeaderListItem.js";
import Tokenizer, { ClipboardDataOperation } from "./Tokenizer.js";
import type { TokenizerTokenDeleteEventDetail } from "./Tokenizer.js";
import Token from "./Token.js";
import Icon from "./Icon.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import type { SelectionChangeEventDetail } from "./List.js";
import StandardListItem from "./StandardListItem.js";
import ToggleButton from "./ToggleButton.js";
import * as Filters from "./Filters.js";
import Button from "./Button.js";
import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_INFORMATION,
	VALUE_STATE_TYPE_SUCCESS,
	VALUE_STATE_TYPE_INFORMATION,
	VALUE_STATE_TYPE_ERROR,
	VALUE_STATE_TYPE_WARNING,
	INPUT_SUGGESTIONS_TITLE,
	SELECT_OPTIONS,
	MULTICOMBOBOX_DIALOG_OK_BUTTON,
	VALUE_STATE_ERROR_ALREADY_SELECTED,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import MultiComboBoxTemplate from "./generated/templates/MultiComboBoxTemplate.lit.js";
import MultiComboBoxPopoverTemplate from "./generated/templates/MultiComboBoxPopoverTemplate.lit.js";

// Styles
import multiCbxStyles from "./generated/themes/MultiComboBox.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import SuggestionsCss from "./generated/themes/Suggestions.css.js";
import MultiComboBoxPopover from "./generated/themes/MultiComboBoxPopover.css.js";
import ComboBoxFilter from "./types/ComboBoxFilter.js";
import type FormSupportT from "./features/InputElementsFormSupport.js";
import type ListItemBase from "./ListItemBase.js";

interface IMultiComboBoxItem extends UI5Element {
	text: string,
	selected: boolean,
	isGroupItem?: boolean,
	stableDomRef: string,
}

type ValueStateAnnouncement = Record<Exclude<ValueState, ValueState.None>, string>;
type ValueStateTypeAnnouncement = Record<Exclude<ValueState, ValueState.None>, string>;

type MultiComboBoxSelectionChangeEventDetail = {
	items: Array<MultiComboBoxItem>,
};

type MultiComboboxItemWithSelection = {
	ref: IMultiComboBoxItem,
	selected: boolean,
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
 * <li> Tokenizer - a list of tokens with selected options.</li>
 * <li> Input field - displays the selected option/s as token/s. Users can type to filter the list.</li>
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
 * @alias sap.ui.webc.main.MultiComboBox
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-multi-combobox
 * @public
 * @appenddocs sap.ui.webc.main.MultiComboBoxItem sap.ui.webc.main.MultiComboBoxGroupItem
 * @since 0.11.0
 */
@customElement({
	tag: "ui5-multi-combobox",
	languageAware: true,
	renderer: litRender,
	template: MultiComboBoxTemplate,
	staticAreaTemplate: MultiComboBoxPopoverTemplate,
	styles: multiCbxStyles,
	staticAreaStyles: [ResponsivePopoverCommonCss, ValueStateMessageCss, SuggestionsCss, MultiComboBoxPopover],
	dependencies: [
		MultiComboBoxItem,
		MultiComboBoxGroupItem,
		Tokenizer,
		Token,
		Icon,
		ResponsivePopover,
		Popover,
		List,
		StandardListItem,
		GroupHeaderListItem,
		ToggleButton,
		Button,
	],
})
/**
 * Fired when the input operation has finished by pressing Enter or on focusout.
 *
 * @event sap.ui.webc.main.MultiComboBox#change
 * @public
 */
 @event("change")

/**
 * Fired when the value of the component changes at each keystroke.
 *
 * @event sap.ui.webc.main.MultiComboBox#input
 * @public
 */
@event("input")

/**
 * Fired when the dropdown is opened or closed.
 *
 * @event sap.ui.webc.main.MultiComboBox#open-change
 * @since 1.0.0-rc.5
 * @public
 */
@event("open-change")

/**
 * Fired when selection is changed by user interaction
 * in <code>SingleSelect</code> and <code>MultiSelect</code> modes.
 *
 * @event sap.ui.webc.main.MultiComboBox#selection-change
 * @param {Array} items an array of the selected items.
 * @public
 */
@event("selection-change", {
	detail: {
		items: { type: Array },
	},
})

class MultiComboBox extends UI5Element {
	/**
	 * Defines the value of the component.
	 * <br><br>
	 * <b>Note:</b> The property is updated upon typing.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.value
	 * @defaultvalue ""
	 * @formEvents change input
	 * @formProperty
	 * @public
	 */
	@property()
	value!: string;

	/**
	 * Defines whether the value will be autcompleted to match an item
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.noTypeahead
	 * @defaultvalue false
	 * @public
	 * @since 1.4.0
	 */
	@property({ type: Boolean })
	noTypeahead!: boolean;

	/**
	 * Defines a short hint intended to aid the user with data entry when the
	 * component has no value.
	 * @type {string}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.placeholder
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	placeholder!: string;

	/**
	 * Defines if the user input will be prevented, if no matching item has been found
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.allowCustomValues
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	allowCustomValues!: boolean;

	/**
	 * Defines whether the component is in disabled state.
	 * <br><br>
	 * <b>Note:</b> A disabled component is completely noninteractive.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.disabled
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

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
	 * @type {sap.ui.webc.base.types.ValueState}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.valueState
	 * @defaultvalue "None"
	 * @public
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

	/**
	 * Defines whether the component is read-only.
	 * <br><br>
	 * <b>Note:</b> A read-only component is not editable,
	 * but still provides visual feedback upon user interaction.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.readonly
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	readonly!: boolean;

	/**
	 * Defines whether the component is required.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.required
	 * @defaultvalue false
	 * @public
	 * @since 1.0.0-rc.5
	 */
	@property({ type: Boolean })
	required!: boolean;

	/**
	 * Defines the filter type of the component.
	 * Available options are: <code>StartsWithPerTerm</code>, <code>StartsWith</code>, <code>Contains</code> and <code>None</code>.
	 *
	 * @type {sap.ui.webc.main.types.ComboBoxFilter}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.filter
	 * @defaultvalue "StartsWithPerTerm"
	 * @public
	 */
	@property({ type: ComboBoxFilter, defaultValue: ComboBoxFilter.StartsWithPerTerm })
	filter!: `${ComboBoxFilter}`;

	/**
	 * Indicates whether the dropdown is open. True if the dropdown is open, false otherwise.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.open
	 * @defaultvalue false
	 * @readonly
	 * @since 1.0.0-rc.5
	 * @public
	 */
	@property({ type: Boolean })
	open!: boolean;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.accessibleName
	 * @defaultvalue: ""
	 * @public
	 * @since 1.4.0
	 */
	@property()
	accessibleName!: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.accessibleNameRef
	 * @defaultvalue ""
	 * @public
	 * @since 1.4.0
	 */
	@property()
	accessibleNameRef!: string;

	@property({ type: Object, noAttribute: true, multiple: true })
	_filteredItems!: Array<IMultiComboBoxItem>;

	@property({ type: Boolean })
	filterSelected!: boolean;

	@property({ type: Boolean })
	focused!: boolean;

	@property({ type: Boolean, noAttribute: true })
	_tokenizerFocused!: boolean;

	@property({ type: Boolean, noAttribute: true })
	_iconPressed!: boolean;

	@property({ validator: Integer, noAttribute: true })
	_inputWidth!: number;

	@property({ validator: Integer, noAttribute: true, defaultValue: 0 })
	_listWidth!: number;

	@property({ type: Boolean, noAttribute: true })
	_performingSelectionTwice!: boolean;

	/**
	 * Indicates whether the tokenizer has tokens
	 * @private
	 */
	@property({ type: Boolean })
	tokenizerAvailable!: boolean;

	/**
	 * Defines the component items.
	 *
	 * @type {sap.ui.webc.main.IMultiComboBoxItem[]}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.default
	 * @slot items
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true, invalidateOnChildChange: true })
	items!: Array<IMultiComboBoxItem>;

	/**
	* Defines the icon to be displayed in the component.
	*
	* @type {sap.ui.webc.main.IIcon[]}
	* @name sap.ui.webc.main.MultiComboBox.prototype.icon
	* @slot
	* @public
	* @since 1.0.0-rc.9
	*/
	@slot()
	icon!: Array<Icon>;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 * <br><br>
	 *
	 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
	 * <br>
	 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
	 * when the component is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
	 * @type {HTMLElement[]}
	 * @name sap.ui.webc.main.MultiComboBox.prototype.valueStateMessage
	 * @since 1.0.0-rc.9
	 * @slot
	 * @public
	 */
	@slot()
	valueStateMessage!: Array<HTMLElement>;

	selectedValues: Array<IMultiComboBoxItem>;
	_inputLastValue: string;
	_valueBeforeOpen: string
	_deleting: boolean;
	_validationTimeout: Timeout | null;
	_handleResizeBound: ResizeObserverCallback;
	valueBeforeAutoComplete: string;
	currentItemIdx: number;
	_lastValue: string;
	_shouldFilterItems?: boolean;
	_showMorePressed?: boolean;
	allItemsPopover?: ResponsivePopover;
	valueStateHeader?: HTMLElement;
	list?: List;
	_shouldAutocomplete?: boolean;
	_preventTokenizerToggle?: boolean;
	_isOpenedByKeyboard?: boolean;
	_itemToFocus?: IMultiComboBoxItem;
	_itemsBeforeOpen: Array<MultiComboboxItemWithSelection>;
	selectedItems?: Array<IMultiComboBoxItem>;
	FormSupport?: typeof FormSupportT;
	static i18nBundle: I18nBundle;

	constructor() {
		super();

		this._filteredItems = [];
		this.selectedValues = [];
		this._itemsBeforeOpen = [];
		this._inputLastValue = "";
		this._valueBeforeOpen = "";
		this._deleting = false;
		this._validationTimeout = null;
		this._handleResizeBound = this._handleResize.bind(this);
		this.valueBeforeAutoComplete = "";
		this._lastValue = "";
		this.currentItemIdx = -1;
		this.FormSupport = undefined;
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
		this.allItemsPopover?.toggle(this);
	}

	togglePopoverByDropdownIcon() {
		this._shouldFilterItems = false;
		this.allItemsPopover?.toggle(this);
	}

	_showFilteredItems() {
		this.filterSelected = true;
		this._showMorePressed = true;

		this.togglePopover();
	}

	filterSelectedItems(e: MouseEvent) {
		this.filterSelected = (e.target as ToggleButton).pressed;
		const selectedItems = this._filteredItems.filter(item => item.selected);
		this.selectedItems = this.items.filter((item, idx, allItems) => MultiComboBox._groupItemFilter(item, ++idx, allItems, selectedItems) || selectedItems.indexOf(item) !== -1);
	}

	get _showAllItemsButtonPressed(): boolean {
		return this.filterSelected;
	}

	get _inputDom(): HTMLInputElement {
		return this.shadowRoot!.querySelector("#ui5-multi-combobox-input")!;
	}

	_inputLiveChange(e: InputEvent) {
		const input = e.target as HTMLInputElement;
		const value: string = input.value;
		const filteredItems: Array<IMultiComboBoxItem> = this._filterItems(value);
		const oldValueState: `${ValueState}` = this.valueState;

		this._shouldFilterItems = true;

		if (this.filterSelected) {
			this.filterSelected = false;
		}

		if (this._validationTimeout) {
			input.value = this._inputLastValue;
			return;
		}

		if (!filteredItems.length && value && !this.allowCustomValues) {
			input.value = this.valueBeforeAutoComplete || this._inputLastValue;
			this.valueState = ValueState.Error;

			this._shouldAutocomplete = false;
			this._resetValueState(oldValueState);

			return;
		}

		this._inputLastValue = input.value;
		this.value = input.value;
		this._filteredItems = filteredItems;

		if (!isPhone()) {
			if (filteredItems.length === 0) {
				this.allItemsPopover?.close();
			} else {
				this.allItemsPopover?.showAt(this);
			}
		}

		this.fireEvent("input");
	}

	_tokenDelete(e: CustomEvent<TokenizerTokenDeleteEventDetail>) {
		const token: Token = e.detail.ref;
		const deletingItem = this.items.find(item => item._id === token.getAttribute("data-ui5-id"))!;

		deletingItem.selected = false;
		this._deleting = true;
		this._preventTokenizerToggle = true;

		this.fireSelectionChange();
	}

	get _getPlaceholder(): string {
		if (this._getSelectedItems().length) {
			return "";
		}

		return this.placeholder;
	}

	_handleArrowLeft() {
		const inputDomRef = this._inputDom;
		const cursorPosition = inputDomRef.selectionStart || 0;
		const isTextSelected = ((inputDomRef.selectionEnd || 0) - cursorPosition) > 0;

		if (cursorPosition === 0 && !isTextSelected) {
			this._tokenizer._focusLastToken();
		}
	}

	_tokenizerFocusOut(e: FocusEvent) {
		this._tokenizerFocused = false;

		const tokensCount = this._tokenizer.tokens.length;
		const selectedTokens = this._selectedTokensCount;
		const lastTokenBeingDeleted = tokensCount - 1 === 0 && this._deleting;
		const allTokensAreBeingDeleted = selectedTokens === tokensCount && this._deleting;
		const relatedTarget: HTMLElement | undefined = e.relatedTarget as HTMLElement;

		if (!relatedTarget || !relatedTarget.hasAttribute("ui5-token")) {
			this._tokenizer.tokens.forEach(token => {
				token.selected = false;
			});

			this._tokenizer.expanded = this._preventTokenizerToggle ? this._tokenizer.expanded : false;
		}

		if (allTokensAreBeingDeleted || lastTokenBeingDeleted) {
			setTimeout(() => {
				if (!isPhone()) {
					this._inputDom.focus();
				}

				this._deleting = false;
			}, 0);
		}
	}

	_tokenizerFocusIn() {
		this._tokenizerFocused = true;
		this.focused = false;
	}

	_onkeydown(e: KeyboardEvent) {
		const isArrowDownCtrl: boolean = isDownCtrl(e);

		if (isShow(e) && !this.disabled) {
			this._handleShow(e);
			return;
		}

		if (isDownShift(e) || isUpShift(e)) {
			e.preventDefault();
			return;
		}

		if (isUp(e) || isDown(e) || isUpCtrl(e) || isArrowDownCtrl) {
			this._handleArrowNavigation(e, isArrowDownCtrl);
			return;
		}

		// CTRL + Arrow Down navigation is performed by the ItemNavigation module of the List,
		// here we only implement the text selection of the selected item
		if (isArrowDownCtrl && !this.allItemsPopover?.opened) {
			setTimeout(() => this._inputDom.setSelectionRange(0, this._inputDom.value.length), 0);
		}

		if (isLeftCtrl(e) || isRightCtrl(e)) {
			this._handleArrowCtrl(e);
			return;
		}

		if (isCtrlV(e) || isInsertShift(e)) {
			this._handlePaste();
			return;
		}

		if (isSpaceShift(e)) {
			e.preventDefault();
		}

		if (
				 e.key === "ArrowLeft"
			|| e.key === "Show"
			|| e.key === "PageUp"
			|| e.key === "PageDown"
			|| e.key === "Backspace"
			|| e.key === "Escape"
			|| e.key === "Home"
			|| e.key === "End"
			|| e.key === "Tab"
			|| e.key === "ArrowDown"
			|| e.key === "Enter"
		) {
			this[`_handle${e.key}`](e);
		}

		this._shouldAutocomplete = !this.noTypeahead && !(isBackSpace(e) || isDelete(e) || isEscape(e) || isEnter(e));
	}

	async _handlePaste() {
		if (this.readonly) {
			return;
		}

		const pastedText = await navigator.clipboard.readText();

		if (!pastedText) {
			return;
		}

		const separatedText = pastedText.split(/\r\n|\r|\n/g);
		const matchingItems = this.items.filter(item => separatedText.indexOf(item.text) > -1 && !item.selected);

		if (matchingItems.length) {
			matchingItems.forEach(item => {
				item.selected = true;
				this.value = "";
				this.fireSelectionChange();
			});
		} else {
			this.value = pastedText;
			this.fireEvent("input");
		}
	}

	_handleShow(e: KeyboardEvent) {
		const items = this.items;
		const selectedItem = this._getSelectedItems()[0];
		const focusedToken = this._tokenizer.tokens.find(token => token.focused);
		const value = this.value;
		const matchingItem = this.items.find(item => item.text.localeCompare(value, undefined, { sensitivity: "base" }) === 0);

		e.preventDefault();

		if (this.readonly) {
			return;
		}

		this._isOpenedByKeyboard = true;
		this._shouldFilterItems = false;
		this._filteredItems = this.items;

		this.togglePopover();

		if (!focusedToken && matchingItem) {
			this._itemToFocus = matchingItem;
			return;
		}

		if (selectedItem && !focusedToken) {
			this._itemToFocus = selectedItem;
		} else if (focusedToken && e.target === focusedToken) {
			this._itemToFocus = items.find(item => item.text === focusedToken.text);
		} else {
			this._itemToFocus = items[0];
		}
	}

	_handlePageUp(e: KeyboardEvent) {
		e.preventDefault();
	}

	_handlePageDown(e: KeyboardEvent) {
		e.preventDefault();
	}

	_handleBackspace(e: KeyboardEvent) {
		if ((e.target as HTMLInputElement).value === "") {
			e.preventDefault();
			this._tokenizer._focusLastToken();
		}
	}

	_handleEscape() {
		const innerInput = this._innerInput;
		const isAutoCompleted = ((innerInput.selectionEnd || 0) - (innerInput.selectionStart || 0)) > 0;

		if (isAutoCompleted) {
			this.value = this.valueBeforeAutoComplete;
		}

		if (!this.allowCustomValues || (!this.open && this.allowCustomValues)) {
			this.value = this._lastValue;
		}
	}

	_handleHome(e: KeyboardEvent) {
		const shouldFocusToken = this._isFocusInside && (e.target as HTMLInputElement).selectionStart === 0 && this._tokenizer.tokens.length > 0;

		if (shouldFocusToken) {
			e.preventDefault();
			this._tokenizer.tokens[0].focus();
		}
	}

	_handleEnd(e: KeyboardEvent) {
		const tokens = this._tokenizer.tokens;
		const lastTokenIdx = tokens.length - 1;
		const shouldFocusInput = e.target === tokens[lastTokenIdx] && tokens[lastTokenIdx] === this.shadowRoot!.activeElement;

		if (shouldFocusInput) {
			e.preventDefault();
			this._inputDom.focus();
		}
	}

	_handleTab() {
		this.allItemsPopover?.close();
	}

	_handleSelectAll() {
		const filteredItems = this._filteredItems;
		const allItemsSelected = filteredItems.every(item => item.selected);

		filteredItems.forEach(item => {
			item.selected = !allItemsSelected;
		});

		this.fireSelectionChange();
	}

	_onValueStateKeydown(e: KeyboardEvent) {
		const isArrowDown = isDown(e);
		const isArrowUp = isUp(e);

		if (isTabNext(e) || isTabPrevious(e)) {
			this._onItemTab();
			return;
		}

		e.preventDefault();

		if (isArrowDown || isDownCtrl(e)) {
			this._handleArrowDown();
		}

		if (isArrowUp || isUpCtrl(e)) {
			this._shouldAutocomplete = true;
			this._inputDom.focus();
		}
	}

	async _onItemKeydown(e: KeyboardEvent) {
		const isFirstItem = this.list?.items[0] === e.target;
		const isArrowUp = isUp(e) || isUpCtrl(e);

		if (this.hasValueStateMessage && !this.valueStateHeader) {
			await this._setValueStateHeader();
		}

		if (isTabNext(e) || isTabPrevious(e)) {
			this._onItemTab();
			return;
		}

		if (isHomeCtrl(e)) {
			this.list?._itemNavigation._handleHome();
			this.list?.items[this.list?._itemNavigation._currentIndex].focus();
		}

		if (isEndCtrl(e)) {
			this.list?._itemNavigation._handleEnd();
			this.list?.items[this.list?._itemNavigation._currentIndex].focus();
		}

		e.preventDefault();

		if (isDownShift(e) || isUpShift(e)) {
			this._handleItemRangeSelection(e);
			return;
		}

		if ((isUpCtrl(e)) && !isFirstItem) {
			this.list?._itemNavigation._handleUp();
			this.list?.items[this.list?._itemNavigation._currentIndex].focus();
		}

		if (isDownCtrl(e)) {
			this.list?._itemNavigation._handleDown();
			this.list?.items[this.list?._itemNavigation._currentIndex].focus();
		}

		if (isShow(e)) {
			this.togglePopover();
		}

		if (isCtrlA(e)) {
			this._handleSelectAll();
			return;
		}

		if (((isArrowUp && isFirstItem) || isHome(e)) && this.valueStateHeader) {
			this.valueStateHeader.focus();
		}

		if (!this.valueStateHeader && isFirstItem && isArrowUp) {
			this._inputDom.focus();
			this._shouldAutocomplete = true;
		}
	}

	_handleArrowCtrl(e: KeyboardEvent) {
		const input = this._inputDom;
		const isArrowLeft = isLeftCtrl(e);

		if (isArrowLeft && input.selectionStart === 0 && input.selectionEnd === 0) {
			e.preventDefault();
		}

		if (isArrowLeft && ((input.selectionEnd || 0) - (input.selectionStart || 0) > 0)) {
			input.setSelectionRange(0, 0);
		}
	}

	_onItemTab() {
		this._inputDom.focus();
		this.allItemsPopover?.close();
	}

	async _handleArrowNavigation(e: KeyboardEvent, isDownControl: boolean) {
		const isArrowDown = isDownControl || isDown(e);
		const hasSuggestions = this.items.length;
		const isOpen = this.allItemsPopover?.opened;

		e.preventDefault();

		if (this.hasValueStateMessage && !this.valueStateHeader) {
			await this._setValueStateHeader();
		}

		if (isArrowDown && isOpen && this.valueStateHeader) {
			this.value = this.valueBeforeAutoComplete || this.value;
			this.valueStateHeader.focus();
			return;
		}

		if (isArrowDown && hasSuggestions) {
			this._handleArrowDown();
		}

		if (!isArrowDown && !isOpen && !this.readonly) {
			this._navigateToPrevItem();
		}
	}

	_handleArrowDown() {
		const isOpen = this.allItemsPopover?.opened;
		const firstListItem = this.list?.items[0];

		if (isOpen) {
			firstListItem && this.list?._itemNavigation.setCurrentItem(firstListItem);
			this.value = this.valueBeforeAutoComplete || this.value;
			firstListItem?.focus();
		} else if (!this.readonly) {
			this._navigateToNextItem();
		}
	}

	_handleItemRangeSelection(e: KeyboardEvent) {
		const items = this.items;
		const listItems = this.list?.items;
		const currentItemIdx = listItems?.indexOf(e.target as ListItemBase) || -1;
		const nextItemIdx = currentItemIdx + 1;
		const prevItemIdx = currentItemIdx - 1;

		if (isDownShift(e) && items[nextItemIdx]) {
			items[nextItemIdx].selected = items[currentItemIdx].selected;
			items[nextItemIdx].focus();
		}

		if (isUpShift(e) && items[prevItemIdx]) {
			items[prevItemIdx].selected = items[currentItemIdx].selected;
			items[prevItemIdx].focus();
		}

		this.fireSelectionChange();
	}

	_navigateToNextItem() {
		const items = this.items;
		const itemsCount = items.length;
		const previousItemIdx = this.currentItemIdx;

		if (previousItemIdx > -1 && items[previousItemIdx].text !== this.value) {
			this.currentItemIdx = -1;
		}

		if (previousItemIdx >= itemsCount - 1) {
			return;
		}

		let currentItem = this.items[++this.currentItemIdx];

		while ((this.currentItemIdx < itemsCount - 1 && currentItem.selected) || currentItem.isGroupItem) {
			currentItem = this.items[++this.currentItemIdx];
		}

		if (currentItem.selected === true || currentItem.isGroupItem) {
			this.currentItemIdx = previousItemIdx;
			return;
		}

		this.value = currentItem.text;
		this._innerInput.value = currentItem.text;
		this._innerInput.setSelectionRange(0, currentItem.text.length);
	}

	_navigateToPrevItem() {
		const items = this.items;
		let previousItemIdx = this.currentItemIdx;

		if ((!this.value && previousItemIdx !== -1) || (previousItemIdx !== -1 && this.value && this.value !== items[previousItemIdx].text)) {
			previousItemIdx = -1;
		}

		if (previousItemIdx === -1) {
			this.currentItemIdx = items.length;
		}

		if (previousItemIdx === 0) {
			this.currentItemIdx = 0;
			return;
		}

		let currentItem = this.items[--this.currentItemIdx];

		while ((currentItem && this.currentItemIdx > 0) && (currentItem.selected || currentItem.isGroupItem)) {
			currentItem = this.items[--this.currentItemIdx];
		}

		if (!currentItem) {
			return;
		}

		if (currentItem.selected || currentItem.isGroupItem) {
			this.currentItemIdx = previousItemIdx;
			return;
		}

		this.value = currentItem.text;
		this._innerInput.value = currentItem.text;
		this._innerInput.setSelectionRange(0, currentItem.text.length);
	}

	_handleEnter() {
		const lowerCaseValue = this.value.toLowerCase();
		const matchingItem = this.items.find(item => (item.text.toLowerCase() === lowerCaseValue && !item.isGroupItem));
		const oldValueState = this.valueState;
		const innerInput = this._innerInput;

		if (this.FormSupport) {
			this.FormSupport.triggerFormSubmit(this);
		}

		if (matchingItem) {
			if (matchingItem.selected) {
				if (this._validationTimeout) {
					return;
				}

				this.valueState = ValueState.Error;
				this._performingSelectionTwice = true;
				this._resetValueState(oldValueState, () => {
					this._performingSelectionTwice = false;
				});
			} else {
				matchingItem.selected = true;
				this.value = "";
				this.fireSelectionChange();
			}

			innerInput.setSelectionRange(matchingItem.text.length, matchingItem.text.length);
			this.allItemsPopover?.close();
		}
	}

	_resetValueState(valueState: `${ValueState}`, callback?: () => void) {
		this._validationTimeout = setTimeout(() => {
			this.valueState = valueState;
			this._validationTimeout = null;

			callback && callback();
		}, 2000);
	}

	_onTokenizerKeydown(e: KeyboardEvent) {
		const isCtrl = !!(e.metaKey || e.ctrlKey);

		if (isRight(e)) {
			const lastTokenIndex = this._tokenizer.tokens.length - this._tokenizer.overflownTokens.length - 1;

			if (e.target === this._tokenizer.tokens[lastTokenIndex]) {
				setTimeout(() => {
					this._inputDom.focus();
				}, 0);
			}
		}

		if ((isCtrl && ["c", "x"].includes(e.key.toLowerCase())) || isDeleteShift(e) || isInsertCtrl(e)) {
			e.preventDefault();

			const isCut = e.key.toLowerCase() === "x" || isDeleteShift(e);
			const selectedTokens = this._tokenizer.tokens.filter(token => token.selected);

			if (isCut) {
				const cutResult = this._tokenizer._fillClipboard(ClipboardDataOperation.cut, selectedTokens);
				selectedTokens.forEach(token => {
					this._tokenizer.deleteToken(token);
				});

				this.focus();
				return cutResult;
			}
			return this._tokenizer._fillClipboard(ClipboardDataOperation.copy, selectedTokens);
		}

		if (isCtrlV(e) || isInsertShift(e)) {
			this._handlePaste();
		}

		if (isHome(e)) {
			this._handleHome(e);
		}

		if (isEnd(e)) {
			this._handleEnd(e);
		}

		if (isShow(e) && !this.readonly && !this.disabled) {
			this._preventTokenizerToggle = true;
			this._handleShow(e);
		}
	}

	_filterItems(str: string) {
		const itemsToFilter = this.items.filter(item => !item.isGroupItem);
		const filteredItems = (Filters[this.filter] || Filters.StartsWithPerTerm)(str, itemsToFilter, "text");

		// Return the filtered items and their group items
		return this.items.filter((item, idx, allItems) => MultiComboBox._groupItemFilter(item, ++idx, allItems, filteredItems) || filteredItems.indexOf(item) !== -1);
	}

	/**
	 * Returns true if the group header should be shown (if there is a filtered suggestion item for this group item)
	 *
	 * @private
	 */
	 static _groupItemFilter(item: IMultiComboBoxItem, idx: number, allItems: Array<IMultiComboBoxItem>, filteredItems: Array<IMultiComboBoxItem>) {
		if (item.isGroupItem) {
			let groupHasFilteredItems;

			while (allItems[idx] && !allItems[idx].isGroupItem && !groupHasFilteredItems) {
				groupHasFilteredItems = filteredItems.indexOf(allItems[idx]) !== -1;
				idx++;
			}

			return groupHasFilteredItems;
		}
	}

	_afterOpenPicker() {
		this._toggle();

		if (!isPhone() && !this._isOpenedByKeyboard) {
			this._innerInput.focus();
		} else if (this._isOpenedByKeyboard) {
			this._itemToFocus?.focus();
		} else {
			this.allItemsPopover?.focus();
		}

		this._isOpenedByKeyboard = false;
	}

	_toggle() {
		this.open = !this.open;
		this.fireEvent("open-change");
	}

	_getSelectedItems(): Array<MultiComboBoxItem> {
		// Angular 2 way data binding
		this.selectedValues = this.items.filter(item => item.selected);
		return this.selectedValues as Array<MultiComboBoxItem>;
	}

	_listSelectionChange(e: CustomEvent<SelectionChangeEventDetail>) {
		// sync list items and cb items
		this.syncItems((e.target as List).items);

		// don't call selection change right after selection as user can cancel it on phone
		if (!isPhone()) {
			this.fireSelectionChange();
		}

		// casted to KeyboardEvent since isSpace and isSpaceCtrl accepts KeyboardEvent only
		const castedEvent = { key: e.detail.key } as KeyboardEvent;

		if (!e.detail.selectionComponentPressed && !isSpace(castedEvent) && !isSpaceCtrl(castedEvent)) {
			this.allItemsPopover?.close();
			this.value = "";

			// if the item (not checkbox) is clicked, call the selection change
			if (isPhone()) {
				this.fireSelectionChange();
			}

			this.fireEvent("input");
		}

		this.value = this.valueBeforeAutoComplete || "";
	}

	syncItems(listItems: Array<ListItemBase>) {
		listItems.forEach(item => {
			this.items.forEach(mcbItem => {
				if (mcbItem._id === item.getAttribute("data-ui5-token-id")) {
					mcbItem.selected = item.selected;
				}
			});
		});
	}

	fireSelectionChange() {
		this.fireEvent<MultiComboBoxSelectionChangeEventDetail>("selection-change", { items: this._getSelectedItems() });
		// Angular 2 way data binding
		this.fireEvent("value-changed");
	}

	async _getRespPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.allItemsPopover = staticAreaItem!.querySelector(`.ui5-multi-combobox-all-items-responsive-popover`)!;
	}

	async _getList(): Promise<List> {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.list = staticAreaItem!.querySelector(".ui5-multi-combobox-all-items-list")!;
		return this.list;
	}

	_click() {
		if (isPhone() && !this.readonly && !this._showMorePressed && !this._deleting) {
			this.allItemsPopover?.showAt(this);
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
		this._preventTokenizerToggle = false;
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
			const selectedItems = this._filteredItems.filter(item => item.selected);
			this.selectedItems = this.items.filter((item, idx, allItems) => MultiComboBox._groupItemFilter(item, ++idx, allItems, selectedItems) || selectedItems.indexOf(item) !== -1);
		}
	}

	_handleTypeAhead(item: IMultiComboBoxItem, filterValue: string) {
		if (!item) {
			return;
		}

		const value = item.text;
		const innerInput = this._innerInput;

		filterValue = filterValue || "";
		this.value = value;

		innerInput.value = value;
		innerInput.setSelectionRange(filterValue.length, value.length);

		this._shouldAutocomplete = false;
	}

	_getFirstMatchingItem(current: string) {
		if (!this.items.length) {
			return;
		}

		const matchingItems = this._startsWithMatchingItems(current).filter(item => !item.isGroupItem && !item.selected);

		if (matchingItems.length) {
			return matchingItems[0];
		}
	}

	_startsWithMatchingItems(str: string) {
		return Filters.StartsWith(str, this.items, "text");
	}

	onBeforeRendering() {
		const input = this._innerInput;
		const autoCompletedChars = input && (input.selectionEnd || 0) - (input.selectionStart || 0);
		const value = input && input.value;

		this.FormSupport = getFeature("FormSupport");
		this._inputLastValue = value;

		if (input && !input.value) {
			this.valueBeforeAutoComplete = "";
			this._filteredItems = this.items;
		}

		this.items.forEach(item => {
			item._getRealDomRef = () => this.allItemsPopover!.querySelector(`*[data-ui5-stable=${item.stableDomRef}]`)!;
		});

		this.tokenizerAvailable = this._getSelectedItems().length > 0;
		this.style.setProperty("--_ui5-input-icons-count", `${this.iconsCount}`);

		if (!input || !value) {
			return;
		}

		// Typehead causes issues on Android devices, so we disable it for now
		// If there is already a selection the autocomplete has already been performed
		if (this._shouldAutocomplete && !isAndroid() && !autoCompletedChars) {
			const item = this._getFirstMatchingItem(value);

			// Keep the original typed in text intact
			this.valueBeforeAutoComplete = value;
			item && this._handleTypeAhead(item, value);
		}

		if (this._shouldFilterItems) {
			this._filteredItems = this._filterItems(this._shouldAutocomplete || !!autoCompletedChars ? this.valueBeforeAutoComplete : value);
		} else {
			this._filteredItems = this.items;
		}
	}

	async onAfterRendering() {
		await this._getRespPopover();
		await this._getList();

		this.toggle(this.shouldDisplayOnlyValueStateMessage);
		this.storeResponsivePopoverWidth();

		this._deleting = false;
		// force resize of the tokenizer on invalidation
		this._tokenizer._handleResize();
	}

	get _isPhone() {
		return isPhone();
	}

	_onIconMousedown() {
		this._iconPressed = true;
	}

	storeResponsivePopoverWidth() {
		if (this.open && !this._listWidth) {
			this._listWidth = this.list!.offsetWidth;
		}
	}

	toggle(isToggled: boolean) {
		if (isToggled && !this.open) {
			this.openPopover();
		} else {
			this.closePopover();
		}
	}

	handleCancel() {
		this._itemsBeforeOpen.forEach(item => {
			if (item.ref instanceof MultiComboBoxItem) {
				item.ref.selected = item.selected;
			}
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
		(await this._getPopover())?.showAt(this);
	}

	_forwardFocusToInner() {
		this._innerInput.focus();
	}

	async closePopover() {
		(await this._getPopover())?.close();
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return (staticAreaItem!.querySelector<Popover>("[ui5-popover]"))!;
	}

	async _getResponsivePopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	async _setValueStateHeader() {
		const responsivePopover = await this._getResponsivePopover();
		this.valueStateHeader = responsivePopover.querySelector("div.ui5-responsive-popover-header.ui5-valuestatemessage-root")!;
	}

	get _tokenizer() {
		return this.shadowRoot!.querySelector<Tokenizer>("[ui5-tokenizer]")!;
	}

	inputFocusIn(e: FocusEvent) {
		if (!isPhone() || this.readonly) {
			this.focused = true;
			this._tokenizer.expanded = true;
		} else {
			this._innerInput.blur();
		}

		if (!isPhone() && (((e.relatedTarget as HTMLElement)?.tagName !== "UI5-STATIC-AREA-ITEM") || !e.relatedTarget)) {
			this._innerInput.setSelectionRange(0, this.value.length);
		}

		this._lastValue = this.value;
		this.valueBeforeAutoComplete = "";
	}

	inputFocusOut(e: FocusEvent) {
		if (!this.shadowRoot!.contains(e.relatedTarget as Node) && !this._deleting) {
			this.focused = false;
			this._tokenizer.expanded = this.open;
			// remove the value if user focus out the input and focus is not going in the popover
			if (!isPhone() && !this.allowCustomValues && (this.staticAreaItem !== e.relatedTarget)) {
				this.value = "";
			}
		}
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

	get ariaValueStateHiddenText() {
		if (!this.hasValueState) {
			return;
		}

		let text = "";

		if (this.valueState !== ValueState.None) {
			text = this.valueStateTypeMappings[this.valueState];
		}

		if (this.shouldDisplayDefaultValueStateMessage) {
			return `${text} ${this.valueStateDefaultText || ""}`;
		}

		return `${text}`.concat(" ", this.valueStateMessageText.map(el => el.textContent).join(" "));
	}

	get valueStateDefaultText(): string {
		if (this.valueState === ValueState.None) {
			return "";
		}

		if (this._performingSelectionTwice) {
			return MultiComboBox.i18nBundle.getText(VALUE_STATE_ERROR_ALREADY_SELECTED);
		}

		return this.valueStateTextMappings[this.valueState];
	}

	get valueStateTextId() {
		return this.hasValueState ? `ui5-multi-combobox-valueStateDesc` : undefined;
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	 get _valueStateMessageIcon() {
		if (this.valueState === ValueState.None) {
			return "";
		}

		return {
			[ValueState.Error]: "error",
			[ValueState.Warning]: "alert",
			[ValueState.Success]: "sys-enter-2",
			[ValueState.Information]: "information",
		}[this.valueState];
	}

	get _tokensCountText() {
		if (!this._tokenizer) {
			return;
		}
		return this._tokenizer._tokensCountText();
	}

	get _tokensCountTextId() {
		return "ui5-multi-combobox-hiddenText-nMore";
	}

	get _selectedTokensCount() {
		return this._tokenizer.tokens.filter(token => token.selected).length;
	}

	get ariaDescribedByText() {
		return this.valueStateTextId ? `${this._tokensCountTextId} ${this.valueStateTextId}` : `${this._tokensCountTextId}`;
	}

	get shouldDisplayDefaultValueStateMessage() {
		return !this.valueStateMessage.length && this.hasValueStateMessage;
	}

	get shouldDisplayOnlyValueStateMessage() {
		return this.focused && !this.readonly && this.hasValueStateMessage && !this._iconPressed;
	}

	get valueStateTypeMappings(): ValueStateTypeAnnouncement {
		return {
			[ValueState.Success]: MultiComboBox.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
			[ValueState.Information]: MultiComboBox.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
			[ValueState.Error]: MultiComboBox.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
			[ValueState.Warning]: MultiComboBox.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
		};
	}

	get valueStateTextMappings(): ValueStateAnnouncement {
		return {
			[ValueState.Success]: MultiComboBox.i18nBundle.getText(VALUE_STATE_SUCCESS),
			[ValueState.Error]: MultiComboBox.i18nBundle.getText(VALUE_STATE_ERROR),
			[ValueState.Warning]: MultiComboBox.i18nBundle.getText(VALUE_STATE_WARNING),
			[ValueState.Information]: MultiComboBox.i18nBundle.getText(VALUE_STATE_INFORMATION),
		};
	}

	get _innerInput(): HTMLInputElement {
		if (isPhone()) {
			if (this.allItemsPopover?.opened) {
				return this.allItemsPopover.querySelector("input")!;
			}
		}

		return this._inputDom;
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
		if (isPhone() || this.readonly) {
			return false;
		}

		if (this._preventTokenizerToggle) {
			return this._tokenizer.expanded;
		}

		const isCurrentlyExpanded = this._tokenizer?.expanded;
		const shouldBeExpanded = this.focused || this.open || isCurrentlyExpanded;

		return shouldBeExpanded;
	}

	get _valueStatePopoverHorizontalAlign() {
		return this.effectiveDir !== "rtl" ? "Left" : "Right";
	}

	get iconsCount() {
		const slottedIconsCount = this.icon?.length || 0;
		const arrowDownIconsCount = this.readonly ? 0 : 1;
		return slottedIconsCount + arrowDownIconsCount;
	}

	get classes(): ClassMap {
		return {
			popover: {
				"ui5-multi-combobox-all-items-responsive-popover": true,
				"ui5-suggestions-popover": true,
				"ui5-suggestions-popover-with-value-state-header": this.hasValueStateMessage,
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
		const remSizeIxPx = parseInt(getComputedStyle(document.documentElement).fontSize);
		return {
			popoverValueStateMessage: {
				"width": `${this._listWidth || 0}px`,
				"display": this._listWidth === 0 ? "none" : "inline-block",
			},
			popoverHeader: {
				"max-width": isPhone() ? "100%" : `${this._inputWidth}px`,
			},
			suggestionsPopover: {
				"min-width": `${this._inputWidth}px`,
				"max-width": (this._inputWidth / remSizeIxPx) > 40 ? `${this._inputWidth}px` : "40rem",
			},
		};
	}

	static async onDefine() {
		MultiComboBox.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

MultiComboBox.define();

export default MultiComboBox;

export type {
	IMultiComboBoxItem,
	MultiComboBoxSelectionChangeEventDetail,
};
