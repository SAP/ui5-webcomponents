import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import {
	isPhone,
	isAndroid,
} from "@ui5/webcomponents-base/dist/Device.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import {
	isUp,
	isDown,
	isSpace,
	isEnter,
	isBackSpace,
	isDelete,
	isEscape,
	isTabNext,
	isPageUp,
	isPageDown,
	isHome,
	isEnd,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEffectiveAriaLabelText, getAssociatedLabelForTexts } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { getCaretPosition, setCaretPosition } from "@ui5/webcomponents-base/dist/util/Caret.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/not-editable.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import InputType from "./types/InputType.js";
import Popover from "./Popover.js";
import Icon from "./Icon.js";
// Templates
import InputTemplate from "./generated/templates/InputTemplate.lit.js";
import InputPopoverTemplate from "./generated/templates/InputPopoverTemplate.lit.js";
import * as Filters from "./Filters.js";

import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_TYPE_SUCCESS,
	VALUE_STATE_TYPE_INFORMATION,
	VALUE_STATE_TYPE_ERROR,
	VALUE_STATE_TYPE_WARNING,
	INPUT_SUGGESTIONS,
	INPUT_SUGGESTIONS_TITLE,
	INPUT_SUGGESTIONS_ONE_HIT,
	INPUT_SUGGESTIONS_MORE_HITS,
	INPUT_SUGGESTIONS_NO_HIT,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/Input.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import SuggestionsCss from "./generated/themes/Suggestions.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-input",
	languageAware: true,
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Input.prototype */ {

		/**
		 * Defines the icon to be displayed in the component.
		 *
		 * @type {sap.ui.webcomponents.main.IIcon[]}
		 * @slot
		 * @public
		 */
		icon: {
			type: HTMLElement,
		},

		/**
		 * Defines the suggestion items.
		 * <br><br>
		 * Example:
		 * <br><br>
		 * &lt;ui5-input show-suggestions><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-suggestion-item text="Item #1">&lt;/ui5-suggestion-item><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-suggestion-item text="Item #2">&lt;/ui5-suggestion-item><br>
		 * &lt;/ui5-input>
		 * <br>
		 * <ui5-input show-suggestions>
		 * <ui5-suggestion-group-item text="Group #1"></ui5-suggestion-group-item>
		 * <ui5-suggestion-item text="Item #1"></ui5-suggestion-item>
		 * <ui5-suggestion-item text="Item #2"></ui5-suggestion-item>
		 * <ui5-suggestion-group-item text="Group #2"></ui5-suggestion-group-item>
		 * <ui5-suggestion-item text="Item #3"></ui5-suggestion-item>
		 * <ui5-suggestion-item text="Item #4"></ui5-suggestion-item>
		 * </ui5-input>
		 * <br><br>
		 * <b>Note:</b> The suggestions would be displayed only if the <code>showSuggestions</code>
		 * property is set to <code>true</code>.
		 * <br><br>
		 * <b>Note:</b> The <code>&lt;ui5-suggestion-item&gt;</code> and <code>&lt;ui5-suggestion-group-item&gt;</code> are recommended to be used as suggestion items.
		 * <br><br>
		 * <b>Note:</b> Importing the Input Suggestions Support feature:
		 * <br>
		 * <code>import "@ui5/webcomponents/dist/features/InputSuggestions.js";</code>
		 * <br>
		 * automatically imports the <code>&lt;ui5-suggestion-item></code> and <code>&lt;ui5-suggestion-group-item></code> for your convenience.
		 *
		 * @type {sap.ui.webcomponents.main.IInputSuggestionItem[]}
		 * @slot suggestionItems
		 * @public
		 */
		"default": {
			propertyName: "suggestionItems",
			type: HTMLElement,
		},

		/**
		 * The slot is used for native <code>input</code> HTML element to enable form submit,
		 * when <code>name</code> property is set.
		 * @type {HTMLElement[]}
		 * @private
		 */
		formSupport: {
			type: HTMLElement,
		},

		/**
		 * Defines the value state message that will be displayed as pop up under the component.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br><br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the component is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * <br><br>
		 * <b>Note:</b> If the component has <code>suggestionItems</code>,
		 * the <code>valueStateMessage</code> would be displayed as part of the same popover, if used on desktop, or dialog - on phone.
		 * @type {HTMLElement[]}
		 * @since 1.0.0-rc.6
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.Input.prototype */  {

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
		 * Defines if characters within the suggestions are to be highlighted
		 * in case the input value matches parts of the suggestions text.
		 * <br><br>
		 * <b>Note:</b> takes effect when <code>showSuggestions</code> is set to <code>true</code>
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 * @sicne 1.0.0-rc.8
		 */
		highlight: {
			type: Boolean,
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
		 * @since 1.0.0-rc.3
		 */
		required: {
			type: Boolean,
		},

		/**
		 * Defines whether the value will be autcompleted to match an item
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.4.0
		 */
		noTypeahead: {
			type: Boolean,
		},

		/**
		 * Defines the HTML type of the component.
		 * Available options are: <code>Text</code>, <code>Email</code>,
		 * <code>Number</code>, <code>Password</code>, <code>Tel</code>, and <code>URL</code>.
		 * <br><br>
		 * <b>Notes:</b>
		 * <ul>
		 * <li>The particular effect of this property differs depending on the browser
		 * and the current language settings, especially for type <code>Number</code>.</li>
		 * <li>The property is mostly intended to be used with touch devices
		 * that use different soft keyboard layouts depending on the given input type.</li>
		 * </ul>
		 *
		 * @type {sap.ui.webcomponents.main.types.InputType}
		 * @defaultvalue "Text"
		 * @public
		 */
		type: {
			type: InputType,
			defaultValue: InputType.Text,
		},

		/**
		 * Defines the value of the component.
		 * <br><br>
		 * <b>Note:</b> The property is updated upon typing.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @formEvents change input
		 * @formProperty
		 * @public
		 */
		value: {
			type: String,
		},

		/**
		 * Defines the inner stored value of the component.
		 * <br><br>
		 * <b>Note:</b> The property is updated upon typing. In some special cases the old value is kept (e.g. deleting the value after the dot in a float)
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @private
		 */
		_innerValue: {
			type: String,
			noAttribute: true,
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
		 * @type {sap.ui.webcomponents.base.types.ValueState}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Determines the name with which the component will be submitted in an HTML form.
		 *
		 * <br><br>
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * <br><br>
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the component so that it can be submitted as
		 * part of an HTML form. Do not use this property unless you need to submit a form.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		name: {
			type: String,
		},

		/**
		 * Defines whether the component should show suggestions, if such are present.
		 * <br><br>
		 * <b>Note:</b> You need to import the <code>InputSuggestions</code> module
		 * from <code>"@ui5/webcomponents/dist/features/InputSuggestions.js"</code> to enable this functionality.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showSuggestions: {
			type: Boolean,
		},

		/**
		 * Sets the maximum number of characters available in the input field.
		 * <br><br>
		 * <b>Note:</b> This property is not compatible with the ui5-input type InputType.Number. If the ui5-input type is set to Number, the maxlength value is ignored.
		 * @type {sap.ui.webcomponents.base.types.Integer}
		 * @since 1.0.0-rc.5
		 * @public
		 */
		maxlength: {
			type: Integer,
		},

		/**
		 * Defines the accessible ARIA name of the component.
		 *
		 * @type {string}
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleName: {
			type: String,
		},

		/**
		 * Receives id(or many ids) of the elements that label the input.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleNameRef: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines whether the clear icon of the input will be shown.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.2.0
		 */
		showClearIcon: {
			type: Boolean,
		},

		/**
		 * Defines whether the clear icon is visible.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 * @since 1.2.0
		 */
		effectiveShowClearIcon: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		openOnMobile: {
			type: Boolean,
		},

		open: {
			type: Boolean,
		},

		/**
		 * Determines whether to manually show the suggestions popover
		 * @private
		 */
		_forceOpen: {
			type: Boolean,
		},

		/**
		 * Indicates whether the visual focus is on the value state header
		 * @private
		 */
		_isValueStateFocused: {
			type: Boolean,
		},

		_input: {
			type: Object,
		},

		_inputAccInfo: {
			type: Object,
		},

		_nativeInputAttributes: {
			type: Object,
		},

		_inputWidth: {
			type: Integer,
		},

		_listWidth: {
			type: Integer,
		},

		_isPopoverOpen: {
			type: Boolean,
			noAttribute: true,
		},

		_inputIconFocused: {
			type: Boolean,
			noAttribute: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Input.prototype */ {
		/**
		 * Fired when the input operation has finished by pressing Enter or on focusout.
		 *
		 * @event
		 * @public
		 */
		change: {},

		/**
		 * Fired when the value of the component changes at each keystroke,
		 * and when a suggestion item has been selected.
		 *
		 * @event
		 * @public
		 */
		input: {},

		/**
		 * Fired when a suggestion item, that is displayed in the suggestion popup, is selected.
		 *
		 * @event sap.ui.webcomponents.main.Input#suggestion-item-select
		 * @param {HTMLElement} item The selected item.
		 * @public
		 */
		"suggestion-item-select": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the user navigates to a suggestion item via the ARROW keys,
		 * as a preview, before the final selection.
		 *
		 * @event sap.ui.webcomponents.main.Input#suggestion-item-preview
		 * @param {HTMLElement} item The previewed suggestion item.
		 * @param {HTMLElement} targetRef The DOM ref of the suggestion item.
		 * @public
		 * @since 1.0.0-rc.8
		 */
		"suggestion-item-preview": {
			detail: {
				item: { type: HTMLElement },
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the user scrolls the suggestion popover.
		 *
		 * @event sap.ui.webcomponents.main.Input#suggestion-scroll
		 * @param {Integer} scrollTop The current scroll position.
		 * @param {HTMLElement} scrollContainer The scroll container.
		 * @protected
		 * @since 1.0.0-rc.8
		 */
		"suggestion-scroll": {
			detail: {
				scrollTop: { type: Integer },
				scrollContainer: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-input</code> component allows the user to enter and edit text or numeric values in one line.
 * <br>
 * Additionally, you can provide <code>suggestionItems</code>,
 * that are displayed in a popover right under the input.
 * <br><br>
 * The text field can be editable or read-only (<code>readonly</code> property),
 * and it can be enabled or disabled (<code>disabled</code> property).
 * To visualize semantic states, such as "error" or "warning", the <code>valueState</code> property is provided.
 * When the user makes changes to the text, the change event is fired,
 * which enables you to react on any text change.
 * <br><br>
 * <b>Note:</b> If you are using the <code>ui5-input</code> as a single npm module,
 * don't forget to import the <code>InputSuggestions</code> module from
 * "@ui5/webcomponents/dist/features/InputSuggestions.js"
 * to enable the suggestions functionality.
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-input</code> provides the following keyboard shortcuts:
 * <br>
 *
 * <ul>
 * <li>[ESC] - Closes the suggestion list, if open. If closed or not enabled, cancels changes and reverts to the value which the Input field had when it got the focus.</li>
 * <li>[ENTER] or [RETURN] - If suggestion list is open takes over the current matching item and closes it. If value state or group header is focused, does nothing.</li>
 * <li>[DOWN] - Focuses the next matching item in the suggestion list.</li>
 * <li>[UP] - Focuses the previous matching item in the suggestion list.</li>
 * <li>[HOME] - If focus is in the text input, moves caret before the first character. If focus is in the list, highlights the first item and updates the input accordingly.</li>
 * <li>[END] - If focus is in the text input, moves caret after the last character. If focus is in the list, highlights the last item and updates the input accordingly.</li>
 * <li>[PAGEUP] - If focus is in the list, moves highlight up by page size (10 items by default). If focus is in the input, does nothing.</li>
 * <li>[PAGEDOWN] - If focus is in the list, moves highlight down by page size (10 items by default). If focus is in the input, does nothing.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Input.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/features/InputSuggestions.js";</code> (optional - for input suggestions support)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Input
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-input
 * @appenddocs SuggestionItem SuggestionGroupItem
 * @implements sap.ui.webcomponents.main.IInput
 * @public
 */
class Input extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return InputTemplate;
	}

	static get staticAreaTemplate() {
		return InputPopoverTemplate;
	}

	static get styles() {
		return styles;
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, ValueStateMessageCss, SuggestionsCss];
	}

	constructor() {
		super();
		// Indicates if there is selected suggestionItem.
		this.hasSuggestionItemSelected = false;

		// Represents the value before user moves selection from suggestion item to another
		// and its value is updated after each move.
		// Note: Used to register and fire "input" event upon [SPACE] or [ENTER].
		// Note: The property "value" is updated upon selection move and can`t be used.
		this.valueBeforeItemSelection = "";

		// Represents the value before user moves selection between the suggestion items
		// and its value remains the same when the user navigates up or down the list.
		// Note: Used to cancel selection upon [ESC].
		this.valueBeforeItemPreview = "";

		// Indicates if the user selection has been canceled with [ESC].
		this.suggestionSelectionCanceled = false;

		// tracks the value between focus in and focus out to detect that change event should be fired.
		this.previousValue = undefined;

		// Indicates, if the component is rendering for first time.
		this.firstRendering = true;

		// The value that should be highlited.
		this.highlightValue = "";

		// The last value confirmed by the user with "ENTER"
		this.lastConfirmedValue = "";

		// The value that the user is typed in the input
		this.valueBeforeAutoComplete = "";

		// Indicates, if the user is typing. Gets reset once popup is closed
		this.isTyping = false;

		// all sementic events
		this.EVENT_CHANGE = "change";
		this.EVENT_INPUT = "input";
		this.EVENT_SUGGESTION_ITEM_SELECT = "suggestion-item-select";

		// all user interactions
		this.ACTION_ENTER = "enter";
		this.ACTION_USER_INPUT = "input";

		// Suggestions array initialization
		this.suggestionsTexts = [];

		this._handleResizeBound = this._handleResize.bind(this);

		this._keepInnerValue = false;
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResizeBound);
	}

	onBeforeRendering() {
		if (!this._keepInnerValue) {
			this._innerValue = this.value;
		}

		if (this.showSuggestions) {
			this.enableSuggestions();
			this.suggestionsTexts = this.Suggestions.defaultSlotProperties(this.highlightValue);
		}

		this.effectiveShowClearIcon = (this.showClearIcon && !!this.value && !this.readonly && !this.disabled);

		this.FormSupport = getFeature("FormSupport");
		const hasItems = this.suggestionItems.length;
		const hasValue = !!this.value;
		const isFocused = this.shadowRoot.querySelector("input") === getActiveElement();

		if (this._isPhone) {
			this.open = this.openOnMobile;
		} else if (this._forceOpen) {
			this.open = true;
		} else {
			this.open = hasValue && hasItems && isFocused && this.isTyping;
		}

		if (this.FormSupport) {
			this.FormSupport.syncNativeHiddenInput(this);
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}

		const value = this.value;
		const innerInput = this.getInputDOMRefSync();

		if (!innerInput || !value) {
			return;
		}

		const autoCompletedChars = innerInput.selectionEnd - innerInput.selectionStart;

		// Typehead causes issues on Android devices, so we disable it for now
		// If there is already a selection the autocomplete has already been performed
		if (this._shouldAutocomplete && !isAndroid() && !autoCompletedChars && !this._isKeyNavigation) {
			const item = this._getFirstMatchingItem(value);

			// Keep the original typed in text intact
			this.valueBeforeAutoComplete += value.slice(this.valueBeforeAutoComplete.length, value.length);
			this._handleTypeAhead(item, value);
		}
	}

	async onAfterRendering() {
		if (this.Suggestions && this.showSuggestions) {
			this.Suggestions.toggle(this.open, {
				preventFocusRestore: true,
			});

			this._listWidth = await this.Suggestions._getListWidth();
		}

		if (this.shouldDisplayOnlyValueStateMessage) {
			this.openPopover();
		} else {
			this.closePopover();
		}
	}

	_onkeydown(event) {
		this._isKeyNavigation = true;
		this._shouldAutocomplete = !this.noTypeahead && !(isBackSpace(event) || isDelete(event) || isEscape(event));

		if (isUp(event)) {
			return this._handleUp(event);
		}

		if (isDown(event)) {
			return this._handleDown(event);
		}

		if (isSpace(event)) {
			return this._handleSpace(event);
		}

		if (isTabNext(event)) {
			return this._handleTab(event);
		}

		if (isEnter(event)) {
			return this._handleEnter(event);
		}

		if (isPageUp(event)) {
			return this._handlePageUp(event);
		}

		if (isPageDown(event)) {
			return this._handlePageDown(event);
		}

		if (isHome(event)) {
			return this._handleHome(event);
		}

		if (isEnd(event)) {
			return this._handleEnd(event);
		}

		if (isEscape(event)) {
			return this._handleEscape(event);
		}

		if (isBackSpace(event)) {
			this._selectedText = window.getSelection().toString();
		}

		if (this.showSuggestions) {
			this._clearPopoverFocusAndSelection();
		}

		this._keyDown = true;
		this._isKeyNavigation = false;
	}

	_onkeyup(event) {
		// The native Delete event does not update the value property "on time".
		// So, the (native) change event is always fired with the old value
		if (isDelete(event)) {
			this.value = event.target.value;
		}

		this._keyDown = false;
	}

	/* Event handling */
	_handleUp(event) {
		if (this.Suggestions && this.Suggestions.isOpened()) {
			this.Suggestions.onUp(event);
		}
	}

	_handleDown(event) {
		if (this.Suggestions && this.Suggestions.isOpened()) {
			this.Suggestions.onDown(event);
		}
	}

	_handleSpace(event) {
		if (this.Suggestions) {
			this.Suggestions.onSpace(event);
		}
	}

	_handleTab(event) {
		if (this.Suggestions && (this.previousValue !== this.value)) {
			this.Suggestions.onTab(event);
		}
	}

	_handleEnter(event) {
		const itemPressed = !!(this.Suggestions && this.Suggestions.onEnter(event));
		const innerInput = this.getInputDOMRefSync();
		// Check for autocompleted item
		const matchingItem = this.suggestionItems.find(item => {
			return (item.text && item.text === this.value) || (item.textContent === this.value);
		});

		if (matchingItem) {
			const itemText = matchingItem.text ? matchingItem.text : matchingItem.textContent;

			this.getInputDOMRefSync().setSelectionRange(itemText.length, itemText.length);
			if (!itemPressed) {
				this.selectSuggestion(matchingItem, true);
				this.open = false;
			}
		}

		if (this._isPhone && !this.suggestionItems.length) {
			innerInput.setSelectionRange(this.value.length, this.value.length);
		}

		if (!itemPressed) {
			this.lastConfirmedValue = this.value;

			if (this.FormSupport) {
				this.FormSupport.triggerFormSubmit(this);
			}

			return;
		}

		this.focused = true;
	}

	_handlePageUp(event) {
		if (this._isSuggestionsFocused) {
			this.Suggestions.onPageUp(event);
		} else {
			event.preventDefault();
		}
	}

	_handlePageDown(event) {
		if (this._isSuggestionsFocused) {
			this.Suggestions.onPageDown(event);
		} else {
			event.preventDefault();
		}
	}

	_handleHome(event) {
		if (this._isSuggestionsFocused) {
			this.Suggestions.onHome(event);
		}
	}

	_handleEnd(event) {
		if (this._isSuggestionsFocused) {
			this.Suggestions.onEnd(event);
		}
	}

	_handleEscape() {
		const hasSuggestions = this.showSuggestions && !!this.Suggestions;
		const isOpen = hasSuggestions && this.open;
		const innerInput = this.getInputDOMRefSync();
		const isAutoCompleted = innerInput.selectionEnd - innerInput.selectionStart > 0;

		this.isTyping = false;

		if (!isOpen) {
			this.value = this.lastConfirmedValue ? this.lastConfirmedValue : this.previousValue;
			return;
		}

		if (hasSuggestions && isOpen && this.Suggestions._isItemOnTarget()) {
			// Restore the value.
			this.value = this.valueBeforeAutoComplete || this.valueBeforeItemPreview;

			// Mark that the selection has been canceled, so the popover can close
			// and not reopen, due to receiving focus.
			this.suggestionSelectionCanceled = true;
			this.focused = true;

			return;
		}

		if (isAutoCompleted) {
			this.value = this.valueBeforeAutoComplete;
		}

		if (this._isValueStateFocused) {
			this._isValueStateFocused = false;
			this.focused = true;
		}
	}

	async _onfocusin(event) {
		await this.getInputDOMRef();

		this.valueBeforeAutoComplete = "";
		this.focused = true; // invalidating property
		this.previousValue = this.value;
		this.valueBeforeItemPreview = this.value;

		this._inputIconFocused = event.target && event.target === this.querySelector("[ui5-icon]");
	}

	_onfocusout(event) {
		const focusedOutToSuggestions = this.Suggestions && event.relatedTarget && event.relatedTarget.shadowRoot && event.relatedTarget.shadowRoot.contains(this.Suggestions.responsivePopover);
		const focusedOutToValueStateMessage = event.relatedTarget && event.relatedTarget.shadowRoot && event.relatedTarget.shadowRoot.querySelector(".ui5-valuestatemessage-root");

		this._keepInnerValue = false;

		if (this.showClearIcon && !this.effectiveShowClearIcon) {
			this._clearIconClicked = false;
			this._handleChange();
		}

		// if focusout is triggered by pressing on suggestion item or value state message popover, skip invalidation, because re-rendering
		// will happen before "itemPress" event, which will make item "active" state not visualized
		if (focusedOutToSuggestions || focusedOutToValueStateMessage) {
			event.stopImmediatePropagation();
			return;
		}

		const toBeFocused = event.relatedTarget;

		if (toBeFocused && toBeFocused.classList.contains(this._id)) {
			return;
		}

		this.open = false;
		this._clearPopoverFocusAndSelection();

		this.previousValue = "";
		this.lastConfirmedValue = "";
		this.focused = false; // invalidating property
		this.isTyping = false;
		this._forceOpen = false;
	}

	_clearPopoverFocusAndSelection() {
		if (!this.showSuggestions || !this.Suggestions) {
			return;
		}

		this._isValueStateFocused = false;
		this.hasSuggestionItemSelected = false;

		this.Suggestions._deselectItems();
		this.Suggestions._clearItemFocus();
	}

	_click(event) {
		if (isPhone() && !this.readonly && this.Suggestions) {
			this.blur();
			this.openOnMobile = true;
		}
	}

	_handleChange() {
		if (this._clearIconClicked) {
			this._clearIconClicked = false;
			return;
		}

		if (this.previousValue !== this.getInputDOMRefSync().value) {
			this.previousValue = this.getInputDOMRefSync().value;
			this.fireEvent(this.EVENT_CHANGE);
		}
	}

	_clear() {
		this.value = "";
		this.fireEvent(this.EVENT_INPUT);
		if (!this._isPhone) {
			this.focus();
		}
	}

	_iconMouseDown() {
		this._clearIconClicked = true;
	}

	_scroll(event) {
		const detail = event.detail;
		this.fireEvent("suggestion-scroll", {
			scrollTop: detail.scrollTop,
			scrollContainer: detail.targetRef,
		});
	}

	_handleInput(event) {
		const inputDomRef = this.getInputDOMRefSync();
		const emptyValueFiredOnNumberInput = this.value && this.isTypeNumber && !inputDomRef.value;
		const eventType = event.inputType || (event.detail && event.detail.inputType);
		this._keepInnerValue = false;

		const allowedEventTypes = [
			"deleteWordBackward",
			"deleteWordForward",
			"deleteSoftLineBackward",
			"deleteSoftLineForward",
			"deleteEntireSoftLine",
			"deleteHardLineBackward",
			"deleteHardLineForward",
			"deleteByDrag",
			"deleteByCut",
			"deleteContent",
			"deleteContentBackward",
			"deleteContentForward",
			"historyUndo",
		];

		this._shouldAutocomplete = !allowedEventTypes.includes(eventType) && !this.noTypeahead;
		this.suggestionSelectionCanceled = false;

		// ---- Special cases of numeric Input ----
		// ---------------- Start -----------------

		// When the last character after the delimiter is removed.
		// In such cases, we want to skip the re-rendering of the
		// component as this leads to cursor repositioning and causes user experience issues.

		// There are few scenarios:
		// Example: type "123.4" and press BACKSPACE - the native input is firing event with the whole part as value (123).
		// Pressing BACKSPACE again will remove the delimiter and the native input will fire event with the whole part as value again (123).
		// Example: type "123.456", select/mark "456" and press BACKSPACE - the native input is firing event with the whole part as value (123).
		// Example: type "123.456", select/mark "123.456" and press BACKSPACE - the native input is firing event with empty value.
		const delimiterCase = this.isTypeNumber
			&& (event.inputType === "deleteContentForward" || event.inputType === "deleteContentBackward")
			&& !event.target.value.includes(".")
			&& this.value.includes(".");

		// Handle special numeric notation with "e", example "12.5e12"
		const eNotationCase = emptyValueFiredOnNumberInput && event.data === "e";

		// Handle special numeric notation with "-", example "-3"
		// When pressing BACKSPACE, the native input fires event with empty value
		const minusRemovalCase = emptyValueFiredOnNumberInput
			&& this.value.startsWith("-")
			&& this.value.length === 2
			&& (event.inputType === "deleteContentForward" || event.inputType === "deleteContentBackward");

		if (delimiterCase || eNotationCase || minusRemovalCase) {
			this.value = event.target.value;
			this._keepInnerValue = true;
		}
		// ----------------- End ------------------

		if (event.target === inputDomRef) {
			this.focused = true;

			// stop the native event, as the semantic "input" would be fired.
			event.stopImmediatePropagation();
		}

		this.fireEventByAction(this.ACTION_USER_INPUT, event);

		this.hasSuggestionItemSelected = false;
		this._isValueStateFocused = false;

		if (this.Suggestions) {
			this.Suggestions.updateSelectedItemPosition(null);
		}

		this.isTyping = true;
	}

	_startsWithMatchingItems(str) {
		const textProp = this.suggestionItems[0].text ? "text" : "textContent";
		return Filters.StartsWith(str, this.suggestionItems, textProp);
	}

	_getFirstMatchingItem(current) {
		if (!this.suggestionItems.length) {
			return;
		}

		const matchingItems = this._startsWithMatchingItems(current).filter(item => !item.groupItem);

		if (matchingItems.length) {
			return matchingItems[0];
		}
	}

	_handleTypeAhead(item, filterValue) {
		if (!item) {
			return;
		}

		const value = item.text ? item.text : item.textContent || "";
		const innerInput = this.getInputDOMRefSync();

		filterValue = filterValue || "";
		this._innerValue = value;
		this.value = value;

		innerInput.value = value;
		setTimeout(() => {
			innerInput.setSelectionRange(filterValue.length, value.length);
		}, 0);

		this._shouldAutocomplete = false;
	}

	_handleResize() {
		this._inputWidth = this.offsetWidth;
	}

	_closeRespPopover(preventFocusRestore) {
		this.Suggestions.close(preventFocusRestore);
	}

	async _afterOpenPopover() {
		// Set initial focus to the native input
		if (isPhone()) {
			(await this.getInputDOMRef()).focus();
		}
	}

	_afterClosePopover() {
		this.announceSelectedItem();

		// close device's keyboard and prevent further typing
		if (isPhone()) {
			this.blur();
			this.focused = false;
		}

		this.openOnMobile = false;
		this.open = false;
		this._forceOpen = false;
	}

	/**
	 * Checks if the value state popover is open.
	 * @returns {boolean} true if the value state popover is open, false otherwise
	 */
	isValueStateOpened() {
		return !!this._isPopoverOpen;
	}

	async openPopover() {
		const popover = await this._getPopover();

		if (popover) {
			this._isPopoverOpen = true;
			popover.showAt(this);
		}
	}

	async closePopover() {
		const popover = await this._getPopover();

		popover && popover.close();
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem && staticAreaItem.querySelector("[ui5-popover]");
	}

	/**
	 * Manually opens the suggestions popover, assuming suggestions are enabled. Items must be preloaded for it to open.
	 * @since 1.3.0
	 * @public
	 */
	openPicker() {
		if (!this.suggestionItems.length || this.disabled || this.readonly) {
			return;
		}

		this._forceOpen = true;
	}

	enableSuggestions() {
		if (this.Suggestions) {
			return;
		}

		const Suggestions = getFeature("InputSuggestions");

		if (Suggestions) {
			this.Suggestions = new Suggestions(this, "suggestionItems", true);
		} else {
			throw new Error(`You have to import "@ui5/webcomponents/dist/features/InputSuggestions.js" module to use ui5-input suggestions`);
		}
	}

	selectSuggestion(item, keyboardUsed) {
		if (item.group) {
			return;
		}

		const innerInput = this.getInputDOMRefSync();
		const value = this.valueBeforeAutoComplete || this.value;
		const itemText = item.text || item.textContent; // keep textContent for compatibility
		const fireInput = keyboardUsed
			? this.valueBeforeItemSelection !== itemText : value !== itemText;

		this.hasSuggestionItemSelected = true;

		if (fireInput) {
			this.value = itemText;
			this.valueBeforeItemSelection = itemText;
			this.lastConfirmedValue = itemText;
			this.getInputDOMRefSync().value = itemText;
			this.fireEvent(this.EVENT_INPUT);
			this._handleChange();
			innerInput.setSelectionRange(this.value.length, this.value.length);
		}

		this.valueBeforeItemPreview = "";
		this.suggestionSelectionCanceled = false;

		this.fireEvent(this.EVENT_SUGGESTION_ITEM_SELECT, { item });

		this.isTyping = false;
		this.openOnMobile = false;
		this._forceOpen = false;
	}

	previewSuggestion(item) {
		this.valueBeforeItemSelection = this.value;
		this.updateValueOnPreview(item);
		this.announceSelectedItem();
		this._previewItem = item;
	}

	/**
	 * Updates the input value on item preview.
	 * @param {Object} item The item that is on preview
	 */
	updateValueOnPreview(item) {
		const noPreview = item.type === "Inactive" || item.group;
		const innerInput = this.getInputDOMRefSync();
		const itemValue = noPreview ? this.valueBeforeItemPreview : (item.effectiveTitle || item.textContent);

		this.value = itemValue;
		innerInput.value = itemValue;
		innerInput.setSelectionRange(this.valueBeforeAutoComplete.length, this.value.length);
	}

	/**
	 * The suggestion item on preview.
	 * @type {sap.ui.webcomponents.main.IInputSuggestionItem}
	 * @readonly
	 * @public
	 */
	get previewItem() {
		if (!this._previewItem) {
			return null;
		}

		return this.getSuggestionByListItem(this._previewItem);
	}

	async fireEventByAction(action, event) {
		if (this.disabled || this.readonly) {
			return;
		}

		const inputValue = await this.getInputValue();
		const isUserInput = action === this.ACTION_USER_INPUT;

		this.value = inputValue;
		this.highlightValue = inputValue;
		this.valueBeforeItemPreview = inputValue;

		if (isUserInput) { // input
			this.fireEvent(this.EVENT_INPUT, { inputType: event.inputType });
			// Angular two way data binding
			this.fireEvent("value-changed");
		}
	}

	async getInputValue() {
		const domRef = this.getDomRef();

		if (domRef) {
			return (await this.getInputDOMRef()).value;
		}
		return "";
	}

	async getInputDOMRef() {
		if (isPhone() && this.Suggestions) {
			await this.Suggestions._getSuggestionPopover();
			return this.Suggestions && this.Suggestions.responsivePopover.querySelector(".ui5-input-inner-phone");
		}

		return this.nativeInput;
	}

	getInputDOMRefSync() {
		if (isPhone() && this.Suggestions && this.Suggestions.responsivePopover) {
			return this.Suggestions.responsivePopover.querySelector(".ui5-input-inner-phone").shadowRoot.querySelector("input");
		}

		return this.nativeInput;
	}

	/**
	 * Returns a reference to the native input element
	 * @protected
	 */
	get nativeInput() {
		return this.getDomRef() && this.getDomRef().querySelector(`input`);
	}

	get nativeInputWidth() {
		return this.nativeInput && this.nativeInput.offsetWidth;
	}

	getLabelableElementId() {
		return this.getInputId();
	}

	getSuggestionByListItem(item) {
		const key = parseInt(item.getAttribute("data-ui5-key"));
		return this.suggestionItems[key];
	}

	/**
	 * Returns if the suggestions popover is scrollable.
	 * The method returns <code>Promise</code> that resolves to true,
	 * if the popup is scrollable and false otherwise.
	 * @returns {Promise}
	 */
	isSuggestionsScrollable() {
		if (!this.Suggestions) {
			return Promise.resolve(false);
		}

		return this.Suggestions._isScrollable();
	}

	getInputId() {
		return `${this._id}-inner`;
	}

	/* Suggestions interface  */
	onItemFocused() {}

	onItemMouseOver(event) {
		const item = event.target;
		const suggestion = this.getSuggestionByListItem(item);
		suggestion && suggestion.fireEvent("mouseover", {
			item: suggestion,
			targetRef: item,
		});
	}

	onItemMouseOut(event) {
		const item = event.target;
		const suggestion = this.getSuggestionByListItem(item);
		suggestion && suggestion.fireEvent("mouseout", {
			item: suggestion,
			targetRef: item,
		});
	}

	onItemMouseDown(event) {
		event.preventDefault();
	}

	onItemSelected(item, keyboardUsed) {
		this.selectSuggestion(item, keyboardUsed);
	}

	onItemPreviewed(item) {
		this.previewSuggestion(item);
		this.fireEvent("suggestion-item-preview", {
			item: this.getSuggestionByListItem(item),
			targetRef: item,
		});
	}

	onOpen() {}

	onClose() {}

	get valueStateTypeMappings() {
		return {
			"Success": Input.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
			"Information": Input.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
			"Error": Input.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
			"Warning": Input.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
		};
	}

	valueStateTextMappings() {
		return {
			"Success": Input.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": Input.i18nBundle.getText(VALUE_STATE_INFORMATION),
			"Error": Input.i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": Input.i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	announceSelectedItem() {
		const invisibleText = this.shadowRoot.querySelector(`#${this._id}-selectionText`);

		if (this.Suggestions && this.Suggestions._isItemOnTarget()) {
			invisibleText.textContent = this.itemSelectionAnnounce;
		} else {
			invisibleText.textContent = "";
		}
	}

	get _readonly() {
		return this.readonly && !this.disabled;
	}

	get _headerTitleText() {
		return Input.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get inputType() {
		return this.type.toLowerCase();
	}

	get isTypeNumber() {
		return this.type === InputType.Number;
	}

	get suggestionsTextId() {
		return this.showSuggestions ? `${this._id}-suggestionsText` : "";
	}

	get valueStateTextId() {
		return this.hasValueState ? `${this._id}-valueStateDesc` : "";
	}

	get accInfo() {
		const ariaHasPopupDefault = this.showSuggestions ? "true" : undefined;
		const ariaAutoCompleteDefault = this.showSuggestions ? "list" : undefined;
		const ariaDescribedBy = this._inputAccInfo.ariaDescribedBy ? `${this.suggestionsTextId} ${this.valueStateTextId} ${this._inputAccInfo.ariaDescribedBy}`.trim() : `${this.suggestionsTextId} ${this.valueStateTextId}`.trim();

		return {
			"input": {
				"ariaRoledescription": this._inputAccInfo && (this._inputAccInfo.ariaRoledescription || undefined),
				"ariaDescribedBy": ariaDescribedBy || undefined,
				"ariaInvalid": this.valueState === ValueState.Error ? "true" : undefined,
				"ariaHasPopup": this._inputAccInfo.ariaHasPopup ? this._inputAccInfo.ariaHasPopup : ariaHasPopupDefault,
				"ariaAutoComplete": this._inputAccInfo.ariaAutoComplete ? this._inputAccInfo.ariaAutoComplete : ariaAutoCompleteDefault,
				"role": this._inputAccInfo && this._inputAccInfo.role,
				"ariaControls": this._inputAccInfo && this._inputAccInfo.ariaControls,
				"ariaExpanded": this._inputAccInfo && this._inputAccInfo.ariaExpanded,
				"ariaDescription": this._inputAccInfo && this._inputAccInfo.ariaDescription,
				"ariaLabel": (this._inputAccInfo && this._inputAccInfo.ariaLabel) || getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this),
			},
		};
	}

	get nativeInputAttributes() {
		return {
			"min": this.isTypeNumber ? this._nativeInputAttributes.min : undefined,
			"max": this.isTypeNumber ? this._nativeInputAttributes.max : undefined,
			"step": this.isTypeNumber ? (this._nativeInputAttributes.step || "any") : undefined,
		};
	}

	get ariaValueStateHiddenText() {
		if (!this.hasValueState) {
			return;
		}

		if (this.shouldDisplayDefaultValueStateMessage) {
			return `${this.valueStateTypeMappings[this.valueState]} ${this.valueStateText}`;
		}

		return `${this.valueStateTypeMappings[this.valueState]}`.concat(" ", this.valueStateMessageText.map(el => el.textContent).join(" "));
	}

	get itemSelectionAnnounce() {
		return this.Suggestions ? this.Suggestions.itemSelectionAnnounce : undefined;
	}

	get classes() {
		return {
			popover: {
				"ui5-suggestions-popover": !this.isPhone && this.showSuggestions,
				"ui5-suggestions-popover-with-value-state-header": !this.isPhone && this.showSuggestions && this.hasValueStateMessage,
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

		const stylesObject = {
			popoverHeader: {
				"max-width": `${this._inputWidth}px`,
			},
			suggestionPopoverHeader: {
				"display": this._listWidth === 0 ? "none" : "inline-block",
				"width": `${this._listWidth}px`,
			},
			suggestionsPopover: {
				"min-width": `${this._inputWidth}px`,
				"max-width": (this._inputWidth / remSizeIxPx) > 40 ? `${this._inputWidth}px` : "40rem",
			},
			innerInput: {},
		};

		if (this.nativeInputWidth < 48) {
			stylesObject.innerInput.padding = "0";
		}

		return stylesObject;
	}

	get suggestionSeparators() {
		return "None";
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	get shouldDisplayOnlyValueStateMessage() {
		return this.hasValueStateMessage && !this.readonly && !this.open && this.focused;
	}

	get shouldDisplayDefaultValueStateMessage() {
		return !this.valueStateMessage.length && this.hasValueStateMessage;
	}

	get hasValueState() {
		return this.valueState !== ValueState.None;
	}

	get hasValueStateMessage() {
		return this.hasValueState && this.valueState !== ValueState.Success
			&& (!this._inputIconFocused // Handles the cases when valueStateMessage is forwarded (from datepicker e.g.)
			|| (this._isPhone && this.Suggestions)); // Handles Input with suggestions on mobile
	}

	get valueStateText() {
		return this.valueStateTextMappings()[this.valueState];
	}

	get suggestionsText() {
		return Input.i18nBundle.getText(INPUT_SUGGESTIONS);
	}

	get availableSuggestionsCount() {
		if (this.showSuggestions && (this.value || this.Suggestions.isOpened())) {
			switch (this.suggestionsTexts.length) {
			case 0:
				return Input.i18nBundle.getText(INPUT_SUGGESTIONS_NO_HIT);

			case 1:
				return Input.i18nBundle.getText(INPUT_SUGGESTIONS_ONE_HIT);

			default:
				return Input.i18nBundle.getText(INPUT_SUGGESTIONS_MORE_HITS, this.suggestionsTexts.length);
			}
		}

		return undefined;
	}

	get step() {
		return this.isTypeNumber ? "any" : undefined;
	}

	get _isPhone() {
		return isPhone();
	}

	get _isSuggestionsFocused() {
		return !this.focused && this.Suggestions && this.Suggestions.isOpened();
	}

	/**
	 * Returns the placeholder value.
	 * @protected
	 */
	get _placeholder() {
		return this.placeholder;
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateInputIcon() {
		const iconPerValueState = {
			Error: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071C5.90237 13.3166 5.90237 12.6834 6.29289 12.2929L8.58579 10L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L10 8.58579L12.2929 6.29289C12.6834 5.90237 13.3166 5.90237 13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711L11.4142 10L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L10 11.4142L7.70711 13.7071Z" fill="#EE3939"/>`,
			Warning: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M11.8619 0.49298C11.6823 0.187541 11.3544 0 11 0C10.6456 0 10.3177 0.187541 10.1381 0.49298L0.138066 17.493C-0.0438112 17.8022 -0.0461447 18.1851 0.13195 18.4965C0.310046 18.8079 0.641283 19 1 19H21C21.3587 19 21.69 18.8079 21.868 18.4965C22.0461 18.1851 22.0438 17.8022 21.8619 17.493L11.8619 0.49298ZM11 6C11.5523 6 12 6.44772 12 7V10C12 10.5523 11.5523 11 11 11C10.4477 11 10 10.5523 10 10V7C10 6.44772 10.4477 6 11 6ZM11 16C11.8284 16 12.5 15.3284 12.5 14.5C12.5 13.6716 11.8284 13 11 13C10.1716 13 9.5 13.6716 9.5 14.5C9.5 15.3284 10.1716 16 11 16Z" fill="#F58B00"/>`,
			Success: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10ZM14.7071 6.29289C14.3166 5.90237 13.6834 5.90237 13.2929 6.29289L8 11.5858L6.70711 10.2929C6.31658 9.90237 5.68342 9.90237 5.29289 10.2929C4.90237 10.6834 4.90237 11.3166 5.29289 11.7071L7.29289 13.7071C7.68342 14.0976 8.31658 14.0976 8.70711 13.7071L14.7071 7.70711C15.0976 7.31658 15.0976 6.68342 14.7071 6.29289Z" fill="#36A41D"/>`,
			Information: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M3 0C1.34315 0 0 1.34315 0 3V15C0 16.6569 1.34315 18 3 18H15C16.6569 18 18 16.6569 18 15V3C18 1.34315 16.6569 0 15 0H3ZM9 6.5C9.82843 6.5 10.5 5.82843 10.5 5C10.5 4.17157 9.82843 3.5 9 3.5C8.17157 3.5 7.5 4.17157 7.5 5C7.5 5.82843 8.17157 6.5 9 6.5ZM9 8.5C9.55228 8.5 10 8.94772 10 9.5V13.5C10 14.0523 9.55228 14.5 9 14.5C8.44771 14.5 8 14.0523 8 13.5V9.5C8 8.94772 8.44771 8.5 9 8.5Z" fill="#1B90FF"/>`,
		};

		const result = `
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 20 20" fill="none">
			${iconPerValueState[this.valueState]};
		</svg>
		`;

		return this.valueState !== ValueState.None ? result : "";
	}

	get _valueStatePopoverHorizontalAlign() {
		return this.effectiveDir !== "rtl" ? "Left" : "Right";
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateMessageInputIcon() {
		const iconPerValueState = {
			Error: "error",
			Warning: "alert",
			Success: "sys-enter-2",
			Information: "information",
		};

		return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
	}

	/**
	 * Returns the caret position inside the native input
	 * @protected
	 */
	getCaretPosition() {
		return getCaretPosition(this.nativeInput);
	}

	/**
	 * Sets the caret to a certain position inside the native input
	 * @protected
	 * @param pos
	 */
	setCaretPosition(pos) {
		setCaretPosition(this.nativeInput, pos);
	}

	/**
	 * Removes the fractional part of floating-point number.
	 * @param {string} value the numeric value of Input of type "Number"
	 */
	removeFractionalPart(value) {
		if (value.includes(".")) {
			return value.slice(0, value.indexOf("."));
		}
		if (value.includes(",")) {
			return value.slice(0, value.indexOf(","));
		}

		return value;
	}

	static get dependencies() {
		const Suggestions = getFeature("InputSuggestions");

		return [Popover, Icon].concat(Suggestions ? Suggestions.dependencies : []);
	}

	static async onDefine() {
		const Suggestions = getFeature("InputSuggestions");

		[Input.i18nBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents"),
			Suggestions ? Suggestions.init() : Promise.resolve(),
		]);
	}
}

Input.define();

export default Input;
